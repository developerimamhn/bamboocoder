import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const containerSizes = {
  lg: "max-w-[1240px]",
  md: "max-w-[1040px]",
  sm: "max-w-[820px]",
  xs: "max-w-[720px]",
};

export function Container({ className, size = "lg", children }: { className?: string; size?: keyof typeof containerSizes; children: ReactNode }) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", containerSizes[size], className)}>{children}</div>;
}

/** Monospace bracketed label that sits above headings: [ Services ] */
export function Eyebrow({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-bamboo-300" : "text-bamboo-700",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-[2px]", tone === "light" ? "bg-bamboo-300" : "bg-bamboo-500")} />
      {children}
    </p>
  );
}

interface SectionProps {
  id?: string;
  className?: string;
  tone?: "canvas" | "surface" | "night";
  children: ReactNode;
  "aria-labelledby"?: string;
}

export function Section({ id, className, tone = "canvas", children, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={cn(
        "py-20 sm:py-28",
        tone === "surface" && "border-y border-line bg-surface",
        tone === "night" && "bg-night text-white",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, intro, action, align = "left", tone = "default", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 sm:mb-16",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className={cn(
            "mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.75rem]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {intro && (
          <p className={cn("mt-5 text-lg leading-relaxed", tone === "light" ? "text-white/70" : "text-muted")}>{intro}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "bamboo" | "warning" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border border-line bg-surface text-ink-soft",
        tone === "bamboo" && "bg-bamboo-50 text-bamboo-800 ring-1 ring-inset ring-bamboo-200",
        tone === "warning" && "bg-warning-soft text-warning ring-1 ring-inset ring-warning/20",
        tone === "dark" && "bg-white/10 text-white ring-1 ring-inset ring-white/15",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks illustrative content that must be replaced with real information. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <Badge tone="warning" className={className}>
      <span aria-hidden className="size-1.5 rounded-full bg-warning" />
      Sample content
    </Badge>
  );
}

/** Dashed placeholder shown only while `showPlaceholders` is on. */
export function Placeholder({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card border border-dashed border-warning/40 bg-warning-soft/60 p-6 text-sm text-warning", className)}>
      <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em]">Placeholder · hidden in production</p>
      <p className="mt-2 font-semibold">{title}</p>
      {children && <div className="mt-1 text-warning/90">{children}</div>}
    </div>
  );
}
