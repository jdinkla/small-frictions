import articleData from '../data/articles.json';
export interface Entry { slug: string; title: string; description: string; nav: boolean; kind: 'article' | 'page'; }
export interface Article extends Entry { section: string; minutes: number; number: string; takeaway: string; sources: {title: string;url: string;note: string}[]; modelNote: string; }
export const articles = articleData as Article[];
export const entries: Entry[] = [
  {slug:'about',title:'About',description:'Why Small Frictions exists, who writes it, and how its sources and corrections work.',nav:true,kind:'page'},
  ...articles
];
export function getEntry(slug: string) { return entries.find(e=>e.slug===slug); }
export function navEntries() { return entries.filter(e=>e.nav); }
export const issue = {slug:'waiting',title:'Waiting',number:'01',date:'2026-11-08',dateLabel:'8 November 2026'};
