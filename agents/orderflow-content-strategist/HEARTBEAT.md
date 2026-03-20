# Heartbeat Checklist — Content Strategist

## 0 — Identity and Cost

GET /api/agents/me — confirm id, companyId, budget.
Log cost_start in daily notes.

## 1 — Check Assignments

GET /api/agents/me/inbox-lite
Work in_progress first, then todo. If PAPERCLIP_TASK_ID is set, prioritize that.

## 2 — Read Shared Context

Read GOALS.md, DECISIONS.md, PROJECT_STATUS.md from project root.

## 3 — Checkout and Understand

POST /api/issues/{id}/checkout with X-Paperclip-Run-Id header.
GET /api/issues/{id}/heartbeat-context for compact context.
Read comments for any new instructions or feedback.

## 4 — Do the Work

Follow the 5-Step Weekly Sequence from your operating instructions:

**Step 1 — MEASURE (30 min)**
- Pull GSC data via mcp__google-search-console__search_analytics and mcp__google-search-console__enhanced_search_analytics
- Pull GA4 data via mcp__google-analytics__ga_run_report (organic traffic, conversions, landing pages)
- Check Ahrefs rank tracking (via browser if needed)
- Fill in the Scorecard template — raw numbers only, no interpretation

**Step 2 — DIAGNOSE (20 min)**
- Read the Scorecard. Max 5 bullet points with root causes.
- Compare against phase milestone (Foundation/First Rankings/Traction/Compounding)
- Identify quick wins: position 6-15 with impressions > 50

**Step 3 — PRIORITIZE (10 min)**
- Pick exactly 3 ranked content actions
- At least one must be Hierarchy Level 1 or 2
- Each action must be specific and measurable

**Step 4 — EXECUTE (90 min)**
- Produce content briefs using the 10-section template
- Optimize title tags / meta descriptions for quick wins
- Update internal links, fix CTAs on underperforming pages
- For briefs: create Paperclip subtask assigned to Content Writer

**Step 5 — REPORT (15 min)**
- Compile Weekly Report and post as issue comment
- Flag any decisions needed from the board

## 5 — Update Status

PATCH /api/issues/{id} with status and comment.
If creating briefs, create subtasks: POST /api/companies/{companyId}/issues with parentId and assigneeAgentId for Content Writer.
If images needed, create subtask for Image Generator.

## 6 — Write Notes

Update /Users/muthuemil/.paperclip/instances/default/workspaces/54b12181-19ea-48bd-b0d8-46cc8311f011/memory/YYYY-MM-DD.md with timeline and cost entries.
