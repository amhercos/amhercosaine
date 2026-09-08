import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { profile } from '../src/data/profile';

const projectSlugs = readdirSync('src/content/projects')
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));

test('homepage renders identity, work, and skip link', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(new RegExp(profile.name));
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeAttached();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(profile.headline);
  await expect(page.locator('#work')).toBeVisible();
  await expect(page.getByRole('link', { name: /Read the .+ case study/ })).toHaveCount(projectSlugs.length);
});

for (const slug of projectSlugs) {
  test(`case study route /work/${slug} renders`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}`);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('link', { name: /Discuss this build/ })).toBeVisible();
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

test('resume page renders view and download controls', async ({ page, request }) => {
  const response = await page.goto('/resume');
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole('heading', { level: 1 })).toContainText(profile.name);
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Résumé' })).toHaveAttribute(
    'href',
    '/resume',
  );

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
