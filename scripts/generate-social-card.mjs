import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const response = await page.goto('http://127.0.0.1:4321/');
  if (!response?.ok()) throw new Error('Start npm run preview before generating the social card.');
  const content = await page.evaluate(() => ({
    name: document.querySelector('meta[name="author"]').content,
    sculpture: document.querySelector('.sculpture').outerHTML,
    lines: [...document.querySelectorAll('h1 > span')].map((span) => span.textContent),
  }));
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8">
    <style>
      * { box-sizing: border-box; margin: 0; }
      body { width: 1200px; height: 630px; padding: 54px 65px; overflow: hidden;
        background: #111116; color: #eeece7; font-family: Arial, sans-serif; }
      header { display: flex; align-items: center; gap: 21px; font-size: 17px; }
      .monogram { font-size: 38px; font-weight: 600; letter-spacing: -4px; }
      .monogram span { color: #c4b3db; }
      h1 { position: relative; z-index: 1; margin-top: 73px; font-size: 64px;
        letter-spacing: -3.5px; line-height: 1.12; font-weight: 400; }
      h1 > span { display: block; }
      h1 > span:last-child { font-family: Georgia, serif; font-style: italic;
        color: #c4b3db; font-size: 78px; letter-spacing: -4px; }
      .sculpture { position: absolute; width: 565px; height: 583px; right: 0; top: 9px; }
      footer { position: absolute; bottom: 43px; left: 65px; right: 65px;
        border-top: 1px solid #33303b; padding-top: 22px; display: flex;
        justify-content: space-between; color: #aaa1b4; font-size: 14px; }
    </style><body><header><span class="monogram">hs<span>.</span></span>
      <span id="name"></span></header><h1></h1>${content.sculpture}
      <footer><span>A quieter corner of the internet.</span><span>hri-sap.github.io</span></footer></body></html>`);
  await page.locator('#name').evaluate((element, name) => { element.textContent = name; }, content.name);
  await page.locator('h1').evaluate((element, lines) => {
    for (const line of lines) {
      const span = document.createElement('span');
      span.textContent = line;
      element.append(span);
    }
  }, content.lines);
  const output = fileURLToPath(new URL('../public/social-card.png', import.meta.url));
  await page.screenshot({ path: output });
  console.log(`Generated ${output} (1200 × 630).`);
} finally {
  await browser.close();
}
