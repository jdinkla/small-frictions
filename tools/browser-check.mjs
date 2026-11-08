import { chromium } from 'playwright';
import { startPreview } from './preview.mjs';
import assert from 'node:assert/strict';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
const { server,url }=await startPreview();
const browser=await chromium.launch();
const config=JSON.parse(await readFile('shots/pages.json','utf8'));
const report=[];
await mkdir('shots/workflows',{recursive:true});
try {
 for(const width of [320,390,768,1024,1440]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];const external=[];
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
  page.on('request',r=>{if(!r.url().startsWith(url.split('/small-frictions/')[0]) && !r.url().startsWith('data:'))external.push(r.url())});
  for(const route of config.pages) {
   const result=await page.goto(url+route.path.replace(/^\//,''),{waitUntil:'networkidle'});
   assert.equal(result.status(),200,route.path);
   await page.evaluate(()=>document.fonts.ready);
   const overflow=await page.evaluate(()=>({viewport:innerWidth,page:document.documentElement.scrollWidth,fonts:document.fonts.check('900 24px Archivo')}));
   assert.ok(overflow.page<=width+1,`${width}px ${route.path}: horizontal overflow ${overflow.page}`);
   assert.ok(overflow.fonts,'Local masthead font unavailable');
   assert.equal(await page.locator('h1').count(),1,`${route.path}: one main heading`);
   const contrast=await page.evaluate(()=>{
    const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
    const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
    const results=[];
    for(const el of document.querySelectorAll('body *')) {
      if(el.closest('script,style,noscript') || !Array.from(el.childNodes).some(n=>n.nodeType===3 && n.textContent.trim()))continue;
      const cs=getComputedStyle(el);if(!el.getClientRects().length||cs.visibility==='hidden')continue;
      let parent=el,bg;
      while(parent){const c=rgb(getComputedStyle(parent).backgroundColor);if(c.length===3||c[3]===1){bg=c;break;}parent=parent.parentElement;}
      if(!bg)continue;
      if(el instanceof SVGElement){
       const box=el.getBoundingClientRect(),cx=box.x+box.width/2,cy=box.y+box.height/2;
       for(const rect of el.closest('svg').querySelectorAll('rect')){
        const r=rect.getBoundingClientRect();
        if(cx>=r.left&&cx<=r.right&&cy>=r.top&&cy<=r.bottom){const fill=rgb(getComputedStyle(rect).fill);if(fill.length===3||fill[3]===1)bg=fill;}
       }
      }
      const color=rgb(el instanceof SVGElement ? cs.fill : cs.color),size=parseFloat(cs.fontSize),weight=parseFloat(cs.fontWeight);
      const ratio=(Math.max(lum(color),lum(bg))+.05)/(Math.min(lum(color),lum(bg))+.05);
      const need=size>=24||(size>=18.66&&weight>=700)?3:4.5;
      if(ratio+1e-8<need)results.push({text:el.textContent.trim().slice(0,50),ratio,need});
    }
    return results;
   });
   assert.deepEqual(contrast,[],`${width}px ${route.path}: computed text contrast`);
  }
  await page.goto(url+'lab/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!document.querySelector('#arrival-rate').disabled);
  const setRange=async(id,value)=>page.locator(id).evaluate((el,n)=>{
   const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;
   setter.call(el,String(n));el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));
  },value);
  await setRange('#arrival-rate',54);
  await page.waitForFunction(()=>document.querySelector('[data-result="capacity"]').textContent==='9min');
  await page.locator('#gap-spread').focus();
  await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.querySelector('[data-result="headway"]').textContent==='5min');
  await setRange('#long-job',1);
  await page.waitForFunction(()=>document.querySelector('[data-result="pooling"]').textContent==='1min');
  await page.getByText('Inspect every job and its wait',{exact:true}).click();
  assert.equal(await page.locator('.comparison tbody tr').count(),4);
  await page.getByRole('button',{name:'Reset all experiments'}).click();
  await page.waitForFunction(()=>document.querySelector('#arrival-rate').value==='48' && document.querySelector('#gap-spread').value==='8' && document.querySelector('#long-job').value==='6');
  await page.locator('#arrival-rate').focus();await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.querySelector('#arrival-rate').value==='6');
  await page.locator('#arrival-rate').focus();await page.keyboard.press('End');
  await page.waitForFunction(()=>document.querySelector('[data-result="capacity"]').textContent==='19min');
  // Delivery Lab: both numeric extremes, editable/invalid states and resets.
  await page.goto(url+'labs/delivery/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>!document.querySelector('#hub-offset').disabled);
  await page.locator('#hub-offset').focus();await page.keyboard.press('End');
  await page.waitForFunction(()=>document.querySelector('[data-result="hub-km"]').textContent==='244.8 km');
  assert.ok((await page.locator('[data-result="hub-difference"]').textContent()).includes('more'));
  if(width<=700){
    await page.locator('#hub').evaluate(el=>el.scrollIntoView({block:'start'}));
    const feedback=page.locator('#hub .delivery-mobile-feedback');
    assert.ok((await feedback.textContent()).includes('244.8'));
    const box=await feedback.boundingBox();
    assert.ok(box.y>=0&&box.y+box.height<=900,'Compact hub feedback stays in the control viewport');
  }
  await setRange('#box-height',6);
  await page.waitForFunction(()=>document.querySelector('[data-result="box-litres"]').textContent==='3.6 L');
  await page.locator('#check-payload').fill('');
  assert.ok((await page.locator('#payload-message').textContent()).includes('Enter 12 digits'));
  await page.locator('#check-payload').fill('12x');
  assert.equal(await page.locator('#check-payload').getAttribute('aria-invalid'),'true');
  assert.equal(await page.locator('[data-result="check-digit"]').count(),0);
  await page.locator('#check-payload').fill('000000000000');
  await page.waitForFunction(()=>document.querySelector('[data-result="check-digit"]').textContent==='0');
  await page.getByRole('button',{name:'Reset all experiments'}).click();
  await page.waitForFunction(()=>document.querySelector('#hub-offset').value==='0'&&document.querySelector('#box-height').value==='20'&&document.querySelector('#check-payload').value==='123456789012');
  await page.getByText('Inspect every weight and the source method',{exact:true}).click();
  assert.equal(await page.locator('.delivery-check-table tbody tr').count(),12);
  if(width<=700){
    await page.goto(url+'articles/barcode/');
    const contents=page.locator('.contents-mobile');
    assert.equal(await contents.getAttribute('open'),null);
    await contents.locator('summary').click();
    assert.equal(await contents.locator('a[href="#sources"]').isVisible(),true);
  }
  // Issue links and next-article links remain within their publication.
  for(const [slug,issueSlug,labPath] of [['capacity','waiting','/lab/'],['barcode','delivery','/labs/delivery/']]){
    await page.goto(url+'articles/'+slug+'/');
    assert.equal(await page.locator('.breadcrumbs a').getAttribute('href'),'/small-frictions/issues/'+issueSlug+'/');
    assert.ok((await page.locator('.article-contents .text-link').getAttribute('href')).startsWith('/small-frictions'+labPath));
    assert.ok((await page.locator('.continue-actions .text-link').first().getAttribute('href')).startsWith('/small-frictions'+labPath));
  }
  assert.deepEqual(errors,[],`Browser errors at ${width}`);
  assert.deepEqual(external,[],`Unexpected external requests at ${width}`);
  report.push({width,pages:config.pages.length,overflow:false,localFonts:true,computedTextContrast:true,controls:true,keyboard:true,requests:'local only',errors:[]});
  await context.close();
 }
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const tab=await nojs.newPage();
 await tab.goto(url+'articles/capacity/');
 assert.ok((await tab.locator('.prose').textContent()).includes('thirty-eight'));
 assert.equal(await tab.locator('#sources li').count(),2);
 await tab.goto(url+'lab/');
 assert.equal(await tab.locator('#arrival-rate').isDisabled(),true);
 assert.equal(await tab.locator('[data-result="headway"]').textContent(),'8.2min');
 assert.ok((await tab.locator('noscript').textContent()).includes('Enable JavaScript'));
 await tab.goto(url+'articles/barcode/');
 assert.ok((await tab.locator('.prose').textContent()).includes('09:10'));
 await tab.goto(url+'labs/delivery/');
 assert.equal(await tab.locator('#check-payload').isDisabled(),true);
 assert.equal(await tab.locator('[data-result="check-digit"]').textContent(),'8');
 await nojs.close();
 const printing=await browser.newPage();
 await printing.goto(url+'articles/capacity/');
 await printing.emulateMedia({media:'print'});
 assert.equal(await printing.locator('.site-nav').isVisible(),false);
 assert.equal(await printing.locator('#sources').isVisible(),true);
 await printing.pdf({path:'shots/workflows/capacity-print.pdf',format:'A4',margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
 await printing.goto(url+'articles/barcode/');
 assert.equal(await printing.locator('#sources').isVisible(),true);
 assert.equal(await printing.locator('.article-figure .diagram').isVisible(),true);
 await printing.pdf({path:'shots/workflows/barcode-print.pdf',format:'A4',margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'}});
 await printing.close();
 report.push({noJavaScript:'article, sources and default lab readable',print:'article and source URLs present, navigation hidden'});
 await writeFile('shots/workflows/report.json',JSON.stringify(report,null,2));
 console.log(`Browser checks: ${config.pages.length} pages × 5 widths; all controls, keyboard, no-JS, local requests and print passed.`);
} finally {await browser.close();await new Promise(r=>server.close(r));}
