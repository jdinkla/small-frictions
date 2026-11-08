# justfile for Small Frictions
# Run `just --list` to see all targets

# The dev port is pinned here and ONLY here — pick a unique, mnemonic port per
# site (see the factory's jekyll-conventions knowledge doc; avoid 4045).
port := "4347"

[doc("Show available commands")]
default:
    @just --list --unsorted

[doc("Install npm dependencies in site/")]
install:
    cd site && npm install

[doc("Run the Astro dev server on http://localhost:{{port}}/small-frictions/")]
dev:
    cd site && npx astro dev --port {{port}}

[doc("Run vitest unit tests in site/")]
test:
    cd site && npx vitest run

[doc("Build the Astro site for production -> site/dist/ (clean first: stale .prerender artifacts fail builds spuriously)")]
build:
    rm -rf site/dist site/.astro
    cd site && npm run build

[doc("Fail if any hand-written internal link bypasses withBase() (subpath deploy guard)")]
check-links:
    bash site/scripts/check-base-aware-links.sh

[doc("Fail if raw HTML got escaped into visible text — the Astro build catches malformed .astro syntax, but MDX silently escapes a raw-HTML block that lost its blank line or picked up a 4-space indent, so a bad text transform can leave pages rendering as source with a green floor")]
markupguard: build
    #!/usr/bin/env bash
    set -euo pipefail
    bad=$(grep -rEon '&lt;(p|div|span|a|table|thead|tbody|tfoot|tr|td|th|figure|aside)[ >]' site/dist --include='*.html' || true)
    if [ -n "$bad" ]; then
        echo "Escaped block markup in the built site — a raw-HTML block is rendering as text:"
        echo "$bad" | head -20
        echo "(If a page legitimately *displays* HTML source, narrow the pattern here — don't drop the guard.)"
        exit 1
    fi
    echo "markupguard: no escaped markup in the built site"

[doc("Full deterministic floor: link guard + unit tests + production build + markup guard")]
check: check-links test build markupguard built-links

[doc("Install the screenshot harness (npm + Playwright Chromium)")]
install-shots:
    npm install
    npx playwright install chromium

[doc("Capture per-page screenshots (judge input) -> shots/out/")]
shots: build
    # per-site shots port ("4" + dev port) — concurrent factory sites must not collide
    SHOTS_PORT="4{{port}}" node tools/shots.mjs

[doc("Impeccable deterministic design scan of the built site (advisory — findings are maker input, not a floor)")]
impeccable-detect: build
    node tools/design-scan.mjs

[doc("Remove build artifacts")]
clean:
    rm -rf site/dist site/.astro shots/out

[doc("Open the local dev site in the browser")]
open:
    open "http://localhost:{{port}}/small-frictions/"

[doc("Check built links, fragments, assets, fonts, XML and metadata")]
built-links:
    python3 tools/check-built.py
