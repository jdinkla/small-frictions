import {readFile,writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const config=JSON.parse(await readFile('shots/pages.json','utf8'));
const origin='https://jdinkla.github.io';
const base=origin+config.base;
const results=[];
for(const path of [...config.pages.map(p=>p.path),'/feed.xml','/sitemap.xml','/social-cover.png','/social-waiting.png','/social-delivery.png','/favicon.svg']){
 const response=await fetch(base+path);
 assert.equal(response.status,200,`${path}: HTTP ${response.status}`);
 const body=await response.arrayBuffer();
 const bytes=body.byteLength;
 if(path==='/feed.xml'){const xml=new TextDecoder().decode(body);assert.equal((xml.match(/<item>/g)||[]).length,12);assert.equal((xml.match(/<pubDate>Sun, 08 Nov 2026 10:32:20 GMT<\/pubDate>/g)||[]).length,6);assert.ok(xml.includes(base+'/articles/one-queue/'));}
 assert.ok(bytes>0,`${path}: empty response`);
 results.push({path,status:response.status,bytes});
}
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 await page.goto(base+'/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 assert.ok((await page.locator('h1').textContent()).includes('to your door.'));
 assert.equal(await page.evaluate(()=>document.fonts.check('900 24px Archivo')),true);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.goto(base+'/lab/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>!document.querySelector('#arrival-rate').disabled);
 await page.locator('#arrival-rate').focus();await page.keyboard.press('End');
 await page.waitForFunction(()=>document.querySelector('[data-result="capacity"]').textContent==='19min');
 await page.getByRole('button',{name:'Reset all experiments'}).click();
 await page.waitForFunction(()=>document.querySelector('#arrival-rate').value==='48');
 await page.goto(base+'/labs/delivery/',{waitUntil:'networkidle'});
 await page.waitForFunction(()=>!document.querySelector('#hub-offset').disabled);
 await page.locator('#hub-offset').focus();await page.keyboard.press('End');
 await page.waitForFunction(()=>document.querySelector('[data-result="hub-km"]').textContent==='244.8 km');
 await page.locator('#check-payload').fill('000000000000');
 await page.waitForFunction(()=>document.querySelector('[data-result="check-digit"]').textContent==='0');
 await page.getByRole('button',{name:'Reset all experiments'}).click();
 await page.waitForFunction(()=>document.querySelector('[data-result="check-digit"]').textContent==='8');
 assert.deepEqual(errors,[]);
 await writeFile('docs/qa/production.json',JSON.stringify({verifiedAt:new Date().toISOString(),base,requests:results,mobileHome:true,localFonts:true,liveLabHydration:true,liveDeliveryLab:true,stablePriorFeed:true,liveKeyboardAndReset:true,browserErrors:errors},null,2)+'\n');
 console.log(`Production verified: ${results.length} URLs return HTTP 200; mobile cover, fonts, lab hydration, keyboard and reset passed.`);
}finally{await browser.close();}
