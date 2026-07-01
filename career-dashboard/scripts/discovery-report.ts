import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

type DiscoveryRow = {
  companyName: string;
  title: string;
  locationText: string;
  remoteType: string;
  sourceName: string | null;
  sourceDetail: string | null;
  fitLabel: string;
  seniorityHint: string;
  postedDate: string;
  canonicalUrl: string;
};

function normalizeDuplicatePart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildDuplicateKey(row: DiscoveryRow) {
  return [row.companyName, row.title, row.locationText].map(normalizeDuplicatePart).join("|");
}

const databasePath = fileURLToPath(new URL("../data/career-dashboard.sqlite", import.meta.url));
const database = new Database(databasePath, { readonly: true });

const rows = (database
  .prepare(
    `
      SELECT
        jobs.company_name AS companyName,
        jobs.title AS title,
        jobs.location_text AS locationText,
        jobs.remote_type AS remoteType,
        job_sources.name AS sourceName,
        jobs.source_detail AS sourceDetail,
        job_evaluations.fit_label AS fitLabel,
        jobs.seniority_hint AS seniorityHint,
        jobs.posted_date AS postedDate,
        jobs.canonical_url AS canonicalUrl
      FROM jobs
      INNER JOIN job_evaluations ON job_evaluations.job_id = jobs.id
      LEFT JOIN job_sources ON job_sources.id = jobs.source_id
      ORDER BY job_evaluations.total_score DESC, jobs.posted_date DESC, jobs.id ASC
    `,
  )
  .all() as DiscoveryRow[]);

const duplicateGroups = Array.from(
  rows.reduce((groups, row) => {
    const key = buildDuplicateKey(row);
    const current = groups.get(key) ?? [];
    current.push(row);
    groups.set(key, current);
    return groups;
  }, new Map<string, DiscoveryRow[]>()),
)
  .map(([, group]) => group)
  .filter((group) => group.length > 1)
  .map((group) => ({
    companyName: group[0]?.companyName ?? "",
    title: group[0]?.title ?? "",
    locationText: group[0]?.locationText ?? "",
    count: group.length,
    urls: group.map((row) => row.canonicalUrl),
  }))
  .sort((left, right) => right.count - left.count)
  .slice(0, 12);

const localNonSenior = rows.filter((row) => {
  const isRemote = row.remoteType.toLowerCase().includes("remote");
  const isUtah = /\b(?:ut|utah)\b/i.test(row.locationText);
  const isSenior = row.seniorityHint === "senior" || row.seniorityHint === "leadership";

  return !isRemote && isUtah && !isSenior && row.fitLabel !== "blocked";
});

const seen = new Set<string>();
const dedupedLocalNonSenior = localNonSenior.filter((row) => {
  const key = buildDuplicateKey(row);

  if (seen.has(key)) {
    return false;
  }

  seen.add(key);
  return true;
});

console.log(
  JSON.stringify(
    {
      localVisibleNonSeniorDeduped: dedupedLocalNonSenior.length,
      localVisibleNonSeniorRaw: localNonSenior.length,
      duplicateGroups: duplicateGroups.length,
      localRoles: dedupedLocalNonSenior.map((row) => ({
        companyName: row.companyName,
        title: row.title,
        locationText: row.locationText,
        fitLabel: row.fitLabel,
        sourceName: row.sourceName,
        sourceDetail: row.sourceDetail,
      })),
      topDuplicateGroups: duplicateGroups,
    },
    null,
    2,
  ),
);