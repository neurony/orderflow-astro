// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

const isVercel = !!process.env.VERCEL;
const adapter = isVercel
  ? (await import('@astrojs/vercel')).default()
  : node({ mode: 'standalone' });

export default defineConfig({
  output: 'static',
  adapter,
  site: 'https://orderflow.biz',
  integrations: [
    react(),
    markdoc(),
    sitemap({
      lastmod: new Date(),
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
