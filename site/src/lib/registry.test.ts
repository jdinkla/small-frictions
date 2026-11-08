import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
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

// Publication regressions: a second issue must not change old memberships,
// timestamps or next-article boundaries.
describe('multi-issue publication',()=>{
 it('preserves the first issue and gives every article one complete issue',async()=>{
  const {issues,articles,articlesForIssue,nextArticle}=await import('./registry');
  expect(new Set(issues.map(i=>i.slug)).size).toBe(issues.length);
  for(const issue of issues){
   const list=articlesForIssue(issue.slug);
   expect(list).toHaveLength(6);
   expect(list.map(a=>a.number)).toEqual(['01','02','03','04','05','06']);
   for(const article of list)expect(nextArticle(article).issue).toBe(issue.slug);
  }
  for(const article of articles)expect(issues.some(i=>i.slug===article.issue)).toBe(true);
  expect(articlesForIssue('waiting').map(a=>a.slug)).toEqual(['one-queue','bus-pairs','capacity','average-wait','littles-law','waiting-design']);
 });
 it('keeps Waiting RSS identity stable and uses the correct issue dates',async()=>{
  vi.stubEnv('BASE_URL','/small-frictions');
  const {GET}=await import('../pages/feed.xml');
  const xml=await GET().text();
  expect((xml.match(/<item>/g)||[])).toHaveLength(12);
  expect((xml.match(/<pubDate>Sun, 08 Nov 2026 10:32:20 GMT<\/pubDate>/g)||[])).toHaveLength(6);
  expect(xml).toContain('<guid isPermaLink="true">https://jdinkla.github.io/small-frictions/articles/one-queue/</guid>');
  expect(xml.indexOf('<category>Delivery</category>')).toBeLessThan(xml.indexOf('<category>Waiting</category>'));
  vi.unstubAllEnvs();
 });
});
