import {
  buildPositionSummary,
  buildRequirementsSummary,
  classifySeniority,
  cleanText,
  inferDegreeRequirement,
  inferEmploymentType,
  inferInternshipFlag,
  inferRemoteType,
  extractPositionSummaryFromHtml,
  extractRequirementsListFromHtml,
  normalizeDate,
  parseCompensation,
} from "./helpers";
import type { GreenhouseTarget, LiveAdapterKey, NormalizedJobListing } from "./types";

type GreenhouseMetadataItem = {
  name?: string;
  value?: string;
};

type GreenhouseJob = {
  id: number | string;
  absolute_url: string;
  title: string;
  company_name?: string;
  first_published?: string;
  updated_at?: string;
  content?: string;
  location?: {
    name?: string;
  };
  offices?: Array<{
    name?: string;
  }>;
  metadata?: GreenhouseMetadataItem[];
};

type GreenhouseResponse = {
  jobs: GreenhouseJob[];
};

type GreenhouseBoardSourceTarget = {
  adapterKey: LiveAdapterKey;
  sourceName: NormalizedJobListing["sourceName"];
  targetName: string;
  companyName: string;
  boardToken: string;
  companySummary?: string;
  companyWebsite?: string;
};

function metadataSummary(items: GreenhouseMetadataItem[] | undefined) {
  return (items ?? [])
    .map((item) => `${item.name ?? ""} ${item.value ?? ""}`.trim())
    .filter(Boolean)
    .join(" ");
}

function locationSummary(job: GreenhouseJob) {
  const officeLocations = (job.offices ?? [])
    .map((office) => office.name?.trim())
    .filter((office): office is string => Boolean(office));

  return job.location?.name ?? officeLocations.join(", ") ?? "Location not listed";
}

export async function fetchGreenhouseBoardJobs(target: GreenhouseBoardSourceTarget) {
  const response = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${target.boardToken}/jobs?content=true`,
    {
      headers: {
        "user-agent": "CareerDashboard/0.1 (local ingestion)",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Greenhouse request failed for ${target.boardToken}: ${response.status}`);
  }

  const payload = (await response.json()) as GreenhouseResponse;

  return payload.jobs.map<NormalizedJobListing>((job) => {
    const locationText = locationSummary(job);
    const description = cleanText(job.content ?? "");
    const metadataText = metadataSummary(job.metadata);
    const bodyText = `${metadataText} ${description}`;
    const compensation = parseCompensation(`${metadataText} ${description}`);
    const remoteType = inferRemoteType(locationText, bodyText);
    const positionSummary = job.content
      ? extractPositionSummaryFromHtml(job.content, bodyText)
      : buildPositionSummary(bodyText);
    const requirementsList = job.content
      ? extractRequirementsListFromHtml(job.content, bodyText)
      : [];

    return {
      adapterKey: target.adapterKey,
      sourceName: target.sourceName,
      targetName: target.targetName,
      sourceJobId: String(job.id),
      canonicalUrl: job.absolute_url,
      companyName: target.companyName || job.company_name || target.boardToken,
      title: job.title,
      locationText,
      remoteType,
      employmentType: inferEmploymentType(`${metadataText} ${job.title}`),
      compensationRaw: compensation.raw,
      compensationLow: compensation.low,
      compensationHigh: compensation.high,
      description,
      requirementsSummary: buildRequirementsSummary(description),
      requirementsList,
      positionSummary,
      companySummary: target.companySummary ?? null,
      companyWebsite: target.companyWebsite ?? null,
      seniorityHint: classifySeniority(job.title, bodyText),
      degreeRequirement: inferDegreeRequirement(description),
      internshipFlag: inferInternshipFlag(job.title, description),
      postedDate: normalizeDate(job.first_published ?? job.updated_at),
      rawPayload: JSON.stringify(job),
    };
  });
}

export async function fetchGreenhouseJobs(target: GreenhouseTarget) {
  return fetchGreenhouseBoardJobs(target);
}