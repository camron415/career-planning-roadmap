export type FitLabel =
  | "apply-now"
  | "apply-with-tailoring"
  | "stretch"
  | "blocked"
  | "ignore";

type SQLiteScalar = string | number | null;

type SQLiteRow = Record<string, SQLiteScalar>;

type StatementLike<Row extends SQLiteRow = SQLiteRow> = {
  get(...parameters: unknown[]): Row | undefined;
  all(...parameters: unknown[]): Row[];
  run(...parameters: unknown[]): unknown;
};

type TableInfoRow = {
  name: string;
};

export type DatabaseLike = {
  exec(sql: string): void;
  prepare<Row extends SQLiteRow = SQLiteRow>(sql: string): StatementLike<Row>;
};

const schemaStatements = [
  `
    CREATE TABLE IF NOT EXISTS candidate_profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      candidate_name TEXT NOT NULL,
      location TEXT NOT NULL,
      compensation_baseline_hourly REAL NOT NULL,
      commute_radius_minutes INTEGER NOT NULL,
      remote_regions TEXT NOT NULL,
      work_authorization TEXT NOT NULL,
      degree_status TEXT NOT NULL,
      internship_eligibility INTEGER NOT NULL DEFAULT 0,
      summary TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS job_sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      source_type TEXT NOT NULL,
      base_url TEXT NOT NULL,
      reliability_score INTEGER NOT NULL,
      fetch_method TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS raw_job_listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id INTEGER REFERENCES job_sources(id),
      adapter_key TEXT NOT NULL,
      target_name TEXT NOT NULL,
      external_job_id TEXT NOT NULL,
      canonical_url TEXT NOT NULL,
      payload_json TEXT NOT NULL,
      fetched_at TEXT NOT NULL,
      UNIQUE(adapter_key, external_job_id, canonical_url)
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_id INTEGER REFERENCES job_sources(id),
      source_job_id TEXT NOT NULL,
      source_detail TEXT,
      canonical_url TEXT NOT NULL UNIQUE,
      company_name TEXT NOT NULL,
      title TEXT NOT NULL,
      location_text TEXT NOT NULL,
      remote_type TEXT NOT NULL,
      employment_type TEXT NOT NULL,
      compensation_raw TEXT,
      compensation_low REAL,
      compensation_high REAL,
      description TEXT NOT NULL,
      position_summary TEXT NOT NULL DEFAULT '',
      requirements_summary TEXT NOT NULL,
      requirements_list TEXT NOT NULL DEFAULT '[]',
      seniority_hint TEXT NOT NULL DEFAULT 'unknown',
      degree_requirement TEXT NOT NULL,
      internship_flag INTEGER NOT NULL DEFAULT 0,
      posted_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'seed-preview',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL UNIQUE,
      website TEXT NOT NULL,
      company_size TEXT,
      industry TEXT,
      location TEXT,
      notes TEXT,
      research_confidence INTEGER NOT NULL DEFAULT 0
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS job_evaluations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
      access_fit_score INTEGER NOT NULL,
      skill_fit_score INTEGER NOT NULL,
      growth_fit_score INTEGER NOT NULL,
      opportunity_quality_score INTEGER NOT NULL,
      evidence_confidence_score INTEGER NOT NULL,
      total_score INTEGER NOT NULL,
      fit_label TEXT NOT NULL,
      blockers TEXT NOT NULL,
      rationale_summary TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS company_dossiers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
      product_summary TEXT NOT NULL,
      engineering_environment_notes TEXT NOT NULL,
      likely_day_to_day_work TEXT NOT NULL,
      growth_outlook TEXT NOT NULL,
      red_flags TEXT NOT NULL,
      evidence_sources TEXT NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS skill_gaps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      skill_name TEXT NOT NULL UNIQUE,
      frequency INTEGER NOT NULL,
      related_role_categories TEXT NOT NULL,
      confidence INTEGER NOT NULL,
      suggested_response TEXT NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS roadmap_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      linked_gap TEXT,
      linked_project TEXT,
      expected_impact TEXT NOT NULL,
      time_estimate TEXT NOT NULL,
      priority INTEGER NOT NULL
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS application_queue (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL UNIQUE REFERENCES jobs(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      resume_variant TEXT,
      cover_note_status TEXT NOT NULL,
      follow_up_date TEXT,
      manual_approval_flag INTEGER NOT NULL DEFAULT 1
    )
  `,
] as const;

type PreviewJobSeed = {
  sourceName: string;
  sourceJobId: string;
  canonicalUrl: string;
  companyName: string;
  title: string;
  locationText: string;
  remoteType: string;
  employmentType: string;
  compensationRaw: string | null;
  compensationLow: number | null;
  compensationHigh: number | null;
  description: string;
  requirementsSummary: string;
  degreeRequirement: string;
  internshipFlag: number;
  postedDate: string;
  status: string;
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

function rowCount(database: DatabaseLike, tableName: string) {
  const statement = database.prepare<{ count: number }>(
    `SELECT COUNT(*) AS count FROM ${tableName}`,
  );

  return Number(statement.get()?.count ?? 0);
}

function ensureColumn(
  database: DatabaseLike,
  tableName: string,
  columnName: string,
  definition: string,
) {
  const columns = database
    .prepare<TableInfoRow>(`PRAGMA table_info(${tableName})`)
    .all()
    .map((column) => column.name);

  if (!columns.includes(columnName)) {
    database.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
}

export function createSchema(database: DatabaseLike) {
  for (const statement of schemaStatements) {
    database.exec(statement);
  }

  ensureColumn(database, "jobs", "source_detail", "TEXT");
  ensureColumn(database, "jobs", "position_summary", "TEXT NOT NULL DEFAULT ''");
  ensureColumn(database, "jobs", "requirements_list", "TEXT NOT NULL DEFAULT '[]'");
  ensureColumn(database, "jobs", "seniority_hint", "TEXT NOT NULL DEFAULT 'unknown'");
}

export function seedPreviewData(database: DatabaseLike) {
  database.exec("BEGIN IMMEDIATE TRANSACTION");

  try {
    const timestamp = new Date().toISOString();

    database
      .prepare(
        `
          INSERT OR IGNORE INTO candidate_profile (
            id,
            candidate_name,
            location,
            compensation_baseline_hourly,
            commute_radius_minutes,
            remote_regions,
            work_authorization,
            degree_status,
            internship_eligibility,
            summary,
            updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
      )
      .run(
        1,
        "Camron",
        "Salt Lake Valley, Utah",
        23,
        30,
        JSON.stringify(["Remote within the US", "Salt Lake local/hybrid"]),
        "US citizen, no sponsorship required",
        "No completed degree",
        0,
        "Self-taught builder with project-based proof across a Rust/Python trading bot and the React-based VocalLearn app.",
        timestamp,
      );
  

  const sourceRows = [
      ["Official career pages", "company-careers", "https://example.com/careers", 95, "html-jsonld"],
      ["Greenhouse", "ats", "https://boards-api.greenhouse.io", 92, "json-api"],
      ["Lever", "ats", "https://api.lever.co", 90, "json-api"],
    ["Curated local discovery", "aggregator-research", "https://www.indeed.com/jobs", 74, "browser-assisted"],
    ["Ashby", "ats", "https://jobs.ashbyhq.com", 89, "html"],
    ["Wellfound", "startup-marketplace", "https://wellfound.com/jobs", 78, "html"],
  ] as const;

  const insertSource = database.prepare(
    `
      INSERT OR IGNORE INTO job_sources (
        name,
        source_type,
        base_url,
        reliability_score,
        fetch_method,
        active
      ) VALUES (?, ?, ?, ?, ?, 1)
    `,
  );

  for (const row of sourceRows) {
    insertSource.run(...row);
  }

  const updateSource = database.prepare(
    `
      UPDATE job_sources
      SET source_type = ?, base_url = ?, reliability_score = ?, fetch_method = ?, active = 1
      WHERE name = ?
    `,
  );

  for (const [name, sourceType, baseUrl, reliabilityScore, fetchMethod] of sourceRows) {
    updateSource.run(sourceType, baseUrl, reliabilityScore, fetchMethod, name);
  }

  const companyRows = [
    [
      "Summit Thread",
      "https://summitthread.example.com",
      "11-50",
      "Collaboration tooling",
      "Remote, United States",
      "Product-led startup with strong TypeScript surface area.",
      74,
    ],
    [
      "Trailhead Robotics",
      "https://trailheadrobotics.example.com",
      "51-200",
      "Automation and robotics",
      "Salt Lake City, Utah",
      "Hybrid team with a practical engineering culture and visible product impact.",
      71,
    ],
    [
      "Haven Ops",
      "https://havenops.example.com",
      "1-10",
      "Developer tooling",
      "Remote, United States",
      "Early startup signal with broad ownership and low process overhead.",
      62,
    ],
    [
      "Northstar Analytics",
      "https://northstar.example.com",
      "201-500",
      "Data infrastructure",
      "Lehi, Utah",
      "Clear platform role, but strong formal-credential bias in the posting language.",
      68,
    ],
  ] as const;

  const insertCompany = database.prepare(
    `
      INSERT OR IGNORE INTO companies (
        company_name,
        website,
        company_size,
        industry,
        location,
        notes,
        research_confidence
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  );

  for (const row of companyRows) {
    insertCompany.run(...row);
  }

  const insertDossier = database.prepare(
    `
      INSERT OR IGNORE INTO company_dossiers (
        company_id,
        product_summary,
        engineering_environment_notes,
        likely_day_to_day_work,
        growth_outlook,
        red_flags,
        evidence_sources
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
  );

  const companyIds = database.prepare<{ id: number }>(
    `SELECT id AS id FROM companies WHERE company_name = ?`,
  );

  const dossierRows = [
    [
      "Summit Thread",
      "Team collaboration platform used by distributed design and product groups.",
      "Likely React plus TypeScript codebase with customer-driven iteration.",
      "Ship frontend features, fix UX rough edges, and help wire API integrations.",
      "Strong learning value for a project-driven junior developer.",
      "Compensation and title progression need confirmation once the real adapter exists.",
      JSON.stringify(["company page", "ATS posting"]),
    ],
    [
      "Trailhead Robotics",
      "Local robotics business with internal dashboards and operator tooling.",
      "Hybrid environment that likely mixes frontend work with manufacturing context.",
      "Build UI flows, support field workflows, and partner closely with operations.",
      "Good bridge between product building and real-world process software.",
      "May be more hybrid than remote-friendly roles later in the funnel.",
      JSON.stringify(["company page", "team overview"]),
    ],
    [
      "Haven Ops",
      "Developer-experience startup building workflow automation for small engineering teams.",
      "Broad role surface with likely exposure to backend and DX work.",
      "Own customer-facing features, support onboarding, and build simple automation layers.",
      "High upside if mentorship is present, but role clarity remains thin.",
      "Scope may exceed current backend depth if ownership starts immediately.",
      JSON.stringify(["Wellfound listing", "landing page"]),
    ],
    [
      "Northstar Analytics",
      "Analytics company building internal and external data infrastructure tools.",
      "Platform-heavy environment with structured engineering process.",
      "Support platform services, improve pipelines, and maintain internal tooling.",
      "Potentially solid environment, but current access blockers outweigh upside.",
      "The posting language reads degree-first and the commute is outside target bounds.",
      JSON.stringify(["Lever posting", "company about page"]),
    ],
  ] as const;

  for (const [companyName, ...payload] of dossierRows) {
    const companyId = companyIds.get(companyName)?.id;

    if (companyId) {
      insertDossier.run(companyId, ...payload);
    }
  }

  const previewJobs: PreviewJobSeed[] = [
    {
      sourceName: "Greenhouse",
      sourceJobId: "summit-thread-junior-full-stack",
      canonicalUrl: "https://boards.greenhouse.io/summitthread/jobs/junior-full-stack",
      companyName: "Summit Thread",
      title: "Junior Full-Stack Developer",
      locationText: "Remote, United States",
      remoteType: "Remote US",
      employmentType: "Full-time",
      compensationRaw: "$78k - $90k",
      compensationLow: 78000,
      compensationHigh: 90000,
      description:
        "Hands-on product role working across React surfaces, API integrations, and customer-facing workflow polish.",
      requirementsSummary:
        "React, TypeScript, product iteration, SQL comfort, and practical ownership.",
      degreeRequirement: "Equivalent experience accepted",
      internshipFlag: 0,
      postedDate: "2026-05-19",
      status: "seed-preview",
      accessFitScore: 27,
      skillFitScore: 25,
      growthFitScore: 17,
      opportunityQualityScore: 8,
      evidenceConfidenceScore: 7,
      totalScore: 84,
      fitLabel: "apply-now",
      blockers: [],
      rationaleSummary:
        "Closest match to current strengths: React-heavy product work, flexible degree language, and enough backend exposure to stretch without breaking fit.",
    },
    {
      sourceName: "Official career pages",
      sourceJobId: "trailhead-robotics-frontend-early-career",
      canonicalUrl: "https://trailheadrobotics.example.com/careers/frontend-early-career",
      companyName: "Trailhead Robotics",
      title: "Frontend Engineer, Early Career",
      locationText: "Hybrid, Salt Lake City, Utah",
      remoteType: "Salt Lake hybrid",
      employmentType: "Full-time",
      compensationRaw: "$72k - $82k",
      compensationLow: 72000,
      compensationHigh: 82000,
      description:
        "UI-heavy role supporting robotics operators and internal logistics workflows.",
      requirementsSummary:
        "React, component systems, debugging discipline, and willingness to work with operations stakeholders.",
      degreeRequirement: "Equivalent experience likely accepted",
      internshipFlag: 0,
      postedDate: "2026-05-18",
      status: "seed-preview",
      accessFitScore: 24,
      skillFitScore: 23,
      growthFitScore: 17,
      opportunityQualityScore: 7,
      evidenceConfidenceScore: 5,
      totalScore: 76,
      fitLabel: "apply-with-tailoring",
      blockers: ["Hybrid schedule needs confirmation"],
      rationaleSummary:
        "Very solid frontend and product-fit signal, but the hybrid cadence and hardware-adjacent context make this slightly less automatic than the top role.",
    },
    {
      sourceName: "Wellfound",
      sourceJobId: "haven-ops-developer-success-builder",
      canonicalUrl: "https://wellfound.com/jobs/haven-ops-developer-success-builder",
      companyName: "Haven Ops",
      title: "Developer Success Builder",
      locationText: "Remote, United States",
      remoteType: "Remote US",
      employmentType: "Full-time",
      compensationRaw: null,
      compensationLow: null,
      compensationHigh: null,
      description:
        "Broad startup role blending support tooling, lightweight backend work, and user-facing improvements.",
      requirementsSummary:
        "TypeScript, API debugging, customer empathy, and comfort owning messy workflow problems.",
      degreeRequirement: "Not specified",
      internshipFlag: 0,
      postedDate: "2026-05-17",
      status: "seed-preview",
      accessFitScore: 20,
      skillFitScore: 18,
      growthFitScore: 15,
      opportunityQualityScore: 5,
      evidenceConfidenceScore: 4,
      totalScore: 62,
      fitLabel: "stretch",
      blockers: ["Backend production depth is lighter than requested", "Compensation is unknown"],
      rationaleSummary:
        "Interesting upside and strong ownership fit, but the current posting likely expects broader backend depth than the strongest current evidence shows.",
    },
    {
      sourceName: "Lever",
      sourceJobId: "northstar-junior-platform-engineer",
      canonicalUrl: "https://jobs.lever.co/northstaranalytics/junior-platform-engineer",
      companyName: "Northstar Analytics",
      title: "Junior Platform Engineer",
      locationText: "On-site, Lehi, Utah",
      remoteType: "Local on-site",
      employmentType: "Full-time",
      compensationRaw: "$68k - $74k",
      compensationLow: 68000,
      compensationHigh: 74000,
      description:
        "Platform-focused engineering role with structured infrastructure ownership and internal tooling.",
      requirementsSummary:
        "Platform fundamentals, backend services, scripting, and formal credential expectations.",
      degreeRequirement: "Bachelor's degree required",
      internshipFlag: 0,
      postedDate: "2026-05-16",
      status: "seed-preview",
      accessFitScore: 10,
      skillFitScore: 15,
      growthFitScore: 10,
      opportunityQualityScore: 5,
      evidenceConfidenceScore: 4,
      totalScore: 44,
      fitLabel: "blocked",
      blockers: ["Degree listed as mandatory", "Commute exceeds target radius"],
      rationaleSummary:
        "Useful benchmark for the scoring engine: interesting work, but it should still be pushed down because the access constraints are real blockers.",
    },
  ];

  const lookupSourceId = database.prepare<{ id: number }>(
    `SELECT id AS id FROM job_sources WHERE name = ?`,
  );
  const insertJob = database.prepare(
    `
      INSERT OR IGNORE INTO jobs (
        source_id,
        source_job_id,
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
        requirements_summary,
        degree_requirement,
        internship_flag,
        posted_date,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  );
  const lookupJobId = database.prepare<{ id: number }>(
    `SELECT id AS id FROM jobs WHERE canonical_url = ?`,
  );
  const insertEvaluation = database.prepare(
    `
      INSERT OR IGNORE INTO job_evaluations (
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
    `,
  );

  for (const job of previewJobs) {
    const sourceId = lookupSourceId.get(job.sourceName)?.id;

    if (!sourceId) {
      continue;
    }

    insertJob.run(
      sourceId,
      job.sourceJobId,
      job.canonicalUrl,
      job.companyName,
      job.title,
      job.locationText,
      job.remoteType,
      job.employmentType,
      job.compensationRaw,
      job.compensationLow,
      job.compensationHigh,
      job.description,
      job.requirementsSummary,
      job.degreeRequirement,
      job.internshipFlag,
      job.postedDate,
      job.status,
      timestamp,
      timestamp,
    );

    const jobId = lookupJobId.get(job.canonicalUrl)?.id;

    if (jobId) {
      insertEvaluation.run(
        jobId,
        job.accessFitScore,
        job.skillFitScore,
        job.growthFitScore,
        job.opportunityQualityScore,
        job.evidenceConfidenceScore,
        job.totalScore,
        job.fitLabel,
        JSON.stringify(job.blockers),
        job.rationaleSummary,
        timestamp,
      );
    }
  }

    if (rowCount(database, "skill_gaps") === 0) {
      const insertGap = database.prepare(
        `
          INSERT INTO skill_gaps (
            skill_name,
            frequency,
            related_role_categories,
            confidence,
            suggested_response
          ) VALUES (?, ?, ?, ?, ?)
        `,
      );

      insertGap.run(
        "Production backend patterns",
        14,
        JSON.stringify(["full-stack", "backend", "applied AI tooling"]),
        80,
        "Use this dashboard and VocalLearn to prove typed API design, persistence, and background job ownership.",
      );
      insertGap.run(
        "Testing discipline",
        11,
        JSON.stringify(["full-stack", "frontend", "automation"]),
        76,
        "Add focused ingestion and scoring tests so project work reads as production-oriented rather than demo-only.",
      );
      insertGap.run(
        "Cloud deployment narrative",
        8,
        JSON.stringify(["startup generalist", "developer tooling"]),
        68,
        "Ship one hosted demo path or deployment write-up that makes systems ownership easier to explain in interviews.",
      );
    }

    if (rowCount(database, "roadmap_items") === 0) {
      const insertRoadmapItem = database.prepare(
        `
          INSERT INTO roadmap_items (
            title,
            category,
            linked_gap,
            linked_project,
            expected_impact,
            time_estimate,
            priority
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
      );

      insertRoadmapItem.run(
        "Add a typed API plus persistence layer to VocalLearn",
        "Portfolio proof",
        "Production backend patterns",
        "VocalLearn",
        "Shows full-stack depth for the exact junior full-stack and product roles that already score well.",
        "1-2 weeks",
        1,
      );
      insertRoadmapItem.run(
        "Ship one resilient source adapter with tests",
        "Career dashboard",
        "Testing discipline",
        "Career Dashboard",
        "Turns this project into direct evidence of scraping, normalization, and workflow ownership.",
        "1 week",
        2,
      );
      insertRoadmapItem.run(
        "Write a concise engineering teardown for the trading bot",
        "Narrative",
        "Cloud deployment narrative",
        "Prediction-market bot",
        "Improves how systems thinking and real-world engineering judgment come across in applications and interviews.",
        "3 days",
        3,
      );
    }

    if (rowCount(database, "application_queue") === 0) {
      const summitJobId = lookupJobId.get(
        "https://boards.greenhouse.io/summitthread/jobs/junior-full-stack",
      )?.id;

      if (summitJobId) {
        database
          .prepare(
            `
              INSERT INTO application_queue (
                job_id,
                status,
                resume_variant,
                cover_note_status,
                follow_up_date,
                manual_approval_flag
              ) VALUES (?, ?, ?, ?, ?, ?)
            `,
          )
          .run(summitJobId, "triage", "builder-heavy", "not-started", null, 1);
      }
    }

    database.exec("COMMIT");
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}