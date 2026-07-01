import type { DatabaseLike, FitLabel } from "../../db/schema";

type CandidateProfileRow = {
  compensationBaselineHourly: number;
  commuteRadiusMinutes: number;
  degreeStatus: string;
  internshipEligibility: number;
  location: string;
  workAuthorization: string;
};

type JobRow = {
  id: number;
  title: string;
  companyName: string;
  locationText: string;
  remoteType: string;
  employmentType: string;
  compensationRaw: string | null;
  compensationLow: number | null;
  compensationHigh: number | null;
  description: string;
  requirementsSummary: string;
  seniorityHint: string;
  degreeRequirement: string;
  internshipFlag: number;
  sourceReliability: number | null;
};

type EvaluationResult = {
  accessFitScore: number;
  skillFitScore: number;
  growthFitScore: number;
  opportunityQualityScore: number;
  evidenceConfidenceScore: number;
  totalScore: number;
  fitLabel: FitLabel;
  blockers: string[];
  rationaleSummary: string;
};

const annualHours = 2080;
const localAreaTerms = [
  "salt lake city",
  "salt lake",
  "murray",
  "midvale",
  "draper",
  "sandy",
  "south jordan",
  "west jordan",
  "west valley",
  "cottonwood heights",
] as const;
const widerUtahTerms = ["american fork", "lehi", "kaysville", "ogden", "provo", "orem", "logan", "moab"] as const;
const strengthKeywordSets = [
  { terms: ["react", "next.js", "nextjs"], points: 7, note: "React and product UI work line up with current proof" },
  { terms: ["typescript", "javascript"], points: 6, note: "TypeScript or JavaScript requirements match the current stack" },
  { terms: ["python", "rust", "automation", "api"], points: 5, note: "Backend and automation work still connect to existing projects" },
  { terms: ["full-stack", "frontend", "software engineer", "developer", "internal tools"], points: 5, note: "The role sits inside the target job family" },
] as const;
const seniorityPenaltyTerms = ["senior", "staff", "principal", "lead", "architect", "manager", "director"] as const;
const targetRoleTerms = [
  "software engineer",
  "software developer",
  "full-stack",
  "full stack",
  "frontend",
  "front end",
  "backend",
  "back end",
  "web engineer",
  "platform engineer",
  "application engineer",
  "developer",
  "automation engineer",
  "ai engineer",
  "internal tools",
  "qa engineer",
  "test engineer",
] as const;
const nonTargetRoleTerms = [
  "account executive",
  "customer success",
  "sales",
  "marketing",
  "recruiter",
  "talent",
  "people ops",
  "people operations",
  "human resources",
  "product manager",
  "designer",
  "brand",
  "finance",
  "accounting",
  "legal",
  "paralegal",
  "attorney",
  "lawyer",
  "counsel",
  "operations",
  "business analyst",
  "strategy",
  "account manager",
  "territory",
  "support specialist",
] as const;
const authorizationTerms = [
  "visa sponsorship",
  "h-1b",
  "h1b",
  "opt",
  "cpt",
  "must be authorized",
  "authorized to work in the u.s.",
  "authorized to work in the us",
] as const;
const hardBlockerTerms = {
  degree: ["bachelor's degree required", "bs required", "degree required"],
  internship: ["currently enrolled", "active student", "returning to school"],
} as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function containsAny(value: string, terms: readonly string[]) {
  return terms.some((term) => value.includes(term));
}

function cleanText(value: string | null | undefined) {
  return (value ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

function extractYears(value: string) {
  const match = value.match(/(\d+)\+?\s+years?/i);

  return match ? Number(match[1]) : null;
}

function annualCompensationFloor(profile: CandidateProfileRow) {
  return profile.compensationBaselineHourly * annualHours;
}

function evaluateAccess(job: JobRow, profile: CandidateProfileRow) {
  const haystack = cleanText(
    `${job.title} ${job.locationText} ${job.remoteType} ${job.description} ${job.requirementsSummary}`,
  );
  const locationText = cleanText(job.locationText);
  const blockers: string[] = [];
  const risks: string[] = [];
  const positives: string[] = [];
  let score = 0;

  const isRemote = job.remoteType.toLowerCase().includes("remote");
  const isLocalArea = containsAny(locationText, localAreaTerms);
  const isWiderUtah = containsAny(locationText, widerUtahTerms);
  const isUtahLocation = /\b(?:ut|utah)\b/.test(locationText);
  const mentionsUnitedStates = /(united states|u\.s\.| usa |\bus\b|us-only)/i.test(haystack);
  const mentionsAuthorization = containsAny(haystack, authorizationTerms);

  if (isRemote && (mentionsUnitedStates || locationText.includes("remote"))) {
    score += 18;
    positives.push("Remote access fits the US-only search guardrail");
  } else if (isLocalArea) {
    score += job.remoteType.toLowerCase().includes("hybrid") ? 16 : 14;
    positives.push("The location looks realistic from Salt Lake Valley");
  } else if (isUtahLocation) {
    score += 11;
    positives.push("The role is local to Utah even if it sits outside the core Salt Lake commute band");

    if (isWiderUtah) {
      risks.push("Commute looks longer than the original Salt Lake target, but still within Utah-local scope");
    }
  } else {
    blockers.push("Location falls outside the current search radius");
  }

  if (mentionsAuthorization) {
    positives.push("Authorization language stays compatible with the current US-citizen profile");
  }

  score += 5;

  if (job.degreeRequirement === "Bachelor's degree required") {
    blockers.push("Degree listed as mandatory");
  } else if (job.degreeRequirement === "Equivalent experience accepted") {
    score += 4;
    positives.push("Degree language leaves room for project-based evidence");
  } else {
    score += 2;
  }

  if (
    job.internshipFlag &&
    !profile.internshipEligibility &&
    containsAny(haystack, hardBlockerTerms.internship)
  ) {
    blockers.push("Internship language expects active current enrollment");
  } else {
    score += 1;
  }

  const compensationFloor = annualCompensationFloor(profile);
  const compensationReference = job.compensationLow ?? job.compensationHigh;

  if (compensationReference == null) {
    score += 1;
    risks.push("Compensation is not listed yet");
  } else if (compensationReference >= compensationFloor) {
    score += 4;
    positives.push("Compensation clears the current baseline");
  } else {
    score -= 2;
    risks.push("Compensation may land below the current baseline");
  }

  return {
    score: clamp(score, 0, 30),
    blockers,
    positives,
    risks,
  };
}

function evaluateSkillFit(job: JobRow) {
  const haystack = cleanText(`${job.title} ${job.description} ${job.requirementsSummary}`);
  const titleHaystack = cleanText(job.title);
  const positives: string[] = [];
  const risks: string[] = [];
  let score = 8;

  if (!containsAny(titleHaystack, targetRoleTerms) && containsAny(titleHaystack, nonTargetRoleTerms)) {
    score -= 18;
    risks.push("The title reads outside the target software-engineering search");
  } else if (!containsAny(haystack, targetRoleTerms) && containsAny(haystack, nonTargetRoleTerms)) {
    score -= 16;
    risks.push("The role family looks outside the target software-engineering search");
  }

  if (containsAny(haystack, ["junior", "entry-level", "entry level", "early career", "associate", "apprentice"])) {
    score += 8;
    positives.push("The title or description signals early-career expectations");
  }

  for (const keywordSet of strengthKeywordSets) {
    if (containsAny(haystack, keywordSet.terms)) {
      score += keywordSet.points;
      positives.push(keywordSet.note);
    }
  }

  if (containsAny(haystack, seniorityPenaltyTerms)) {
    score -= 10;
    risks.push("The posting still reads as senior-leaning");
  }

  if (job.seniorityHint === "senior") {
    score -= 12;
    risks.push("The role is clearly positioned above junior level");
  }

  if (job.seniorityHint === "leadership") {
    score -= 18;
    risks.push("The role is leadership-oriented rather than early-career");
  }

  const years = extractYears(haystack);

  if (years != null) {
    if (years >= 5) {
      score -= 10;
      risks.push("Experience expectations look meaningfully above current depth");
    } else if (years >= 3) {
      score -= 6;
      risks.push("Experience expectations are still a noticeable stretch");
    } else if (years >= 2) {
      score -= 2;
    }
  }

  return {
    score: clamp(score, 0, 30),
    positives,
    risks,
  };
}

function evaluateGrowthFit(job: JobRow) {
  const haystack = cleanText(`${job.title} ${job.description} ${job.requirementsSummary}`);
  const positives: string[] = [];
  let score = 6;

  if (containsAny(haystack, ["mentor", "mentorship", "early career", "junior", "learning"])) {
    score += 6;
    positives.push("The role hints at a learning-friendly environment");
  }

  if (containsAny(haystack, ["product", "customer", "cross-functional", "iterate", "collaborate"])) {
    score += 4;
    positives.push("Day-to-day work sounds product-facing rather than narrow maintenance only");
  }

  if (containsAny(haystack, ["startup", "ownership", "build", "ship"])) {
    score += 4;
  }

  if (containsAny(haystack, ["phd", "research scientist", "machine learning research"])) {
    score -= 4;
  }

  return {
    score: clamp(score, 0, 20),
    positives,
  };
}

function evaluateOpportunityQuality(job: JobRow) {
  let score = Math.round((job.sourceReliability ?? 0) / 12);

  if ((job.description?.length ?? 0) > 400) {
    score += 1;
  }

  if (job.compensationRaw) {
    score += 1;
  }

  return clamp(score, 0, 10);
}

function evaluateEvidenceConfidence(job: JobRow) {
  let score = 0;

  if (job.locationText) {
    score += 2;
  }

  if ((job.description?.length ?? 0) > 250) {
    score += 3;
  }

  if (job.compensationRaw || job.compensationLow || job.compensationHigh) {
    score += 2;
  }

  if (job.degreeRequirement !== "Not specified") {
    score += 1;
  }

  if (job.remoteType && job.employmentType) {
    score += 2;
  }

  return clamp(score, 0, 10);
}

function buildRationale(
  access: ReturnType<typeof evaluateAccess>,
  skill: ReturnType<typeof evaluateSkillFit>,
  growth: ReturnType<typeof evaluateGrowthFit>,
) {
  const sentences: string[] = [];
  const positives = [...access.positives, ...skill.positives, ...growth.positives].slice(0, 2);
  const risks = [...access.risks, ...skill.risks];

  if (positives.length > 0) {
    sentences.push(`${positives.join(". ")}.`);
  }

  if (access.blockers.length > 0) {
    sentences.push(`${access.blockers[0]}.`);
  } else if (risks.length > 0) {
    sentences.push(`${risks[0]}.`);
  }

  return sentences.join(" ").replace(/\.\./g, ".").trim();
}

function evaluateJob(job: JobRow, profile: CandidateProfileRow): EvaluationResult {
  const access = evaluateAccess(job, profile);
  const skill = evaluateSkillFit(job);
  const growth = evaluateGrowthFit(job);
  const opportunityQualityScore = evaluateOpportunityQuality(job);
  const evidenceConfidenceScore = evaluateEvidenceConfidence(job);
  const blockers = [...access.blockers];

  if (job.seniorityHint === "senior" || job.seniorityHint === "leadership") {
    blockers.push("Role is clearly senior-level relative to the target search");
  }

  const roleHaystack = cleanText(`${job.title} ${job.description} ${job.requirementsSummary}`);
  const titleHaystack = cleanText(job.title);

  if (!containsAny(titleHaystack, targetRoleTerms) && containsAny(titleHaystack, nonTargetRoleTerms)) {
    blockers.push("Role title sits outside the targeted software search");
  } else if (!containsAny(roleHaystack, targetRoleTerms) && containsAny(roleHaystack, nonTargetRoleTerms)) {
    blockers.push("Role family sits outside the targeted software search");
  }

  const totalScore = clamp(
    access.score + skill.score + growth.score + opportunityQualityScore + evidenceConfidenceScore,
    0,
    100,
  );
  const fitLabel: FitLabel = blockers.length > 0
    ? "blocked"
    : totalScore >= 80
      ? "apply-now"
      : totalScore >= 65
        ? "apply-with-tailoring"
        : totalScore >= 50
          ? "stretch"
          : "ignore";

  return {
    accessFitScore: access.score,
    skillFitScore: skill.score,
    growthFitScore: growth.score,
    opportunityQualityScore,
    evidenceConfidenceScore,
    totalScore,
    fitLabel,
    blockers,
    rationaleSummary: buildRationale(access, skill, growth),
  };
}

export function syncJobEvaluations(database: DatabaseLike) {
  const profile = database
    .prepare<CandidateProfileRow>(
      `
        SELECT
          compensation_baseline_hourly AS compensationBaselineHourly,
          commute_radius_minutes AS commuteRadiusMinutes,
          degree_status AS degreeStatus,
          internship_eligibility AS internshipEligibility,
          location AS location,
          work_authorization AS workAuthorization
        FROM candidate_profile
        LIMIT 1
      `,
    )
    .get();

  if (!profile) {
    return;
  }

  const jobs = database
    .prepare<JobRow>(
      `
        SELECT
          jobs.id AS id,
          jobs.title AS title,
          jobs.company_name AS companyName,
          jobs.location_text AS locationText,
          jobs.remote_type AS remoteType,
          jobs.employment_type AS employmentType,
          jobs.compensation_raw AS compensationRaw,
          jobs.compensation_low AS compensationLow,
          jobs.compensation_high AS compensationHigh,
          jobs.description AS description,
          jobs.requirements_summary AS requirementsSummary,
          jobs.seniority_hint AS seniorityHint,
          jobs.degree_requirement AS degreeRequirement,
          jobs.internship_flag AS internshipFlag,
          job_sources.reliability_score AS sourceReliability
        FROM jobs
        LEFT JOIN job_sources ON job_sources.id = jobs.source_id
      `,
    )
    .all();

  const upsertEvaluation = database.prepare(
    `
      INSERT INTO job_evaluations (
        job_id,
        access_fit_score,
        skill_fit_score,
        growth_fit_score,
        opportunity_quality_score,
        evidence_confidence_score,
        total_score,
        fit_label,
        blockers,
        rationale_summary,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(job_id) DO UPDATE SET
        access_fit_score = excluded.access_fit_score,
        skill_fit_score = excluded.skill_fit_score,
        growth_fit_score = excluded.growth_fit_score,
        opportunity_quality_score = excluded.opportunity_quality_score,
        evidence_confidence_score = excluded.evidence_confidence_score,
        total_score = excluded.total_score,
        fit_label = excluded.fit_label,
        blockers = excluded.blockers,
        rationale_summary = excluded.rationale_summary,
        updated_at = excluded.updated_at
    `,
  );

  const timestamp = new Date().toISOString();

  database.exec("BEGIN IMMEDIATE TRANSACTION");

  try {
    for (const job of jobs) {
      const evaluation = evaluateJob(job, profile);

      upsertEvaluation.run(
        job.id,
        evaluation.accessFitScore,
        evaluation.skillFitScore,
        evaluation.growthFitScore,
        evaluation.opportunityQualityScore,
        evaluation.evidenceConfidenceScore,
        evaluation.totalScore,
        evaluation.fitLabel,
        JSON.stringify(evaluation.blockers),
        evaluation.rationaleSummary,
        timestamp,
      );
    }

    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}