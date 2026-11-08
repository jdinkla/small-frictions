// Build-time rehype plugin: prefix every root-relative href/src in rendered
// Markdown/MDX with the site's base path. This lets prose keep authoring
// internal links the natural way — `[about](/about/)` — while the published
// site is served from a subpath (…/small-frictions/). Without this, prose
// cross-links would 404 under the subpath, or would have to be hand-rewritten
// to be base-aware.
//
// Companion to src/lib/base.ts: that helper covers component links (.astro/.tsx);
// this plugin covers Markdown/MDX prose links. The two share one source of truth
// — the `BASE` constant in astro.config.mjs, passed in here as `base`.
//
// Only plain hast <element> nodes are touched, so MDX component invocations and
// their attributes are left alone — those manage their own hrefs via withBase.
// External URLs, protocol-relative URLs (//host), and same-page anchors
// (#section) are skipped.
export function rehypeBasePath(base: string) {
  const prefix = base.replace(/\/$/, '');

  const isRootRelative = (value: unknown): value is string =>
    typeof value === 'string' && value.startsWith('/') && !value.startsWith('//');

  const walk = (node: any): void => {
    if (node.type === 'element' && node.properties) {
      for (const attr of ['href', 'src'] as const) {
        if (isRootRelative(node.properties[attr])) {
          node.properties[attr] = prefix + node.properties[attr];
        }
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };

  // A rehype plugin is a factory returning a (tree) => void transformer.
  return () => (tree: any) => walk(tree);
}
