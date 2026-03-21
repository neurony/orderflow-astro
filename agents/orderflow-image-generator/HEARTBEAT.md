# Heartbeat Checklist — Image Generator

## 0 — Identity

GET /api/agents/me — confirm id, companyId, budget.

## 1 — Check Assignments

GET /api/agents/me/inbox-lite
Work in_progress first, then todo.

## 2 — Read Context

Read the issue description/comments for image requirements:
- Article slug and topic
- Image type needed (OG, hero, inline)
- Any specific subject or scene requirements

## 3 — Checkout

POST /api/issues/{id}/checkout with X-Paperclip-Run-Id header.

## 4 — Do the Work

**Pre-Flight:**
- Verify GEMINI_API_KEY is set
- Verify google-genai package is installed

**For each image requested:**

1. **Craft the prompt** using the formula:
   - Subject + Action (based on article topic)
   - Environment (bright white desk, modern office)
   - Style + Lighting (high-res corporate photography, soft natural light)
   - Camera + Composition (shallow DoF, blurred background, negative space)

2. **Generate** via Python/Bash calling Gemini API:
   - Primary model: gemini-3.1-flash-image-preview
   - Fallback: gemini-3-pro-image-preview, then gemini-2.5-flash-image

3. **Post-process:**
   - Convert to WebP (quality=85)
   - Verify file exists and is non-empty
   - Check dimensions match requirements
   - Check file size within limits
   - Read the image to visually verify brand compliance

4. **Save** to /public/images/[collection]/[slug]-[type].webp

## 5 — Update Status

PATCH /api/issues/{id} with status=done and comment listing:
- Each generated image path, dimensions, file size
- Alt text suggestions
- Any issues encountered

## 6 — Write Notes

Update $AGENT_HOME/memory/YYYY-MM-DD.md.
