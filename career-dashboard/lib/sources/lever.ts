import {
  buildPositionSummary,
  buildRequirementsList,
  buildRequirementsSummary,
  classifySeniority,
  cleanText,
  inferDegreeRequirement,
  inferEmploymentType,
  inferInternshipFlag,
  inferRemoteType,
  normalizeDate,
  parseCompensation,
} from "./helpers";
import type { LeverTarget, NormalizedJobListing } from "./types";

type LeverPosting = {
  id: string;
  text: string;
  description?: string;
  descriptionPlain?: string;
  additional?: string;
  additionalPlain?: string;
  createdAt?: number;
  hostedUrl?: string;
  categories?: {
    commitment?: string;
    location?: string;
    allLocations?: string;
  };
  workplaceType?: string;
  lists?: Array<{
    text?: string;
    content?: Array<{
      text?: string;
    }>;
  }>;
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
    interval?: string;
  };
};

function listSummary(lists: LeverPosting["lists"]) {
  return (lists ?? [])
    .flatMap((list) => [
      list?.text,
      ...(list?.content ?? []).map((item) => item.text),
    ])
    .filter((value): value is string => Boolean(value))
    .join(" ");
}

export async function fetchLeverJobs(target: LeverTarget) {
  const response = await fetch(`https://api.lever.co/v0/postings/${target.account}?mode=json`, {
    headers: {
      "user-agent": "CareerDashboard/0.1 (local ingestion)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Lever request failed for ${target.account}: ${response.status}`);
  }

  const payload = (await response.json()) as LeverPosting[];

  return payload.map<NormalizedJobListing>((posting) => {
    const structuredListText = listSummary(posting.lists);
    const description = cleanText(
      [
        posting.descriptionPlain,
        posting.description,
        posting.additionalPlain,
        posting.additional,
        structuredListText,
      ]
        .filter(Boolean)
        .join(" "),
    );
    const locationText =
      posting.categories?.allLocations ?? posting.categories?.location ?? "Location not listed";
    const salaryText = posting.salaryRange
      ? `${posting.salaryRange.min ?? ""}-${posting.salaryRange.max ?? ""} ${posting.salaryRange.interval ?? ""}`
      : description;
    const compensation = parseCompensation(salaryText);

    return {
      adapterKey: target.adapterKey,
      sourceName: target.sourceName,
      targetName: target.targetName,
      sourceJobId: posting.id,
      canonicalUrl: posting.hostedUrl ?? `https://jobs.lever.co/${target.account}/${posting.id}`,
      companyName: target.companyName,
      title: posting.text,
      locationText,
      remoteType: inferRemoteType(
        `${locationText} ${posting.workplaceType ?? ""}`,
        `${description} ${posting.workplaceType ?? ""}`,
      ),
      employmentType: inferEmploymentType(
        `${posting.categories?.commitment ?? ""} ${posting.workplaceType ?? ""} ${posting.text}`,
      ),
      compensationRaw: compensation.raw,
      compensationLow: compensation.low,
      compensationHigh: compensation.high,
      description,
      requirementsSummary: buildRequirementsSummary(description),
      requirementsList: buildRequirementsList(structuredListText || description),
      positionSummary: buildPositionSummary(description),
      companySummary: target.companySummary ?? null,
      companyWebsite: target.companyWebsite ?? null,
      seniorityHint: classifySeniority(posting.text, description),
      degreeRequirement: inferDegreeRequirement(description),
      internshipFlag: inferInternshipFlag(posting.text, description),
      postedDate: normalizeDate(posting.createdAt),
      rawPayload: JSON.stringify(posting),
    };
  });
}