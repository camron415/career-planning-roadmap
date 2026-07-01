import type { FitLabel } from "@/db/schema";

type FitPillProps = {
  label: FitLabel;
  score: number;
};

const labelCopy: Record<FitLabel, string> = {
  "apply-now": "Apply now",
  "apply-with-tailoring": "Tailor and apply",
  stretch: "Stretch",
  blocked: "Blocked",
  ignore: "Ignore",
};

const labelTone: Record<FitLabel, string> = {
  "apply-now": "bg-emerald-100 text-emerald-950",
  "apply-with-tailoring": "bg-cyan-100 text-cyan-950",
  stretch: "bg-amber-100 text-amber-950",
  blocked: "bg-rose-100 text-rose-950",
  ignore: "bg-slate-200 text-slate-700",
};

export function FitPill({ label, score }: FitPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${labelTone[label]}`}
    >
      <span>{score}/100</span>
      <span className="h-1.5 w-1.5 rounded-full bg-current/70" aria-hidden="true" />
      <span>{labelCopy[label]}</span>
    </div>
  );
}