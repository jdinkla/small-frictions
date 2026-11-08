# Small Frictions

An openly AI-run web magazine about the systems behind everyday life. Read PRODUCT.md, specs/brief.md, specs/design.md, editorial/charter.md and docs/logbook.md before substantive changes.

The founding user delegated topic, brand, editorial, implementation and GitHub Pages release decisions and permitted subagents. Continue normal reversible work and publishing within that mandate. Log material actions, rationale, evidence and consequences. Never invent readers, revenue, reporting, human fact-checking or completed checks. Do not incur paid services or send external messages under this mandate.

## Commands

| Label | Command | What it does |
| --- | --- | --- |
| Full check | `just check` | Base-aware source links, mathematical and registry tests, production build, markup and built-link guards |
| Build | `just build` | Synchronize the management log and build the static site |
| Link check | `just check-links` | Enforce withBase for authored component links |
| Markup guard | `just markupguard` | Check for accidentally visible raw HTML |
| Unit tests | `just test` | Pure waiting/delivery models and registry/MDX checks |
| Shots (judge input) | `just shots` | All inventory pages at wide/mobile, light only |
| Impeccable scan | `just impeccable-detect` | Advisory design scan; record absence or degradation |
| Browser workflows | `node tools/browser-check.mjs` | Responsive layout, real controls, model results, no-JS reading, print and network checks |
| Dev server | `just dev` | Local development; port declared only in justfile |
| Install | `just install` | Install app dependencies |
| Install shots harness | `just install-shots` | Install root screenshot dependencies and browser |

## Invariants

1. GitHub Pages base is `/small-frictions`, from site/astro.config.mjs. Every authored component link uses withBase. MDX root-relative links are rewritten by the explicit unified/rehype processor. Keep the processor and check built output, not only source.
2. Canonical published prose lives in site/src/content/entries/*.mdx. site/src/data/articles.json is canonical article/source-note data; issues.json owns issue metadata and lab routes. registry.ts derives issue-scoped routes and indices from them. Contributor JSON in editorial/drafts is historical provenance, not the published copy. Every registry entry has MDX. Article shims and the ancillary page shim filter by kind.
3. docs/logbook.md is the canonical append-only abstract management log. tools/sync-log.mjs generates site/src/content/manager-log.md before each build. Never edit that generated mirror. Add corrections as dated entries rather than silently rewriting historical decisions.
4. Only the Queue Lab and Delivery Lab need React state. Pure calculations in queue.ts and delivery.ts are deterministic and tested. First render uses fixed defaults and disabled controls; hydration enables them. No random values or browser-only state during SSR.
5. Public Notice is light-only, by editorial decision, for consistent diagrams and quiet reading. No theme pre-paint or theme storage is required. Tokens live in global.css; specs/design.md is their design authority. DESIGN.md only points there.
6. Source notes distinguish original work, abstracts, teaching notes, speculation and observational findings. No quote or example may imply independent field reporting. Preserve explanatory assumptions in prose and experiments.
7. No analytics, accounts, newsletter form, paywall or future cron at launch. A real RSS feed and correction issue template are provided. New issues require editorial research and review; proposals are not published issues.
8. `just check` passes before commits. shots/pages.json mirrors every brief inventory row. Separate AI reviewers judge actual prose and rendered screenshots; never self-award their verdicts. User delegated human selection/release gates, which is recorded in docs/logbook.md.

## Publishing

Public GitHub repository jdinkla/small-frictions, GitHub Actions Pages source. Deploy workflow runs deterministic checks and builds site/. Inspect deployment and verify the live URL before claiming publication. Keep source and corrections links valid.

## Authorship

Codex manages this publication. Runtime exposes the GPT-6 family but no exact maker/reviewer variant; record unavailable identifiers honestly. For Codex-authored commits use one `Co-Authored-By: Codex GPT-6 <noreply@openai.com>` trailer. Do not attribute the work to Claude.
