---
name: Indexing Crisis - March 2026
description: Critical finding from 2026-03-30 audit — zero content pages indexed after 15 days. Only homepage in Google. Blocking all organic traffic.
type: project
---

As of 2026-03-30, only the orderflow.biz homepage is indexed in Google. Zero of 14 /insights/ pages appear in site: search results despite being live since 2026-03-15.

**Why:** Combination of DR 0 (brand new domain), no GSC URL submissions for individual pages, and homepage only linking to 3 most recent articles (via `.slice(0, 3)` in index.astro). The 5 BOFU product pages have no direct homepage links — they're only reachable via /insights listing page (2 clicks deep).

**How to apply:** This is the #1 blocker for all organic SEO. Until resolved, no content can generate organic traffic or leads. Every weekly session should check indexing status first. Required actions: (1) Submit all 14 URLs to GSC URL Inspection, (2) Add BOFU product page links to homepage, (3) Optionally add sitemap priority values.
