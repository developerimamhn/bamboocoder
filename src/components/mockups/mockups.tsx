import type { ReactNode } from "react";
import type { MockupVariant } from "@/content/types";
import { cn } from "@/lib/utils";

/*
 * Illustrative product interfaces, drawn in code so they stay crisp,
 * lightweight and on-brand. All mockups are decorative (aria-hidden).
 */

export function BrowserFrame({ children, url = "app.example.com", className }: { children: ReactNode; url?: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-surface shadow-lift", className)}>
      <div className="flex items-center gap-3 border-b border-line bg-canvas/70 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="mx-auto flex h-6 w-full max-w-[260px] items-center justify-center rounded-md border border-line bg-surface font-mono text-[10px] text-subtle">
          {url}
        </div>
        <div className="w-10" />
      </div>
      {children}
    </div>
  );
}

function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-line", className)} />;
}

function Sidebar({ active = 1 }: { active?: number }) {
  return (
    <aside className="hidden w-[150px] shrink-0 flex-col gap-1 border-r border-line bg-canvas/50 p-3 sm:flex">
      <div className="mb-3 flex items-center gap-2 px-1.5">
        <span className="size-4 rounded-[5px] bg-bamboo-600" />
        <Bar className="w-14 bg-line-strong" />
      </div>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className={cn("flex items-center gap-2 rounded-md px-1.5 py-1.5", i === active && "bg-surface shadow-soft")}>
          <span className={cn("size-3 rounded-[4px]", i === active ? "bg-bamboo-500" : "bg-line-strong")} />
          <Bar className={cn(i === active ? "w-16 bg-ink/25" : "w-12")} />
        </div>
      ))}
      <div className="mt-auto rounded-lg border border-line bg-surface p-2">
        <Bar className="w-16" />
        <Bar className="mt-1.5 w-10 bg-bamboo-200" />
      </div>
    </aside>
  );
}

function AreaChart({ className }: { className?: string }) {
  const line = "M0 92 C 40 86, 60 70, 95 72 S 150 52, 190 56 S 250 30, 290 36 S 350 18, 400 14";
  return (
    <svg viewBox="0 0 400 110" preserveAspectRatio="none" className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id="mk-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-bamboo-400)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-bamboo-400)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[22, 50, 78].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="var(--color-line)" strokeDasharray="3 4" />
      ))}
      <path d={`${line} L400 110 L0 110 Z`} fill="url(#mk-area)" />
      <path d="M0 98 C 50 96, 80 88, 120 90 S 200 76, 240 80 S 330 64, 400 60" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d={line} fill="none" stroke="var(--color-bamboo-600)" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="290" cy="36" r="4" fill="var(--color-surface)" stroke="var(--color-bamboo-600)" strokeWidth="2" />
    </svg>
  );
}

function Kpi({ label, value, delta, tone = "up" }: { label: string; value: string; delta: string; tone?: "up" | "flat" }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <p className="text-[10px] font-medium text-muted">{label}</p>
      <div className="mt-1.5 flex items-baseline justify-between gap-2">
        <p className="text-base font-semibold tracking-tight text-ink sm:text-lg">{value}</p>
        <span className={cn("rounded-full px-1.5 py-0.5 text-[9px] font-medium", tone === "up" ? "bg-bamboo-50 text-bamboo-700" : "bg-sunken text-muted")}>
          {delta}
        </span>
      </div>
    </div>
  );
}

function StatusChip({ tone, children }: { tone: "green" | "amber" | "gray"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium",
        tone === "green" && "bg-bamboo-50 text-bamboo-700",
        tone === "amber" && "bg-warning-soft text-warning",
        tone === "gray" && "bg-sunken text-muted",
      )}
    >
      <span className={cn("size-1 rounded-full", tone === "green" ? "bg-bamboo-500" : tone === "amber" ? "bg-warning" : "bg-subtle")} />
      {children}
    </span>
  );
}

export function DashboardMockup() {
  const rows: { name: string; tone: "green" | "amber" | "gray"; status: string; w: string }[] = [
    { name: "Northside renovation", tone: "green", status: "On track", w: "w-[72%]" },
    { name: "Warehouse fit-out", tone: "amber", status: "At risk", w: "w-[48%]" },
    { name: "Clinic onboarding", tone: "green", status: "On track", w: "w-[86%]" },
    { name: "Retail rollout", tone: "gray", status: "Planned", w: "w-[18%]" },
  ];
  return (
    <div className="flex min-h-[340px] text-ink">
      <Sidebar />
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] text-muted">Overview</p>
            <p className="text-sm font-semibold tracking-tight">Operations this week</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden h-6 w-28 rounded-md border border-line bg-canvas sm:block" />
            <span className="size-6 rounded-full bg-bamboo-100 ring-2 ring-surface" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          <Kpi label="Active jobs" value="128" delta="+12%" />
          <Kpi label="On-time rate" value="96.4%" delta="+2.1" />
          <Kpi label="Open tickets" value="14" delta="−3" tone="flat" />
        </div>
        <div className="mt-3 rounded-xl border border-line bg-surface p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium text-muted">Throughput</p>
            <div className="flex gap-1">
              {["7d", "30d", "90d"].map((t, i) => (
                <span key={t} className={cn("rounded px-1.5 py-0.5 text-[9px]", i === 1 ? "bg-ink text-white" : "text-muted")}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 h-24">
            <AreaChart />
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-surface">
          {rows.map((r, i) => (
            <div key={r.name} className={cn("flex items-center gap-3 px-3 py-2", i > 0 && "border-t border-line")}>
              <span className="size-5 shrink-0 rounded-md bg-sunken" />
              <p className="w-28 shrink-0 truncate text-[10px] font-medium sm:w-36">{r.name}</p>
              <div className="hidden h-1.5 flex-1 rounded-full bg-sunken sm:block">
                <div className={cn("h-full rounded-full bg-bamboo-400", r.w)} />
              </div>
              <div className="ml-auto">
                <StatusChip tone={r.tone}>{r.status}</StatusChip>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AnalyticsMockup() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 82, 70, 88, 78, 94];
  return (
    <div className="flex min-h-[340px] text-ink">
      <Sidebar active={2} />
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted">Reports</p>
            <p className="text-sm font-semibold tracking-tight">Revenue & retention</p>
          </div>
          <span className="rounded-md border border-line px-2 py-1 text-[9px] text-muted">Last 12 months</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Kpi label="Monthly revenue" value="$84.2k" delta="+8.4%" />
          <Kpi label="Net retention" value="112%" delta="+3.0" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-line bg-surface p-3">
            <p className="text-[10px] font-medium text-muted">Revenue by month</p>
            <div className="mt-3 flex h-28 items-end gap-1.5">
              {bars.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} className={cn("flex-1 rounded-t-[3px]", i === bars.length - 1 ? "bg-bamboo-600" : "bg-bamboo-200")} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
            <svg viewBox="0 0 36 36" className="size-20 shrink-0 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-sunken)" strokeWidth="5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-bamboo-600)" strokeWidth="5" strokeDasharray="52 88" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="var(--color-bamboo-300)" strokeWidth="5" strokeDasharray="22 88" strokeDashoffset="-52" />
            </svg>
            <div className="flex flex-col gap-2 text-[9px] text-muted">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-bamboo-600" />Subscriptions</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-bamboo-300" />Services</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-sunken" />Other</span>
            </div>
          </div>
        </div>
        <div className="mt-3 h-16 rounded-xl border border-line bg-surface p-2">
          <AreaChart />
        </div>
      </div>
    </div>
  );
}

export function BoardMockup() {
  const columns = [
    { title: "Scheduled", count: 6, cards: [["w-24", "gray"], ["w-20", "gray"], ["w-28", "gray"]] },
    { title: "In progress", count: 4, cards: [["w-20", "green"], ["w-28", "amber"], ["w-16", "green"]] },
    { title: "Completed", count: 9, cards: [["w-24", "green"], ["w-20", "green"]] },
  ] as const;
  return (
    <div className="flex min-h-[340px] text-ink">
      <Sidebar active={0} />
      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted">Dispatch</p>
            <p className="text-sm font-semibold tracking-tight">Today&apos;s board</p>
          </div>
          <span className="rounded-full bg-bamboo-700 px-2.5 py-1 text-[9px] font-medium text-white">+ New job</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {columns.map((col) => (
            <div key={col.title} className="rounded-xl bg-sunken/70 p-2">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-[10px] font-semibold">{col.title}</p>
                <span className="text-[9px] text-muted">{col.count}</span>
              </div>
              <div className="flex flex-col gap-2">
                {col.cards.map(([w, tone], i) => (
                  <div key={i} className="rounded-lg border border-line bg-surface p-2 shadow-soft">
                    <Bar className={cn(w, "bg-ink/20")} />
                    <Bar className="mt-1.5 w-12" />
                    <div className="mt-2.5 flex items-center justify-between">
                      <StatusChip tone={tone}>{tone === "green" ? "Ready" : tone === "amber" ? "Delayed" : "Queued"}</StatusChip>
                      <span className="size-4 rounded-full bg-bamboo-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("w-[220px] rounded-[2rem] border border-line-strong bg-ink p-1.5 shadow-lift", className)}>
      <div className="overflow-hidden rounded-[1.6rem] bg-surface">
        <div className="flex justify-center pt-2">
          <span className="h-1.5 w-14 rounded-full bg-ink" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function MobileScreen() {
  const items = [
    { time: "09:00", title: "Site inspection", tone: "green" as const, status: "Done" },
    { time: "11:30", title: "Equipment check", tone: "amber" as const, status: "Due" },
    { time: "14:00", title: "Client walkthrough", tone: "gray" as const, status: "Later" },
  ];
  return (
    <div className="px-3.5 pb-4 pt-3 text-ink">
      <p className="text-[9px] text-muted">Thursday</p>
      <p className="text-[13px] font-semibold tracking-tight">Your schedule</p>
      <div className="mt-3 rounded-xl bg-bamboo-700 p-3 text-white">
        <p className="text-[9px] text-white/70">Next up · 11:30</p>
        <p className="mt-0.5 text-[11px] font-semibold">Equipment check</p>
        <div className="mt-2 h-1 rounded-full bg-white/20">
          <div className="h-full w-2/3 rounded-full bg-bamboo-200" />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((it) => (
          <div key={it.time} className="flex items-center gap-2.5 rounded-lg border border-line p-2">
            <span className="font-mono text-[9px] text-muted">{it.time}</span>
            <p className="flex-1 truncate text-[10px] font-medium">{it.title}</p>
            <StatusChip tone={it.tone}>{it.status}</StatusChip>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-1 border-t border-line pt-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("mx-auto size-4 rounded-md", i === 0 ? "bg-bamboo-600" : "bg-line")} />
        ))}
      </div>
    </div>
  );
}

/**
 * Renders the right mockup for a product or case study, inside a frame.
 * `compact` lays the interface out at a larger size and zooms it down,
 * so small cards show a faithful miniature instead of a squeezed layout.
 */
export function Mockup({ variant, compact = false, className }: { variant: MockupVariant; compact?: boolean; className?: string }) {
  if (variant === "mobile") {
    return (
      <div aria-hidden className={cn("flex items-center justify-center bg-bamboo-50 p-8", className)}>
        <div className={cn("flex items-start gap-5", !compact && "max-sm:[zoom:0.8]")} style={compact ? { zoom: 0.72 } : undefined}>
          <PhoneFrame className="rotate-[-3deg]">
            <MobileScreen />
          </PhoneFrame>
          <PhoneFrame className="hidden translate-y-6 rotate-[3deg] sm:block">
            <MobileScreen />
          </PhoneFrame>
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden className={cn("bg-bamboo-50 p-5 sm:p-8", className)}>
      <div className={cn(!compact && "max-sm:[zoom:0.6]")} style={compact ? { zoom: 0.6 } : undefined}>
        <BrowserFrame>
          {variant === "analytics" ? <AnalyticsMockup /> : variant === "board" ? <BoardMockup /> : <DashboardMockup />}
        </BrowserFrame>
      </div>
    </div>
  );
}
