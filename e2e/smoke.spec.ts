import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { profile } from '../src/data/profile';

const projectSlugs = readdirSync('src/content/projects')
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));

test('homepage renders unified light theme, zero middle-dots, and 3-column mobile/desktop metrics', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page).toHaveTitle(new RegExp(profile.name));
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeAttached();
  await expect(page.locator('.wordmark')).toContainText(profile.shortName);
  await expect(page.locator('.brand-mark')).toHaveCount(0);
  await expect(page.locator('.mobile-thumb-bar')).toHaveCount(0);
  await expect(page.locator('.nav-links a')).toHaveCount(4);

  // Verify zero · middle-dot characters in rendered body text
  const bodyText = await page.locator('body').innerText();
  expect(bodyText.includes('·')).toBe(false);

  // Verify Unified Light/Dark theme switching
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect
    .poll(async () => page.locator('#systems').evaluate((el) => getComputedStyle(el).backgroundColor))
    .toBe('rgb(248, 250, 252)');

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect
    .poll(async () => page.locator('#systems').evaluate((el) => getComputedStyle(el).backgroundColor))
    .toBe('rgb(15, 23, 42)');

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Gane-Sarson DFD studio switches project themes, renders open-ended data stores, and filters stack', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/', { waitUntil: 'networkidle' });

  // Project 01 starts with purple theme and open-ended D1 store
  await expect(page.locator('.studio-container')).toHaveAttribute('data-project-theme', 'purple');
  await expect(page.locator('.dfd-svg--desktop .dfd-store-border')).toHaveCount(1);

  // Switch to Project 02 (blue theme, D1 SQLite + D2 PostgreSQL open-ended stores)
  const bizflowTab = page.getByRole('tab', { name: /02 BizFlow POS & Inventory/i });
  await bizflowTab.click();
  await expect(page.locator('.studio-container')).toHaveAttribute('data-project-theme', 'blue');
  await expect(page.locator('.dfd-svg--desktop .dfd-store-border')).toHaveCount(2);

  await page.locator('.dfd-svg--desktop').getByRole('button', { name: /D2 PostgreSQL/i }).click();
  await expect(page.locator('.studio-inspector')).toContainText('Data Store D2');

  // Switch to Project 03 (navy theme)
  const amsentryTab = page.getByRole('tab', { name: /03 AMSentry Biometric Attendance/i });
  await amsentryTab.click();
  await expect(page.locator('.studio-container')).toHaveAttribute('data-project-theme', 'navy');

  // Interactive Tech Stack Filter
  await page.getByRole('tab', { name: 'Databases' }).click();
  await expect(page.locator('.spec-matrix-row')).toHaveCount(1);
  await page.getByRole('tab', { name: 'All Layers' }).click();
  await expect(page.locator('.spec-matrix-row')).toHaveCount(6);

  expect(errors).toEqual([]);
});

for (const width of [1440, 768, 390, 375]) {
  test(`zero horizontal overflow or navbar clipping at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/', { waitUntil: 'networkidle' });

    const metrics = await page.evaluate(() => {
      const header = document.querySelector('.site-chrome');
      const controls = document.querySelector('.header-controls');
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        headerRight: header ? header.getBoundingClientRect().right : 0,
        controlsRight: controls ? controls.getBoundingClientRect().right : 0,
        innerWidth: window.innerWidth,
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.headerRight).toBeLessThanOrEqual(metrics.innerWidth + 1);
    expect(metrics.controlsRight).toBeLessThanOrEqual(metrics.innerWidth + 1);
  });
}

for (const slug of projectSlugs) {
  test(`case study route /work/${slug} renders without middle-dots`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}`);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Discuss this build/ })).toBeVisible();
    const text = await page.locator('body').innerText();
    expect(text.includes('·')).toBe(false);
  });
}

test('contact email uses a mailto link', async ({ page }) => {
  await page.goto('/');

  const emailLink = page.locator('#contact').getByRole('link', { name: profile.email });
  await expect(emailLink).toHaveAttribute('href', `mailto:${profile.email}`);
});

test('unknown routes render the 404 page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');

  await expect(page).toHaveTitle(/Page not found/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('does not exist');
  await expect(page.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/');
});

test('resume page renders view and download controls without middle-dots', async ({ page, request }) => {
  const response = await page.goto('/resume');
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole('heading', { level: 1 })).toContainText(profile.name);
  const text = await page.locator('body').innerText();
  expect(text.includes('·')).toBe(false);

  const downloadLink = page.getByRole('link', { name: 'Download PDF' }).first();
  await expect(downloadLink).toHaveAttribute('href', '/AmherCosaine-Timpahan-Resume.pdf');
  await expect(downloadLink).toHaveAttribute('download', 'AmherCosaine-Timpahan-Resume.pdf');

  const pdf = await request.get('/AmherCosaine-Timpahan-Resume.pdf');
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()['content-type'] ?? '').toMatch(/pdf/i);
});

test('contact offers résumé view and pdf download', async ({ page }) => {
  await page.goto('/');

  const resumeRow = page.locator('#contact .contact-row', { hasText: 'Résumé' });
  await expect(resumeRow.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', '/resume');
  await expect(resumeRow.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'href',
    '/AmherCosaine-Timpahan-Resume.pdf',
  );
  await expect(resumeRow.getByRole('link', { name: 'Download PDF' })).toHaveAttribute(
    'download',
    'AmherCosaine-Timpahan-Resume.pdf',
  );
});
