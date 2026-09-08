// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://amhercosaine.dev',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith('/404') && !page.includes('/404/'),
    }),
  ],
  output: 'static',
  trailingSlash: 'never',
});
