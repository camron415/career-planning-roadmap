export const runCadence = [
  {
    label: "Primary sweep",
    time: "6:15 AM MT",
    detail: "Catch overnight ATS updates and the highest-signal company career page changes.",
  },
  {
    label: "Delta sweep",
    time: "12:15 PM MT",
    detail: "Pick up midday postings and delayed syncs without re-running the heavier research pipeline.",
  },
  {
    label: "Weekly deep research",
    time: "Sunday 4:00 PM MT",
    detail: "Reserve company enrichment, backlog cleanup, and roadmap regeneration for a slower pass.",
  },
] as const;

export const prioritySources = [
  {
    name: "Official career pages",
    status: "anchor",
    detail: "Best source of truth when the company publishes directly and a repost is unnecessary.",
  },
  {
    name: "Greenhouse and Lever",
    status: "next",
    detail: "Reliable ATS structure gives clean metadata, fewer duplicates, and stable canonical URLs.",
  },
  {
    name: "Ashby and Wellfound",
    status: "later",
    detail: "Useful expansion once the normalization and dedupe path is stable enough for broader intake.",
  },
] as const;

export const hardGuardrails = [
  "Remote US roles or local/hybrid roles in Utah only, with Salt Lake Valley still preferred.",
  "No sponsorship-dependent opportunities in the review queue.",
  "Degree-gated roles stay blocked when equivalent experience language is missing.",
  "Enrollment-dependent internships stay off until eligibility is real.",
] as const;

export const buildMilestones = [
  {
    title: "Phase 1 shell",
    status: "live",
    detail: "Dashboard pages now render from a persistent local SQLite store instead of placeholder JSX.",
  },
  {
    title: "Source adapters",
    status: "alpha",
    detail: "Greenhouse is live now, Lever is wired, and the company-page adapter scaffold is ready for per-site parsers.",
  },
  {
    title: "Scoring pipeline",
    status: "live",
    detail: "Every job now runs through local access-fit, skill-fit, growth-fit, and blocker logic before it reaches the inbox.",
  },
] as const;