import { db } from "../../db/client";
import type { DatabaseLike } from "../../db/schema";
import { syncJobEvaluations } from "../scoring/service";
import { fetchCompanyPageJobs } from "../sources/company-pages";
import { fetchCuratedDiscoveryJobs } from "../sources/curated-discovery";
import { fetchGreenhouseJobs } from "../sources/greenhouse";
import { fetchLeverJobs } from "../sources/lever";
import {
  companyPageTargets,
  curatedDiscoveryTargets,
  greenhouseTargets,
  leverTargets,
} from "../sources/source-targets";
import type { LiveSourceTarget, NormalizedJobListing } from "../sources/types";

type SourceRunSummary = {
  sourceName: string;
  targetName: string;
  fetchedJobs: number;
  error?: string;
};

type IngestionSummary = {
  fetchedJobs: number;
  storedJobs: number;
  rawListingsStored: number;
  runs: SourceRunSummary[];
};

async function fetchForTarget(target: LiveSourceTarget) {
  switch (target.adapterKey) {
    case "curated-discovery":
      return fetchCuratedDiscoveryJobs(target);
    case "greenhouse":
      return fetchGreenhouseJobs(target);
    case "lever":
      return fetchLeverJobs(target);
    case "company-page":
      return fetchCompanyPageJobs(target);
    default:
      return [];
  }
}

function storeListings(database: DatabaseLike, listings: NormalizedJobListing[]) {
  const lookupSourceId = database.prepare<{ id: number }>(
    `SELECT id AS id FROM job_sources WHERE name = ? LIMIT 1`,
  );
  const upsertRawListing = database.prepare(
    `
      INSERT INTO raw_job_listings (
        source_id,
        adapter_key,
        target_name,
        external_job_id,
        canonical_url,
        payload_json,
        fetched_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(adapter_key, external_job_id, canonical_url) DO UPDATE SET
        source_id = excluded.source_id,
        target_name = excluded.target_name,
        payload_json = excluded.payload_json,
        fetched_at = excluded.fetched_at
    `,
  );
  const upsertJob = database.prepare(
    `
      INSERT INTO jobs (
        source_id,
        source_job_id,
        source_detail,
        canonical_url,
        company_name,
        title,
        location_text,
        remote_type,
        employment_type,
        compensation_raw,
        compensation_low,
        compensation_high,
        description,
        position_summary,
        requirements_summary,
        requirements_list,
        seniority_hint,
        degree_requirement,
        internship_flag,
        posted_date,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(canonical_url) DO UPDATE SET
        source_id = excluded.source_id,
        source_job_id = excluded.source_job_id,
        source_detail = excluded.source_detail,
        company_name = excluded.company_name,
        title = excluded.title,
        location_text = excluded.location_text,
        remote_type = excluded.remote_type,
        employment_type = excluded.employment_type,
        compensation_raw = excluded.compensation_raw,
        compensation_low = excluded.compensation_low,
        compensation_high = excluded.compensation_high,
        description = excluded.description,
        position_summary = excluded.position_summary,
        requirements_summary = excluded.requirements_summary,
        requirements_list = excluded.requirements_list,
        seniority_hint = excluded.seniority_hint,
        degree_requirement = excluded.degree_requirement,
        internship_flag = excluded.internship_flag,
        posted_date = excluded.posted_date,
        status = excluded.status,
        updated_at = excluded.updated_at
    `,
  );
  const upsertCompany = database.prepare(
    `
      INSERT INTO companies (
        company_name,
        website,
        company_size,
        industry,
        location,
        notes,
        research_confidence
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(company_name) DO UPDATE SET
        website = CASE
          WHEN excluded.website IS NOT NULL AND excluded.website != '' THEN excluded.website
          ELSE companies.website
        END,
        notes = CASE
          WHEN excluded.notes IS NOT NULL AND excluded.notes != '' THEN excluded.notes
          ELSE companies.notes
        END,
        research_confidence = CASE
          WHEN excluded.research_confidence > companies.research_confidence THEN excluded.research_confidence
          ELSE companies.research_confidence
        END
    `,
  );

  let rawListingsStored = 0;
  let storedJobs = 0;
  const timestamp = new Date().toISOString();

  database.exec("BEGIN IMMEDIATE TRANSACTION");

  try {
    for (const listing of listings) {
      const sourceId = lookupSourceId.get(listing.sourceName)?.id;

      if (!sourceId) {
        continue;
      }

      upsertCompany.run(
        listing.companyName,
        listing.companyWebsite ?? "",
        null,
        null,
        null,
        listing.companySummary,
        68,
      );
      upsertRawListing.run(
        sourceId,
        listing.adapterKey,
        listing.targetName,
        listing.sourceJobId,
        listing.canonicalUrl,
        listing.rawPayload,
        timestamp,
      );
      upsertJob.run(
        sourceId,
        listing.sourceJobId,
        listing.targetName,
        listing.canonicalUrl,
        listing.companyName,
        listing.title,
        listing.locationText,
        listing.remoteType,
        listing.employmentType,
        listing.compensationRaw,
        listing.compensationLow,
        listing.compensationHigh,
        listing.description,
        listing.positionSummary,
        listing.requirementsSummary,
        JSON.stringify(listing.requirementsList),
        listing.seniorityHint,
        listing.degreeRequirement,
        listing.internshipFlag,
        listing.postedDate,
        "live",
        timestamp,
        timestamp,
      );
      rawListingsStored += 1;
      storedJobs += 1;
    }

    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }

  return {
    rawListingsStored,
    storedJobs,
  };
}

export async function runLiveIngestion(database: DatabaseLike = db): Promise<IngestionSummary> {
  const targets: LiveSourceTarget[] = [
    ...curatedDiscoveryTargets,
    ...greenhouseTargets,
    ...leverTargets,
    ...companyPageTargets,
  ];
  const runs: SourceRunSummary[] = [];
  const listings: NormalizedJobListing[] = [];

  for (const target of targets) {
    try {
      const fetchedJobs = await fetchForTarget(target);
      listings.push(...fetchedJobs);
      runs.push({
        sourceName: target.sourceName,
        targetName: target.targetName,
        fetchedJobs: fetchedJobs.length,
      });
    } catch (error) {
      runs.push({
        sourceName: target.sourceName,
        targetName: target.targetName,
        fetchedJobs: 0,
        error: error instanceof Error ? error.message : "Unknown ingestion error",
      });
    }
  }

  const { rawListingsStored, storedJobs } = storeListings(database, listings);
  syncJobEvaluations(database);

  return {
    fetchedJobs: listings.length,
    storedJobs,
    rawListingsStored,
    runs,
  };
}