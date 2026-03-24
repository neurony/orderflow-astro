---
name: OrderFlow Site Content Structure
description: How content routing works in the Astro site — all content at /insights/[slug], three Keystatic collections. Updated 2026-03-24 with full 11-page inventory.
type: reference
---

## Content Routing

- All content served via `src/pages/insights/[slug].astro`
- Three Keystatic collections: `articles`, `pages`, `caseStudies`
- Content files: `.mdoc` format in `src/content/{collection}/`
- Listing page: `/insights` (at `src/pages/insights.astro`)

## Existing Content (as of 2026-03-24)

**Pages (5 BOFU product pages):**
- /insights/sales-order-automation (~2,100 words) — keyword: sales order automation
- /insights/email-order-processing (~3,300 words) — keyword: email order processing
- /insights/ai-order-processing (~3,800 words) — keyword: ai order processing
- /insights/order-processing-automation (~3,800 words) — keyword: order processing automation
- /insights/purchase-order-automation (~2,400 words) — keyword: purchase order automation

**Articles (5):**
- /insights/what-is-sales-order-automation (~5,000 words) — MOFU pillar
- /insights/how-ai-processes-email-orders (~2,800 words) — MOFU standard
- /insights/complete-guide-order-processing-automation (~5,800 words) — MOFU pillar
- /insights/how-to-automate-purchase-order-processing (~3,750 words) — MOFU standard
- /insights/order-processing-software-distributors (~3,500 words) — BOFU comparison listicle

**Case Studies (1):**
- /insights/meesenburg-order-automation (~2,100 words) — Meesenburg Romania 98% accuracy

**Testimonials:** Banciu Nicolae (General Manager, Meesenburg Romania) at `src/content/testimonials/banciu-nicolae.yaml`

## How to apply
When creating content briefs or assigning writing tasks, all slugs must use /insights/ prefix. Collections determine which Keystatic collection to use in frontmatter.
