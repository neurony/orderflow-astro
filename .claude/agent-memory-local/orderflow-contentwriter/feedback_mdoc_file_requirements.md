---
name: Mandatory .mdoc file requirements
description: Required frontmatter fields and formatting rules that MUST be in every .mdoc file. Learned from broken rendering on 2026-03-15 when content was invisible or messy.
type: feedback
---

Every .mdoc file you write MUST follow these rules. Violations break the live site.

**Why:** On 2026-03-15, content rendered as invisible (opacity:0) or showed broken images because frontmatter fields were missing and CTA placeholders weren't valid markdoc.

**How to apply:** Check every rule below before saving any .mdoc file.

## Rule 1: Image fields are MANDATORY

**For pages collection** (src/content/pages/):
The frontmatter MUST include `ogImage` pointing to the hero image:
```yaml
ogImage: '/images/pages/[slug]-hero.webp'
```

**For articles collection** (src/content/articles/):
The frontmatter MUST include `image` pointing to the hero image:
```yaml
image: /images/articles/[slug]-hero.webp
```
NEVER set `image: ''` (empty string). Either set a real path or omit the field entirely.

**For caseStudies collection** (src/content/case-studies/):
The frontmatter MUST include `ogImage`:
```yaml
ogImage: '/images/case-studies/[slug]-hero.webp'
```

## Rule 2: No CTA placeholder syntax

NEVER write `[CTA COMPONENT: label="...", href="...", variant="..."]` in the body. Markdoc does not have a registered CTA component and this renders as literal text.

Instead, use a markdown link with horizontal rules for visual separation:
```markdown

---

**[Button Text](/contact)**

---
```

Or just use a regular inline link: `[See how OrderFlow works](/contact)`.

## Rule 3: Articles MUST have category field

Every article MUST have a `category` field in frontmatter. Valid categories:
- "Order Automation"
- "AI & Technology"
- "Business"
- "Case Study"

Without this, the listing card shows no category tag.

## Rule 4: Image files must exist before referencing

Before referencing an image path in frontmatter, confirm the image file exists at that path under `public/`. If images haven't been generated yet, leave a comment in the frontmatter noting it needs an image, but do NOT reference a non-existent path.

## Rule 5: Date format

- Pages collection: use `pubDate: 'YYYY-MM-DD'`
- Articles collection: use `date: 'YYYY-MM-DD'`
- Both: include `updatedDate: 'YYYY-MM-DD'`

## Rule 6: Frontmatter field names per collection

**Pages** (src/content/pages/): title, seoTitle, seoDescription, canonicalUrl, ogImage, ogType, noindex, schemaType, pubDate, updatedDate, funnel, primaryKeyword, author (string), faq (array)

**Articles** (src/content/articles/): title, description, date, category, image, author (object with name + role), seoTitle, seoDescription, canonicalUrl, updatedDate, funnel, primaryKeyword, schemaType, contentType, faq (array)

**Case Studies** (src/content/case-studies/): title, seoTitle, seoDescription, canonicalUrl, ogImage, pubDate, updatedDate, clientName, clientRole, clientCompany, industry, stats (array), funnel, primaryKeyword, author (string), faq (array)

Do NOT mix up field names between collections (e.g., don't use `date` in a pages file or `pubDate` in an articles file).
