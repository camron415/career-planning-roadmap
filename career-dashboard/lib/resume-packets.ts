import type { ControlResumeSection } from "@/lib/resume-data";
import { getResumeSnapshot } from "@/lib/resume-data";

export type ResumePacket = {
  slug: string;
  label: string;
  kind: "control" | "tailored";
  roleHeadline: string;
  summary: string;
  skillHighlights: string[];
  sections: ControlResumeSection[];
  rawText: string;
  status: string;
  targetCompany: string | null;
  targetRole: string;
  targetLocation: string;
  fitLabel: string | null;
  totalScore: number | null;
  compensation: string | null;
  sourceUrl: string | null;
  positionSummary: string;
  companySummary: string | null;
  requirements: string[];
  atsKeywords: string[];
  emphasize: string[];
  downplay: string[];
  exportHtmlPath: string;
  exportDocxPath: string;
};

function buildPacketRawText(packet: {
  candidateName: string;
  location: string;
  email: string;
  phone: string;
  workAuthorization: string;
  roleHeadline: string;
  summary: string;
  skillHighlights: string[];
  sections: ControlResumeSection[];
}) {
  return [
    packet.candidateName,
    `${packet.location} | ${packet.email} | ${packet.phone}`,
    packet.workAuthorization,
    "",
    packet.roleHeadline,
    "",
    "PROFESSIONAL SUMMARY",
    packet.summary,
    "",
    "TECHNICAL SKILLS",
    packet.skillHighlights.join(" | "),
    "",
    ...packet.sections.flatMap((section) => [
      section.title.toUpperCase(),
      ...section.entries.flatMap((entry) => [
        `${entry.title} | ${entry.meta}`,
        ...entry.bullets.map((bullet) => `- ${bullet}`),
        "",
      ]),
    ]),
  ].join("\n");
}

export function getResumePackets(): ResumePacket[] {
  const snapshot = getResumeSnapshot();

  const controlPacket: ResumePacket = {
    slug: "control-resume",
    label: "Control Resume",
    kind: "control",
    roleHeadline: snapshot.controlResume.roleHeadline,
    summary: snapshot.controlResume.summary,
    skillHighlights: snapshot.coreSkills,
    sections: snapshot.controlResume.sections,
    rawText: snapshot.controlResume.rawText,
    status: snapshot.controlResume.status,
    targetCompany: null,
    targetRole: "Generic software baseline",
    targetLocation: snapshot.location,
    fitLabel: null,
    totalScore: null,
    compensation: null,
    sourceUrl: null,
    positionSummary:
      "Generic ATS-first baseline resume used as the source packet for all future tailored versions.",
    companySummary: null,
    requirements: [
      "Project-first proof",
      "Single-column ATS-safe formatting",
      "Truthful claims only",
      "One-page baseline for junior applications",
    ],
    atsKeywords: snapshot.coreSkills,
    emphasize: [
      "End-to-end project ownership",
      "Mobile product work",
      "API integration and persistence",
      "Workflow improvement and debugging",
    ],
    downplay: [
      "Unverified metrics",
      "Incomplete education wording",
      "Anything not defensible in an interview",
    ],
    exportHtmlPath: "/resume-exports/control-resume.html",
    exportDocxPath: "/resume-exports/control-resume.docx",
  };

  const compassSections: ControlResumeSection[] = [
    {
      title: "Selected Projects",
      entries: [
        {
          title: "VocalLearn",
          meta: "React Native, TypeScript, Expo, Supabase, PostgreSQL, xAI",
          bullets: [
            "Built a voice-enabled learning app with React Native and TypeScript, focusing on user-facing lesson flows, state transitions, and polished mobile interaction design.",
            "Implemented API-backed progress tracking, review queues, and persistence workflows that translate cleanly to frontend product work with real data.",
            "Integrated speech, AI tutoring, and interactive feedback into a production-style UI where usability, responsiveness, and iteration speed mattered.",
          ],
        },
        {
          title: "Atlas Personal Assistant",
          meta: "React Native, Expo, TypeScript, Node.js, REST APIs, SQLite",
          bullets: [
            "Built a voice-first assistant platform with an Expo/React Native mobile client and Node/TypeScript server, using REST APIs and WebSocket flows for real-time text and voice interaction across iPhone and Mac.",
            "Implemented the mobile UI with live session transcripts, push-to-talk controls, typed chat state, and LAN-based API configuration so the frontend reliably consumes backend JSON over WiFi.",
            "Connected user-facing surfaces to a project registry and SQLite-backed report cache, reshaping server data into readable status views and interactive chat workflows.",
          ],
        },
        {
          title: "Career Dashboard and Resume Research System",
          meta: "Next.js, TypeScript, SQLite, filtering and scoring workflows",
          bullets: [
            "Built a React-based dashboard that ingests job data, filters listings, suppresses duplicates, and renders requirement summaries through a clear frontend workflow.",
            "Implemented typed UI states, query-driven views, and data reshaping logic to turn backend job data into practical user-facing surfaces.",
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
            "Managed office data, bookkeeping workflows, and detail-heavy administrative systems using QuickBooks, Google Workspace, and legal software.",
            "Improved repetitive internal workflows by organizing information flows and reducing friction in day-to-day processes.",
          ],
        },
        {
          title: "Delivery Associate | Happy Delivery, LLC",
          meta: "June 2025 - Present | Salt Lake City area",
          bullets: [
            "Executes high-volume daily routes with consistent organization, reliability, and independent problem solving under time pressure.",
          ],
        },
      ],
    },
  ];

  const compassPacket: ResumePacket = {
    slug: "compass-junior-frontend-developer",
    label: "Compass Insurance Advisors",
    kind: "tailored",
    roleHeadline: "Junior Frontend Developer",
    summary:
      "Self-taught frontend-leaning software developer with strongest proof in React-based product work, TypeScript, API integration, and user-facing feature delivery. Brings portfolio-driven evidence, strong communication, fast learning velocity, and hands-on experience building polished application flows with real persistence and state management.",
    skillHighlights: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "React Native",
      "Next.js",
      "REST APIs",
      "Git",
      "SQL",
      "Supabase",
      "Node.js exposure",
    ],
    sections: compassSections,
    rawText: buildPacketRawText({
      candidateName: snapshot.candidateName,
      location: snapshot.location,
      email: snapshot.email,
      phone: snapshot.phone,
      workAuthorization: snapshot.workAuthorization,
      roleHeadline: "Junior Frontend Developer",
      summary:
        "Self-taught frontend-leaning software developer with strongest proof in React-based product work, TypeScript, API integration, and user-facing feature delivery. Brings portfolio-driven evidence, strong communication, fast learning velocity, and hands-on experience building polished application flows with real persistence and state management.",
      skillHighlights: [
        "React",
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "React Native",
        "Next.js",
        "REST APIs",
        "Git",
        "SQL",
        "Supabase",
        "Node.js exposure",
      ],
      sections: compassSections,
    }),
    status: "Tailored packet updated with Atlas — ready for review",
    targetCompany: "Compass Insurance Advisors",
    targetRole: "Junior Frontend Developer",
    targetLocation: "Draper, UT 84020",
    fitLabel: "apply-now",
    totalScore: 92,
    compensation: "From $24 an hour",
    sourceUrl: "https://www.indeed.com/viewjob?jk=e927c0ad53aa8d9f",
    positionSummary:
      "Entry-level in-person Draper role focused on React-based UI work, REST integrations, and maintenance of existing PHP and Laravel applications.",
    companySummary:
      "Utah insurance advisory company building software for health, Medicare, group, life, and supplemental insurance workflows.",
    requirements: [
      "Recent graduate or self-taught candidate with a strong portfolio.",
      "Working knowledge of HTML, CSS or SCSS, JavaScript, and Bootstrap.",
      "Familiarity with React or another modern JavaScript framework.",
      "Some exposure to Laravel, PHP, MySQL, and Node.js.",
      "Comfort working with REST APIs and Git version control.",
      "Strong problem-solving, communication, and willingness to learn.",
    ],
    atsKeywords: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "SCSS",
      "Bootstrap",
      "REST APIs",
      "Git",
      "Node.js",
      "portfolio",
      "frontend",
      "self-taught",
      "communication",
      "problem-solving",
    ],
    emphasize: [
      "Portfolio-backed self-taught proof",
      "React and TypeScript product work across mobile and web",
      "REST integrations and typed stateful UI flows",
      "Atlas and VocalLearn as end-to-end React Native client work",
      "Fast learning and willingness to step into Laravel or PHP-adjacent work",
      "Communication and ownership from prior operations and sales work",
    ],
    downplay: [
      "Deep trading-system detail that does not support frontend relevance",
      "AI orchestration jargon — frame Atlas as mobile + API product work",
      "Education ambiguity until the wording is finalized once",
    ],
    exportHtmlPath: "/resume-exports/compass-junior-frontend-developer.html",
    exportDocxPath: "/resume-exports/compass-junior-frontend-developer.docx",
  };

  return [controlPacket, compassPacket];
}

export function getResumePacket(slug: string) {
  return getResumePackets().find((packet) => packet.slug === slug) ?? null;
}