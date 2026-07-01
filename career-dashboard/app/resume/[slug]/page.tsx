import Link from "next/link";
import { notFound } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { ResumeDocument } from "@/components/resume-document";
import { getResumePacket } from "@/lib/resume-packets";
import { getResumeSnapshot } from "@/lib/resume-data";

export const dynamic = "force-dynamic";

type ResumePacketPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ResumePacketPage({ params }: ResumePacketPageProps) {
  const { slug } = await params;
  const packet = getResumePacket(slug);

  if (!packet) {
    notFound();
  }

  const snapshot = getResumeSnapshot();

  return (
    <DashboardShell
      currentPath="/resume"
      title={packet.kind === "control" ? packet.label : `${packet.label} resume packet`}
      description={packet.positionSummary}
      meta={packet.status}
      aside={
        <>
          <section className="rounded-[1.75rem] border border-black/10 bg-white/78 p-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Packet summary
            </p>
            <div className="mt-4 grid gap-3">
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Type</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{packet.kind}</p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Role</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{packet.targetRole}</p>
              </article>
              <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Location</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{packet.targetLocation}</p>
              </article>
              {packet.totalScore != null ? (
                <article className="rounded-2xl border border-black/8 bg-white/72 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Fit score</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                    {packet.totalScore}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{packet.fitLabel}</p>
                </article>
              ) : null}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-black/10 bg-[rgba(17,32,51,0.94)] p-5 text-slate-100 shadow-[0_24px_80px_rgba(17,32,51,0.12)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Export links
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <Link href={packet.exportHtmlPath} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                Open printable HTML
              </Link>
              <Link href={packet.exportDocxPath} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                Download DOCX
              </Link>
              {packet.sourceUrl ? (
                <Link href={packet.sourceUrl} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3">
                  Open source posting
                </Link>
              ) : null}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-300">
              The HTML export is styled as the canonical document preview and can be saved to PDF from the browser print dialog.
            </p>
          </section>
        </>
      }
    >
      <section className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Resume preview
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              {packet.label}
            </h2>
          </div>
          <Link href="/resume" className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-slate-800">
            Back to library
          </Link>
        </div>

        <div className="mt-6 rounded-[2rem] bg-[linear-gradient(180deg,#eef3f9_0%,#f7fafc_100%)] px-4 py-5 sm:px-6">
          <ResumeDocument
            candidateName={snapshot.candidateName}
            location={snapshot.location}
            email={snapshot.email}
            phone={snapshot.phone}
            workAuthorization={snapshot.workAuthorization}
            roleHeadline={packet.roleHeadline}
            summary={packet.summary}
            skillHighlights={packet.skillHighlights}
            sections={packet.sections}
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            ATS keywords
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm text-slate-700">
            {packet.atsKeywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-slate-100 px-3 py-2 font-medium text-slate-800">
                {keyword}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Tailoring decisions
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Emphasize</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {packet.emphasize.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-2xl border border-black/8 bg-white/72 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Downplay</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {packet.downplay.map((item) => (
                  <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Research basis
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700">{packet.positionSummary}</p>
          {packet.companySummary ? (
            <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
              {packet.companySummary}
            </p>
          ) : null}
          {packet.compensation ? (
            <p className="mt-4 text-sm font-medium text-slate-800">Compensation noted: {packet.compensation}</p>
          ) : null}
        </article>

        <article className="rounded-[1.85rem] border border-black/10 bg-white/80 p-6 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Requirements extracted
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
            {packet.requirements.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </DashboardShell>
  );
}