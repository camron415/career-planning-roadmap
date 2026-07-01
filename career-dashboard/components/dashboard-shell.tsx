import Link from "next/link";

type DashboardShellProps = {
  currentPath: "/" | "/prep" | "/resume" | "/settings";
  title: string;
  description: string;
  meta: string;
  children: React.ReactNode;
  aside: React.ReactNode;
};

const navigation = [
  { href: "/" as const, label: "Inbox" },
  { href: "/prep" as const, label: "Prep" },
  { href: "/resume" as const, label: "Resume" },
  { href: "/settings" as const, label: "Settings" },
];

export function DashboardShell({
  currentPath,
  title,
  description,
  meta,
  children,
  aside,
}: DashboardShellProps) {
  return (
    <div className="relative min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="grain" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-[2rem] border border-black/10 bg-[color:var(--surface)] px-5 py-5 shadow-[0_24px_80px_rgba(17,32,51,0.08)] backdrop-blur sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                CareerOps local
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <nav className="inline-flex rounded-full border border-black/10 bg-white/76 p-1.5">
                {navigation.map((item) => {
                  const isActive = item.href === currentPath;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-slate-950 text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <p className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-950">
                {meta}
              </p>
            </div>
          </div>
        </header>

        <main className="grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_minmax(19rem,0.95fr)] xl:items-start">
          <div className="space-y-5">{children}</div>
          <aside className="space-y-5">{aside}</aside>
        </main>
      </div>
    </div>
  );
}