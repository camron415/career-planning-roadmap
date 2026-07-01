# Career Planning + Roadmap Dashboard Foundation

Date: 2026-05-20
Owner: Camron
Status: Planning complete, build not started

## 1. Refined Project Definition With MVP Boundaries

### Working Title
Career Planning + Roadmap Dashboard

### Primary Objective
Create a local dashboard on macOS that continuously surfaces realistic software opportunities for Camron, explains which roles are worth pursuing now, shows why they are or are not a fit, and converts market gaps into a concrete skill and project roadmap.

### User Profile Snapshot
- 23-year-old self-taught developer in Salt Lake Valley, Utah.
- Roughly one year of hands-on coding, product-building, AI-assisted development, and self-directed learning.
- US citizen.
- No completed college degree.
- Strongest proof of ability is project-based rather than resume-based.
- Current compensation baseline is $23/hour. Full-time opportunities should usually meet or beat that threshold unless there is a strong strategic reason not to.
- Open to remote roles anywhere if fully remote. Open to hybrid or on-site roles if the commute is roughly 30 minutes or less from Salt Lake City.

### Current Positioning Strengths
- Built a Rust/Python trading bot from scratch that ingested market data, identified pricing inefficiencies, and placed trades automatically.
- Built and continues to improve VocalLearn, a React-based AI learning app with a strong lesson plus repetition loop.
- Has practical experience with iteration, debugging, systems thinking, AI-assisted coding workflows, and shipping self-directed projects.
- Appears stronger for project-driven junior roles, startup generalist roles, applied AI tooling roles, and software roles that value initiative over credentials.

### Priority Role Categories
1. Junior software engineer.
2. Entry-level software developer.
3. Full-stack developer or engineer.
4. Frontend or React-focused developer roles.
5. Backend or automation-focused developer roles.
6. Applied AI tooling, internal tools, or AI workflow roles.
7. Startup generalist engineering roles where projects matter more than pedigree.
8. Apprenticeship, fellowship, returnship, or project-first roles.

### Lower-Priority or Noisy Role Categories
- "Prompt engineer" roles with vague duties or obvious senior expectations.
- "AI engineer" titles that are actually ML research or require deep production ML experience.
- Internship roles that clearly require active current enrollment when enrollment is not true.
- Roles that hard-require a completed bachelor's degree with no equivalent-experience language.
- Reposted, low-detail, or stale aggregations that cannot be traced to a reliable source.

### Core Product Outcomes
- Find realistic job opportunities faster than manual searching.
- Rank them by true accessibility, not by title hype.
- Explain why a role is viable, risky, or not worth the time.
- Research the company beyond the surface job description.
- Extract market patterns from the job pool.
- Turn repeated skill gaps into a 3-month improvement roadmap.
- Eventually reduce application effort to a review-and-approve workflow.

### Hard Filters For The First Version
- Must be remote within the US or reasonably accessible from Salt Lake City.
- Must not require sponsorship.
- Must have enough information to score reliably.
- Must not be an obvious duplicate.
- If a degree is listed as an absolute requirement with no waiver or equivalent-experience language, mark the role as blocked.
- If an internship explicitly requires active student enrollment, mark it as ineligible unless Camron later becomes genuinely eligible.

### Internship Policy Recommendation
Do not build the system around "fudging" enrollment status. That creates legal, ethical, and practical risk, and it pollutes the scoring logic. The cleaner approach is:
- Include internships only when active enrollment is not required.
- Add a future profile toggle that can be turned on only if Camron actually enrolls in a qualifying program.
- Focus the core engine on entry-level, junior, startup, apprenticeship, and project-valuing roles first.

### Compensation Policy
- Full-time roles should generally target $23/hour equivalent or better.
- Lower compensation can still be shown when one of the following is true:
  - the role is part-time and strategically valuable;
  - the role offers exceptional mentorship or career upside;
  - the compensation data is unknown and requires follow-up.
- Compensation should influence prioritization, but not fully override fit and learning value.

### MVP Scope
The MVP should do five things well:
1. Collect roles from a limited set of reliable sources on a schedule.
2. Normalize and deduplicate listings.
3. Score fit against Camron's real background and constraints.
4. Enrich the best opportunities with company and job-context research.
5. Present everything in a local dashboard with a simple roadmap view.

### Explicitly Out Of Scope For MVP
- Fully automatic job submission to ATS systems.
- Captcha solving, account farming, or anti-bot evasion.
- Scraping every major site on day one.
- Generating fake credentials, fake degrees, fake work history, or misleading internship status.
- Over-optimizing cosmetic dashboard features before the data pipeline works.

### Recommended Search Schedule
Use a multi-pass cadence rather than one giant sweep.
- Primary run: 6:15 AM Mountain Time.
- Delta run: 12:15 PM Mountain Time.
- Weekly deep research run: Sunday at 4:00 PM Mountain Time.

Reasoning:
- Many boards and ATS pages update overnight or early morning.
- Midday catches new postings and sync delays.
- Weekly deep research is a better place for company enrichment, backlog cleanup, and roadmap updates than running expensive enrichment on every pass.

### Success Metrics
- The dashboard consistently produces a small set of realistic, non-duplicate, high-confidence roles.
- At least 70 percent of surfaced "apply now" roles should survive manual review.
- The system should clearly separate apply-now roles from stretch roles and blocked roles.
- The roadmap should reflect actual recurring market gaps, not generic internet advice.
- Manual search time should drop substantially after the first two weeks of usage.

### Fit Scoring Model
Use a 100-point weighted score.

| Category | Weight | What it measures |
| --- | ---: | --- |
| Access fit | 30 | Location, work authorization, compensation floor, degree blockers, internship eligibility |
| Skill fit | 30 | Match between Camron's projects and the role's stack, domain, and responsibilities |
| Growth fit | 20 | Mentorship, likely day-to-day learning value, team environment, resume value |
| Opportunity quality | 10 | Source reliability, clarity, stability, and company signal quality |
| Evidence confidence | 10 | How confident the system is in the extracted data and fit judgment |

Recommended score bands:
- 80 to 100: apply now.
- 65 to 79: plausible fit, apply if resume/project framing is tailored.
- 50 to 64: stretch role, keep only if upside is strong and roadmap relevance is high.
- Below 50: archive unless there is unusual strategic value.

### Required Dashboard Views
- Opportunity inbox: ranked jobs with filters, tags, and score bands.
- Role detail page: requirements, inferred day-to-day, red flags, and action recommendation.
- Company dossier page: product, engineering signals, hiring patterns, and growth outlook.
- Gap map: recurring missing skills and how often they appear.
- Roadmap view: a 3-month improvement plan tied directly to the current market.
- Application queue: later-stage review list with status, notes, and resume variant mapping.

### MVP Source Strategy
Start narrower than "the whole internet."

Recommended first-wave sources:
1. Official company career pages for selected companies.
2. Greenhouse-hosted jobs.
3. Lever-hosted jobs.
4. Ashby-hosted jobs.
5. Wellfound.
6. YC jobs or startup directories with good metadata.
7. A carefully limited set of LinkedIn or Indeed links only when source reliability is acceptable.

Why this matters:
- ATS-hosted pages often contain the highest-quality data.
- Company pages reduce duplication.
- Broad aggregators are useful discovery layers, but not ideal source-of-truth layers.

## 2. Stronger Master Prompt For The AI Agent

Use the following as the starting system or master instruction for the AI agent that researches and operates the job-intelligence workflow.

---

You are CareerOps, a hybrid of technical recruiter, career strategist, company researcher, and workflow operator. Your job is to help a self-taught junior developer systematically find realistic software opportunities, understand what each job would actually be like, and convert repeated market gaps into a focused improvement roadmap.

Candidate profile:
- Name: Camron.
- Age: 23.
- Location: Salt Lake Valley, Utah.
- Work authorization: US citizen, no sponsorship required.
- Education: no completed degree.
- Experience: about one year of hands-on coding, self-study, and project building.
- Compensation baseline: currently makes $23/hour; full-time software roles should usually meet or exceed that unless there is strong strategic upside.
- Role flexibility: open to remote roles anywhere in the US if fully remote; open to local hybrid or on-site roles if the commute is about 30 minutes or less from Salt Lake City.

Candidate strengths and evidence:
- Built a Rust/Python prediction-market trading bot from scratch that collected market data, found pricing inefficiencies, and automatically placed trades.
- Built VocalLearn, a React-based AI learning app that teaches through voice interaction, repetition, and spaced repetition workflows.
- Comfortable with AI-assisted coding, debugging, iteration, and independent product development.

Primary goals:
1. Search systematically across reliable job sources for junior software engineer, software developer, full-stack, frontend, backend, automation, applied AI tooling, startup generalist, apprenticeship, and similar entry-level roles.
2. Prioritize roles that value projects, practical skills, and evidence of execution over formal credentials.
3. Filter out duplicates, stale listings, low-information listings, and listings with unreliable data.
4. Extract the core requirements, tech stack, responsibilities, compensation clues, seniority clues, and screening criteria.
5. Research the company behind each strong opportunity and infer likely day-to-day work, engineering environment, learning potential, and red flags.
6. Score each role realistically based on real accessibility, not optimism.
7. Convert recurring missing skills into a 3-month improvement roadmap anchored to real market demand.
8. Suggest ways to use VocalLearn itself as part of the upskilling plan so that learning progress also becomes a live product proof point.

Hard constraints:
- Only include remote roles accessible from the US or local roles reasonably reachable from Salt Lake City.
- Exclude roles that require sponsorship.
- If a completed degree is a hard requirement and there is no equivalent-experience language, mark the role as blocked.
- Do not recommend misrepresenting education, work history, or enrollment status.
- Treat internships requiring active current enrollment as ineligible unless Camron later confirms real eligibility.
- Prefer official career pages or high-confidence ATS sources over scraped reposts.
- Never invent facts. Separate facts, inference, and uncertainty clearly.

Research and ranking workflow:
1. Collect opportunities from approved source categories.
2. Normalize titles, locations, compensation, and requirements.
3. Deduplicate roles using company, title, location, ATS ID, and posting URL.
4. Score fit on access, skills, growth value, opportunity quality, and evidence confidence.
5. Mark each role as one of the following: apply now, apply with tailoring, stretch, blocked, or ignore.
6. Enrich the strongest roles with company research and a likely day-to-day breakdown.
7. Aggregate recurring gaps across the saved role pool.
8. Produce a short action roadmap that improves real market fit quickly.

Source priority:
1. Official company career pages.
2. Greenhouse.
3. Lever.
4. Ashby.
5. Wellfound.
6. YC jobs or equivalent startup directories.
7. LinkedIn or Indeed only when the listing quality is strong and traceable.

Scoring rubric:
- Access fit: 30 points.
- Skill fit: 30 points.
- Growth fit: 20 points.
- Opportunity quality: 10 points.
- Evidence confidence: 10 points.

Score bands:
- 80 to 100: apply now.
- 65 to 79: apply with tailoring.
- 50 to 64: stretch role.
- Below 50: archive or ignore unless there is unusual upside.

Required output format:
A. Daily summary:
- Number of new roles found.
- Number of duplicates removed.
- Number of roles worth review.
- Top 5 opportunities with one-sentence rationale each.

B. Ranked opportunity table with these fields:
- company
- job title
- location
- remote or local type
- source
- compensation if known
- fit score
- fit label
- must-have requirements
- likely blockers
- why it is or is not realistic
- application recommendation

C. Top opportunity dossiers:
For each strong opportunity, provide:
- concise company summary
- likely product and engineering context
- likely day-to-day work
- probable team environment and growth potential
- notable red flags or missing information
- specific talking points Camron could use if applying

D. Weekly market-gap report:
- most common required skills
- repeated missing signals in Camron's profile
- role categories with the best odds
- role categories to deprioritize

E. 3-month roadmap:
- the smallest set of skill, project, and presentation upgrades that would increase fit fastest
- recommendations should prefer improving existing projects before starting unnecessary new ones
- if suggesting new projects, keep them tightly aligned to observed market demand

Behavior rules:
- Be realistic and direct.
- Do not overstate fit.
- Do not use hype titles to inflate opportunity quality.
- Prefer fewer high-confidence opportunities over many weak ones.
- When data is missing, say so.
- When a requirement is ambiguous, classify it as uncertain rather than pretending it is fine.
- If resume, GitHub, portfolio, or project directories are available, use them to refine scoring and application guidance.
- Before the first serious run, ask for any missing candidate artifacts that would materially improve the scoring quality.

Clarifying inputs to request before the first real run:
- current resume
- GitHub profile or repository links
- project directories for the trading bot and VocalLearn
- any portfolio site or LinkedIn profile
- preferred tech stacks, if any develop into stronger preferences later
- any hard schedule constraints for local or hybrid work

---

### Note On Prompt Design
This prompt is intentionally opinionated. It narrows the search space, forces source quality, and prevents the system from wasting time on unrealistic or weakly evidenced roles.

## 3. Recommended Architecture For The Mini Project

### Recommended Product Shape
Build the first version as a local web dashboard that runs on Camron's Mac. This is the fastest path to something usable, debuggable, and extendable.

Why this shape is correct for the MVP:
- It is easier to build and iterate than a packaged native app.
- A browser-based local dashboard still behaves like a personal workstation tool.
- It gives clean paths to future deployment, notifications, scheduled jobs, and collaboration.
- It keeps data, prompts, logic, and UI in one controllable environment.

### Recommended Stack
Use a mostly TypeScript architecture for version one.

- Frontend: Next.js with React and TypeScript.
- Styling: Tailwind CSS or a similarly fast UI system.
- Database: SQLite for local storage.
- ORM or query layer: Drizzle ORM.
- Worker and scraping layer: Node.js with Playwright for dynamic pages and Cheerio or native parsing for static pages.
- AI provider abstraction: OpenAI and Anthropic clients behind one internal interface.
- Scheduling: macOS `launchd` for reliable local scheduled runs, with an internal worker command the scheduler can call.
- Optional later notifications: email, Telegram, or Discord.

Why TypeScript first:
- One language across UI, data pipeline, and automation reduces coordination overhead.
- It matches Camron's current React work and is a good fit for AI-assisted iteration.
- Python can still be added later if a source or NLP workflow clearly benefits from it.

### High-Level System Components
1. Source adapters.
2. Normalization and deduplication engine.
3. Fit scoring engine.
4. Company enrichment engine.
5. Gap-analysis and roadmap engine.
6. Dashboard UI.
7. Application-assist workflow.

### Suggested Data Flow
1. A scheduled worker starts the daily run.
2. Source adapters fetch listings from approved sources.
3. Raw listings are normalized into a common job schema.
4. Duplicate detection merges repeated listings.
5. The scoring engine computes fit and labels each role.
6. Top roles are sent to the enrichment engine for company and day-to-day analysis.
7. The dashboard updates the opportunity inbox, role pages, and gap map.
8. A weekly process updates the roadmap view from the accumulated role pool.

### Suggested Data Model
Create at least these core tables:

- `candidate_profile`
  - location
  - compensation baseline
  - commute radius
  - citizenship and sponsorship rules
  - degree status
  - internship eligibility toggle

- `job_sources`
  - source name
  - source type
  - base URL
  - reliability score
  - fetch method

- `jobs`
  - source job ID
  - canonical URL
  - company name
  - title
  - location text
  - remote type
  - employment type
  - compensation raw text
  - compensation normalized low and high
  - description
  - requirements summary
  - degree requirement flag
  - internship flag
  - posted date
  - raw payload snapshot

- `companies`
  - company name
  - website
  - company size if known
  - industry or product area
  - location
  - notes
  - research confidence

- `job_evaluations`
  - job ID
  - access fit score
  - skill fit score
  - growth fit score
  - opportunity quality score
  - evidence confidence score
  - total score
  - fit label
  - blockers
  - rationale summary

- `company_dossiers`
  - company ID
  - product summary
  - engineering environment notes
  - likely day-to-day work
  - growth outlook
  - red flags
  - evidence sources

- `skill_gaps`
  - skill name
  - frequency
  - related role categories
  - confidence
  - suggested response

- `roadmap_items`
  - title
  - category
  - linked gap
  - linked project
  - expected impact
  - time estimate
  - priority

- `application_queue`
  - job ID
  - status
  - resume variant
  - cover note status
  - follow-up date
  - manual approval flag

### Suggested Folder Structure

```text
career-dashboard/
  app/
    inbox/
    jobs/[id]/
    companies/[id]/
    roadmap/
    settings/
  components/
  db/
    schema/
    migrations/
  lib/
    scoring/
    dedupe/
    enrichment/
    prompts/
    sources/
  workers/
    daily-run.ts
    weekly-roadmap.ts
  scripts/
    seed-profile.ts
  data/
    exports/
    logs/
  docs/
```

### First Build Phases

#### Phase 0: Planning
Already completed in this directory.

#### Phase 1: Dashboard Shell + Local Database
- Create the Next.js app.
- Create the SQLite database and schema.
- Add a seeded candidate profile.
- Build a basic opportunity inbox page and a settings page.

#### Phase 2: Initial Ingestion
- Implement 3 to 5 source adapters first.
- Save raw listings and normalized listings.
- Add duplicate detection.
- Display the initial job list in the dashboard.

#### Phase 3: Fit Scoring
- Convert profile rules into a scoring pipeline.
- Tag jobs as apply now, apply with tailoring, stretch, blocked, or ignore.
- Add filters for remote, local, compensation, and score band.

#### Phase 4: Enrichment + Roadmap
- Enrich top roles with company research.
- Generate a market-gap summary from accumulated jobs.
- Produce the first roadmap view tied to actual job data.

#### Phase 5: Application Assist
- Add a queue for reviewed jobs.
- Support tailored notes, resume variants, and follow-up tracking.
- Keep the final submission step human-approved.

### Recommendation On Auto-Apply
Do not start with automatic submission. The better progression is:
1. Collect and rank jobs.
2. Research and explain them.
3. Prepare application materials quickly.
4. Let Camron approve and submit.
5. Only later consider semi-automatic form filling where the risk is acceptable.

Reasons:
- Many ATS systems are brittle.
- Low-quality auto-apply behavior can damage account trust and produce bad applications.
- Human review is still valuable for role selection and messaging quality.

### Architecture Decision Summary
- Build a local web dashboard first.
- Use TypeScript end to end for version one.
- Start from reliable ATS and official company pages, not broad uncontrolled scraping.
- Score realistically and make uncertainty explicit.
- Treat application automation as a later, human-approved layer.

## Suggested Next Build Step
The next working session should start by creating the repo and implementing Phase 1 only. Do not start with every source, every dashboard page, or auto-apply mechanics. Build the data backbone first.
