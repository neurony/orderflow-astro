# Available Tools — Image Generator

## Paperclip API

Base: `$PAPERCLIP_API_URL` | Auth: `Bearer $PAPERCLIP_API_KEY`

| Action | Endpoint |
|--------|----------|
| My identity | GET /api/agents/me |
| My inbox | GET /api/agents/me/inbox-lite |
| Get issue context | GET /api/issues/:id/heartbeat-context |
| Update issue | PATCH /api/issues/:id |
| Add comment | POST /api/issues/:id/comments |
| Checkout | POST /api/issues/:id/checkout |

Always include `X-Paperclip-Run-Id` on mutating calls.

## Gemini API (Image Generation)

Env var: GEMINI_API_KEY
Package: google-genai (Python)

Models (order of preference):
1. gemini-3.1-flash-image-preview (Nano Banana 2) — default
2. gemini-3-pro-image-preview (Nano Banana Pro) — premium fallback
3. gemini-2.5-flash-image (Nano Banana) — last resort

Usage pattern: Python script via Bash calling genai.Client().models.generate_content()

## Image Processing

- PIL/Pillow for WebP conversion and resizing
- File size verification via os.path.getsize()
- Read tool to visually verify generated images

## File Operations

- Write — for saving generated images
- Read — for verifying generated images visually
- Bash — for Python scripts (Gemini API calls, image processing)
- Glob — for checking existing images

## Key Paths

- OG images: /public/images/[collection]/[slug]-og.webp (1200x630, < 200KB)
- Hero images: /public/images/[collection]/[slug]-hero.webp (1200x675, < 150KB)
- Inline images: /public/images/[collection]/[slug]-[descriptor].webp (800x500, < 100KB)
