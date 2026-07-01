# Career Planning Roadmap Project

Created on 2026-05-20.

This directory is now both the planning bundle and the active implementation repo for a local Mac dashboard that helps Camron discover, score, research, prepare for, and tailor resumes for software job applications.

## Start Here
- **Continuing on mobile / Cursor Cloud?** Read `CLOUD_HANDOFF.md` first — full session context and paste prompt for new chats.
- Planning context lives in `project-foundation.md` and `conversation-log.md`.
- The active app now lives in `career-dashboard/`.
- The best handoff and continuation guide is `career-dashboard/README.md`.

## Files
- `project-foundation.md` - detailed Step 1, Step 2, and Step 3 for the project.
- `conversation-log.md` - saved transcript of the kickoff conversation.
- `career-dashboard/README.md` - implementation status, commands, architecture, and continuation guide.
- `README.md` - directory index and recommended next build order.

## Agreed Constraints
- The final product should be a dashboard that runs locally on a Mac.
- Job search should run daily at a strategic time, with room for future multi-run scheduling.
- Prioritize fully remote US-accessible roles and local/hybrid/in-person roles within roughly 30 minutes of Salt Lake City.
- Deduplicate aggressively and prefer reliable, high-information sources.
- Score roles realistically, then turn weak-fit roles into concrete development guidance.
- Target compensation should generally meet or exceed $23/hour equivalent for full-time work, with some flexibility for unusually strong part-time or high-upside opportunities.
- Internships should be treated carefully: include only when eligibility is real or the enrollment requirement is clearly not mandatory.

## Recommended Build Order
1. Create the local dashboard repo and app shell.
2. Define the job, company, scoring, and roadmap data schema.
3. Implement 3-5 reliable source adapters first.
4. Build normalization, deduplication, and fit scoring.
5. Add company enrichment and roadmap generation.
6. Add an application-assist workflow with human approval gates.

## Recommended Immediate Next Session
- Open `career-dashboard/README.md` first.
- Refresh the local job data and confirm the current target 10 local plus top remote roles.
- Continue the tailored resume pipeline after the first local packet already in the dashboard.
