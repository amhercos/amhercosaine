/**
 * Rasterize public/og-image.png (1200×630) and public/apple-touch-icon.png (180×180)
 * from the Operational Clarity palette and geometric mark.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (pkg, file) =>
  pathToFileURL(path.join(root, 'node_modules', '@fontsource', pkg, 'files', file)).href;

const sans600 = font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff2');
const sans500 = font('ibm-plex-sans', 'ibm-plex-sans-latin-500-normal.woff2');
const sans400 = font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff2');
const mono500 = font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2');
const markSvg = await readFile(path.join(root, 'public', 'favicon.svg'), 'utf8');

const ogHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: 'IBM Plex Sans'; font-weight: 400; src: url('${sans400}') format('woff2'); }
      @font-face { font-family: 'IBM Plex Sans'; font-weight: 500; src: url('${sans500}') format('woff2'); }
      @font-face { font-family: 'IBM Plex Sans'; font-weight: 600; src: url('${sans600}') format('woff2'); }
      @font-face { font-family: 'IBM Plex Mono'; font-weight: 500; src: url('${mono500}') format('woff2'); }
      html, body { margin: 0; }
      .og {
        width: 1200px;
        height: 630px;
        background: #080c11;
        color: #f1ece2;
        font-family: 'IBM Plex Sans', sans-serif;
        position: relative;
      }
      .frame {
        position: absolute;
        inset: 36px;
        border: 1.5px solid #73d3cf;
      }
      .copy {
        position: absolute;
        left: 72px;
        right: 72px;
        top: 78px;
        bottom: 72px;
      }
      .kicker {
        margin: 0;
        font-family: 'IBM Plex Mono', ui-monospace, monospace;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #f1ece2;
      }
      h1 {
        margin: 28px 0 22px;
        max-width: 14.5ch;
        font-size: 58px;
        font-weight: 600;
        letter-spacing: -0.03em;
        line-height: 1.06;
        color: #f1ece2;
      }
      .name {
        margin: 0;
        font-size: 28px;
        font-weight: 500;
        color: #73d3cf;
      }
      .status {
        position: absolute;
        left: 72px;
        bottom: 72px;
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'IBM Plex Mono', ui-monospace, monospace;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #f1ece2;
      }
      .status i {
        width: 12px;
        height: 12px;
        background: #7dcf8c;
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="og">
      <div class="frame"></div>
      <div class="copy">
        <p class="kicker">.NET Developer</p>
        <h1>I build .NET APIs that keep production boring.</h1>
        <p class="name">Amher Cosaine Timpahan</p>
      </div>
      <div class="status"><i></i>Open to opportunities</div>
    </div>
  </body>
</html>`;

const iconHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; background: #080c11; }
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
