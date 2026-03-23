// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';
import { deferCss } from './src/integrations/defer-css.mjs';

const isVercel = !!process.env.VERCEL;
const adapter = isVercel
  ? (await import('@astrojs/vercel')).default()
  : node({ mode: 'standalone' });

export default defineConfig({
  output: 'static',
  adapter,
  site: 'https://orderflow.biz',
  redirects: {
    '/demo': '/contact',
    '/articles': '/insights',
  },
  integrations: [
    react(),
    markdoc(),
    deferCss(),
    sitemap({
      lastmod: new Date(),
      filter: (page) => !page.includes('/articles/') && !page.includes('/demo'),
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
