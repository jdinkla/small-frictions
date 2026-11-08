import { articles } from '../lib/registry';
import { withBase } from '../lib/base';
const escape=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function GET() {
 const origin='https://jdinkla.github.io';
 const url=(p:string)=>origin+withBase(p);
 const items=articles.map(a=>`<item><title>${escape(a.title)}</title><link>${url(`/articles/${a.slug}/`)}</link><guid isPermaLink="true">${url(`/articles/${a.slug}/`)}</guid><description>${escape(a.description)} AI-written; source and model notes on the article.</description><pubDate>Sun, 08 Nov 2026 10:32:20 GMT</pubDate></item>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Small Frictions</title><link>${url('/')}</link><description>A magazine about the way daily life works. Openly AI-written, with sources and experiments.</description><language>en</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
