import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { entries, getEntry, navEntries } from './registry';

describe('registry', () => {
  it('has unique slugs', () => {
    const slugs = entries.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every registry entry has an MDX file (drift guard)', () => {
    const files = readdirSync(join(__dirname, '../content/entries')).map((f) =>
      f.replace(/\.(md|mdx)$/, '')
    );
    for (const e of entries) expect(files).toContain(e.slug);
  });

  it('helpers derive from the one list', () => {
    expect(getEntry('about')?.title).toBe('About');
    expect(navEntries().every((e) => e.nav)).toBe(true);
  });
});
