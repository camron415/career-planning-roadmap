import { DashboardShell } from "@/components/dashboard-shell";
import { getSettingsSnapshot } from "@/lib/dashboard-data";
import { hardGuardrails, prioritySources, runCadence } from "@/lib/project-config";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function SettingsPage() {
  const snapshot = getSettingsSnapshot();

  return (
    <DashboardShell
      currentPath="/settings"
      title="Settings and intake rules"
      description="Candidate assumptions, run cadence, and source priorities are now represented in code and backed by the local store."
      meta={`Profile updated ${dateFormatter.format(new Date(snapshot.profile.updatedAt))}`}
      aside={
        <>
          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Local system state
            </p>
            <div className="mt-4 grid gap-3">
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Data store</p>
                <p className="mt-2 font-medium text-slate-950">data/career-dashboard.sqlite</p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Tracked sources</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {snapshot.systemCounts.sourceCount}
                </p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Seeded companies</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {snapshot.systemCounts.companyCount}
                </p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Roadmap items</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {snapshot.systemCounts.roadmapCount}
                </p>
              </article>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-5 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Guardrails
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {hardGuardrails.map((guardrail) => (
                <li key={guardrail} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                  {guardrail}
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Candidate assumptions
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Stored baseline for scoring and filtering
          </h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Location</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">{snapshot.profile.location}</dd>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Work authorization</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">
                {snapshot.profile.workAuthorization}
              </dd>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Compensation floor</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">
                ${snapshot.profile.compensationBaselineHourly}/hour
              </dd>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Commute cap</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">
                {snapshot.profile.commuteRadiusMinutes} minutes
              </dd>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Degree status</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">{snapshot.profile.degreeStatus}</dd>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <dt className="text-xs uppercase tracking-[0.24em] text-slate-500">Internship toggle</dt>
              <dd className="mt-2 text-lg font-medium text-slate-950">
                {snapshot.profile.internshipEligibility ? "Eligible" : "Off by default"}
              </dd>
            </div>
          </dl>
          <div className="mt-5 rounded-[1.5rem] border border-black/8 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-200">
            {snapshot.profile.summary}
          </div>
        </article>

        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Run cadence
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
            Scheduled execution targets
          </h2>
          <div className="mt-5 space-y-3">
            {runCadence.map((run) => (
              <article key={run.label} className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-950">{run.label}</h3>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-950">
                    {run.time}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{run.detail}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Initial source stack
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              First-wave adapters to implement next
            </h2>
          </div>
          <p className="text-sm text-slate-600">Seeded in the database and aligned to the planning brief.</p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {snapshot.sources.map((source) => (
            <article
              key={source.name}
              className="rounded-[1.5rem] border border-black/8 bg-white/72 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{source.sourceType}</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950">{source.name}</h3>
                </div>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                  {source.reliabilityScore}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{source.baseUrl}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                Fetch method: {source.fetchMethod}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.85rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-6 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Priority interpretation
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Why these sources come first
            </h2>
          </div>
          <p className="text-sm text-slate-300">This list stays intentionally narrow until dedupe and scoring are stable.</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {prioritySources.map((source) => (
            <article key={source.name} className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white">{source.name}</h3>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
                  {source.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{source.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}