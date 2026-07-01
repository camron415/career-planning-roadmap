import type {
  CompanyPageTarget,
  CuratedDiscoveryTarget,
  GreenhouseTarget,
  LeverTarget,
} from "./types";

export const greenhouseTargets: GreenhouseTarget[] = [
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Duolingo Greenhouse",
    companyName: "Duolingo",
    boardToken: "duolingo",
    companyWebsite: "https://www.duolingo.com",
    companySummary:
      "Language-learning platform with consumer-scale product engineering, strong experimentation culture, and a mix of frontend, platform, and applied AI work.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Vercel Greenhouse",
    companyName: "Vercel",
    boardToken: "vercel",
    companyWebsite: "https://vercel.com",
    companySummary:
      "Web infrastructure company behind the Vercel platform and a major part of the Next.js ecosystem, with product, platform, and developer-experience roles.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Airtable Greenhouse",
    companyName: "Airtable",
    boardToken: "airtable",
    companyWebsite: "https://www.airtable.com",
    companySummary:
      "Collaborative app-building platform where product engineering roles often blend frontend polish, workflow logic, and internal tooling depth.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Figma Greenhouse",
    companyName: "Figma",
    boardToken: "figma",
    companyWebsite: "https://www.figma.com",
    companySummary:
      "Collaborative design platform with highly product-focused engineering work across rich web interfaces, performance, and cross-functional product shipping.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Discord Greenhouse",
    companyName: "Discord",
    boardToken: "discord",
    companyWebsite: "https://discord.com",
    companySummary:
      "Communication platform with consumer and platform engineering roles spanning realtime systems, frontend product work, and growth tooling.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Asana Greenhouse",
    companyName: "Asana",
    boardToken: "asana",
    companyWebsite: "https://asana.com",
    companySummary:
      "Work management software company with clear product engineering structure, strong design systems, and cross-functional shipping culture.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Checkr Greenhouse",
    companyName: "Checkr",
    boardToken: "checkr",
    companyWebsite: "https://checkr.com",
    companySummary:
      "Background screening and trust infrastructure company where roles often combine product UI work with operational and compliance-heavy backend systems.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Qualtrics Greenhouse",
    companyName: "Qualtrics",
    boardToken: "qualtrics",
    companyWebsite: "https://www.qualtrics.com",
    companySummary:
      "Utah-rooted experience-management software company with local hybrid and product engineering opportunities tied to a large commercial platform.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Lucid Software Greenhouse",
    companyName: "Lucid Software",
    boardToken: "lucidsoftware",
    companyWebsite: "https://www.lucid.co",
    companySummary:
      "Salt Lake City software company behind Lucidchart and Lucidspark, with strong frontend-heavy product engineering and collaborative-workflow surfaces.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Weave Greenhouse",
    companyName: "Weave",
    boardToken: "weave",
    companyWebsite: "https://www.getweave.com",
    companySummary:
      "Utah communications and payments platform focused on SMB operations, with local roles that often connect product interfaces to business workflow software.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "MasterControl Greenhouse",
    companyName: "MasterControl",
    boardToken: "mastercontrol",
    companyWebsite: "https://www.mastercontrol.com",
    companySummary:
      "Utah life-sciences software company building regulated workflow and quality-management systems, with local engineering opportunities around business-critical product software.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Route Greenhouse",
    companyName: "Route",
    boardToken: "route",
    companyWebsite: "https://route.com",
    companySummary:
      "Lehi-based commerce and package-protection platform with local product and platform engineering surfaces tied to consumer and merchant workflows.",
  },
  {
    adapterKey: "greenhouse",
    sourceName: "Greenhouse",
    targetName: "Awardco Greenhouse",
    companyName: "Awardco",
    boardToken: "awardco",
    companyWebsite: "https://www.award.co",
    companySummary:
      "Utah HR-tech company focused on recognition and rewards software, with local product engineering roles across web app and workflow features.",
  },
];

export const leverTargets: LeverTarget[] = [];

export const companyPageTargets: CompanyPageTarget[] = [
  {
    adapterKey: "company-page",
    sourceName: "Official career pages",
    targetName: "Toast Careers",
    companyName: "Toast",
    careersUrl: "https://careers.toasttab.com/jobs/search",
    parser: "greenhouse-board",
    boardToken: "toast",
    companyWebsite: "https://pos.toasttab.com",
    companySummary:
      "Restaurant software and point-of-sale company with a branded careers site, product-heavy engineering roles, and a mix of frontend, platform, and applied AI work.",
  },
];

export const curatedDiscoveryTargets: CuratedDiscoveryTarget[] = [
  {
    adapterKey: "curated-discovery",
    sourceName: "Curated local discovery",
    targetName: "Indeed local discovery sweep",
    companyName: "Salt Lake local discovery sweep",
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    companySummary:
      "Browser-assisted local discovery used when aggregator boards surface Utah roles that the ATS adapters miss or block behind anti-bot checks.",
    companyWebsite: "https://www.indeed.com/jobs",
  },
];