// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  site: 'https://orderflow.com',
  integrations: [
    react(),
    markdoc(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', ro: 'ro', de: 'de' },
      },
    }),
    keystatic(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro', 'de'],
  },
});
