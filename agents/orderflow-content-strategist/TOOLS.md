# Available Tools — Content Strategist

## Paperclip API

Base: `$PAPERCLIP_API_URL` | Auth: `Bearer $PAPERCLIP_API_KEY`

| Action | Endpoint |
|--------|----------|
| My identity | GET /api/agents/me |
| My inbox | GET /api/agents/me/inbox-lite |
| My assignments | GET /api/companies/:companyId/issues?assigneeAgentId=:id&status=todo,in_progress,blocked |
| Get issue context | GET /api/issues/:id/heartbeat-context |
| Get issue | GET /api/issues/:id |
| Update issue | PATCH /api/issues/:id |
| Add comment | POST /api/issues/:id/comments |
| Checkout | POST /api/issues/:id/checkout |
| Create subtask | POST /api/companies/:companyId/issues |

Always include `X-Paperclip-Run-Id` on mutating calls.

## Google Search Console (MCP)

| Tool | Purpose |
|------|---------|
| mcp__google-search-console__search_analytics | Pull click/impression/CTR/position data |
| mcp__google-search-console__enhanced_search_analytics | Advanced analytics with filtering |
| mcp__google-search-console__detect_quick_wins | Find pages at position 6-15 with high impressions |
| mcp__google-search-console__list_sites | List verified sites |
| mcp__google-search-console__list_sitemaps | Check sitemap status |
| mcp__google-search-console__index_inspect | Check if a URL is indexed |

## Google Analytics 4 (MCP)

| Tool | Purpose |
|------|---------|
| mcp__google-analytics__ga_run_report | Pull traffic, sessions, conversions, landing pages |
| mcp__google-analytics__ga_run_realtime_report | Check live traffic |
| mcp__google-analytics__ga_get_metadata | Get available dimensions and metrics |
| mcp__google-analytics__ga_list_properties | List GA properties |

GA Property ID: 528500263

## Memory Search

`qmd query "search term"` — hybrid (best, ~5s)
`qmd search "exact match"` — keyword (fast, ~200ms)

## File Operations

Read, Write, Edit, Bash, Glob, Grep — standard tools for working with the orderflow-astro codebase.
