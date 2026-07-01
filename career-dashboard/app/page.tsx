import Link from "next/link";

import { refreshJobsAction } from "@/app/actions";
import { DashboardShell } from "@/components/dashboard-shell";
import { FitPill } from "@/components/fit-pill";
import { getDashboardSnapshot, parseDashboardFilters } from "@/lib/dashboard-data";
import { buildMilestones, hardGuardrails } from "@/lib/project-config";

export const dynamic = "force-dynamic";

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

function formatDate(value: string) {
  return shortDateFormatter.format(new Date(value));
}

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const filters = parseDashboardFilters(await searchParams);
  const snapshot = getDashboardSnapshot(filters);
  const refreshedAt = snapshot.summary.lastUpdatedAt
    ? longDateFormatter.format(new Date(snapshot.summary.lastUpdatedAt))
    : "seed data pending";
  const hasActiveFilters =
    snapshot.filters.workplace !== "all" ||
    snapshot.filters.scoreBand !== "all" ||
    snapshot.filters.compensation !== "all" ||
    snapshot.filters.source !== "all" ||
    snapshot.filters.seniority !== "exclude-senior" ||
    snapshot.filters.blocked !== "hide" ||
    snapshot.filters.duplicates !== "hide";
  const summaryCards = [
    {
      label: "Visible roles",
      value: snapshot.summary.visibleJobs,
      description: `${snapshot.summary.totalJobs} total roles in the local store.`,
    },
    {
      label: "Apply now",
      value: snapshot.summary.applyNowCount,
      description: "Top current matches after the live scoring pass.",
    },
    {
      label: "Live roles",
      value: snapshot.summary.liveJobCount,
      description: "Jobs pulled from live adapters rather than preview seeds.",
    },
    {
      label: "Average score",
      value: `${snapshot.summary.averageScore}`,
      description: "Average fit score across the currently visible inbox.",
    },
  ];

  return (
    <DashboardShell
      currentPath="/"
      title="Opportunity inbox"
      description="The inbox now mixes broader live ingestion with a real scoring pass, then lets you filter out senior or blocked roles before review."
      meta={`Last local refresh ${refreshedAt}`}
      aside={
        <>
          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Candidate profile
            </p>
            <h2 className="mt-3 text-xl font-semibold text-slate-950">
              {snapshot.profile.candidateName}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {snapshot.profile.summary}
            </p>
            <dl className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Base compensation</dt>
                <dd>${snapshot.profile.compensationBaselineHourly}/hr</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Commute radius</dt>
                <dd>{snapshot.profile.commuteRadiusMinutes} minutes</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Degree status</dt>
                <dd>{snapshot.profile.degreeStatus}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Visible blocked roles</dt>
                <dd>{snapshot.summary.blockedCount}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-5 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Guardrails
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {hardGuardrails.map((guardrail) => (
                <li
                  key={guardrail}
                  className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3"
                >
                  {guardrail}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Roadmap preview
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">
                  Three targeted next moves
                </h2>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-950">
                data-backed
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {snapshot.roadmapItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-black/8 bg-white/70 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <span className="rounded-full bg-teal-100 px-2 py-1 text-xs font-semibold text-teal-950">
                      P{item.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.expectedImpact}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                    {item.category} · {item.timeEstimate}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {card.label}
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Inbox filters
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Trim the inbox to the roles worth reviewing now
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-slate-600">
              Live roles and preview roles are both rescored through the same local pipeline.
            </p>
            <form action={refreshJobsAction}>
              <button
                type="submit"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-800"
              >
                Refresh live jobs
              </button>
            </form>
          </div>
        </div>

        <form className="grid gap-4 rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur md:grid-cols-2 xl:grid-cols-8" method="GET">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Workplace
            <select
              name="workplace"
              defaultValue={snapshot.filters.workplace}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="all">All</option>
              <option value="remote">Remote only</option>
              <option value="local">Local / non-remote</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Score band
            <select
              name="scoreBand"
              defaultValue={snapshot.filters.scoreBand}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="all">All</option>
              <option value="apply-now">Apply now</option>
              <option value="apply-with-tailoring">Tailor and apply</option>
              <option value="stretch">Stretch</option>
              <option value="blocked">Blocked</option>
              <option value="ignore">Ignore</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Compensation
            <select
              name="compensation"
              defaultValue={snapshot.filters.compensation}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="all">All</option>
              <option value="meets-baseline">Meets baseline</option>
              <option value="unknown">Unknown only</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Source
            <select
              name="source"
              defaultValue={snapshot.filters.source}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="all">All</option>
              {snapshot.filterOptions.sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Seniority
            <select
              name="seniority"
              defaultValue={snapshot.filters.seniority}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="exclude-senior">Hide senior roles</option>
              <option value="all">All roles</option>
              <option value="junior-only">Junior / early only</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Blocked roles
            <select
              name="blocked"
              defaultValue={snapshot.filters.blocked}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="hide">Hide blocked</option>
              <option value="show">Show blocked</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Duplicates
            <select
              name="duplicates"
              defaultValue={snapshot.filters.duplicates}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-950 outline-none"
            >
              <option value="hide">Hide duplicates</option>
              <option value="show">Show duplicates</option>
            </select>
          </label>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Apply filters
            </button>
            {hasActiveFilters ? (
              <Link
                href="/"
                className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Reset
              </Link>
            ) : null}
          </div>
        </form>

        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <p>
            Showing {snapshot.summary.visibleJobs} of {snapshot.summary.totalJobs} roles.
          </p>
          {snapshot.summary.hiddenDuplicateCount > 0 && snapshot.filters.duplicates === "hide" ? (
            <p>{snapshot.summary.hiddenDuplicateCount} duplicate postings hidden.</p>
          ) : hasActiveFilters ? (
            <p>Filters are active on the current inbox view.</p>
          ) : null}
        </div>

        <div className="space-y-4">
          {snapshot.jobs.length === 0 ? (
            <article className="rounded-[1.85rem] border border-dashed border-black/15 bg-white/75 p-8 text-center shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
              <p className="text-lg font-semibold text-slate-950">No roles match the current filters.</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Widen the score band or compensation filter, or reset the inbox to the full local result set.
              </p>
            </article>
          ) : (
            snapshot.jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                      <span>{job.sourceDetail ?? job.sourceName}</span>
                      <span>posted {formatDate(job.postedDate)}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] tracking-[0.2em] text-slate-700">
                        {job.status === "live" ? "live" : "preview"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      {job.title}
                    </h3>
                    <p className="mt-2 text-base text-slate-700">
                      {job.companyName} · {job.locationText}
                    </p>
                  </div>
                  <FitPill label={job.fitLabel} score={job.totalScore} />
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600">
                  {job.rationaleSummary}
                </p>

                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Position summary
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {job.positionSummary}
                    </p>
                  </section>

                  <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Requirements snapshot
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                      {job.requirementsList.slice(0, 5).map((item) => (
                        <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Company
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {job.companySummary ?? "Company summary will deepen as company enrichment comes online."}
                    </p>
                    {job.companyWebsite ? (
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex text-sm font-semibold text-teal-900"
                      >
                        Company site
                      </a>
                    ) : null}
                  </section>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-700">
                  <span className="rounded-full bg-slate-950 px-3 py-1.5 font-semibold text-white">
                    {job.remoteType}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                    {job.employmentType}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                    {job.compensationRaw ?? "Compensation not listed"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                    Degree: {job.degreeRequirement}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                    Seniority: {job.seniorityHint.replace("-", " ")}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                  <a
                    href={job.canonicalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-slate-950 px-4 py-2 font-semibold text-white"
                  >
                    Open posting
                  </a>
                  <span className="text-slate-500">{job.sourceName}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span className="rounded-full bg-teal-100 px-3 py-2 text-teal-950">
                    Access {job.accessFitScore}
                  </span>
                  <span className="rounded-full bg-sky-100 px-3 py-2 text-sky-950">
                    Skill {job.skillFitScore}
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-2 text-amber-950">
                    Growth {job.growthFitScore}
                  </span>
                </div>

                {job.blockers.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.blockers.map((blocker) => (
                      <span
                        key={blocker}
                        className="rounded-full bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-950"
                      >
                        {blocker}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>

      <section className="rounded-[1.85rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-6 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Build sequence
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              What this first implementation unlocked
            </h2>
          </div>
          <p className="text-sm text-slate-300">The app shell is now anchored to real tables, not placeholder JSX.</p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {buildMilestones.map((milestone) => (
            <article
              key={milestone.title}
              className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-white">{milestone.title}</h3>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100">
                  {milestone.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{milestone.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}
