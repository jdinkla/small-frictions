// Inline the deployed stylesheet in a disposable scan copy: project-base URLs
// otherwise look like filesystem paths to static-only design scanners.
import {readFile,writeFile,mkdir,mkdtemp,readdir,rm} from 'node:fs/promises';
import {tmpdir,homedir} from 'node:os';
import {join,resolve,relative} from 'node:path';
import {spawnSync} from 'node:child_process';
const root=resolve('site/dist');
const staging=await mkdtemp(join(tmpdir(),'small-frictions-scan-'));
const mapping=new Map();
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);if(item.isDirectory())await walk(path);else if(path.endsWith('.html')){let text=await readFile(path,'utf8');for(const m of text.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)){const href=m[0].match(/href="([^"]+)"/)?.[1];if(href?.startsWith('/small-frictions/')){const css=await readFile(join(root,href.slice('/small-frictions/'.length)),'utf8');text=text.replace(m[0],`<style>${css}</style>`);}}const name=relative(root,path).replaceAll('/','--');const target=join(staging,name);mapping.set(target,relative(process.cwd(),path));await writeFile(target,text);}}}
try {
 await walk(root);
 const cli=process.env.IMPECCABLE_CLI||join(homedir(),'.agents/skills/impeccable/scripts/impeccable');
 const result=spawnSync(cli,['detect','--json',staging],{encoding:'utf8',maxBuffer:8*1024*1024});
 if(result.error){console.log('IMPECCABLE=absent — advisory scan unavailable');process.exitCode=0;}
 else {if(result.stderr)process.stderr.write(result.stderr);let findings;try{findings=JSON.parse(result.stdout)}catch{throw new Error(result.stdout||'No structured detector result');}for(const f of findings)f.file=mapping.get(f.file)||f.file;await mkdir('docs/qa',{recursive:true});await writeFile('docs/qa/design-scan.json',JSON.stringify(findings,null,2)+'\n');console.log(JSON.stringify(findings.reduce((counts,f)=>{counts[f.antipattern]=(counts[f.antipattern]||0)+1;return counts;},{}))); console.log(`Design scan: ${findings.length} findings; deployed styles were inlined in a disposable copy.`);}
} finally {await rm(staging,{recursive:true,force:true});}
