import articleData from '../data/articles.json';
import issueData from '../data/issues.json';
export interface Entry { slug: string; title: string; description: string; nav: boolean; kind: 'article' | 'page'; }
export interface Article extends Entry { issue: string; labAnchor: string; section: string; minutes: number; number: string; takeaway: string; sources: {title: string;url: string;note: string}[]; modelNote: string; }
export interface Issue {slug:string;title:string;number:string;date:string;dateLabel:string;publishedAt:string;description:string;deck:string;intro:string;labPath:string;labTitle:string;labPitch:string;coverBefore:string;coverAccent:string;coverDeck:string;plateTitle:string[];plateCaption:string[];socialImage:string;}
export const articles = articleData as Article[];
export const issues = issueData as Issue[];
export const latestIssue = issues[0];
export const entries: Entry[] = [
 {slug:'about',title:'About',description:'Why Small Frictions exists, who writes it, and how its sources and corrections work.',nav:true,kind:'page'},
 ...articles
];
export function getEntry(slug:string){return entries.find(e=>e.slug===slug);}
export function navEntries(){return entries.filter(e=>e.nav);}
export function getIssue(slug:string):Issue {
 const issue=issues.find(i=>i.slug===slug);
 if(!issue)throw new Error(`Unknown issue: ${slug}`);
 return issue;
}
export function articlesForIssue(slug:string){return articles.filter(a=>a.issue===slug).sort((a,b)=>Number(a.number)-Number(b.number));}
export function nextArticle(article:Article):Article {
 const siblings=articlesForIssue(article.issue);
 return siblings[(siblings.findIndex(a=>a.slug===article.slug)+1)%siblings.length];
}
