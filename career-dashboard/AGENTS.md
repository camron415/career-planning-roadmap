<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- This is a single Next.js 16 app living in `career-dashboard/`. Run all commands from that directory.
- The SQLite store is auto-created and seeded on first import of `db/client.ts` (no separate migration/seed step). The DB file at `data/career-dashboard.sqlite` is gitignored, so a fresh clone starts empty and self-seeds on first request/script run.
- Standard commands are documented in `career-dashboard/README.md` (`npm run dev:local`, `npm run build`, `npm run lint`, `npm run ingest`, `npm run discovery:report`, `npm run resume:export`).
- Dev server: `npm run dev:local` serves on `http://127.0.0.1:3000`. If port 3000 is taken, reuse the existing server or stop the conflicting PID (do not blanket-kill by name).
- `npm run ingest` and the inbox "Refresh live jobs" button hit live external job boards (Greenhouse/Lever/company pages) and need outbound network access.
- Gotcha: `npm run resume:export` shells out to macOS-only `/usr/bin/textutil` for DOCX generation, so on Linux it writes the `.html` exports first and then fails at the DOCX step (`spawn /usr/bin/textutil ENOENT`). This is expected off macOS; the HTML export is the working fallback.
- `better-sqlite3` is a native module compiled during `npm install`; if it fails to load, reinstall to rebuild it against the current Node version.
