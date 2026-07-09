# Git + GitHub Workflow — All Projects

**Owner:** Camron Trost  
**GitHub account:** `camron415`  
**Auth:** SSH (`git@github.com`) — verified working

This is the standard process for every code project. GitHub is the **live backup**; your Mac is the working copy.

---

## Projects map

| Project | Local path | GitHub repo | Status |
| --- | --- | --- | --- |
| Career planning + dashboard | `~/Documents/career-planning-roadmap` | `camron415/career-planning-roadmap` | **Exists** — push updates |
| Atlas | `~/Documents/Macbook-Documents/projects/atlas` | `camron415/atlas` | **Create repo** — then first push |
| VocalLearn | `~/Documents/Macbook-Documents/vocalLearn` | `camron415/vocalLearn` | **Create repo** — then first push |
| Poly-bot (Kalshi) | `~/Documents/Macbook-Documents/poly-bot` | `camron415/poly-bot` (private) | No git yet — optional later |
| Jarvis-ai (archived) | `~/Documents/Macbook-Documents/jarvis-ai` | — | Scrap — do not publish |

---

## Daily workflow (every project)

```bash
cd /path/to/project

# 1. Get latest from GitHub before you work
git pull origin main    # or master for VocalLearn

# 2. Work + save files in Cursor

# 3. See what changed
git status
git diff

# 4. Stage + commit (one logical change per commit)
git add <files>
git commit -m "Short why-focused message"

# 5. Push to GitHub (backup + portfolio)
git push origin main
```

**Rule:** Pull before you start. Push when you finish a session or complete a task.

---

## Backup strategy (older versions)

You do **not** need duplicate folders like `project-backup-2026`. Git already stores history.

| Method | When to use |
| --- | --- |
| **Git commits** | Every session — automatic history on your Mac |
| **Git push** | Every session — backup on GitHub |
| **Git tag** | Before big refactors: `git tag v0.1-pre-consolidation` |
| **Git branch** | Experimental work: `git checkout -b experiment` |
| **Time Machine** | Mac-wide safety net (optional) |

### Tag a milestone (example)

```bash
git tag -a v1.0-compass-ready -m "Before first job applications"
git push origin v1.0-compass-ready
```

To restore an old version later: `git checkout v1.0-compass-ready` (read-only) or create a branch from it.

---

## First-time push (new repo on GitHub)

### On GitHub.com (you do this once per project)

1. Go to https://github.com/new
2. Repository name: `atlas` or `vocalLearn`
3. **Public** (for portfolio) or **Private** (trading bots)
4. **Do NOT** add README, .gitignore, or license (we already have them locally)
5. Click Create repository

### On your Mac (after repo exists)

```bash
cd /path/to/project
git remote add origin git@github.com:camron415/REPO_NAME.git
git branch -M main          # use main (VocalLearn currently uses master — can rename)
git add .
git commit -m "Initial public snapshot"
git push -u origin main
```

---

## Never push these

- `.env`, `.env.local`, any file with API keys
- `*.sqlite` job databases (career dashboard)
- `server/data/*.db` (Atlas local DB)
- `node_modules/`
- Personal notes with secrets (`camronnotes.txt` — keep local or gitignore)
- Duplicate env files (`server/.env 2` on Atlas — delete locally)

Before first push, run:

```bash
git status
# Confirm no .env files are staged
```

---

## Branch names

| Repo | Default branch |
| --- | --- |
| career-planning-roadmap | `main` |
| atlas | `main` |
| vocalLearn | `master` → rename to `main` on first push (optional) |

Cloud Cursor may create branches like `cursor/career-opportunity-research-d020`. Merge into `main` on Mac, then push.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `rejected - non-fast-forward` | `git pull --rebase origin main` then push again |
| `Repository not found` | Create empty repo on GitHub first |
| `ahead of origin` | `git push origin main` |
| Accidentally committed secret | Do NOT push. Remove file, rotate API key, amend commit |

---

## Session checklist

- [ ] `git pull`
- [ ] Work
- [ ] `git status` — no secrets staged
- [ ] `git commit`
- [ ] `git push`
- [ ] Update LinkedIn Featured link if README changed
