import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFileSync} from 'node:fs';
export const root=fileURLToPath(new URL('../site/dist/',import.meta.url));
export const base=JSON.parse(readFileSync(new URL('../shots/pages.json',import.meta.url))).base;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
export async function startPreview(port=0) {
 const server=createServer(async(req,res)=>{
  try {
   const path=decodeURIComponent(new URL(req.url,'http://local').pathname);
   if(path!==base && !path.startsWith(base+'/')) {res.writeHead(404);res.end('Use the project base path.');return;}
   let file=resolve(root,'.'+(path.slice(base.length)||'/'));
   if(file!==root.replace(/\/$/,'') && !file.startsWith(root.replace(/\/$/,'')+sep)){res.writeHead(403);res.end();return;}
   if((await stat(file)).isDirectory()) file=resolve(file,'index.html');
   res.writeHead(200,{'content-type':mime[extname(file)]??'application/octet-stream'});res.end(await readFile(file));
  } catch {res.writeHead(404);res.end('Not found');}
 });
 await new Promise(r=>server.listen(port,'127.0.0.1',r));
 return {server,url:`http://127.0.0.1:${server.address().port}${base}/`};
}
if(process.argv[1]===fileURLToPath(import.meta.url)) {
 const just=readFileSync(new URL('../justfile',import.meta.url),'utf8');
 const port=Number(just.match(/port := "(\d+)"/)[1]);
 const {url}=await startPreview(port);console.log(`Local: ${url}`);
}
