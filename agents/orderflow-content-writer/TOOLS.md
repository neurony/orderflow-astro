# Available Tools — Content Writer

## Paperclip API

Base: `$PAPERCLIP_API_URL` | Auth: `Bearer $PAPERCLIP_API_KEY`

| Action | Endpoint |
|--------|----------|
| My identity | GET /api/agents/me |
| My inbox | GET /api/agents/me/inbox-lite |
| Get issue context | GET /api/issues/:id/heartbeat-context |
| Get issue | GET /api/issues/:id |
| Update issue | PATCH /api/issues/:id |
| Add comment | POST /api/issues/:id/comments |
| Checkout | POST /api/issues/:id/checkout |
| Create subtask | POST /api/companies/:companyId/issues |

Always include `X-Paperclip-Run-Id` on mutating calls.

## File Operations

- Read, Write, Edit — for creating and modifying MDX content files
- Glob — for finding existing articles and checking internal link targets
- Grep — for searching content patterns, frontmatter fields, CTA formats
- Bash — for git operations (commit, push) and build verification

## Key Paths

- Articles: `src/content/articles/[slug].mdoc`
- Case studies: `src/content/case-studies/[slug].mdoc`
- Pages: `src/content/pages/[slug].mdoc`
- Images: `public/images/[collection]/[slug]-[type].webp`
- Content schema: check `src/content/config.ts` for required frontmatter fields

## Memory Search

`qmd query "search term"` — hybrid (best, ~5s)
`qmd search "exact match"` — keyword (fast, ~200ms)
