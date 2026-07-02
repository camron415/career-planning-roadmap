# Camron's Story — Interview Narrative & Pitch Library

**Created:** 2026-07-02
**Owner:** Camron Trost
**Purpose:** Polished, reusable version of Camron's personal/technical story for interviews, cover letters, and LinkedIn. Source of truth for "who I am and why," the way `resume-data.ts` is the source of truth for the resume. Companion to `COMPASS_INTERVIEW_PREP.md`, `LINKEDIN_AND_EDUCATION.md`.

> How to use: read the **60-second pitch** before any call. Use the **per-project blurbs** when asked "tell me about a project." Use the **STAR stories** for behavioral questions. Read **Framing guardrails** before a Compass-type (small-business) interview. Raw dictation is preserved at the bottom as the re-tailoring source.

---

## 60-second "Tell me about yourself" (general)

> I'm a self-taught software developer who builds real, AI-powered products end to end. About a year ago I decided to go all-in on software — I started a full-stack and generative-AI course to get the fundamentals in Git, HTML/CSS, and JavaScript, but I learned fastest by building. My first real project was a trading-and-analytics bot I rebuilt from the ground up in Rust and React, ran 24/7 on a server, and used to process millions of live market-data points through authenticated APIs — that taught me API integration, designing for reliability, and making hard cost-versus-quality trade-offs. From there I built VocalLearn, a voice-first learning app in React Native where you learn by speaking answers aloud; I wired up real-time speech-to-text and text-to-speech with an AI model and shipped it to my own iPhone through Xcode. I also built a Next.js career dashboard that scrapes and scores job postings. Before software, I spent almost two years at a law firm where I automated our case-tracking in Google Sheets to cut errors — that's where I first saw how a little code makes a real business run better. What drives me is building things that genuinely help people, and I'm looking for a junior role where I can do that on a team and learn from people more experienced than me.

## 60-second pitch — Compass-tailored

> I'm a self-taught developer with a strong project portfolio, focused on front-end work with React, JavaScript, and TypeScript, plus the REST-API and Git skills to work across a full stack. Over the past year I've built and shipped several real apps — a React Native learning app with real-time voice, a Next.js dashboard, and a Rust/React trading system — so I'm comfortable building UIs, wiring them to APIs, and working in an existing codebase. Before software I was head clerk at a law firm, where I automated our case-tracking in Google Sheets to reduce errors and keep everything accurate for the attorney — so I understand how software supports a real business, not just a demo. I know Compass's role involves maintaining PHP and Laravel apps alongside React; I haven't shipped PHP yet, but I pick up new stacks fast — I taught myself Rust and Python by building with them — and I'd be excited to learn it. I'm really looking for exactly this kind of role: a mentored junior seat at a growing local company where I can own real features and grow.

---

## Per-project blurbs (what it does / why / trade-off / lesson)

### VocalLearn — the one I'm most proud of
- **What:** A voice-first mobile learning app (React Native, Expo, TypeScript, Supabase, xAI Grok) where an AI tutor teaches short lessons, then asks you to say the material back in your own words, scores your recall, and schedules reviews until you've mastered it.
- **Why:** To learn faster and counter the idea that "AI makes people passive" — it uses the *production effect* (speaking answers aloud improves retention) so AI actually makes you smarter.
- **Trade-off:** Real-time Grok speech-to-text/text-to-speech (best quality and latency, higher cost) vs. Apple's built-in speech + parsed responses (cheaper, but new edge cases). Balanced cost, latency, and quality.
- **Lesson:** Building responsive real-time voice on iOS (streaming audio, Bluetooth mics, Xcode device builds) is mostly about managing latency and failing gracefully.

### Kalshi Predictive Trading Bot — my first real build
- **What:** A Rust + React trading-and-analytics system that pulls live data from market and finance/Fed APIs, runs prediction strategies on crypto and index markets, logs everything, and ran 24/7 on a VPS.
- **Why:** Started as a way to explore automated trading; became the project where I learned to build a full system from scratch.
- **Trade-off:** Data accuracy/freshness vs. API and compute cost — a constant cost-to-quality balance.
- **Lesson:** I A/B tested across millions of data points and *proved the concept worked* — then made the mature call to stop, because the most profitable strategy was too illiquid to scale and the infra costs made it roughly break-even. Knowing when a system isn't worth operating is a real engineering judgment.

### Career Dashboard — this repo
- **What:** A Next.js/TypeScript/SQLite app that ingests job postings from many sources, removes duplicates, scores each posting's fit against my profile, and turns the results into an application roadmap.
- **Why:** To make my own job search systematic and data-driven instead of ad hoc.
- **Lesson:** Prioritizing reliable sources, scoring realistically, and suppressing duplicates so the signal stays clean.

### Atlas — newest project (frame carefully; see guardrails)
- **What:** A voice-first personal assistant with an Expo/React Native client and a Node/TypeScript server (REST + WebSockets) that gives an AI assistant contextual access to my projects, evolving toward coordinated AI agents that help push my projects forward.
- **Why:** To unify my projects under one intelligent assistant.
- **Lesson:** Designing agent roles, real-time client/server communication, and cost-efficient orchestration.

---

## STAR stories (behavioral answers)

### STAR 1 — Flores automation (best for small-business fit)
- **Situation:** As head clerk at a small law firm, case data was growing and the attorney needed accurate info fast; manual tracking risked errors and discrepancies.
- **Task:** Keep every case's information accurate and instantly accessible.
- **Action:** Built Google Sheets formulas and small programs that synced sheets and documents across the company Drive so everything stayed up to date automatically.
- **Result:** Fewer mistakes and discrepancies, faster retrieval for the attorney — my first proof that a little code makes a real business run better.

### STAR 2 — Trading bot reliability & judgment (engineering depth)
- **Situation:** I wanted a system that could run unattended and make data-driven decisions.
- **Task:** Integrate live APIs and run 24/7 reliably while controlling cost.
- **Action:** Rebuilt the system from scratch, integrated authenticated REST/WebSocket APIs, ran it on a VPS, and A/B tested strategies across millions of data points, constantly balancing data quality against cost.
- **Result:** Proved the concept — and made the disciplined decision to stop when the economics didn't justify continuing. Showed I can both build and evaluate a system honestly.

### STAR 3 — VocalLearn real-time voice (shipping + problem-solving)
- **Situation:** I wanted a tutor-like voice experience on a phone.
- **Task:** Real-time speech-to-text and text-to-speech on iOS with good latency at a reasonable cost.
- **Action:** Integrated streaming audio, Bluetooth handling, and an AI model; weighed real-time AI services against Apple's built-in speech to balance latency, quality, and cost.
- **Result:** Shipped a working app to my own iPhone through Xcode that I still use and develop.

### STAR 4 — Learning velocity (answers "can a self-taught dev really keep up?")
- **Situation:** I started a structured online course but the slow, lecture-only pace wasn't working for me.
- **Task:** Actually become job-ready.
- **Action:** Shifted to learning by building real projects with AI assistance — picking up Git, React, REST APIs, and new languages (Rust, Python) as I needed them.
- **Result:** In about a year I built four real systems. It's why I'm confident I can pick up a new stack like PHP/Laravel quickly.

---

## Framing guardrails (read before interviews)

**Emphasize:** front-end/React work, REST + Git, *shipping and maintaining real apps*, the Flores business-automation story, fast self-taught learning, communication (sales/ops background), eagerness to learn PHP/Laravel and grow on a team.

**Downplay / reframe:**
- **Don't** pitch Atlas as "a company of AI agents that replaces workers" or "I'm the CEO of my own AI company." To a 45-person insurance brokerage that can read as (a) a flight risk who'll leave to do a startup, or (b) tone-deaf about AI replacing staff. **Do** present Atlas as a technical playground for agent orchestration, real-time mobile, and API design.
- **Trading bot:** lead with the *engineering* (APIs, 24/7 reliability, data pipelines, trade-offs), not "to make money" or the old Forex loss. Keep the money/greed anecdote private.
- **"Copied a public repo":** say "I studied an open-source project to learn how real systems are structured, then rebuilt my own version from scratch." (True, and stronger.)
- **The unfinished course:** frame as "I did a full-stack + gen-AI course, then accelerated by building real projects because I learn best by doing." Don't dwell on quitting.

**Be ready for the AI-reliance probe:** because your process is very AI-assisted, a technical interviewer may test whether you *understand* the code, not just prompt for it. Be honest that you build with AI (that's a modern strength), but be able to explain React state/props, what a REST call does, and basic Git flow in your own words. This is exactly why the vocabulary/fundamentals reps matter.

**Truthfulness:** never claim PHP/production experience you don't have, or a degree. "Self-taught, strong portfolio, fast learner" is your true and strong position.

---

## How this builds on the resume
The resume lists *what* you built; this story adds the *why*, the *trade-offs*, and the *lessons* — which is what interviewers actually score. The most underused asset is the **Flores automation** story: it's the clearest evidence that you improve a real business, and it resonates far more with a small company like Compass than the trading bot does. Consider strengthening that resume bullet to name the sync-automation explicitly.

---

## Appendix — raw dictation (source of truth for re-tailoring)
> Preserved from the 2026-07-02 brain-dump so future tailoring can pull directly from Camron's own words. Lightly organized, not reworded.

**Origin & fundamentals:** Fascinated by AI early — liked that it could do "Google's job" but better and personalized. First exposure to tech was an IS 201 class first semester at BYU (Excel, SQL, basic HTML/CSS, Tableau — tutorial-level). At the same time, worked at Flores Legal Services as assistant clerk/accountant, rose to head clerk: QuickBooks bookkeeping, tracking client cases, storing data in Google Suite/Drive; automated systems with Sheets formulas and sync programs to keep everything up to date and reduce discrepancies. First saw beginner coding skills apply to the real world.

**Other work:** A summer selling pest control door-to-door in Sacramento (communication, sales, resilience). ~1 year as an Amazon delivery driver (logistics, time management, working under pressure, organization).

**Deciding on software (~1 year ago):** Motivated by AI's advance; noticed his terminal/computer skills were above average. Researched bootcamps/courses/CS degree; disliked traditional college path. Used Amazon tuition coverage to buy an online full-stack + generative-AI course (remote, self-paced). Before the course, self-learned Python and made a basic 2D PyGame game. Through the course: Git/GitHub (push/pull/commit, branches, terminal), HTML/CSS/JS basics, JS functions, front-end + some back-end. ~2–3 months in, disliked the slow lecture-only format and stopped.

**Trading bot (first real project, ~3 months):** Prior Forex prop-trading experience with a friend (was profitable via a bot, got greedy, lost it before payout — learned how strategies work). Found a public Kalshi/Polymarket bot repo via an X post; copied it, first exposure to accounts/APIs/editing files/terminal; got it ~50% working (Kalshi yes, Polymarket blocked in the US/his state); gave up on the copy. Then realized AI could now access files and code directly (agentic). Used VS Code + free GitHub Copilot to rebuild his own version from scratch (React-based), Kalshi-only. Ran 24/7 on a VPS; strategies on Bitcoin/crypto/index markets predicted on Kalshi, compared to live data via finance/Fed and other APIs; trial-and-error A/B testing across millions of data points. Proved the concept, built entirely himself with AI help; poor early prompt engineering wasted tokens. Burned out: best strategy was least liquid; more liquidity → more volatility/risk; infra + AI costs ≈ break-even, so not worth scaling — but proved he could build a full system solo.

**VocalLearn (next ~3 months, ongoing, most proud of):** Idea = learn more efficiently and counter "AI making humans dumber" by using AI to teach. Feels like a 1-on-1 class; uses the production effect (speak aloud to retain). AI voice teacher delivers lessons within courses, periodically asks you to repeat material in your own words, scores retention, and schedules reviews until mastery. Learned Xcode, iPhone dev builds, Bluetooth audio, real-time STT/TTS with xAI Grok, audio streaming, UI, and balancing quality/latency/cost. Ambitions: share with friends/family, maybe go public.

**Other projects:** (1) A planned AI financial advisor — follows finances, does research, extends the bot's learnings to his real portfolio, could expand to taxes; runs locally/on a server via AI agents ("personal accountant"). (2) Career Planning Roadmap (this repo) — scrapes/grades/summarizes postings, tailors to his resume, builds an application roadmap.

**Atlas (newest, ~1 month, underway):** A re-imagined "Jarvis." Central AI chief assistant that doubles as a personal chatbot and a "mouthpiece" for him and his projects. Phase 1: a Grok-voice-mode-like chatbot with reasoning/web/tools *plus* a layer giving it contextual access to all his repos/projects. Phase 2: a business-structured system of worker AI agents (finances, email, career planning, Atlas, VocalLearn, etc.) that run 24/7 following per-project roadmaps and optimizing token/cost, with a manager layer that oversees workers and reports up to Atlas; plus a morning stand-up where he bounces ideas and sets priorities. Framing: "CEO of my own life/portfolio." (See guardrails — present modestly in interviews.)

**Drivers / most proud:** Driven to build things that help people, make them smarter, and make life more autonomous/efficient — first for himself, then others. Most proud of VocalLearn and of his growth in prompt engineering and understanding how to use AI effectively to build anything.

**Trade-offs he cites:** cost-vs-quality throughout the bot; real-time Grok STT/TTS vs. cheaper Apple built-in speech in VocalLearn/Atlas (balancing tokens/cost, latency, quality). Would do differently: daily planning before using AI, don't waste prompts, maximize model context, use multiple models for perspective, review under a different light to reduce regressions, avoid scope creep.

*Update this doc as the story evolves (new projects, first job, wins).*
