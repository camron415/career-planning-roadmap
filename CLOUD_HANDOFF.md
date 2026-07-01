# Cloud / Mobile Handoff — Career Planning Roadmap

**Created:** 2026-06-29  
**Purpose:** Full context for continuing career-planning work in Cursor Cloud (iOS) or any new chat.  
**Owner:** Camron Trost  
**GitHub:** `camron415/career-planning-roadmap`

---

## Paste this into your new cloud chat (start here)

```text
I'm Camron Trost continuing career-planning work on career-planning-roadmap.

READ FIRST (in order):
1. CLOUD_HANDOFF.md (this file — full session context)
2. career-dashboard/docs/APPLY_WEEK.md (deadline: apply Compass by end of week)
3. career-dashboard/docs/LEARNING_LEDGER.md (skill + career tracker)
4. career-dashboard/README.md (app commands and status)
5. career-dashboard/lib/resume-packets.ts (Compass tailored resume source of truth)

CONTEXT: Self-taught dev, 23, Salt Lake City, targeting first junior software role. Ultimate dream = build products/business helping people. Near-term = land a job with mentorship while shipping portfolio proof. Apply week is active — Compass Insurance Advisors Junior Frontend Developer (fit 92).

Atlas (separate repo) has study mode for daily interview prep — NOT built in this repo.

If resume HTML/DOCX exports are missing in cloud, run from career-dashboard/: npm install && npm run resume:export

Help me continue apply-week tasks and career planning. Do not build Atlas voice/TTS pipeline in this repo — that lives in ~/Documents/Macbook-Documents/projects/atlas.
```

---

## Who Camron is (profile)

- **Age/location:** 23, Salt Lake City, UT (US citizen, no sponsorship)
- **Background:** Self-taught software developer ~1 year hands-on; no completed degree
- **Current work:** Happy Delivery (delivery associate); prior Flores Legal Services (accounting/workflow), sales at Fast Action Pest Control
- **Comp baseline:** $23/hr — target full-time roles at or above
- **Strengths:** Ships real projects end-to-end; strong documentation instinct; AI-assisted workflow
- **Gaps:** No paid SWE job yet; public GitHub/LinkedIn/demo links still thin; fundamentals (HTTP, async, reading stacks) still building; solo builder → needs team/mentor signal

### Projects (portfolio)

| Project | Stack | Resume angle |
| --- | --- | --- |
| **VocalLearn** | React Native, Expo, TypeScript, Supabase, xAI | Voice-first mobile learning app, persistence, AI tutoring |
| **Atlas** | React Native, Expo, Node/TS, SQLite, REST/WebSocket | Personal voice assistant + project orchestrator (separate repo) |
| **Career dashboard** | Next.js, TypeScript, SQLite | This repo — job scoring, prep, tailored resumes |
| **Kalshi bot** | Rust, Axum, WebSockets | Systems/automation — downplay for frontend roles |

**Atlas repo path (NOT this repo):** `~/Documents/Macbook-Documents/projects/atlas`

---

## What this repo is

Local-first **career-ops dashboard** for job search + resume tailoring.

### Working features

- Job ingestion (Greenhouse, Lever, curated Utah discovery)
- Fit scoring (access, skill, growth, blockers → apply-now / stretch / blocked)
- Dashboard routes: `/`, `/prep`, `/resume`, `/resume/[slug]`, `/settings`
- Control resume + tailored resume **packets** in code
- HTML + DOCX export via `npm run resume:export`

### Key source files

| File | Purpose |
| --- | --- |
| `career-dashboard/lib/resume-data.ts` | Candidate baseline, control resume, all projects |
| `career-dashboard/lib/resume-packets.ts` | Tailored packets (Compass lives here) |
| `career-dashboard/lib/dashboard-data.ts` | Inbox, prep, settings read models |
| `career-dashboard/lib/scoring/service.ts` | Fit scoring logic |
| `career-dashboard/docs/APPLY_WEEK.md` | This week's apply checklist |
| `career-dashboard/docs/LEARNING_LEDGER.md` | Learning + career tracker (mirror of Atlas ledger) |

### Commands (from `career-dashboard/`)

```bash
npm install
npm run dev:local          # http://127.0.0.1:3000
npm run ingest               # refresh jobs (needs network)
npm run discovery:report
npm run resume:export        # regenerate HTML + DOCX
npm run build && npm run lint
```

---

## Primary target job — Compass (apply this week)

| Field | Value |
| --- | --- |
| **Company** | Compass Insurance Advisors |
| **Role** | Junior Frontend Developer |
| **Location** | Draper, UT 84020 (in-person) |
| **Pay** | From $24/hour |
| **Fit score** | 92 — **apply-now** |
| **Listing** | https://www.indeed.com/viewjob?jk=e927c0ad53aa8d9f |
| **Packet slug** | `compass-junior-frontend-developer` |

**They want:** self-taught + portfolio, React, HTML/CSS/JS, REST APIs, Git, willingness to learn Laravel/PHP/MySQL.

**Compass resume includes 3 projects:** VocalLearn, **Atlas Personal Assistant** (added 2026-06-28), Career Dashboard.

### Resume exports (generated — may need regen on cloud)

| File | Path |
| --- | --- |
| HTML | `career-dashboard/public/resume-exports/compass-junior-frontend-developer.html` |
| DOCX | `career-dashboard/public/resume-exports/compass-junior-frontend-developer.docx` |
| Dashboard preview | `/resume/compass-junior-frontend-developer` (when dev server running) |

**If exports missing on cloud clone:** they are generated files but **are tracked in git**. Pull latest from GitHub, or run `npm run resume:export`. Source of truth is always `lib/resume-packets.ts`.

**PDF:** Open HTML in browser → Print → Save as PDF.

### Apply-week checklist (see APPLY_WEEK.md)

- [ ] Compass resume PDF saved
- [ ] Indeed listing verified live
- [ ] Education sentence locked (one paragraph, reuse everywhere)
- [ ] LinkedIn aligned to Compass resume
- [ ] Cover letter draft
- [ ] Backup apply-now role from dashboard
- [ ] **Application submitted**

---

## Career strategy (from this chat session)

### Near-term (this week → 3 months)

1. **Apply before feeling ready** — Compass by end of week minimum
2. **Public proof** — LinkedIn, optional 60s demo, GitHub when sanitized
3. **Job with mentorship** — startup/mid-size junior full-stack or React/mobile; not big-tech AI engineer
4. **Volume** — 3–5 applications/week after first submit
5. **Study habit** — Atlas study mode ~25 min/day for interview prep (separate repo)

### Long-term (founder dream)

Build products/services that improve lives → scale a business. **First job is acceleration, not surrender** — learn team engineering, code review, production habits, then funnel back into VocalLearn/Atlas ventures.

### Honest positioning

- **Above average** for self-taught solo builder (multiple real systems)
- **Below average** for typical junior on: paid experience, public links, education clarity, team signals
- **Can land first role** — startups, project-first juniors, Utah local roles that say self-taught OK
- **3–12 months to offer** is normal for *landing*; **not** a reason to delay first application

### What NOT to do this week

- New Atlas features in atlas repo (consolidation only if time)
- VocalLearn curriculum rebuild
- Hardware / local LLM research
- Building voice/TTS pipeline **in this repo** (wrong repo — was attempted and reverted)

---

## Atlas study mode (separate repo — for learning on the go)

Already built in Atlas — do **not** rebuild here.

| Trigger | Action |
| --- | --- |
| `study mode` / `learning check-in` | Enter tutor mode (~45 min TTL) |
| `end study` | Exit |

**Atlas reads:** `atlas/docs/LEARNING_LEDGER.md`, `atlas/docs/LEARNING_TUTOR.md`  
**Career week doc:** `career-dashboard/docs/APPLY_WEEK.md`

**Daily split:** Cursor/cloud = applications + resume + LinkedIn. Atlas voice = quiz + interview prep + STAR stories.

---

## Session chronology (what happened in this chat)

1. **Wrong handoff received** — Atlas voice/persona/TTS pipeline was built in career-dashboard by mistake.
2. **Reverted** — All `lib/assistant/`, `lib/providers/`, voice docs removed. This repo = career dashboard only.
3. **Career assessment** — User felt other AI graded too harshly; we reconciled: **apply now**, landing may take months, dashboard proves Compass at 92.
4. **Apply week planned** — `APPLY_WEEK.md` + updated learning ledger sprint (ends Friday).
5. **Atlas study mode validated** — Use existing Atlas tutor; don't build new apps.
6. **Compass resume updated** — Added **Atlas Personal Assistant** (3 bullets, frontend-framed). Regenerated exports.
7. **Cloud setup** — Repo pushed to GitHub for Cursor Cloud / iOS access.

---

## Files NOT on GitHub (expected)

| Path | Why missing |
| --- | --- |
| `career-dashboard/data/*.sqlite` | Local job database — gitignored |
| `career-dashboard/node_modules/` | gitignored |
| `career-dashboard/.env*` | secrets — gitignored |
| PDF resumes | Never auto-generated — create from HTML locally |

**Resume exports (HTML/DOCX) SHOULD be on GitHub** if latest commit was pushed. If cloud clone lacks them: `git pull` then `npm run resume:export`.

---

## Atlas on Compass resume (text backup if exports missing)

**Atlas Personal Assistant** | React Native, Expo, TypeScript, Node.js, REST APIs, SQLite

- Built a voice-first assistant platform with an Expo/React Native mobile client and Node/TypeScript server, using REST APIs and WebSocket flows for real-time text and voice interaction across iPhone and Mac.
- Implemented the mobile UI with live session transcripts, push-to-talk controls, typed chat state, and LAN-based API configuration so the frontend reliably consumes backend JSON over WiFi.
- Connected user-facing surfaces to a project registry and SQLite-backed report cache, reshaping server data into readable status views and interactive chat workflows.

---

## Skill gaps + learning plan (summary)

**Tier 1 now:** HTTP/REST, async/await, git branches/PRs, SQL basics, reading stack traces, tests/CI, auth basics  
**Tier 2 (6–12 mo):** Docker, GitHub Actions, job queues, system design light, STAR interviews  
**Tier 3 defer:** K8s, local LLM clusters, fine-tuning

**12-week default after apply week:** HTTP → async → trace Atlas voice turn → SQL → CI → Atlas consolidation → career push

---

## Atlas consolidation backlog (from senior review — one/week, in atlas repo)

- Split server `index.ts` routes
- One VoiceEngine facade on mobile
- Auth header on server
- GitHub Actions: typecheck + test
- Fix `vocalllearn` slug
- Job queue for analyst jobs

---

## Open items / next actions for cloud session

1. Verify Indeed listing still live
2. Lock education wording (one sentence)
3. Draft/update LinkedIn from Compass resume
4. Write Compass cover letter (5–7 sentences)
5. Save resume PDF from HTML export
6. Submit application by Friday
7. Optional: pick backup role from ingest + dashboard
8. Optional: Atlas study mode — STAR story from Flores

---

## Related repos and docs

| Resource | Location |
| --- | --- |
| Planning spec | `project-foundation.md` |
| Kickoff transcript | `conversation-log.md` |
| App handoff | `career-dashboard/README.md` |
| Opportunity research (apprenticeships, pay, 12-mo plan) | `career-dashboard/docs/OPPORTUNITY_RESEARCH.md` |
| Atlas project | `~/Documents/Macbook-Documents/projects/atlas` |
| Atlas learning ledger | `atlas/docs/LEARNING_LEDGER.md` |

---

## Contact on resume

- **Name:** Camron Trost
- **Email:** camrontrost@gmail.com
- **Phone:** (309) 997-0817
- **Location:** Salt Lake City, UT

---

*End of handoff — update this file when major milestones change (application submitted, offer, new target role).*
