export type LiveAdapterKey = "greenhouse" | "lever" | "company-page" | "curated-discovery";
export type LiveSourceName =
  | "Greenhouse"
  | "Lever"
  | "Official career pages"
  | "Curated local discovery";
export type SeniorityHint =
  | "entry-level"
  | "mid-level"
  | "senior"
  | "leadership"
  | "unknown";

type BaseSourceTarget = {
  sourceName: LiveSourceName;
  targetName: string;
  companyName: string;
  companySummary?: string;
  companyWebsite?: string;
};

export type GreenhouseTarget = BaseSourceTarget & {
  adapterKey: "greenhouse";
  sourceName: "Greenhouse";
  boardToken: string;
};

export type LeverTarget = BaseSourceTarget & {
  adapterKey: "lever";
  sourceName: "Lever";
  account: string;
};

export type CompanyPageTarget = BaseSourceTarget & {
  adapterKey: "company-page";
  sourceName: "Official career pages";
  careersUrl: string;
  locationHint?: string;
  parser?: "jsonld" | "greenhouse-board";
  boardToken?: string;
};

export type CuratedDiscoveryTarget = BaseSourceTarget & {
  adapterKey: "curated-discovery";
  sourceName: "Curated local discovery";
  discoveryKey: string;
};

export type LiveSourceTarget =
  | GreenhouseTarget
  | LeverTarget
  | CompanyPageTarget
  | CuratedDiscoveryTarget;

export type NormalizedJobListing = {
  adapterKey: LiveAdapterKey;
  sourceName: LiveSourceName;
  targetName: string;
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
  requirementsList: string[];
  positionSummary: string;
  companySummary: string | null;
  companyWebsite: string | null;
  seniorityHint: SeniorityHint;
  degreeRequirement: string;
  internshipFlag: number;
  postedDate: string;
  rawPayload: string;
};