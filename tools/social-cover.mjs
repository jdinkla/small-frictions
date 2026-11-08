import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
let fonts=await readFile('site/src/styles/fonts.css','utf8');
for(const match of fonts.matchAll(/__BASE__fonts\/([^)]*)/g)) {
 const data=await readFile(`site/public/fonts/${match[1]}`);
 fonts=fonts.replace(match[0],`data:font/woff2;base64,${data.toString('base64')}`);
}
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
const issue=JSON.parse(await readFile('site/src/data/issues.json','utf8'))[0];
await page.setContent(`<style>${fonts}*{box-sizing:border-box}body{margin:0;padding:42px 52px;background:#f3f0e7;color:#272b27;font:18px Archivo}header{font-size:88px;font-weight:900;letter-spacing:-3px;border-bottom:4px solid;padding-bottom:14px}main{display:flex;justify-content:space-between;padding-top:35px}h1{font:400 100px/1 'Source Serif 4';letter-spacing:-3px;margin:0}em{color:#b43a20}p{line-height:1.6;max-width:380px;font-size:20px}.grid{display:grid;grid-template-columns:repeat(5,36px);gap:25px;margin:30px 40px}.dot{width:36px;height:36px;background:#272b27}.dot:nth-last-child(-n+5){background:#b43a20}footer{font-size:16px;margin-top:28px}</style><header>SMALL FRICTIONS</header><main><div><h1>${issue.coverBefore}<br><em>${issue.coverAccent}</em></h1><p>A magazine about the way daily life works.</p></div><div class="grid">${'<span class="dot"></span>'.repeat(20)}</div></main><footer>ISSUE ${issue.number} / ${issue.title.toUpperCase()} · SIX ARTICLES + THE ${issue.labTitle.toUpperCase()} · OPENLY AI-WRITTEN</footer>`);
await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:`site/public${issue.socialImage}`});
await page.screenshot({path:'site/public/social-cover.png'});
await browser.close();
console.log('Social cover: 1200 × 630 original type and geometry');
