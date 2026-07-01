import { DashboardShell } from "@/components/dashboard-shell";
import { getPreparationSnapshot } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function PrepPage() {
  const snapshot = getPreparationSnapshot();
  const refreshedAt = snapshot.lastUpdatedAt
    ? longDateFormatter.format(new Date(snapshot.lastUpdatedAt))
    : "local data pending";

  return (
    <DashboardShell
      currentPath="/prep"
      title="Week two prep plan"
      description="This page turns the current Utah software role set into a concrete study and build queue so your polishing work maps directly to what local teams are asking for."
      meta={`Prep plan refreshed ${refreshedAt}`}
      aside={
        <>
          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Market sample
            </p>
            <div className="mt-4 grid gap-3">
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Utah roles analyzed</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {snapshot.analyzedJobCount}
                </p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Apply-now roles</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                  {snapshot.applyNowCount}
                </p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Candidate baseline</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{snapshot.profile.summary}</p>
              </article>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-5 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              How to use this
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              <li className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                Keep polishing the big projects, but make each polish sprint prove one of the focus areas below.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                Prefer shippable evidence over passive study: every topic here should end in a visible repo change, note, or demo.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                The first four focus areas are the highest-overlap preparation targets for the current Utah role set.
              </li>
            </ul>
          </section>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {snapshot.sequence.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {item.label}
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.focus}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.objective}</p>
            <p className="mt-4 rounded-2xl border border-black/8 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-100">
              {item.deliverable}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Best next steps
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Data-backed areas to strengthen before applications ramp up
          </h2>
        </div>

        <div className="space-y-4">
          {snapshot.focusAreas.map((item) => (
            <article
              key={item.id}
              className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Priority {item.priority}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.supportLabel}</p>
                </div>
                <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  {item.timeEstimate}
                </span>
              </div>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-700">{item.whyItMatters}</p>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    What to study
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {item.whatToStudy.map((detail) => (
                      <li key={detail} className="rounded-xl bg-slate-50 px-3 py-2">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Implement in your apps
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {item.implementationIdeas.map((detail) => (
                      <li key={detail} className="rounded-xl bg-slate-50 px-3 py-2">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Role signals
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {item.roleSignals.map((signal) => (
                      <li key={signal} className="rounded-xl bg-slate-50 px-3 py-2">
                        {signal}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}