// Prefix an internal, root-relative path with the site's configured base path
// (`base` in astro.config.mjs, surfaced at runtime as import.meta.env.BASE_URL).
//
// Why this exists: the site is served from a project subpath
// (https://jdinkla.github.io/small-frictions/), so absolute links authored in
// components — `/about/`, `/lab#part-2` — must be rewritten to live under that
// base. Astro does NOT do this for hand-written hrefs; it only base-prefixes
// the assets and scripts it emits itself.
//
// Works in both contexts because Vite statically inlines import.meta.env.BASE_URL
// into the SSR/build bundle (Astro frontmatter) and the client bundle (React
// islands). Markdown/MDX prose links are handled separately, at build time, by
// integrations/rehype-base-path.ts — components use this helper.
//
// External URLs (`https://…`), protocol-relative URLs (`//host`), and same-page
// anchors (`#section`) are returned unchanged.
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + path;
}
