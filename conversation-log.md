# Conversation Log

Date: 2026-05-20
Note: This transcript is lightly cleaned for readability while preserving the substance of the conversation.

## User: Initial Project Description

Camron described a new mini project focused on career planning and job-search automation. The intent is to work with an AI coding agent to build a system that can:
- search job listings and career pages;
- find junior software engineering, software developer, AI-related, and internship opportunities;
- filter based on realistic fit for a self-taught developer with about one year of experience and no degree;
- prioritize remote opportunities or roles accessible from Salt Lake Valley, Utah;
- research companies more deeply than the public listing alone;
- explain what the job would actually be like;
- identify how to improve projects or skills to become more competitive.

Camron gave background on two major projects.

### Project 1: Prediction-Market Trading Bot
- Built largely from scratch in Rust and Python.
- Tracked prediction markets, looked for arbitrage or mispriced opportunities, compared market prices against more accurate assumed values, and automatically entered trades.
- The system showed promising predictive accuracy, although actual profitability was limited by fill rates and liquidity constraints.

### Project 2: VocalLearn
- Current main project.
- A React-based learning app with an AI voice tutor.
- Focuses on vocal repetition and spaced repetition to improve memory and concept retention.
- Designed to feel like a smooth, natural teacher-led lesson experience.
- The lesson and repetition loop is already built and fairly solid, with ongoing improvements and feature work.

Camron explained that these systems were built with heavy use of GPT or Claude inside VS Code, combined with brainstorming and strategic help from Grok.

### Main Career Project Goal
Camron wants a system that can automatically search job boards, company pages, LinkedIn, Wellfound, and other sources to find roles such as:
- junior software engineer;
- junior software developer;
- internship roles;
- AI system building roles;
- prompt engineering roles;
- other software positions that could fit a self-taught builder with project experience.

The system should:
- take into account Camron's age, location, lack of degree, and lack of formal employment history;
- find realistic opportunities rather than generic or impossible ones;
- summarize requirements and tech stacks;
- research each company more deeply;
- explain what the role might actually involve day-to-day;
- create a roadmap for how to improve competitiveness if current qualifications are not yet enough.

Camron also noted that any roadmap should ideally connect back into VocalLearn. If there are skills worth learning next, courses could be built into VocalLearn itself so that Camron both learns and demonstrates the app's value.

### Grok Draft Prompt Shared By Camron
Grok suggested a career-strategy prompt that positioned Camron as:
- a 23-year-old self-taught junior developer;
- located in Salt Lake Valley, Utah;
- with roughly one year of hands-on coding experience and no college degree;
- builder of a Rust/Python trading bot;
- builder of VocalLearn, a React-based AI learning app.

The draft prompt asked the AI agent to:
- search job boards and company pages;
- prioritize remote or Salt Lake City-accessible roles;
- extract job requirements and responsibilities;
- research companies more deeply;
- filter for roles that value projects over degrees;
- create a 3-month improvement roadmap;
- suggest learning topics that could be built into VocalLearn;
- be realistic and ask for clarifying details.

## Assistant: Initial Feedback

The response identified that the project really contains three systems:
1. a job discovery engine;
2. a company and role enrichment engine;
3. a career-gap and roadmap engine.

The response said this is workable, but only if it is phased carefully. A recommended order was:
1. find and normalize roles;
2. score them against Camron's background;
3. enrich top matches with deeper analysis;
4. generate a skill-gap roadmap.

Main feedback on the Grok prompt:
- It was directionally good, but too broad.
- "Search the whole internet" is not a practical instruction.
- The system needs a bounded source list, clear output format, and explicit ranking criteria.
- Titles such as "AI engineer" and "prompt engineer" are often noisy and senior-skewed.
- Better target categories include junior software engineer, software developer, full-stack engineer, frontend or backend engineer, applied AI engineer, automation engineer, solutions engineer, and startup generalist roles.

Main concerns raised:
1. job-source access and scraping reliability;
2. fit calibration for a self-taught developer with no degree;
3. internship filtering because many internships require active enrollment;
4. the fact that company-research depth is partly inferential;
5. scope creep if the roadmap becomes generic rather than market-driven.

Main questions raised before building:
1. what form the product should take;
2. whether it should run once or on a schedule;
3. which sources should be included first;
4. whether local hybrid or in-person roles should be included;
5. whether internships should be included;
6. work authorization and sponsorship;
7. compensation expectations;
8. preferred work types;
9. fit-scoring philosophy;
10. whether resume, portfolio, or GitHub materials exist;
11. whether project improvements or new projects are acceptable;
12. whether the system should eventually help with application materials too.

The response also stated that Camron's strongest positioning is not "beginner who learned coding," but rather "self-directed builder who has already shipped technically real systems."

The next-step offer was:
1. create a refined project definition with MVP boundaries;
2. write a stronger master prompt for the AI agent;
3. recommend an architecture for the mini project.

## User: Follow-Up Answers

Camron then answered the earlier questions.

1. Product shape:
- Wants a dashboard that works on a Mac and provides access to everything.

2. Scheduling:
- Wants the search to run every day at a strategic time.
- Long term, wants the system to eventually apply automatically or reduce application effort to a few clicks.

3. Sources:
- Wants as many sources as possible, but with strong filtering for repeats, unreliable information, and weak data.

4. Geographic filter:
- Fully remote roles are acceptable from anywhere.
- Hybrid or in-person roles are acceptable if reasonably close to Salt Lake City, roughly within 30 minutes.

5. Internships:
- Raised the idea that formal enrollment could potentially be obtained if needed.
- Asked for guidance on whether internships are realistic and how they should be handled.

6. Work authorization:
- US citizen.

7. Compensation:
- Currently makes $23/hour at a full-time job.
- Would consider switching for software work that meets or exceeds that rate.
- Lower compensation might still be considered for a part-time role or a very strategic opportunity.

8. Role preference:
- Broadly open.
- Main goal is to gain experience, learn from stronger teams, and improve future opportunities.

9. Scoring philosophy:
- Wants realistic scoring with feedback on how to improve toward harder roles.
- If a role requires a degree with no way around it, that should be treated as a blocker.

10. Existing materials:
- Is willing to provide access to project directories if needed.
- Said the projects are on the Mac, but was unsure whether the assistant could find them without help.

11. Additional projects:
- Open to building more projects.
- Will continue improving the learning app on the side.

12. End-state scope:
- Confirmed that assisting with applications is part of the long-term final product.

Finally, Camron requested:
- a new directory;
- a file containing detailed Step 1, Step 2, and Step 3;
- storage of the full conversation in that directory;
- a clean handoff so the next session can move straight into building.

## Assistant: Current Action Taken

In response to the follow-up request, a new local planning directory was created under Documents with:
- a main foundation file covering the refined project definition, the stronger agent prompt, and the recommended architecture;
- this conversation log;
- a README with the current constraints and next build order.
