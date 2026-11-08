// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBasePath } from './integrations/rehype-base-path.ts';

// Deployed to GitHub Pages at a project subpath. BASE is the single source of
// truth for the subpath: it sets Astro's `base` (surfaced as
// import.meta.env.BASE_URL for component links via src/lib/base.ts) and feeds
// the rehype plugin that base-prefixes Markdown/MDX prose links at build time.
const BASE = '/small-frictions';

// https://astro.build/config
export default defineConfig({
  site: 'https://jdinkla.github.io',
  base: BASE,

  integrations: [mdx(), react()],

  // extendMarkdownConfig is on by default, so @astrojs/mdx inherits this plugin.
  //
  // Astro 7 made Sätteri the default Markdown processor; the rehype pipeline now
  // has to be asked for by name, hence `processor: unified()` and the explicit
  // @astrojs/markdown-remark dependency. Deleting this block does NOT fail the
  // build — it silently renders prose links UNPREFIXED (measured: `/about/`
  // instead of `/small-frictions/about/`, for .md and .mdx alike), which 404s under
  // the subpath. No gate catches that: the link guard reads source, not output.
  // So if a deprecation warning ever points here, migrate the option — never
  // delete it. Revisit when @astrojs/markdown-satteri leaves 0.x (0.3.5 as of
  // the Astro 7 bump) and documents rehype-plugin support.
  markdown: {
    processor: unified({ rehypePlugins: [rehypeBasePath(BASE)] })
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
