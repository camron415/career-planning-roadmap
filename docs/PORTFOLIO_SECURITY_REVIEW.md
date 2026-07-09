# Portfolio security & cleanup review

**Date:** 2026-07-09  
**Repos:** career-planning-roadmap, project-atlas, vocallearn, kalshi-prediction-bot

This document summarizes what was found, what was fixed, what you should rotate, and optional cleanup awaiting your confirmation.

---

## Best practices (what we applied)

| Practice | Why |
|----------|-----|
| **Secrets in `.env` only** | API keys, passwords, SSH targets never belong in source code |
| **`.env.example` committed** | Shows required variables without real values |
| **`.gitignore` for `.env`, DBs, inbox** | Keeps local-only data out of git |
| **Rotate after exposure** | Anything ever pushed to GitHub should be treated as compromised |
| **History scrub if needed** | A fix in the latest commit does not remove secrets from old commits |

---

## Critical — fixed in code (rotate credentials anyway)

### 1. VocalLearn — Supabase test password in git

- **Was:** Hardcoded email/password in `scripts/analyze-session-latency.mjs` (pushed to GitHub).
- **Fix:** Reads `SUPABASE_TEST_EMAIL` and `SUPABASE_TEST_PASSWORD` from `.env.local`.
- **You must:** Change the Supabase user password in the dashboard. Add test creds to `.env.local` only.

### 2. Kalshi — API key ID + Mac paths in 8 files

- **Was:** `KALSHI_API_KEY_ID` and absolute `KEY_PATH` in `scripts/manual_exit.py` and `archive/analysis-scripts/*`.
- **Fix:** Shared `scripts/kalshi_config.py` loads from repo-root `.env`.
- **You must:** Revoke/rotate the Kalshi API key at [kalshi.com/account/api](https://kalshi.com/account/api).

### 3. Kalshi — VPS IP in archive scripts

- **Was:** `root@149.28.55.82` in `gather_weather_data.py` and `check_portfolio_v2.py`.
- **Fix:** Uses `VPS_SSH_TARGET` from `.env` (documented in `.env.example`).

---

## Medium — Atlas local network / paths

| Item | Risk | Action taken |
|------|------|----------------|
| `config/network.json` LAN IP | Home network fingerprint | Sanitized to `127.0.0.1`; added `network.example.json` |
| `apps/mobile/app.config.ts` | Tailscale hostname + LAN IP defaults | Defaults removed; set via `ATLAS_LAN_IP`, `ATLAS_TAILSCALE_*` env |
| `projects.registry.json` | Full Mac filesystem paths | Example file added; real registry should stay local (see Atlas README) |
| `inbox/*.md` | Personal assistant notes | Added `inbox/` to `.gitignore` (remove from tracking on next Atlas commit) |
| Docs mentioning `10.0.0.84` | Low | Cosmetic; update to “your LAN IP” when editing docs |

**Local setup after pull:** Copy `projects.registry.example.json` → `projects.registry.json` and fill in your paths, or set `ATLAS_REGISTRY_PATH`.

---

## Acceptable public PII (career repo)

These are **intentional** for job applications but increase spam/scrape risk on a public repo:

- `career-dashboard/lib/resume-data.ts` — name, email, phone
- `career-dashboard/public/resume-exports/*` — generated resumes
- `CLOUD_HANDOFF.md`, `MY_STORY.md` — career narrative

**Options:** Keep public (normal for portfolio), use a dedicated job-search email on resume, or make career repo private until hired.

---

## Git history — scrubbed (2026-07-09)

`git filter-repo` was run on **vocallearn** and **kalshi-prediction-bot**; `main` was force-pushed to GitHub. Old commits on those repos should no longer contain the Supabase test password, Kalshi key ID, VPS IP, or `/Users/camrontrost` paths.

If you cloned either repo elsewhere, re-clone or `git fetch --all && git reset --hard origin/main`.

Optional: archive the old **kalshi-bot** GitHub repo (separate remote; not scrubbed).

---

## Redundancy suggestions (confirm before deleting)

| Suggestion | Repo | Notes |
|------------|------|-------|
| **Archive or delete `kalshi-bot` GitHub repo** | GitHub | Superseded by `kalshi-prediction-bot`; old history may have secrets |
| **Keep `archive/analysis-scripts/` but don’t link in README** | Kalshi | One-off ops scripts; fine as archived reference |
| **Remove tracked `inbox/` from Atlas** | Atlas | Personal notes; not portfolio material |
| **Duplicate slug `vocalllearn` vs `vocalLearn`** | Atlas registry | Typo in slug; fix when you next edit registry |
| **`back-from-cloud-handoff.md`** | Career | Raw cloud chat dump; optional delete or gitignore |
| **`CLOUD_HANDOFF.md`** | Career | Useful for you; optional trim before wide sharing |
| **Old GitHub repos** (`arbitrage-bot-debug`, `onlinefoodorderapp`, `Web-Development-Project`) | GitHub | Archive per prior recommendation |

Reply with which rows you want removed and we can do a focused cleanup PR.

---

## Pre-share checklist

- [ ] Rotate Supabase password for exposed test account
- [ ] Rotate/revoke Kalshi API key `57a56213-…`
- [ ] Confirm `.env` / `.env.local` never staged (`git status`)
- [ ] Push security-fix commits to all four repos
- [ ] (Optional) Scrub git history on VocalLearn + Kalshi
- [ ] Pin 4 portfolio repos on GitHub profile
- [ ] Archive stale repos

---

## Ongoing hygiene

- Run `git diff` before every push; search for `@`, `password`, `api_key`, `Bearer`, private IPs.
- Consider [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning) (enabled by default on public repos).
- Add a pre-commit hook later (`gitleaks` or `detect-secrets`) if you want automation.
