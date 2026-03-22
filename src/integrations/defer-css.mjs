/**
 * defer-css — Astro integration (NEU-95)
 *
 * Post-processes built HTML to convert render-blocking <link rel="stylesheet">
 * tags into non-blocking preload + onload pattern, with <noscript> fallbacks.
 *
 * External stylesheet links (Google Fonts, etc.) are intentionally skipped —
 * they already use the media="print" async trick in BaseLayout.astro.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

/** Recursively collect all .html files under a directory. */
function collectHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...collectHtmlFiles(fullPath));
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Transform render-blocking local stylesheet links to the preload/onload pattern.
 * External URLs are skipped (they use media="print" trick already).
 */
function deferLocalStylesheets(html) {
  return html.replace(
    /<link\b([^>]*)\brel="stylesheet"([^>]*)>/g,
    (match, before, after) => {
      // Reconstruct the full attributes string
      const attrs = (before + after).trim();

      // Extract href
      const hrefMatch = attrs.match(/href="([^"]+)"/);
      if (!hrefMatch) return match;
      const href = hrefMatch[1];

      // Skip external URLs — Google Fonts etc. already handled
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
        return match;
      }

      return (
        `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
        `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      );
    }
  );
}

export function deferCss() {
  return {
    name: 'defer-css',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const htmlFiles = collectHtmlFiles(outDir);
        let transformed = 0;

        for (const file of htmlFiles) {
          const original = readFileSync(file, 'utf8');
          const modified = deferLocalStylesheets(original);
          if (modified !== original) {
            writeFileSync(file, modified, 'utf8');
            transformed++;
          }
        }

        logger.info(`[defer-css] Deferred CSS on ${transformed}/${htmlFiles.length} pages`);
      },
    },
  };
}
