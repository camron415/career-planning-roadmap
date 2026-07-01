import Link from "next/link";

import { DashboardShell } from "@/components/dashboard-shell";
import { getResumePackets } from "@/lib/resume-packets";
import { getResumeSnapshot } from "@/lib/resume-data";

export const dynamic = "force-dynamic";

export default function ResumePage() {
  const snapshot = getResumeSnapshot();
  const packets = getResumePackets();

  return (
    <DashboardShell
      currentPath="/resume"
      title="Resume system"
      description="This page now stores the control resume: the generic ATS-first baseline that every future tailored resume will branch from once the target-job research is refreshed."
      meta={snapshot.controlResume.status}
      aside={
        <>
          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Resume status
            </p>
            <div className="mt-4 grid gap-3">
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Baseline</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {snapshot.controlResume.label} is now the default source resume for all future variants.
                </p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Preferred formats</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                  {snapshot.formatGuidance.preferredFormats.map((item) => (
                    <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-5 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Readiness notes
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {snapshot.controlResume.readinessNotes.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Open inputs
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {snapshot.openInputs.map((item) => (
                <li key={item} className="rounded-2xl border border-black/8 bg-white/72 px-3 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </>
      }
    >
      <section className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Resume library
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Dashboard-accessible control and tailored resume packets
            </h2>
          </div>
          <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {packets.length} packets ready
          </span>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {packets.map((packet) => (
            <article key={packet.slug} className="rounded-[1.5rem] border border-black/8 bg-white/72 p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{packet.kind}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">{packet.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{packet.targetRole}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                    {packet.targetLocation}
                    {packet.totalScore != null ? ` · score ${packet.totalScore}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-950">
                  {packet.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">{packet.positionSummary}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                <Link href={`/resume/${packet.slug}`} className="rounded-full border border-black/10 bg-slate-950 px-4 py-2 text-white">
                  Open packet
                </Link>
                <Link href={packet.exportHtmlPath} className="rounded-full border border-black/10 bg-white px-4 py-2 text-slate-800">
                  Printable HTML
                </Link>
                <Link href={packet.exportDocxPath} className="rounded-full border border-black/10 bg-white px-4 py-2 text-slate-800">
                  DOCX
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Control resume
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Generic ATS-first baseline for future tailored versions
            </h2>
          </div>
          <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {snapshot.controlResume.status}
          </span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-black/8 bg-white/72 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Header</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{snapshot.controlResume.label}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">{snapshot.controlResume.summary}</p>
            <dl className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Candidate</dt>
                <dd className="mt-2 font-medium text-slate-950">{snapshot.candidateName}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Role headline</dt>
                <dd className="mt-2 font-medium text-slate-950">{snapshot.controlResume.roleHeadline}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Authorization</dt>
                <dd className="mt-2 font-medium text-slate-950">{snapshot.workAuthorization}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</dt>
                <dd className="mt-2 font-medium text-slate-950">{snapshot.email}</dd>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</dt>
                <dd className="mt-2 font-medium text-slate-950">{snapshot.phone}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-black/8 bg-white/72 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Control-scope skills</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
              {snapshot.coreSkills.map((skill) => (
                <li key={skill} className="rounded-full bg-slate-100 px-3 py-2 font-medium text-slate-800">
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Structured preview
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            The control resume as it should read before job-specific tailoring
          </h2>
        </div>

        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <div className="rounded-[1.5rem] border border-black/8 bg-slate-950 px-5 py-5 text-slate-100">
            <p className="text-lg font-semibold text-white">{snapshot.candidateName}</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              {snapshot.location} · {snapshot.email} · {snapshot.phone}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-200">{snapshot.workAuthorization}</p>
            <p className="mt-4 text-base font-semibold text-white">
              {snapshot.controlResume.roleHeadline}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{snapshot.controlResume.summary}</p>
          </div>

          <div className="mt-5 space-y-4">
            {snapshot.controlResume.sections.map((section) => (
              <section key={section.title} className="rounded-[1.5rem] border border-black/8 bg-white/72 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {section.title}
                </p>
                <div className="mt-4 space-y-4">
                  {section.entries.map((entry) => (
                    <article key={`${section.title}-${entry.title}`} className="rounded-xl bg-slate-50 px-4 py-4">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <h3 className="text-base font-semibold text-slate-950">{entry.title}</h3>
                        <p className="text-sm text-slate-500">{entry.meta}</p>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Raw copy version
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Copy-ready text for export or manual tailoring
          </h2>
        </div>

        <pre className="mt-5 overflow-x-auto rounded-[1.5rem] border border-black/8 bg-slate-950 px-5 py-5 text-sm leading-7 text-slate-100 whitespace-pre-wrap">
          {snapshot.controlResume.rawText}
        </pre>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Project evidence
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Strongest proof to lean on before tailoring job by job
          </h2>
        </div>

        <div className="space-y-4">
          {snapshot.projects.map((project) => (
            <article
              key={project.name}
              className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
                    {project.resumeAngle}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 xl:max-w-sm xl:justify-end">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {project.highlights.map((item) => (
                      <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Resume bullets
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {project.bullets.map((item) => (
                      <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Public proof strategy
                  </p>
                  <p className="mt-3 rounded-xl bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700">
                    {project.shareStrategy}
                  </p>
                </section>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Include and exclude
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Include</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {snapshot.formatGuidance.include.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Exclude</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {snapshot.formatGuidance.exclude.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <section className="mt-4 rounded-2xl border border-black/8 bg-slate-950 px-4 py-4 text-sm leading-6 text-slate-100">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/80">
              Accompanying materials
            </p>
            <ul className="mt-3 space-y-2">
              {snapshot.formatGuidance.accompanyingMaterials.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-white/6 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Short-term upgrades
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Improvements that strengthen both the resume and the interviews
          </h2>
          <div className="mt-5 space-y-3">
            {snapshot.improvements.map((item) => (
              <article key={item.title} className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.whyItHelps}</p>
                <p className="mt-4 rounded-xl bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700">
                  {item.shortTermProof}
                </p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </DashboardShell>
  );
}