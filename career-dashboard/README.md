# Career Dashboard

This is the active implementation repo for the local career-ops dashboard. It has moved well beyond the original planning phase and now contains three major working tracks:

- job ingestion and scoring
- preparation planning
- resume packet generation and tailoring

This file is the handoff note for resuming work in another editor such as Cursor.

**Mobile / cloud:** See `../CLOUD_HANDOFF.md` at repo root for full context dump and paste prompt.

## Core Goal

Build a local-first dashboard that helps Camron:

- collect high-signal local and remote software openings
- score them realistically against his current profile
- deduplicate and summarize the strongest roles
- convert repeated market requirements into concrete prep work
- generate a control resume plus tailored resume packets per target job

## Current Product Surface

Routes currently in the app:

- `/` - opportunity inbox with filters, scoring, duplicate suppression, and richer job summaries
- `/prep` - data-backed prep plan based on the current Utah-local role set
- `/resume` - resume library containing the control resume and tailored resume packets
- `/resume/[slug]` - detail page for an individual resume packet
- `/settings` - local system state, candidate baseline, source info, and intake rules

Generated export assets:

- `public/resume-exports/control-resume.html`
- `public/resume-exports/control-resume.docx`
- `public/resume-exports/compass-junior-frontend-developer.html`
- `public/resume-exports/compass-junior-frontend-developer.docx`

## Current Status

Implemented and working:

- local SQLite-backed job store with scoring and read models
- broader source ingestion plus curated local discovery for Utah roles
- duplicate suppression and local-market reporting
- prep page driven by recurring skill signals from local roles
- control resume in the dashboard
- first tailored local resume packet for `Compass Insurance Advisors / Junior Frontend Developer`
- Compass packet includes **VocalLearn, Atlas Personal Assistant, and Career Dashboard** (Atlas added 2026-06-28)
- HTML and DOCX resume export pipeline driven from packet data

Important current resume state:

- Flores Legal Services is correctly listed as `Orem, UT`
- the control resume is the generic baseline all future tailored resumes should inherit from
- the first live tailored packet is `compass-junior-frontend-developer`

## Project Structure

Top-level implementation areas:

- `app/` - Next.js App Router routes
- `components/` - shared UI components, including the reusable resume document renderer
- `db/` - SQLite client and schema setup
- `lib/` - read models, source adapters, scoring, prep data, resume data, and resume packets
- `public/resume-exports/` - generated HTML and DOCX resume files
- `scripts/` - utility scripts including reporting and resume export generation
- `workers/` - ingestion worker entry points
- `data/` - local SQLite database

Important files:

- `lib/dashboard-data.ts` - inbox, prep, and settings read model
- `lib/resume-data.ts` - source-of-truth candidate resume baseline and control resume data
- `lib/resume-packets.ts` - tailored resume packet definitions
- `components/resume-document.tsx` - canonical rendered resume document view
- `scripts/export-resumes.tsx` - HTML and DOCX export generator

## Commands

Run these from `career-dashboard/`.

Start local dev server:

```bash
npm run dev:local
```

Build production bundle:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

Refresh job data:

```bash
npm run ingest
```

Report local-market coverage and duplicate groups:

```bash
npm run discovery:report
```

Generate resume export files:

```bash
npm run resume:export
```

## Rebuild And Update Workflow

Typical continuation workflow:

1. `cd career-dashboard`
2. `npm run ingest`
3. `npm run discovery:report`
4. review `/` and `/prep`
5. update `lib/resume-packets.ts` with the next targeted job packet
6. `npm run resume:export`
7. `npm run build`
8. `npm run lint`

If `npm run dev:local` fails with `EADDRINUSE`, port `3000` is already occupied by another local server. Reuse the existing server if it is this app, or stop the conflicting process first.

## Resume System Notes

The resume system now has two layers:

- `control resume` - the generic ATS-first baseline
- `tailored packets` - company and role specific versions

Each packet can expose:

- dashboard preview page
- printable HTML file
- DOCX export file
- job research notes, ATS keywords, emphasis decisions, and extracted requirements

Current limitation:

- DOCX generation is automated
- PDF is not yet generated automatically by script
- the printable HTML export is the current PDF fallback; open it and print or save as PDF from the browser when needed

## Most Recent Conversation Outcome

The latest work session focused on three things:

1. turning the generic resume into a real control resume accessible in the dashboard
2. fixing source-of-truth candidate details such as employer names, dates, and Flores Legal Services being in Orem, UT
3. starting the first tailored local resume pipeline using the top Utah-local target job

The first local target selected from the local job set was:

- `Compass Insurance Advisors`
- `Junior Frontend Developer`
- location: `Draper, UT 84020`
- fit score: `92`
- fit label: `apply-now`

That packet is now live in the dashboard and exportable.

## Best Next Steps

If continuing from here, the highest-value next tasks are:

1. continue the same packet pipeline for the remaining local target jobs
2. refresh and lock the top remote target jobs, then add those tailored packets
3. finalize education and training wording once, then reuse it consistently across all resume variants
4. add public-safe proof links for VocalLearn and the Kalshi bot
5. optionally add automatic PDF export if a dedicated converter is installed

## Ground Rules For Future Tailoring

Keep these constraints intact:

- do not invent qualifications, metrics, or credentials
- prefer portfolio and shipped-product proof over weak coursework claims
- tailor keywords and bullet emphasis job by job
- keep the baseline ATS-friendly and single-column
- treat the control resume as the master source, not as an afterthought
