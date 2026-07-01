import { load } from "cheerio";

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
import { fetchGreenhouseBoardJobs } from "./greenhouse";
import type { CompanyPageTarget, NormalizedJobListing } from "./types";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

function collectJobPostingNodes(value: JsonValue, results: JsonObject[] = []) {
  if (!value) {
    return results;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectJobPostingNodes(item, results);
    }

    return results;
  }

  if (typeof value === "object") {
    const typeField = value["@type"];
    const types = Array.isArray(typeField) ? typeField : [typeField];

    if (types.some((type) => type === "JobPosting")) {
      results.push(value);
    }

    for (const nestedValue of Object.values(value)) {
      collectJobPostingNodes(nestedValue, results);
    }
  }

  return results;
}

function locationSummary(node: JsonObject, target: CompanyPageTarget) {
  const jobLocation = node.jobLocation ?? node.applicantLocationRequirements;
  const values = Array.isArray(jobLocation) ? jobLocation : [jobLocation].filter(Boolean);
  const locations = values
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return null;
      }

      const address =
        entry.address && typeof entry.address === "object" && !Array.isArray(entry.address)
          ? entry.address
          : null;
      const parts = [
        typeof address?.addressLocality === "string" ? address.addressLocality : null,
        typeof address?.addressRegion === "string" ? address.addressRegion : null,
        typeof address?.addressCountry === "string" ? address.addressCountry : null,
        typeof entry.name === "string" ? entry.name : null,
      ].filter((part): part is string => Boolean(part));

      return parts.join(", ");
    })
    .filter((entry): entry is string => Boolean(entry));

  if (node.jobLocationType === "TELECOMMUTE") {
    return locations.length > 0 ? `Remote, ${locations.join(" / ")}` : "Remote";
  }

  return locations.join(" / ") || target.locationHint || "Location not listed";
}

export async function fetchCompanyPageJobs(target: CompanyPageTarget) {
  if (target.parser === "greenhouse-board" && target.boardToken) {
    return fetchGreenhouseBoardJobs({
      adapterKey: target.adapterKey,
      sourceName: target.sourceName,
      targetName: target.targetName,
      companyName: target.companyName,
      boardToken: target.boardToken,
      companySummary: target.companySummary,
      companyWebsite: target.companyWebsite,
    });
  }

  const response = await fetch(target.careersUrl, {
    headers: {
      "user-agent": "CareerDashboard/0.1 (local ingestion)",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Company page request failed for ${target.careersUrl}: ${response.status}`);
  }

  const html = await response.text();
  const $ = load(html);
  const normalizedJobs: NormalizedJobListing[] = [];

  $("script[type='application/ld+json']").each((_, element) => {
    const scriptText = $(element).html();

    if (!scriptText) {
      return;
    }

    try {
      const parsed = JSON.parse(scriptText) as JsonValue;

      for (const node of collectJobPostingNodes(parsed)) {
        const description = cleanText(typeof node.description === "string" ? node.description : "");
        const compensation = parseCompensation(description);
        const locationText = locationSummary(node, target);
        const descriptionHtml = typeof node.description === "string" ? node.description : "";
        const identifier =
          node.identifier && typeof node.identifier === "object" && !Array.isArray(node.identifier)
            ? node.identifier
            : null;
        const hiringOrganization =
          node.hiringOrganization &&
          typeof node.hiringOrganization === "object" &&
          !Array.isArray(node.hiringOrganization)
            ? node.hiringOrganization
            : null;
        const sourceJobId =
          identifier && typeof identifier.value === "string"
            ? identifier.value
            : typeof node.url === "string"
              ? node.url
              : `${target.companyName}-${normalizedJobs.length + 1}`;

        normalizedJobs.push({
          adapterKey: target.adapterKey,
          sourceName: target.sourceName,
          targetName: target.targetName,
          sourceJobId,
          canonicalUrl: typeof node.url === "string" ? node.url : target.careersUrl,
          companyName: hiringOrganization && typeof hiringOrganization.name === "string"
            ? hiringOrganization.name
            : target.companyName,
          title: typeof node.title === "string" ? node.title : `${target.companyName} role`,
          locationText,
          remoteType: inferRemoteType(locationText, description),
          employmentType: inferEmploymentType(
            `${typeof node.employmentType === "string" ? node.employmentType : ""} ${typeof node.title === "string" ? node.title : ""}`,
          ),
          compensationRaw: compensation.raw,
          compensationLow: compensation.low,
          compensationHigh: compensation.high,
          description,
          requirementsSummary: buildRequirementsSummary(description),
          requirementsList: extractRequirementsListFromHtml(descriptionHtml, description),
          positionSummary: descriptionHtml
            ? extractPositionSummaryFromHtml(descriptionHtml, description)
            : buildPositionSummary(description),
          companySummary: target.companySummary ?? null,
          companyWebsite: target.companyWebsite ?? null,
          seniorityHint: classifySeniority(
            typeof node.title === "string" ? node.title : "",
            description,
          ),
          degreeRequirement: inferDegreeRequirement(description),
          internshipFlag: inferInternshipFlag(
            typeof node.title === "string" ? node.title : "",
            description,
          ),
          postedDate: normalizeDate(
            typeof node.datePosted === "string" ? node.datePosted : target.careersUrl,
          ),
          rawPayload: JSON.stringify(node),
        });
      }
    } catch {
      return;
    }
  });

  return normalizedJobs;
}