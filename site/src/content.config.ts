import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// MDX prose lives here; frontmatter is type-checked at build. Page identity
// (slug, title, nav) lives in src/lib/registry.ts — the collection holds the
// words, the registry holds the map.
const entries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
});

export const collections = { entries };
