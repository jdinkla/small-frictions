#!/usr/bin/env bash
#
# Guard: every hand-written internal link must be base-aware.
#
# The site is served from a GitHub Pages project subpath
# (https://jdinkla.github.io/small-frictions/), so a bare root-relative link like
# `/about/` resolves to the domain root and 404s in production while looking
# fine in `astro dev`. Prose links in MDX are made base-aware automatically at
# build time by integrations/rehype-base-path.ts; this check covers the rest —
# component/page/island links that bypass src/lib/base.ts's withBase().
#
# It flags:
#   - bare attribute strings           href="/about"  src='/x'
#   - bare attribute template literals  href={`/${slug}`}
#   - bare JS navigation                window.location.href = `/about`
# It deliberately does NOT flag: #anchors, https:// / external, // protocol-
# relative, or links already wrapped in withBase(...). Patterns are POSIX ERE so
# they run identically under GNU grep (CI) and BSD grep (macOS, `just`).
#
# Exit 1 (and print the offenders) on any match; exit 0 when clean.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_DIR="$SCRIPT_DIR/../src"

# base.ts is the helper that legitimately handles raw paths; never flag it.
hits="$(grep -rEn \
  --include='*.astro' --include='*.tsx' --include='*.ts' --include='*.mdx' \
  --exclude='base.ts' \
  -e "(href|src)=[\"']/[^/]" \
  -e "(href|src)=[{]\`/" \
  -e "\.href *= *[\"'\`]/[^/]" \
  -e "location\.(assign|replace) *\( *[\"'\`]/[^/]" \
  "$SRC_DIR" || true)"

if [ -n "$hits" ]; then
  echo "✖ Found bare internal link(s) that must go through withBase() (src/lib/base.ts):"
  echo
  echo "$hits"
  echo
  echo "  Fix: href={withBase('/about/')}  /  window.location.href = withBase(\`/\${slug}/\`)"
  echo "  (MDX prose links like [x](/about/) are fine — the rehype plugin handles those.)"
  exit 1
fi

echo "✓ All internal links are base-aware."
