# Heartbeat Checklist

## 1 — Check Assignments

GET /api/agents/me
GET /api/companies/{companyId}/issues?assigneeAgentId={id}&status=todo,in_progress,blocked

Work in_progress first, then todo. If nothing assigned, exit cleanly.

## 2 — Read Shared Context

Read GOALS.md, DECISIONS.md, PROJECT_STATUS.md.

## 3 — Do the Work

Work the issue. Follow the acceptance criteria. Comment with results.

<!-- PERSONALIZE: WORK_STEPS
Replace step 3 with the detailed execution steps specific to this agent's role.
Be explicit about what tools to use, what data to extract, what format to produce.
-->

## 4 — Update Status

PATCH /api/issues/{id} with status and comment. Always comment before exiting.

## 5 — Write Notes

Update $AGENT_HOME/memory/YYYY-MM-DD.md with what you did.
