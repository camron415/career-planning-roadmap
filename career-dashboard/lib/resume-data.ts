export type ResumeProject = {
  name: string;
  category: string;
  resumeAngle: string;
  stack: string[];
  highlights: string[];
  bullets: string[];
  shareStrategy: string;
};

export type ResumeExperience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type ResumeGuidance = {
  defaultLength: string;
  preferredFormats: string[];
  include: string[];
  exclude: string[];
  accompanyingMaterials: string[];
};

export type ResumeImprovementItem = {
  title: string;
  whyItHelps: string;
  shortTermProof: string;
};

export type ControlResumeSection = {
  title: string;
  entries: Array<{
    title: string;
    meta: string;
    bullets: string[];
  }>;
};

export type ControlResume = {
  label: string;
  roleHeadline: string;
  status: string;
  summary: string;
  sections: ControlResumeSection[];
  rawText: string;
  readinessNotes: string[];
};

export type ResumeSnapshot = {
  candidateName: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  workAuthorization: string;
  summary: string;
  coreSkills: string[];
  projects: ResumeProject[];
  experience: ResumeExperience[];
  formatGuidance: ResumeGuidance;
  improvements: ResumeImprovementItem[];
  openInputs: string[];
  controlResume: ControlResume;
  genericResumeText: string;
};

function buildGenericResumeText(snapshot: Omit<ResumeSnapshot, "genericResumeText">) {
  return [
    `${snapshot.candidateName}`,
    `${snapshot.location} | ${snapshot.email} | ${snapshot.phone}`,
    `${snapshot.workAuthorization}`,
    "",
    "PROFESSIONAL SUMMARY",
    snapshot.summary,
    "",
    "TECHNICAL SKILLS",
    snapshot.coreSkills.join(" | "),
    "",
    "SELECTED PROJECTS",
    ...snapshot.projects.flatMap((project) => [
      `${project.name} | ${project.category}`,
      ...project.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "",
    "PROFESSIONAL EXPERIENCE",
    ...snapshot.experience.flatMap((role) => [
      `${role.role} | ${role.company} | ${role.location}`,
      `${role.period}`,
      ...role.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "",
    "ADDITIONAL",
    "Languages: English, Spanish",
    "Education: intentionally omitted from the control resume until final wording is locked.",
    "Resume format: ATS-first single column, one page, PDF by default with DOCX backup when required.",
    "Links: Add GitHub, LinkedIn, portfolio, and demo links once they are ready for submission.",
  ].join("\n");
}

export function getResumeSnapshot(): ResumeSnapshot {
  const snapshot = {
    candidateName: "Camron Trost",
    headline: "Control resume v1",
    location: "Salt Lake City, UT",
    email: "camrontrost@gmail.com",
    phone: "(309) 997-0817",
    workAuthorization: "U.S. citizen authorized to work in the U.S. without sponsorship",
    summary:
      "Independent software developer building AI-enabled mobile and backend products with hands-on experience in API integration, data persistence, voice-driven user workflows, workflow automation, and end-to-end product iteration.",
    coreSkills: [
      "TypeScript",
      "JavaScript",
      "Rust",
      "Python",
      "SQL",
      "React Native",
      "Expo",
      "Supabase",
      "REST APIs",
      "WebSockets",
      "Xcode",
      "Git",
      "AI API integration",
      "Mobile UI",
      "Data modeling",
      "Debugging and QA",
    ],
    projects: [
      {
        name: "VocalLearn",
        category: "Voice-enabled AI learning mobile app",
        resumeAngle:
          "Best framed as an end-to-end mobile product that combines AI tutoring, spaced repetition, user progress tracking, and voice interaction.",
        stack: ["TypeScript", "React Native", "Expo", "Supabase", "PostgreSQL", "xAI Grok"],
        highlights: [
          "End-to-end mobile product ownership",
          "Voice-first UX implementation",
          "AI tutoring and scoring workflows",
          "Backend persistence and review scheduling",
        ],
        bullets: [
          "Built a React Native and Expo mobile app that combines voice interaction, AI tutoring, and spaced repetition to help users learn by speaking answers aloud.",
          "Implemented lesson-state orchestration, review queues, and per-user progress tracking backed by Supabase and PostgreSQL.",
          "Integrated xAI services for tutoring, answer scoring, text-to-speech, and AI-assisted lesson generation within a production-style mobile workflow.",
        ],
        shareStrategy:
          "Share screenshots, a short demo, and a sanitized architecture summary before exposing the full product surface publicly.",
      },
      {
        name: "Kalshi Predictive Trading Bot",
        category: "Rust trading automation and analytics platform",
        resumeAngle:
          "Best framed as a systems-heavy product showing API integration, real-time monitoring, persistence, and risk-aware engineering.",
        stack: ["Rust", "Axum", "WebSockets", "JSON persistence", "API integration", "Python utilities"],
        highlights: [
          "Authenticated third-party API integration",
          "Real-time systems and monitoring",
          "Risk controls and audit logging",
          "Backend and tooling ownership",
        ],
        bullets: [
          "Built a Rust-based trading and analytics platform that integrates real-time market APIs, persistent trade logging, monitoring dashboards, and operator tooling.",
          "Implemented authenticated REST and WebSocket integrations, order and position tracking, and file-backed audit trails for live and simulated workflows.",
          "Added risk controls, shadow-trading analysis, and operational scripts to support testing, monitoring, and iterative system improvement.",
        ],
        shareStrategy:
          "Keep trading logic and edge-specific details private; share the systems architecture, dashboard screenshots, and sanitized code excerpts instead.",
      },
      {
        name: "Career Dashboard and Resume Research System",
        category: "Next.js job-intelligence and resume-planning workflow",
        resumeAngle:
          "Best framed as a workflow product that turns live job data into filtering, market analysis, preparation plans, and resume strategy.",
        stack: ["Next.js", "TypeScript", "SQLite", "job ingestion", "fit scoring", "dashboard UX"],
        highlights: [
          "Data-backed job analysis",
          "Filtering and deduplication",
          "Preparation planning",
          "Resume workflow design",
        ],
        bullets: [
          "Built a local dashboard that ingests job listings, scores fit, suppresses duplicates, and extracts role requirements into a searchable application workflow.",
          "Added preparation planning and resume-system views that turn recurring market requirements into concrete study, project, and application actions.",
        ],
        shareStrategy:
          "Share the product workflow, screenshots, and system architecture; there is no sensitive IP concern here beyond the private local data store.",
      },
    ],
    experience: [
      {
        company: "Flores Legal Services",
        role: "Accounting Clerk and Workflow Support",
        period: "August 2023 - March 2025",
        location: "Orem, UT",
        bullets: [
          "Managed bookkeeping, case-data organization, and day-to-day operational workflows using QuickBooks, Google Workspace, and legal software.",
          "Improved internal processes by identifying inefficient manual steps, organizing information flows, and building lightweight spreadsheet-based automation.",
          "Supported a detail-heavy environment where accuracy, documentation, and fast retrieval of business-critical information mattered daily.",
        ],
      },
      {
        company: "Happy Delivery, LLC",
        role: "Delivery Associate",
        period: "June 2025 - Present",
        location: "Salt Lake City area",
        bullets: [
          "Executed high-volume daily delivery routes while balancing speed, organization, and customer-facing reliability under time constraints.",
          "Strengthened personal systems for route planning, prioritization, and real-time problem solving in a logistics-heavy environment.",
        ],
      },
      {
        company: "Fast Action Pest Control",
        role: "Sales Associate",
        period: "March 2025 - June 2025",
        location: "Sacramento, CA",
        bullets: [
          "Developed direct sales, objection handling, and persuasive communication skills in a performance-driven environment.",
          "Learned to explain value clearly, handle repeated rejection, and stay process-oriented while working toward measurable targets.",
        ],
      },
    ],
    formatGuidance: {
      defaultLength: "One page by default until software experience depth clearly supports a second page.",
      preferredFormats: [
        "PDF for most submissions",
        "DOCX backup for portals that require editable uploads",
        "Plain-text version for copy-paste application forms",
      ],
      include: [
        "Project-first evidence with concrete stacks and shipped workflows",
        "Authorization and Salt Lake City, UT location",
        "Keywords grounded in the target role and supported by project proof",
        "Clean single-column ATS-friendly formatting",
      ],
      exclude: [
        "High school details",
        "Unfinished degree claims that imply formal enrollment or graduation",
        "Unverified metrics, users, revenue, or performance claims",
        "Graphics, text boxes, multi-column layouts, or dense coursework dumps",
      ],
      accompanyingMaterials: [
        "Tailored cover letter or short-answer response when the application asks for one",
        "LinkedIn profile once created and aligned to the same facts",
        "GitHub or portfolio links only after the public proof is curated",
      ],
    },
    improvements: [
      {
        title: "Publish curated project proof",
        whyItHelps:
          "Hiring teams will trust the resume more once there are clean public links, screenshots, or case studies behind the strongest claims.",
        shortTermProof:
          "Create one sanitized GitHub or case-study page for VocalLearn and one architecture summary for the Kalshi bot.",
      },
      {
        title: "Add one tested, persistence-backed feature to VocalLearn",
        whyItHelps:
          "This strengthens both the resume bullets and interview evidence around TypeScript, API contracts, SQL-backed workflows, and self-QA.",
        shortTermProof:
          "Ship a saved-progress or review-history flow with validation, one test, and a short QA note.",
      },
      {
        title: "Prepare recruiter-safe education wording",
        whyItHelps:
          "Clear, truthful wording prevents application inconsistencies and keeps attention on project evidence instead of formal-school ambiguity.",
        shortTermProof:
          "Pick one standard explanation for coursework and training status, then reuse it across resume, LinkedIn, and application forms.",
      },
    ],
    openInputs: [
      "GitHub, LinkedIn, portfolio, and demo links are still pending.",
      "Education and training wording still needs a final approved version before mass tailoring begins.",
      "The top 10 local and top 10 remote target jobs should be refreshed before generating the 20 custom resume variants.",
    ],
    controlResume: {
      label: "Control resume",
      roleHeadline: "Independent Software Developer",
      status: "Ready as the generic baseline for all future tailored resumes",
      summary:
        "Self-taught software developer building mobile, analytics, and automation products with strongest proof in TypeScript, React Native, AI API integration, persistence design, workflow tooling, and end-to-end product iteration.",
      sections: [
        {
          title: "Selected Projects",
          entries: [
            {
              title: "VocalLearn",
              meta: "React Native, Expo, TypeScript, Supabase, PostgreSQL, xAI",
              bullets: [
                "Built a voice-enabled mobile learning app that combines AI tutoring, spaced repetition, and per-user progress tracking to help users learn by speaking answers aloud.",
                "Implemented the core learning engine with lesson-state orchestration, review queues, and stored mastery tracking backed by Supabase and PostgreSQL.",
                "Integrated xAI tutoring, answer scoring, speech recognition, and text-to-speech into a real mobile workflow rather than a demo-only prototype.",
              ],
            },
            {
              title: "Kalshi Predictive Trading Bot",
              meta: "Rust, Axum, WebSockets, real-time APIs, JSON/CSV persistence",
              bullets: [
                "Built a Rust-based trading and analytics platform that integrates live market APIs, risk-aware logic, persistent trade logs, and operator dashboards.",
                "Implemented authenticated REST and WebSocket integrations, order and position tracking, and audit-oriented persistence for live and simulated workflows.",
              ],
            },
            {
              title: "Career Dashboard and Resume Research System",
              meta: "Next.js, TypeScript, SQLite, ingestion and scoring workflows",
              bullets: [
                "Built a local dashboard that ingests job listings, scores fit, suppresses duplicates, and extracts market signals into a practical application workflow.",
                "Added preparation planning and resume-system views that convert role patterns into concrete study and application actions.",
              ],
            },
          ],
        },
        {
          title: "Professional Experience",
          entries: [
            {
              title: "Accounting Clerk and Workflow Support | Flores Legal Services",
              meta: "August 2023 - March 2025 | Orem, UT",
              bullets: [
                "Managed bookkeeping, case-data organization, and day-to-day workflows using QuickBooks, Google Workspace, and legal office software.",
                "Improved internal processes by identifying inefficient manual steps, organizing information flows, and building lightweight spreadsheet-based automation.",
              ],
            },
            {
              title: "Delivery Associate | Happy Delivery, LLC",
              meta: "June 2025 - Present | Salt Lake City area",
              bullets: [
                "Executes high-volume daily routes while balancing speed, organization, and customer-facing reliability under time constraints.",
                "Strengthened independent execution, route planning, prioritization, and real-time problem solving in a logistics-heavy environment.",
              ],
            },
            {
              title: "Sales Associate | Fast Action Pest Control",
              meta: "March 2025 - June 2025 | Sacramento, CA",
              bullets: [
                "Developed direct communication, objection handling, and persistence in a performance-driven sales environment.",
              ],
            },
          ],
        },
      ],
      rawText: "",
      readinessNotes: [
        "This is the generic control resume, not the final ATS-tailored version for any one company.",
        "Education wording is intentionally held back until the final phrasing is approved once and reused consistently.",
        "Public links are still pending, so the baseline resume is ready to tailor but not yet at maximum proof strength.",
      ],
    },
  } satisfies Omit<ResumeSnapshot, "genericResumeText">;

  const genericResumeText = buildGenericResumeText(snapshot);

  return {
    ...snapshot,
    controlResume: {
      ...snapshot.controlResume,
      rawText: genericResumeText,
    },
    genericResumeText,
  };
}