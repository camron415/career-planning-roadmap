import { db } from "@/db/client";
import type { FitLabel } from "@/db/schema";
import type { SeniorityHint } from "@/lib/sources/types";

export type DashboardFilters = {
  workplace: "all" | "remote" | "local";
  scoreBand: "all" | FitLabel;
  compensation: "all" | "meets-baseline" | "unknown";
  source: string;
  seniority: "all" | "exclude-senior" | "junior-only";
  blocked: "show" | "hide";
  duplicates: "show" | "hide";
};

export type CandidateProfile = {
  candidateName: string;
  location: string;
  compensationBaselineHourly: number;
  commuteRadiusMinutes: number;
  remoteRegions: string[];
  workAuthorization: string;
  degreeStatus: string;
  internshipEligibility: boolean;
  summary: string;
  updatedAt: string;
};

export type DashboardJob = {
  id: number;
  companyName: string;
  title: string;
  locationText: string;
  remoteType: string;
  employmentType: string;
  sourceDetail: string | null;
  canonicalUrl: string;
  compensationRaw: string | null;
  compensationLow: number | null;
  compensationHigh: number | null;
  sourceName: string;
  companySummary: string | null;
  companyWebsite: string | null;
  positionSummary: string;
  requirementsList: string[];
  seniorityHint: SeniorityHint;
  postedDate: string;
  degreeRequirement: string;
  status: string;
  accessFitScore: number;
  skillFitScore: number;
  growthFitScore: number;
  totalScore: number;
  fitLabel: FitLabel;
  blockers: string[];
  rationaleSummary: string;
};

export type RoadmapPreviewItem = {
  title: string;
  category: string;
  linkedProject: string | null;
  expectedImpact: string;
  timeEstimate: string;
  priority: number;
};

export type PreparationPlanItem = {
  id: string;
  title: string;
  supportCount: number;
  supportLabel: string;
  whyItMatters: string;
  whatToStudy: string[];
  implementationIdeas: string[];
  roleSignals: string[];
  timeEstimate: string;
  priority: number;
};

export type PreparationSequenceItem = {
  label: string;
  focus: string;
  objective: string;
  deliverable: string;
};

export type PreparationSnapshot = {
  profile: CandidateProfile;
  analyzedJobCount: number;
  applyNowCount: number;
  lastUpdatedAt: string | null;
  focusAreas: PreparationPlanItem[];
  sequence: PreparationSequenceItem[];
};

type SummaryRow = {
  totalJobs: number | null;
  applyNowCount: number | null;
  blockedCount: number | null;
  averageScore: number | null;
  lastUpdatedAt: string | null;
};

type JobRow = {
  id: number;
  companyName: string;
  title: string;
  locationText: string;
  remoteType: string;
  employmentType: string;
  sourceDetail: string | null;
  canonicalUrl: string;
  compensationRaw: string | null;
  compensationLow: number | null;
  compensationHigh: number | null;
  sourceName: string | null;
  companySummary: string | null;
  companyWebsite: string | null;
  positionSummary: string;
  requirementsSummary: string;
  requirementsList: string;
  seniorityHint: string;
  postedDate: string;
  degreeRequirement: string;
  status: string;
  accessFitScore: number;
  skillFitScore: number;
  growthFitScore: number;
  totalScore: number;
  fitLabel: FitLabel;
  blockers: string;
  rationaleSummary: string;
};

type CandidateProfileRow = {
  candidateName: string;
  location: string;
  compensationBaselineHourly: number;
  commuteRadiusMinutes: number;
  remoteRegions: string;
  workAuthorization: string;
  degreeStatus: string;
  internshipEligibility: number;
  summary: string;
  updatedAt: string;
};

type RoadmapRow = {
  title: string;
  category: string;
  linkedProject: string | null;
  expectedImpact: string;
  timeEstimate: string;
  priority: number;
};

type SourceRow = {
  name: string;
  sourceType: string;
  baseUrl: string;
  reliabilityScore: number;
  fetchMethod: string;
};

type SystemCountsRow = {
  sourceCount: number | null;
  companyCount: number | null;
  roadmapCount: number | null;
};

type FilterSummary = {
  visibleJobs: number;
  totalJobs: number;
  applyNowCount: number;
  blockedCount: number;
  liveJobCount: number;
  averageScore: number;
  lastUpdatedAt: string | null;
  hiddenDuplicateCount: number;
};

function toNumber(value: number | null | undefined) {
  return Number(value ?? 0);
}

function parseStringArray(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function parseSingleSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

function buildRequirementFallbackList(value: string) {
  return value
    .split(/,|;|\.|\u2022/)
    .map((part) => part.trim())
    .filter((part) => part.length > 10)
    .slice(0, 5);
}

function normalizeDuplicatePart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildDuplicateKey(job: DashboardJob) {
  return [job.companyName, job.title, job.locationText]
    .map(normalizeDuplicatePart)
    .join("|");
}

function buildJobSearchText(job: DashboardJob) {
  return [job.title, job.positionSummary, job.requirementsList.join(" "), job.rationaleSummary]
    .join(" ")
    .toLowerCase();
}

function applyDuplicateFilter(jobs: DashboardJob[], filter: DashboardFilters["duplicates"]) {
  if (filter === "show") {
    return {
      jobs,
      hiddenDuplicateCount: 0,
    };
  }

  const seen = new Set<string>();
  let hiddenDuplicateCount = 0;
  const uniqueJobs: DashboardJob[] = [];

  for (const job of jobs) {
    const key = buildDuplicateKey(job);

    if (seen.has(key)) {
      hiddenDuplicateCount += 1;
      continue;
    }

    seen.add(key);
    uniqueJobs.push(job);
  }

  return {
    jobs: uniqueJobs,
    hiddenDuplicateCount,
  };
}

function normalizeSeniorityHint(value: string | null | undefined): SeniorityHint {
  if (
    value === "entry-level" ||
    value === "mid-level" ||
    value === "senior" ||
    value === "leadership"
  ) {
    return value;
  }

  return "unknown";
}

function averageScore(jobs: DashboardJob[]) {
  if (jobs.length === 0) {
    return 0;
  }

  const total = jobs.reduce((sum, job) => sum + job.totalScore, 0);

  return Math.round(total / jobs.length);
}

function matchesWorkplace(job: DashboardJob, workplace: DashboardFilters["workplace"]) {
  if (workplace === "all") {
    return true;
  }

  const isRemote = job.remoteType.toLowerCase().includes("remote");

  return workplace === "remote" ? isRemote : !isRemote;
}

function compensationMeetsBaseline(job: DashboardJob, baselineHourly: number) {
  const referenceValue = job.compensationLow ?? job.compensationHigh;

  if (referenceValue == null) {
    return false;
  }

  return referenceValue >= baselineHourly * 2080;
}

function matchesCompensation(job: DashboardJob, filter: DashboardFilters["compensation"], baselineHourly: number) {
  if (filter === "all") {
    return true;
  }

  if (filter === "unknown") {
    return job.compensationLow == null && job.compensationHigh == null;
  }

  return compensationMeetsBaseline(job, baselineHourly);
}

function matchesSeniority(job: DashboardJob, filter: DashboardFilters["seniority"]) {
  if (filter === "all") {
    return true;
  }

  if (filter === "junior-only") {
    return job.seniorityHint === "entry-level";
  }

  return job.seniorityHint !== "senior" && job.seniorityHint !== "leadership";
}

function matchesBlocked(job: DashboardJob, filter: DashboardFilters["blocked"]) {
  if (filter === "show") {
    return true;
  }

  return job.fitLabel !== "blocked";
}

function queryDashboardJobs() {
  return db
    .prepare<JobRow>(
      `
        SELECT
          jobs.id AS id,
          jobs.company_name AS companyName,
          jobs.title AS title,
          jobs.location_text AS locationText,
          jobs.remote_type AS remoteType,
          jobs.employment_type AS employmentType,
          jobs.source_detail AS sourceDetail,
          jobs.canonical_url AS canonicalUrl,
          jobs.compensation_raw AS compensationRaw,
          jobs.compensation_low AS compensationLow,
          jobs.compensation_high AS compensationHigh,
          job_sources.name AS sourceName,
          companies.notes AS companySummary,
          companies.website AS companyWebsite,
          jobs.position_summary AS positionSummary,
          jobs.requirements_summary AS requirementsSummary,
          jobs.requirements_list AS requirementsList,
          jobs.seniority_hint AS seniorityHint,
          jobs.posted_date AS postedDate,
          jobs.degree_requirement AS degreeRequirement,
          jobs.status AS status,
          job_evaluations.access_fit_score AS accessFitScore,
          job_evaluations.skill_fit_score AS skillFitScore,
          job_evaluations.growth_fit_score AS growthFitScore,
          job_evaluations.total_score AS totalScore,
          job_evaluations.fit_label AS fitLabel,
          job_evaluations.blockers AS blockers,
          job_evaluations.rationale_summary AS rationaleSummary
        FROM jobs
        INNER JOIN job_evaluations ON job_evaluations.job_id = jobs.id
        LEFT JOIN job_sources ON job_sources.id = jobs.source_id
        LEFT JOIN companies ON companies.company_name = jobs.company_name
        ORDER BY job_evaluations.total_score DESC, jobs.posted_date DESC
      `,
    )
    .all()
    .map((row) => ({
      id: toNumber(row.id),
      companyName: row.companyName,
      title: row.title,
      locationText: row.locationText,
      remoteType: row.remoteType,
      employmentType: row.employmentType,
      sourceDetail: row.sourceDetail,
      canonicalUrl: row.canonicalUrl,
      compensationRaw: row.compensationRaw,
      compensationLow: row.compensationLow,
      compensationHigh: row.compensationHigh,
      sourceName: row.sourceName ?? "Unknown source",
      companySummary: row.companySummary,
      companyWebsite: row.companyWebsite,
      positionSummary: row.positionSummary || row.rationaleSummary,
      requirementsList:
        parseStringArray(row.requirementsList).length > 0
          ? parseStringArray(row.requirementsList)
          : buildRequirementFallbackList(row.requirementsSummary),
      seniorityHint: normalizeSeniorityHint(row.seniorityHint),
      postedDate: row.postedDate,
      degreeRequirement: row.degreeRequirement,
      status: row.status,
      accessFitScore: toNumber(row.accessFitScore),
      skillFitScore: toNumber(row.skillFitScore),
      growthFitScore: toNumber(row.growthFitScore),
      totalScore: toNumber(row.totalScore),
      fitLabel: row.fitLabel,
      blockers: parseStringArray(row.blockers),
      rationaleSummary: row.rationaleSummary,
    }));
}

function filterDashboardJobs(
  jobs: DashboardJob[],
  filters: DashboardFilters,
  profile: CandidateProfile,
) {
  const filteredJobs = jobs.filter((job) => {
    const matchesSource = filters.source === "all" ? true : job.sourceName === filters.source;
    const matchesScoreBand = filters.scoreBand === "all" ? true : job.fitLabel === filters.scoreBand;

    return (
      matchesSource &&
      matchesScoreBand &&
      matchesWorkplace(job, filters.workplace) &&
      matchesCompensation(job, filters.compensation, profile.compensationBaselineHourly) &&
      matchesSeniority(job, filters.seniority) &&
      matchesBlocked(job, filters.blocked)
    );
  });

  return applyDuplicateFilter(filteredJobs, filters.duplicates);
}

type PreparationDefinition = {
  id: string;
  title: string;
  keywords: string[];
  whyItMatters: string;
  whatToStudy: string[];
  implementationIdeas: string[];
  timeEstimate: string;
  priority: number;
};

const preparationDefinitions: PreparationDefinition[] = [
  {
    id: "frontend-typescript",
    title: "TypeScript Frontend Delivery",
    keywords: ["typescript", "react", "angular", "javascript", "tailwind", "css", "scss", "bootstrap", "flutter", "dart"],
    whyItMatters:
      "Most of the Utah roles still center on product-facing UI work, typed frontend code, and component-level polish rather than algorithm-heavy interview prep alone.",
    whatToStudy: [
      "Practice building one fully typed feature end to end: form state, validation, loading states, error handling, and optimistic UI updates.",
      "Review component architecture basics: prop boundaries, reusable UI patterns, and when state should live in the component, page, or server layer.",
      "Brush up on Angular concepts at a translation level even if React stays your main stack: modules or standalone components, services, routing, and template-driven data flow.",
      "Do one styling pass focused on layout systems, spacing consistency, accessible states, and responsive behavior rather than only visual polish.",
    ],
    implementationIdeas: [
      "In VocalLearn, ship one polished dashboard or lesson-management surface with full TypeScript coverage and explicit loading, error, and empty states.",
      "Add a small component library pass: one shared form field, one reusable card/list layout, and one table or filter component used in multiple places.",
      "Create a short Angular translation note from one React feature you already built so you can explain how the same feature maps across frameworks in interviews.",
    ],
    timeEstimate: "3 focused sessions",
    priority: 1,
  },
  {
    id: "api-backend",
    title: "API Integration and Backend Contracts",
    keywords: ["api", "graphql", "rest", "restful", "node.js", "nodejs", "rails", "ruby on rails", "backend", "microservice", "service"],
    whyItMatters:
      "The strongest overlap across these roles is not just frontend work, but frontend plus API integration, backend reasoning, and clean service boundaries.",
    whatToStudy: [
      "Practice designing a simple request flow from UI action to API handler to storage write, with explicit validation and clear failure responses.",
      "Review REST basics deeply enough to explain resource shape, status codes, idempotency, pagination, and when GraphQL changes the tradeoff.",
      "Get comfortable reading existing backend code and tracing where business rules actually live, because several local roles expect integration with legacy or multi-service systems.",
      "Study queue, background-job, and webhook patterns at a conceptual level so you can speak about async workflows even if you have not run them at scale yet.",
    ],
    implementationIdeas: [
      "Add one real persistence-backed API workflow to VocalLearn, such as saving learner progress, bookmarks, or review history with server validation.",
      "Document the request contract for that feature in the repo: input, output, errors, and the expected UI states.",
      "In Career Dashboard, add one internal endpoint or server action that reshapes data for a future automation workflow instead of letting all logic live only in page components.",
    ],
    timeEstimate: "3-4 focused sessions",
    priority: 2,
  },
  {
    id: "sql-data",
    title: "SQL and Data Modeling",
    keywords: ["sql", "mysql", "postgres", "database", "relational", "schema", "query", "stored procedure"],
    whyItMatters:
      "Several of the Utah roles mention SQL, relational data, or API-backed business systems, and this is an area where practical project evidence is more persuasive than buzzwords.",
    whatToStudy: [
      "Practice writing SELECT, JOIN, GROUP BY, and basic filtering queries against your own project data until they feel routine rather than memorized.",
      "Review schema decisions: primary keys, foreign keys, indexes, and when denormalization is a convenience versus a problem.",
      "Learn how to explain one data model clearly: what the tables represent, why the relationships exist, and which queries the schema was designed to support.",
      "Do one pass on migration discipline: how schema changes stay safe, reversible, and traceable.",
    ],
    implementationIdeas: [
      "Add one reporting or history view to VocalLearn or Career Dashboard that requires a meaningful query instead of just dumping one table to the screen.",
      "Write a short note in the repo explaining the tables touched by that feature and the exact query shape you expect to run often.",
      "Add one migration that evolves an existing table cleanly, then validate it against real data rather than treating the database as disposable.",
    ],
    timeEstimate: "2-3 focused sessions",
    priority: 3,
  },
  {
    id: "testing-debugging",
    title: "Testing, Debugging, and Self-QA",
    keywords: ["test", "testing", "qa", "debug", "debugging", "self qa", "validation", "code review"],
    whyItMatters:
      "The local roles repeatedly reward engineers who can validate their own work, debug efficiently, and avoid shipping fragile features, especially in product or client-facing environments.",
    whatToStudy: [
      "Practice writing a small test triangle for one feature: unit test for logic, integration test for the workflow, and a manual smoke-check list for the UI.",
      "Build a debugging routine: reproduce, isolate, inspect inputs and outputs, reduce the failing case, and document the root cause after fixing it.",
      "Review common failure types in your projects: null states, stale UI, bad validation, missing loading states, and schema mismatches.",
      "Learn to narrate QA ownership in interviews: how you verify a feature before calling it done.",
    ],
    implementationIdeas: [
      "Add one tested feature to VocalLearn with a short QA checklist committed next to the code.",
      "Create a bug journal entry or issue template in one repo that captures reproduction steps, cause, fix, and regression check.",
      "Add one validation layer that prevents bad data from entering storage, then prove it with a test or a documented manual check.",
    ],
    timeEstimate: "2-3 focused sessions",
    priority: 4,
  },
  {
    id: "dotnet-enterprise",
    title: ".NET and Enterprise Stack Translation",
    keywords: ["c#", ".net", "asp.net", "azure"],
    whyItMatters:
      "A meaningful slice of the Utah-local roles touches C# or .NET, and you do not need to become a .NET specialist immediately to benefit from being conversational and adaptable here.",
    whatToStudy: [
      "Learn the translation layer between what you already know and the .NET world: controllers or handlers, dependency injection, services, DTOs, and entity models.",
      "Read one small ASP.NET example until you can explain request flow and how it compares with a Node or Next backend.",
      "Review C# syntax at a practical level: classes, interfaces, async or await, LINQ basics, and typed models.",
      "Understand the surrounding enterprise context: Azure hosting, internal systems, and legacy modernization work.",
    ],
    implementationIdeas: [
      "Build one tiny companion API in C# that mirrors a feature you already understand in JavaScript or TypeScript, then document the mapping between the two.",
      "If that is too much this week, write a comparison note between a Next server action or API route and an ASP.NET controller action.",
      "Use that comparison as interview prep so stretch roles feel less foreign when the stack includes C# or legacy services.",
    ],
    timeEstimate: "2 focused sessions",
    priority: 5,
  },
  {
    id: "delivery-communication",
    title: "Engineering Process and Communication",
    keywords: ["agile", "stakeholder", "documentation", "product", "client", "consultant", "git", "ci/cd", "deployment"],
    whyItMatters:
      "Across these roles, companies want someone who can work inside product processes, explain tradeoffs, read requirements carefully, and ship without constant hand-holding.",
    whatToStudy: [
      "Practice breaking one feature into a small implementation plan with assumptions, risks, acceptance criteria, and validation steps.",
      "Review Git workflows and code-review etiquette so you can talk about branching, PR size, review comments, and incremental delivery.",
      "Study the rhythm of agile execution: standups, ticket scopes, sprint planning, and how to raise blockers early.",
      "Strengthen written communication by writing short design notes or feature summaries instead of keeping all reasoning in your head.",
    ],
    implementationIdeas: [
      "For the next feature you polish in VocalLearn, write a one-page feature brief before coding: goal, user flow, data touched, edge cases, and validation plan.",
      "Add one short engineering note to the repo after each significant change so you build a habit of explaining system decisions clearly.",
      "Treat your current polish work like a real team sprint: define scope, ship a narrow slice, validate it, and log what changed.",
    ],
    timeEstimate: "ongoing through week two",
    priority: 6,
  },
];

function buildPreparationPlan(jobs: DashboardJob[]) {
  return preparationDefinitions
    .map<PreparationPlanItem | null>((definition) => {
      const supportingJobs = jobs.filter((job) => {
        const haystack = buildJobSearchText(job);

        return definition.keywords.some((keyword) => haystack.includes(keyword));
      });

      if (supportingJobs.length === 0) {
        return null;
      }

      const roleSignals = supportingJobs
        .slice(0, 4)
        .map((job) => `${job.companyName}: ${job.title}`);
      const companies = Array.from(new Set(supportingJobs.map((job) => job.companyName))).slice(0, 4);

      return {
        id: definition.id,
        title: definition.title,
        supportCount: supportingJobs.length,
        supportLabel: `Appears across ${supportingJobs.length} of ${jobs.length} Utah roles, including ${companies.join(", ")}.`,
        whyItMatters: definition.whyItMatters,
        whatToStudy: definition.whatToStudy,
        implementationIdeas: definition.implementationIdeas,
        roleSignals,
        timeEstimate: definition.timeEstimate,
        priority: definition.priority,
      };
    })
    .filter((item): item is PreparationPlanItem => Boolean(item))
    .sort((left, right) => left.priority - right.priority || right.supportCount - left.supportCount);
}

export function parseDashboardFilters(searchParams: Record<string, string | string[] | undefined>) {
  const workplace = parseSingleSearchParam(searchParams.workplace);
  const scoreBand = parseSingleSearchParam(searchParams.scoreBand);
  const compensation = parseSingleSearchParam(searchParams.compensation);
  const source = parseSingleSearchParam(searchParams.source);
  const seniority = parseSingleSearchParam(searchParams.seniority);
  const blocked = parseSingleSearchParam(searchParams.blocked);
  const duplicates = parseSingleSearchParam(searchParams.duplicates);

  return {
    workplace: workplace === "remote" || workplace === "local" ? workplace : "all",
    scoreBand:
      scoreBand === "apply-now" ||
      scoreBand === "apply-with-tailoring" ||
      scoreBand === "stretch" ||
      scoreBand === "blocked" ||
      scoreBand === "ignore"
        ? scoreBand
        : "all",
    compensation:
      compensation === "meets-baseline" || compensation === "unknown" ? compensation : "all",
    source: source && source !== "all" ? source : "all",
    seniority:
      seniority === "all" || seniority === "exclude-senior" || seniority === "junior-only"
        ? seniority
        : "exclude-senior",
    blocked: blocked === "show" ? "show" : "hide",
    duplicates: duplicates === "show" ? "show" : "hide",
  } satisfies DashboardFilters;
}

function getCandidateProfile(): CandidateProfile {
  const row = db
    .prepare<CandidateProfileRow>(
      `
        SELECT
          candidate_name AS candidateName,
          location AS location,
          compensation_baseline_hourly AS compensationBaselineHourly,
          commute_radius_minutes AS commuteRadiusMinutes,
          remote_regions AS remoteRegions,
          work_authorization AS workAuthorization,
          degree_status AS degreeStatus,
          internship_eligibility AS internshipEligibility,
          summary AS summary,
          updated_at AS updatedAt
        FROM candidate_profile
        LIMIT 1
      `,
    )
    .get();

  if (!row) {
    throw new Error("Candidate profile is missing from the local data store.");
  }

  return {
    candidateName: row.candidateName,
    location: row.location,
    compensationBaselineHourly: toNumber(row.compensationBaselineHourly),
    commuteRadiusMinutes: toNumber(row.commuteRadiusMinutes),
    remoteRegions: parseStringArray(row.remoteRegions),
    workAuthorization: row.workAuthorization,
    degreeStatus: row.degreeStatus,
    internshipEligibility: Boolean(row.internshipEligibility),
    summary: row.summary,
    updatedAt: row.updatedAt,
  };
}

export function getDashboardSnapshot(filters: DashboardFilters) {
  const summary =
    db.prepare<SummaryRow>(
      `
        SELECT
          COUNT(*) AS totalJobs,
          SUM(CASE WHEN fit_label = 'apply-now' THEN 1 ELSE 0 END) AS applyNowCount,
          SUM(CASE WHEN fit_label = 'blocked' THEN 1 ELSE 0 END) AS blockedCount,
          ROUND(AVG(total_score)) AS averageScore,
          MAX(updated_at) AS lastUpdatedAt
        FROM job_evaluations
      `,
    ).get() ?? null;

  const jobs = queryDashboardJobs();

  const profile = getCandidateProfile();
  const dedupedJobs = filterDashboardJobs(jobs, filters, profile);

  const roadmapItems = db
    .prepare<RoadmapRow>(
      `
        SELECT
          title AS title,
          category AS category,
          linked_project AS linkedProject,
          expected_impact AS expectedImpact,
          time_estimate AS timeEstimate,
          priority AS priority
        FROM roadmap_items
        ORDER BY priority ASC, id ASC
        LIMIT 3
      `,
    )
    .all()
    .map((row) => ({
      title: row.title,
      category: row.category,
      linkedProject: row.linkedProject,
      expectedImpact: row.expectedImpact,
      timeEstimate: row.timeEstimate,
      priority: toNumber(row.priority),
    }));

  return {
    profile,
    summary: {
      visibleJobs: dedupedJobs.jobs.length,
      totalJobs: jobs.length,
      applyNowCount: dedupedJobs.jobs.filter((job) => job.fitLabel === "apply-now").length,
      blockedCount: dedupedJobs.jobs.filter((job) => job.fitLabel === "blocked").length,
      liveJobCount: jobs.filter((job) => job.status === "live").length,
      averageScore: averageScore(dedupedJobs.jobs),
      lastUpdatedAt: summary?.lastUpdatedAt ?? null,
      hiddenDuplicateCount: dedupedJobs.hiddenDuplicateCount,
    } satisfies FilterSummary,
    filters,
    filterOptions: {
      sources: Array.from(new Set(jobs.map((job) => job.sourceName))).sort(),
    },
    jobs: dedupedJobs.jobs,
    roadmapItems,
  };
}

export function getPreparationSnapshot(): PreparationSnapshot {
  const profile = getCandidateProfile();
  const summary =
    db.prepare<SummaryRow>(
      `
        SELECT
          COUNT(*) AS totalJobs,
          SUM(CASE WHEN fit_label = 'apply-now' THEN 1 ELSE 0 END) AS applyNowCount,
          SUM(CASE WHEN fit_label = 'blocked' THEN 1 ELSE 0 END) AS blockedCount,
          ROUND(AVG(total_score)) AS averageScore,
          MAX(updated_at) AS lastUpdatedAt
        FROM job_evaluations
      `,
    ).get() ?? null;
  const jobs = queryDashboardJobs();
  const localPreparationJobs = filterDashboardJobs(
    jobs,
    {
      workplace: "local",
      scoreBand: "all",
      compensation: "all",
      source: "all",
      seniority: "exclude-senior",
      blocked: "hide",
      duplicates: "hide",
    },
    profile,
  ).jobs;
  const focusAreas = buildPreparationPlan(localPreparationJobs);

  return {
    profile,
    analyzedJobCount: localPreparationJobs.length,
    applyNowCount: localPreparationJobs.filter((job) => job.fitLabel === "apply-now").length,
    lastUpdatedAt: summary?.lastUpdatedAt ?? null,
    focusAreas,
    sequence: [
      {
        label: "Days 1-2",
        focus: "Ship one typed product feature",
        objective: "Turn your existing polish work into stronger frontend and API evidence.",
        deliverable: "One feature in VocalLearn with full TypeScript coverage, loading and error states, and a documented request flow.",
      },
      {
        label: "Days 3-4",
        focus: "Add persistence and SQL-backed reporting",
        objective: "Show you can move beyond UI polish into data modeling and real workflow support.",
        deliverable: "One saved workflow plus one query-backed history or analytics view in an existing project.",
      },
      {
        label: "Days 5-6",
        focus: "Harden with testing and QA",
        objective: "Build confidence around validation, debugging, and self-review before applications start.",
        deliverable: "One tested feature, one written QA checklist, and one bug-fix note that explains the root cause and regression check.",
      },
      {
        label: "Day 7",
        focus: "Stretch into enterprise translation",
        objective: "Make .NET and delivery-process roles feel less foreign without abandoning your stronger stack.",
        deliverable: "A small C# or architecture comparison note plus a feature brief that reads like a real team handoff.",
      },
    ],
  };
}

export function getSettingsSnapshot() {
  const sources = db
    .prepare<SourceRow>(
      `
        SELECT
          name AS name,
          source_type AS sourceType,
          base_url AS baseUrl,
          reliability_score AS reliabilityScore,
          fetch_method AS fetchMethod
        FROM job_sources
        WHERE active = 1
        ORDER BY reliability_score DESC, name ASC
      `,
    )
    .all()
    .map((row) => ({
      name: row.name,
      sourceType: row.sourceType,
      baseUrl: row.baseUrl,
      reliabilityScore: toNumber(row.reliabilityScore),
      fetchMethod: row.fetchMethod,
    }));

  const systemCounts =
    db.prepare<SystemCountsRow>(
      `
        SELECT
          (SELECT COUNT(*) FROM job_sources WHERE active = 1) AS sourceCount,
          (SELECT COUNT(*) FROM companies) AS companyCount,
          (SELECT COUNT(*) FROM roadmap_items) AS roadmapCount
      `,
    ).get() ?? null;

  return {
    profile: getCandidateProfile(),
    sources,
    systemCounts: {
      sourceCount: toNumber(systemCounts?.sourceCount),
      companyCount: toNumber(systemCounts?.companyCount),
      roadmapCount: toNumber(systemCounts?.roadmapCount),
    },
  };
}