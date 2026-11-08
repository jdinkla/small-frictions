/* Screenshot harness — the visual judge's evidence input.
 *
 * Serves the built site/dist/ mounted at the configured baseurl (mirroring GitHub
 * Pages project hosting, so baseurl bugs show up here, not in production),
 * then captures every page in shots/pages.json across the configured
 * viewports and themes. Full-page PNGs land in shots/out/, plus report.json.
 *
 * Theme is applied by seeding localStorage before load, so the template's
 * pre-paint script does the switching — the harness exercises the real
 * mechanism instead of injecting classes.
 *
 * Exit codes: 0 = all pages captured and loaded without console errors;
 * 1 = any page failed (missing, HTTP error, or console error). The floor
 * stays deterministic and content-agnostic; judging the pixels is the
 * visual-reviewer's job.
 */
import { createServer } from "node:http";
import { readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { join, normalize, extname } from "node:path";
import { chromium } from "playwright";

const config = JSON.parse(await readFile("shots/pages.json", "utf8"));
const SITE = "site/dist";
const BASE = config.base.replace(/\/$/, "");
const PORT = Number(process.env.SHOTS_PORT || 8977);

if (!existsSync(SITE)) {
  console.error("shots: site/dist/ missing — run `just build` first");
  process.exit(1);
}

const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".webp": "image/webp", ".jpg": "image/jpeg", ".xml": "application/xml",
};

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path === BASE || path.startsWith(BASE + "/")) path = path.slice(BASE.length) || "/";
  let file = normalize(join(SITE, path)).replace(/^(\.\.[/\\])+/, "");
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) { res.writeHead(404); res.end("not found"); return; }
  res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(PORT, r));

// Warm-up: touch every page once before capturing. The server intermittently
// 404s early requests (readiness race, macOS fs under load); paying the first
// hits here keeps the capture loop deterministic.
for (const page of config.pages) {
  try {
    await fetch(`http://localhost:${PORT}${BASE}${page.path}`);
  } catch {
    /* warm-up only — real errors surface in the capture loop */
  }
}

// purge stale captures first — leftover PNGs from a previous page inventory
// would sit beside fresh ones and mislead the judge diffing the folder
await rm("shots/out", { recursive: true, force: true });
await mkdir("shots/out", { recursive: true });
const browser = await chromium.launch();
const report = [];
let failed = false;

for (const page of config.pages) {
  for (const [vpName, vp] of Object.entries(config.viewports)) {
    for (const theme of config.themes) {
      const id = `${page.id}-${vpName}-${theme}`;
      // Up to three attempts per capture with a short backoff: the local
      // static server intermittently 404s random pages (readiness race; a
      // single retry was not enough in one judged run). Only a clean pass
      // counts — a final failure is reported like any other.
      let errors = [];
      for (let attempt = 1; attempt <= 3; attempt++) {
        if (attempt > 1) await new Promise((r) => setTimeout(r, 400 * attempt));
        errors = [];
        const ctx = await browser.newContext({ viewport: vp });
        await ctx.addInitScript(
          ([key, value]) => localStorage.setItem(key, value),
          [config.storageKey, theme],
        );
        const tab = await ctx.newPage();
        tab.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
        tab.on("pageerror", (e) => errors.push(String(e)));
        try {
          const resp = await tab.goto(`http://localhost:${PORT}${BASE}${page.path}`, {
            waitUntil: "networkidle", timeout: 15000,
          });
          if (!resp || resp.status() >= 400) errors.push(`HTTP ${resp ? resp.status() : "no response"}`);
          // Full-page shots never scroll, so images below the fold can capture as
          // blank boxes (lazy-load + offscreen raster), client:visible islands
          // never hydrate, and scroll-triggered JS errors never fire. Scroll the
          // page once, force-load and *decode* every image, then settle.
          await tab.evaluate(async () => {
            const imgs = Array.from(document.images);
            imgs.forEach((i) => { i.loading = "eager"; });
            const step = window.innerHeight;
            for (let y = 0; y < document.body.scrollHeight; y += step) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 40));
            }
            window.scrollTo(0, 0);
            await Promise.all(imgs.map((i) => i.complete ? Promise.resolve() :
              new Promise((r) => { i.onload = i.onerror = r; })));
            await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
          });
          await tab.waitForTimeout(150);
          await tab.screenshot({ path: `shots/out/${id}.png`, fullPage: true });
        } catch (e) {
          errors.push(String(e));
        }
        await ctx.close();
        if (errors.length === 0) break;
        if (attempt < 3) console.log(`retry ${id} (attempt ${attempt})  ${errors.join(" | ")}`);
      }
      const ok = errors.length === 0;
      if (!ok) failed = true;
      report.push({ id, page: page.id, path: page.path, viewport: vpName, theme, ok, errors, mustShow: page.mustShow });
      console.log(`${ok ? "ok " : "FAIL"} ${id}${ok ? "" : "  " + errors.join(" | ")}`);
    }
  }
}

await browser.close();
server.close();
await writeFile("shots/out/report.json", JSON.stringify(report, null, 2));
console.log(`shots: ${report.filter((r) => r.ok).length}/${report.length} captured -> shots/out/`);
process.exit(failed ? 1 : 0);
