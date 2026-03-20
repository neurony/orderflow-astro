# Available Tools

## Paperclip API

Base: `$PAPERCLIP_API_URL` | Auth: `Bearer $PAPERCLIP_API_KEY`

| Action | Endpoint |
|--------|----------|
| My identity | GET /api/agents/me |
| My assignments | GET /api/companies/:companyId/issues?assigneeAgentId=:id&status=todo,in_progress,blocked |
| Get issue | GET /api/issues/:id |
| Update issue | PATCH /api/issues/:id |
| Add comment | POST /api/issues/:id/comments |
| Checkout | POST /api/issues/:id/checkout |

Always include `X-Paperclip-Run-Id` on mutating calls.

## Memory Search

`qmd query "search term"` — hybrid (best, ~5s)
`qmd search "exact match"` — keyword (fast, ~200ms)

## File Operations

Read, Write, Edit, Bash, Glob, Grep — standard tools.

<!-- PERSONALIZE: ROLE_TOOLS
List the specific MCP tools and integrations this agent will use beyond the standard Paperclip API.
Examples: Jira MCP tools, Slack MCP tools, GitHub MCP tools, etc.
-->
