/**
 * Rasterize public/og-image.png (1200×630) and public/apple-touch-icon.png (180×180).
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (pkg, file) =>
  pathToFileURL(path.join(root, 'node_modules', '@fontsource', pkg, 'files', file)).href;

const sans400 = font('plus-jakarta-sans', 'plus-jakarta-sans-latin-400-normal.woff2');
const sans700 = font('plus-jakarta-sans', 'plus-jakarta-sans-latin-700-normal.woff2');
const mono500 = font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff2');
const markSvg = await readFile(path.join(root, 'public', 'favicon.svg'), 'utf8');

const ogHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: 'Plus Jakarta Sans'; font-weight: 400; src: url('${sans400}') format('woff2'); }
      @font-face { font-family: 'Plus Jakarta Sans'; font-weight: 700; src: url('${sans700}') format('woff2'); }
      @font-face { font-family: 'JetBrains Mono'; font-weight: 500; src: url('${mono500}') format('woff2'); }
      html, body { margin: 0; }
      .og {
        width: 1200px;
        height: 630px;
        background: #FFFFFF;
        color: #0F172A;
        font-family: 'Plus Jakarta Sans', sans-serif;
        position: relative;
      }
      .copy {
        position: absolute;
        left: 84px;
        right: 84px;
        top: 100px;
      }
      .role {
        margin: 0;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 18px;
        font-weight: 500;
        color: #1D4ED8;
      }
      h1 {
        margin: 22px 0 22px;
        font-size: 72px;
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 1.03;
        color: #0F172A;
      }
      .thesis {
        margin: 0;
        max-width: 56ch;
        font-size: 24px;
        line-height: 1.48;
        color: #475569;
      }
      .footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 84px;
        padding: 0 84px;
        background: #0F172A;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 16px;
        color: #94A3B8;
      }
    </style>
  </head>
  <body>
    <div class="og">
      <div class="copy">
        <p class="role">.NET Developer, Backend &amp; API Engineer</p>
        <h1>Amher Cosaine Timpahan</h1>
        <p class="thesis">Building Clean Architecture .NET 10 Web APIs, modernizing legacy .NET Framework systems, and shipping multi-tenant Azure SaaS.</p>
      </div>
      <div class="footer">
        <span>amhercosaine.vercel.app</span>
        <span>Taguig, Philippines (Remote-ready)</span>
      </div>
    </div>
  </body>
</html>`;

const iconHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; background: #FFFFFF; }
      svg { display: block; width: 180px; height: 180px; }
    </style>
  </head>
  <body>${markSvg.replace('<svg ', '<svg width="180" height="180" ')}</body>
</html>`;

const browser = await chromium.launch();

const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await ogPage.setContent(ogHtml, { waitUntil: 'load' });
await ogPage.evaluate(() => document.fonts.ready);
await ogPage.screenshot({
  path: path.join(root, 'public', 'og-image.png'),
  type: 'png',
  omitBackground: false,
});

const iconPage = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await iconPage.setContent(iconHtml, { waitUntil: 'load' });
await iconPage.screenshot({
  path: path.join(root, 'public', 'apple-touch-icon.png'),
  type: 'png',
  omitBackground: false,
});

await browser.close();
console.log('Wrote public/og-image.png (1200×630) and public/apple-touch-icon.png (180×180)');
