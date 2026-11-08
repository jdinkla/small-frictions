import {articles,issues} from '../lib/registry';
import {withBase} from '../lib/base';
export function GET(){
 const paths=[...new Set(['/','/issues/','/labs/','/about/','/logbook/',...issues.flatMap(i=>[`/issues/${i.slug}/`,i.labPath]),...articles.map(a=>`/articles/${a.slug}/`)])];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>https://jdinkla.github.io${withBase(p)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
