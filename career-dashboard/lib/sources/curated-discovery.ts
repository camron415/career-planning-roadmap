import type {
  CuratedDiscoveryTarget,
  NormalizedJobListing,
  SeniorityHint,
} from "./types";

type CuratedDiscoverySeed = {
  discoveryKey: string;
  platform: string;
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
  descriptionSections: string[];
  positionSummary: string;
  requirementsSummary: string;
  requirementsList: string[];
  companySummary: string | null;
  companyWebsite: string | null;
  seniorityHint: SeniorityHint;
  degreeRequirement: string;
  postedDate: string;
};

const discoveryDate = "2026-05-23";

const curatedDiscoverySeeds: CuratedDiscoverySeed[] = [
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "acdd9f3d398e3874",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=acdd9f3d398e3874",
    companyName: "RISE",
    title: "Full Stack Software Engineer (Angular Focus) – Contract (6 Months + Extension Potential)",
    locationText: "Hybrid work in Draper, UT 84020",
    remoteType: "Salt Lake hybrid",
    employmentType: "Contract",
    compensationRaw: null,
    compensationLow: null,
    compensationHigh: null,
    descriptionSections: [
      "Local hybrid contract focused on Angular-heavy full-stack application work for a Utah product team modernizing internal systems.",
      "You would build and maintain Angular front-end applications, integrate with GraphQL and REST APIs, work alongside legacy C#/.NET services, and help improve automated testing, CI/CD, and Kanban-based delivery.",
      "The posting asks for a bachelor's degree or equivalent practical experience and expects strong Angular, TypeScript, GraphQL, and C#/.NET familiarity, plus around five years of professional software development experience.",
      "This is explicitly positioned as a Draper-based hybrid contract for local Utah candidates rather than a broad remote opening.",
    ],
    positionSummary:
      "Hybrid Utah contract where the main work is Angular-heavy product engineering, API integration, and modernization of legacy .NET-backed systems.",
    requirementsSummary:
      "Angular, TypeScript, GraphQL, testing discipline, and enough .NET context to work through a legacy modernization effort.",
    requirementsList: [
      "Strong Angular and TypeScript experience for front-end application work.",
      "Comfort integrating GraphQL and REST APIs into product features.",
      "Familiarity with legacy C#/.NET services during modernization work.",
      "Ability to write and maintain automated tests and contribute to CI/CD improvements.",
      "Bachelor's degree or equivalent practical experience is acceptable.",
      "Local Utah availability for a hybrid Draper contract environment.",
    ],
    companySummary:
      "Utah product team operating in Silicon Slopes and modernizing internal applications with Angular, GraphQL, and legacy .NET services.",
    companyWebsite: null,
    seniorityHint: "mid-level",
    degreeRequirement: "Equivalent experience accepted",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "e927c0ad53aa8d9f",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=e927c0ad53aa8d9f",
    companyName: "Compass Insurance Advisors",
    title: "Junior Frontend Developer",
    locationText: "Draper, UT 84020",
    remoteType: "Salt Lake local",
    employmentType: "Full-time",
    compensationRaw: "From $24 an hour",
    compensationLow: 49920,
    compensationHigh: 49920,
    descriptionSections: [
      "Compass Insurance Advisors builds internal and client-facing web applications that support health, Medicare, group, life, and supplemental insurance workflows.",
      "This is an explicitly entry-level front-end role intended for a recent graduate or a self-taught developer with a strong portfolio who wants hands-on professional experience.",
      "Daily work includes building front-end features in HTML, CSS/SCSS, JavaScript, Bootstrap, and React, integrating REST APIs and data from MySQL, Laravel, React, and Node.js, and maintaining existing PHP-based applications.",
      "The posting highlights mentorship, flexible hours, and growth potential, and it explicitly says self-taught candidates are encouraged to apply.",
    ],
    positionSummary:
      "Entry-level in-person Draper role focused on React-based UI work, REST integrations, and maintenance of existing PHP and Laravel applications.",
    requirementsSummary:
      "Portfolio-backed early-career frontend foundation with React, JavaScript, CSS/SCSS, REST APIs, and willingness to learn quickly in a mentored environment.",
    requirementsList: [
      "Recent graduate or self-taught candidate with a strong portfolio.",
      "Working knowledge of HTML, CSS/SCSS, JavaScript, and Bootstrap.",
      "Familiarity with React or another modern JavaScript framework.",
      "Some exposure to Laravel, PHP, MySQL, and Node.js.",
      "Comfort working with REST APIs and Git version control.",
      "Strong problem-solving, communication, and willingness to learn.",
    ],
    companySummary:
      "Utah insurance advisory company building software for health, Medicare, group, life, and supplemental insurance workflows.",
    companyWebsite: null,
    seniorityHint: "entry-level",
    degreeRequirement: "Equivalent experience accepted",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "e3b5b7555781c78b",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=e3b5b7555781c78b",
    companyName: "LVT",
    title: "Junior Software Engineer",
    locationText: "American Fork, UT 84003",
    remoteType: "Utah local",
    employmentType: "Full-time",
    compensationRaw: null,
    compensationLow: null,
    compensationHigh: null,
    descriptionSections: [
      "LVT builds AI-driven intelligent site technology that combines physical-world security operations with software, automation, and visibility tools.",
      "The role is a full-time in-office junior software engineering position in American Fork designed for a collaborative engineer ready to write code, ship features, and learn from senior mentorship.",
      "Core work includes writing and testing code, debugging and optimizing software, collaborating with product, QA, and operations teams, and participating in agile rituals and code reviews.",
      "The posting targets candidates with 0 to 2 years of experience, strong interest in backend work with Node.js and TypeScript, Git familiarity, and equivalent practical experience in place of a strict degree requirement.",
    ],
    positionSummary:
      "Early-career Utah role for someone who wants hands-on software engineering work, mentorship, and a backend-leaning Node.js and TypeScript stack inside an in-office product team.",
    requirementsSummary:
      "0 to 2 years of software development experience, Node.js and TypeScript interest, Git fundamentals, and comfort learning through direct execution with a product team.",
    requirementsList: [
      "0 to 2 years of experience, including internships, bootcamps, or strong personal projects.",
      "Interest in backend development with Node.js and TypeScript.",
      "Solid Git and version-control fundamentals.",
      "Basic awareness of APIs, databases, Docker, or CI/CD tooling is a plus.",
      "Strong problem-solving and communication in a collaborative team setting.",
      "Bachelor's degree is preferred, but equivalent practical experience is accepted.",
    ],
    companySummary:
      "American Fork company building AI-driven intelligent site technology for safety, compliance, and physical-world operations.",
    companyWebsite: null,
    seniorityHint: "entry-level",
    degreeRequirement: "Equivalent experience accepted",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "dee7582a6d4d5ae5",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=dee7582a6d4d5ae5",
    companyName: "PLACE",
    title: "Full Stack Engineer (Mobile + Ruby on Rails)",
    locationText: "Hybrid work in Draper, UT 84020",
    remoteType: "Salt Lake hybrid",
    employmentType: "Full-time",
    compensationRaw: "$80,000 - $120,000 a year",
    compensationLow: 80000,
    compensationHigh: 120000,
    descriptionSections: [
      "PLACE is hiring a mid-level full-stack engineer to support mobile applications such as Brivity Go, Brivity Home, the Place Partner App, Brivity Open House, and AreaPro, while also contributing to backend services and APIs.",
      "The role owns features end to end across React Native clients, API integrations, backend service development, and overall system reliability for products used daily by customers.",
      "Primary work includes React Native with TypeScript and Expo, mobile platform integrations for iOS and Android, Ruby on Rails APIs, relational databases, authentication, automated testing, and CI/CD workflows.",
      "This is not a senior title, but it is clearly a stretch role aimed at someone with several years of production mobile and backend experience who can operate across the full stack.",
    ],
    positionSummary:
      "Hybrid Draper full-stack role spanning React Native mobile delivery, Rails APIs, database work, and end-to-end ownership of customer-facing product features.",
    requirementsSummary:
      "Production React Native experience, Ruby on Rails API work, database and auth fundamentals, and the ability to ship tested mobile and backend features across a shared platform.",
    requirementsList: [
      "React Native development with TypeScript, Expo, and mobile navigation tooling.",
      "Ability to integrate with native iOS and Android modules when needed.",
      "Ruby on Rails experience building REST or GraphQL APIs.",
      "Relational database work, including schema design, indexing, and migrations.",
      "Authentication, authorization, testing, and CI/CD workflow familiarity.",
      "Comfort collaborating across product, design, QA, and engineering on end-to-end delivery.",
    ],
    companySummary:
      "Real-estate software platform supporting mobile and backend products such as Brivity Go, Brivity Home, and related partner tools.",
    companyWebsite: null,
    seniorityHint: "mid-level",
    degreeRequirement: "Not specified",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "33b9bad9bbd5b4c2",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=33b9bad9bbd5b4c2",
    companyName: "Atlassian",
    title: "Full Stack Software Engineer, DX",
    locationText: "Hybrid work in Salt Lake City, UT 84044",
    remoteType: "Salt Lake hybrid",
    employmentType: "Full-time",
    compensationRaw: "$99,900 - $156,275 a year",
    compensationLow: 99900,
    compensationHigh: 156275,
    descriptionSections: [
      "Atlassian is hiring a Salt Lake City full-stack engineer inside its developer experience organization, with explicit onsite expectations tied to the local office.",
      "The role combines backend and full-stack product work with support-driven engineering, code review, self-QA, strong documentation habits, and close collaboration with product and design.",
      "The posting highlights 1 to 2 plus years of experience, Rails, Alpine, TailwindCSS, SQL proficiency, and a product mindset that can iterate quickly from imperfect specs.",
      "This is a local hybrid opportunity with strong compensation and a clearer early-career path than the title alone suggests.",
    ],
    positionSummary:
      "Salt Lake hybrid full-stack role at Atlassian focused on developer experience, product iteration, code quality, and SQL-backed application work.",
    requirementsSummary:
      "1 to 2 plus years of experience, Rails and frontend comfort, strong SQL skills, self-QA discipline, and the ability to work across support and product contexts.",
    requirementsList: [
      "1 to 2 plus years building full-stack or backend applications.",
      "Rails, Alpine, and TailwindCSS familiarity.",
      "Strong SQL proficiency for data-heavy product work.",
      "Good self-QA habits, readable code, and careful validation of edge cases.",
      "Ability to context-switch across multiple support and product tickets.",
      "Bachelor's or master's degree is preferred rather than framed as a strict requirement.",
    ],
    companySummary:
      "Collaboration software company behind Jira, Confluence, Trello, and Bitbucket, with a locally based engineering team tied to cloud and AI-focused product work.",
    companyWebsite: "https://www.atlassian.com",
    seniorityHint: "mid-level",
    degreeRequirement: "Not specified",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "77d914dc75a0f19d",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=77d914dc75a0f19d",
    companyName: "The Grace Company",
    title: "Software Developer (Full Stack – Flutter Focus)",
    locationText: "West Jordan, UT 84084",
    remoteType: "Salt Lake local",
    employmentType: "Full-time",
    compensationRaw: "$70,000 - $90,000 a year",
    compensationLow: 70000,
    compensationHigh: 90000,
    descriptionSections: [
      "Grace Company builds quilting and sewing technology and is hiring an onsite full-stack developer to connect modern software directly to hardware products.",
      "The role centers on Flutter-first application work across mobile, tablet, and web, while also covering backend services, APIs, cloud connectivity, and device communication.",
      "You would work on a small product team that owns architecture, performance, and end-to-end user experience instead of only isolated tickets.",
      "The posting asks for 2 plus years of software development experience, strong Flutter and Dart skills, backend experience in Node.js or Python, and REST API integration work.",
    ],
    positionSummary:
      "Onsite West Jordan product role where Flutter is the primary frontend surface, backed by API, cloud, and hardware-integration work across the stack.",
    requirementsSummary:
      "Flutter and Dart strength, backend service experience, REST integration, and comfort building software that bridges UI, cloud services, and hardware devices.",
    requirementsList: [
      "Strong experience with Flutter and Dart.",
      "Experience building mobile or web applications.",
      "Backend development in Node.js, Python, or a similar stack.",
      "REST APIs and system integration work.",
      "Ability to debug performance across devices and environments.",
      "Bachelor's degree or equivalent experience is accepted.",
    ],
    companySummary:
      "Utah manufacturer and software builder focused on quilting and sewing technology, with products that connect software experiences to physical devices.",
    companyWebsite: "https://graceframe.com",
    seniorityHint: "mid-level",
    degreeRequirement: "Equivalent experience accepted",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "d6e422290eced3c0",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=d6e422290eced3c0",
    companyName: "Monnit Corporation",
    title: "Software Engineer (.NET / Full Stack / IoT)",
    locationText: "Kaysville, UT 84037",
    remoteType: "Utah local",
    employmentType: "Full-time",
    compensationRaw: "From $65,000 a year",
    compensationLow: 65000,
    compensationHigh: 65000,
    descriptionSections: [
      "Monnit builds remote-monitoring IoT products and is hiring a software engineer to work across web, desktop, and mobile applications used in real production deployments.",
      "The role is clearly full-stack, with C#, .NET, JavaScript, and SQL at the core, plus feature delivery, bug fixing, and involvement across the full lifecycle from requirements to deployment.",
      "The posting emphasizes ownership, real-world product impact, and collaboration on architecture and system design instead of only maintenance work.",
      "The stated experience level is higher than pure junior roles, but it remains a non-senior Utah local opportunity with clear application engineering responsibilities.",
    ],
    positionSummary:
      "Utah local full-stack .NET and IoT role spanning web, mobile, desktop, SQL-backed systems, and product ownership from concept through deployment.",
    requirementsSummary:
      "Strong C# and .NET, JavaScript and SQL experience, solid debugging skills, and enough product maturity to own features through deployment.",
    requirementsList: [
      "4 plus years of software development experience.",
      "Strong C# and .NET, including ASP.NET MVC.",
      "HTML, CSS, and JavaScript for product-facing applications.",
      "Relational database work with SQL.",
      "Strong problem-solving and debugging skills.",
      "IoT or data-driven system familiarity is a plus.",
    ],
    companySummary:
      "Global IoT remote-monitoring company building wireless sensor systems and the software used to operate them.",
    companyWebsite: "https://www.monnit.com",
    seniorityHint: "mid-level",
    degreeRequirement: "Not specified",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "4d1dcfcada71d52a",
    canonicalUrl: "https://www.indeed.com/viewjob?jk=4d1dcfcada71d52a",
    companyName: "EnterBridge",
    title: "Software Consultant/Engineer (Full Stack .NET)",
    locationText: "Hybrid work in Lehi, UT",
    remoteType: "Utah hybrid",
    employmentType: "Full-time",
    compensationRaw: null,
    compensationLow: null,
    compensationHigh: null,
    descriptionSections: [
      "EnterBridge is hiring a full-stack .NET consultant/engineer for its mobility team, which builds field-service and mobile workforce-management software for clients.",
      "The role mixes client-facing consulting with hands-on engineering across data aggregation, integrations, analysis systems, APIs, SQL-backed applications, and web UI work.",
      "You would participate in the full lifecycle from discovery and design through development, testing, deployment, and production support for live client implementations.",
      "The posting targets 1 to 5 years of experience and explicitly values C# .NET, APIs, SQL, and curiosity about new technologies.",
    ],
    positionSummary:
      "Hybrid Lehi consulting and engineering role where you build and support full-stack business applications, APIs, and SQL-backed systems for client delivery.",
    requirementsSummary:
      "1 to 5 years of experience with C# .NET, SQL, APIs, web interfaces, and enough communication skill to operate in a client-facing consulting environment.",
    requirementsList: [
      "1 to 5 years of software development experience.",
      "C# .NET development in .NET Core or .NET Framework.",
      "SQL querying and data-driven system development.",
      "Experience building web user interfaces.",
      "Ability to consume and create APIs such as Salesforce, QuickBooks, NetSuite, or HubSpot.",
      "Strong communication for a client-facing consulting role.",
    ],
    companySummary:
      "Utah software consulting firm whose mobility team builds custom field-service and mobile workforce-management solutions.",
    companyWebsite: "https://enterbridge.com",
    seniorityHint: "mid-level",
    degreeRequirement: "Not specified",
    postedDate: discoveryDate,
  },
  {
    discoveryKey: "indeed-salt-lake-local-2026-05-23",
    platform: "Indeed",
    sourceJobId: "zions-angular-salt-lake-2026-05-23",
    canonicalUrl: "https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0DnCE_apoYBHXLBX11EHqdtjQRV4RdPAZX2pv_Q3P4OoX7DSaAwBb8QeCbkhwXcOXYZvi07lWDJDD1aBro8l8C3jGt21hNHwMOM01O58B3iy7M75gGFjKYAeysHzdH3zUz04t3Y8rodlaMTBu6vIN-rJlxHcF9VDneTn7D3Ju4D_hQqJjurJWuMRc5lnyJE1tyKKUyv_Uf5byes0VfMdMIFMfmKG2R2KiGC7iq42p8Ddyc_eb6RCmCEDlX29T2gh6Br35zBofvubqlGK2foU2LTtULKliC2ixCY4kDP6p5mc4aLaT_hb2agZh5sCIO6AOe0R0zf5fadFsPsafD2nn01fL_MNFzuPahsND_suGQx8WXrYv9kd0113HRloaRsADCRuf0ra0-TJYwUy8wUf6rUYE4jaGIxkr00mCsetfAmwGvot2ZoU21PMPgosNlFdaLt_OcCK4bzYjBOumr1pDLxd5Kiwgq2FhkqoxianyyZD50o58ehthWAUJOl6VHAxac4RYHZq7xQJzIAv1dBbGKtrsgeWem6vPNu2ZgHN6hHHIgf-yGDSkAGwv8mp5cFcb6ktUOJVKphSo1A8aRMNTJpQwEI50ViKM2M0uO9SRdeaRx_xWsxc9OgTiyRjJ5_6E_Qct06mvL7ssVcD1Ja7Zpg0YagUbTjFFv500dYHqldaHaisCWZv87vHfkN4WTKtaVSVpDaNuwUnJ4OE0itivFlC2WRldN6zAZN9w6icIKEDXnv3GXave5J4lrGp0pfBwDBuunwFapGa62Ay2gRNQ_ZT50qDwls4KCxf8zqkoccNLBhzh3ixsx_82d4KVmNYq0J4dFKfKzdihutCfVyqF2jcTk7Ctsgj_5qVcdqB7rHuGi2c4e2te-S2j-AR9F_uoPAFVhjDzDwRll2OLoZGbqzNIrBkaRTZopHwjTFkhHbH3_1taOw92oz6ZnilJnM35p9shrOpPdSk34H8umiiw2E",
    companyName: "Zions Bancorporation",
    title: "Software Engineer - Angular",
    locationText: "Hybrid work in Salt Lake City, UT 84133",
    remoteType: "Salt Lake hybrid",
    employmentType: "Full-time",
    compensationRaw: null,
    compensationLow: null,
    compensationHigh: null,
    descriptionSections: [
      "Zions Bancorporation is hiring a Salt Lake City software engineer for its digital strategy team to build web and mobile experiences with Java and Angular.",
      "The work spans solution design, API integration, agile delivery, secure coding, code reviews, documentation, stakeholder demos, and broader digital platform improvements.",
      "The posting calls for 2 plus years of Angular, 4 plus years of Java, Kubernetes and Terraform familiarity, GitHub experience, and strong communication and documentation habits.",
      "It is a hybrid Utah role tied to the Zions Technology Center and reads as a legitimate local application-engineering opportunity rather than a senior-leadership post.",
    ],
    positionSummary:
      "Salt Lake hybrid Angular and Java role on a digital strategy team building customer-facing banking experiences across web, mobile, APIs, and cloud-aligned systems.",
    requirementsSummary:
      "Angular, Java, GitHub, API integration, agile delivery, and enough platform awareness to work with Kubernetes, Terraform, and secure SDLC practices.",
    requirementsList: [
      "2 plus years of Angular experience.",
      "4 plus years of Java experience.",
      "Working knowledge of Kubernetes and Terraform from a developer environment.",
      "GitHub experience and strong documentation habits.",
      "Ability to design and integrate internal and external APIs.",
      "Bachelor's degree or equivalent experience, with education and experience combinations considered.",
    ],
    companySummary:
      "Regional banking and technology organization building digital customer experiences from its Utah technology center.",
    companyWebsite: "https://www.zionsbancorporation.com",
    seniorityHint: "mid-level",
    degreeRequirement: "Equivalent experience accepted",
    postedDate: discoveryDate,
  },
];

export async function fetchCuratedDiscoveryJobs(target: CuratedDiscoveryTarget) {
  return curatedDiscoverySeeds
    .filter((seed) => seed.discoveryKey === target.discoveryKey)
    .map<NormalizedJobListing>((seed) => ({
      adapterKey: target.adapterKey,
      sourceName: target.sourceName,
      targetName: target.targetName,
      sourceJobId: seed.sourceJobId,
      canonicalUrl: seed.canonicalUrl,
      companyName: seed.companyName,
      title: seed.title,
      locationText: seed.locationText,
      remoteType: seed.remoteType,
      employmentType: seed.employmentType,
      compensationRaw: seed.compensationRaw,
      compensationLow: seed.compensationLow,
      compensationHigh: seed.compensationHigh,
      description: seed.descriptionSections.join("\n\n"),
      positionSummary: seed.positionSummary,
      requirementsSummary: seed.requirementsSummary,
      requirementsList: seed.requirementsList,
      companySummary: seed.companySummary,
      companyWebsite: seed.companyWebsite,
      seniorityHint: seed.seniorityHint,
      degreeRequirement: seed.degreeRequirement,
      internshipFlag: 0,
      postedDate: seed.postedDate,
      rawPayload: JSON.stringify({
        platform: seed.platform,
        discoveredAt: discoveryDate,
        captureMethod: "browser-assisted",
        targetName: target.targetName,
        descriptionSections: seed.descriptionSections,
        requirementsList: seed.requirementsList,
      }),
    }));
}