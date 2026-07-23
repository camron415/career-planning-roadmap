# Career Planning Roadmap

Personal job-search system: a **Next.js** dashboard that ingests listings, deduplicates them, scores fit against my background, and turns the results into prep and application materials (including tailored resumes).

This repo is both the planning notebook and the live app under `career-dashboard/`.

## Stack

- **Next.js** + **React** + **TypeScript**
- **SQLite** for local job/resume data
- Source adapters (company boards, curated discovery, etc.)
- Resume packet exports (HTML / DOCX) for different role categories

## What it does

- Pull and normalize job postings
- Score roles realistically (junior FE vs stretch vs apprenticeship, etc.)
- Surface apply links and research notes
- Generate category resumes and cover-letter drafts for real applications

## Quick start (local)

```bash
cd career-dashboard
npm install
npm run dev:local
```

See `career-dashboard/README.md` for architecture, ingest, and export commands.

## For recruiters

Best web front-end proof in this portfolio after VocalLearn: typed UI, data workflows, and a tool I actually use for my own search.

## Planning / history

Older kickoff notes and build order live in [`docs/PROJECT_INDEX.md`](./docs/PROJECT_INDEX.md). Day-to-day product docs are under `career-dashboard/docs/`.
