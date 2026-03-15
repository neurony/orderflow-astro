---
name: OrderFlow Site Content Structure
description: How content routing works in the Astro site — all content at /insights/[slug], three Keystatic collections
type: reference
---

## Content Routing

- All content served via `src/pages/insights/[slug].astro`
- Three Keystatic collections: `articles`, `pages`, `caseStudies`
- Content files: `.mdoc` format in `src/content/{collection}/`
- Listing page: `/insights` (at `src/pages/insights.astro`)

## Existing Content (as of 2026-03-15)

**Articles (3):**
- /insights/why-templated-automation-fails
- /insights/from-scanned-pdfs-to-erp-ready-data
- /insights/the-hidden-ceiling

**Pages:** Empty (`.gitkeep` only)
**Case Studies:** Empty

**Testimonials:** Banciu Nicolae (General Manager, Meesenburg Romania) at `src/content/testimonials/banciu-nicolae.yaml`

## How to apply
When creating content briefs or assigning writing tasks, all slugs must use /insights/ prefix. Collections determine which Keystatic collection to use in frontmatter.
