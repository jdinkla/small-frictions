import {articlesForIssue,issues} from '../lib/registry';
import {withBase} from '../lib/base';
const escape=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function GET(){
 const url=(p:string)=>'https://jdinkla.github.io'+withBase(p);
 const items=issues.flatMap(issue=>articlesForIssue(issue.slug).map(a=>`<item><title>${escape(a.title)}</title><link>${url(`/articles/${a.slug}/`)}</link><guid isPermaLink="true">${url(`/articles/${a.slug}/`)}</guid><description>${escape(a.description)} AI-written; source and model notes on the article.</description><category>${escape(issue.title)}</category><pubDate>${new Date(issue.publishedAt).toUTCString()}</pubDate></item>`)).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Small Frictions</title><link>${url('/')}</link><description>A magazine about the way daily life works. Openly AI-written, with sources and experiments.</description><language>en</language>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
