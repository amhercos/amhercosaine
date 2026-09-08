/**
 * Render public/AmherCosaine-Timpahan-Resume.pdf from the live /resume page.
 * Requires a running site (astro dev or astro preview).
 *
 *   RESUME_ORIGIN=http://localhost:4321 node scripts/generate-resume-pdf.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'public', 'AmherCosaine-Timpahan-Resume.pdf');
const origin = process.env.RESUME_ORIGIN ?? 'http://localhost:4321';
const resumeUrl = new URL('/resume', origin).href;

await mkdir(path.dirname(outPath), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

const response = await page.goto(resumeUrl, { waitUntil: 'networkidle' });
if (!response?.ok()) {
  throw new Error(`Résumé page returned ${response?.status() ?? 'no response'} for ${resumeUrl}`);
}

await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '16mm', right: '18mm', bottom: '18mm', left: '18mm' },
});

await browser.close();
console.log(`Wrote ${outPath}`);
