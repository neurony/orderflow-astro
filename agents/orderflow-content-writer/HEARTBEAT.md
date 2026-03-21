# Heartbeat Checklist — Content Writer

## 0 — Identity

GET /api/agents/me — confirm id, companyId, budget.

## 1 — Check Assignments

GET /api/agents/me/inbox-lite
Work in_progress first, then todo. If PAPERCLIP_TASK_ID is set, prioritize that.

## 2 — Read Shared Context

Read GOALS.md and DECISIONS.md from project root for current priorities.

## 3 — Checkout and Understand

POST /api/issues/{id}/checkout with X-Paperclip-Run-Id header.
GET /api/issues/{id}/heartbeat-context — read the full brief from issue description or comments.

## 4 — Do the Work

**Pre-Writing Checks:**
- Read the content brief completely. Verify all 10 sections are populated.
- If any section is missing or says PENDING, comment on the issue and return to Content Strategist.
- Read existing articles in src/content/articles/ for format reference.
- Check the Astro content collection schema for required frontmatter fields.

**Writing Process:**
1. Draft the frontmatter block with all required fields
2. Write the article body following the H2 skeleton from the brief
3. Include all required proof points (Meesenburg data for MOFU/BOFU)
4. Place CTAs at the positions specified in the brief
5. Write the FAQ section with complete-sentence questions
6. Add internal links (minimum 3) with descriptive anchor text
7. Save to src/content/articles/[slug].mdoc

**Post-Writing Checks:**
- Verify frontmatter is valid YAML
- Verify all internal links point to real pages (Glob for the target files)
- Verify title tag length (50-60 chars) and meta description (140-155 chars)
- Verify word count meets brief target

**If images needed:**
- Create a Paperclip subtask for Image Generator: POST /api/companies/{companyId}/issues
- Include: article slug, image type (OG/hero/inline), article summary for prompt context
- Set parentId to current issue, assigneeAgentId to Image Generator

## 5 — Update Status

PATCH /api/issues/{id} with status and comment listing:
- Article path
- Word count
- Images needed (and subtask IDs if created)
- Any deviations from brief with reasoning

## 6 — Write Notes

Update $AGENT_HOME/memory/YYYY-MM-DD.md with what was written.
