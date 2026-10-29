import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import type { Faq, Stat, Testimonial } from "@/content/types";
import { processSteps } from "@/content/process";
import { showPlaceholders, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Placeholder, Section, SectionHeading } from "@/components/ui/layout";
import { JsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

/* ---------- Page hero (inner pages) ---------- */

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className={cn(Boolean(aside) && "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]")}>
          <div className="max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.5rem]">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">{intro}</p>}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Process timeline ---------- */

export function ProcessTimeline({ focus, tone = "surface" }: { focus?: readonly string[]; tone?: "surface" | "canvas" }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {processSteps.map((step, i) => (
        <li key={step.number} className={cn("relative flex flex-col p-7 sm:p-8", tone === "surface" ? "bg-surface" : "bg-canvas")}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-bamboo-600">{step.number}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>
          <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-ink">{step.title}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{focus?.[i] ?? step.description}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- FAQ ---------- */

export function FaqList({ faqs, withSchema = false }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line border-y border-line">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-lg py-5 text-left text-[1.0625rem] font-medium text-ink">
              {faq.question}
              <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink-soft transition-transform duration-200 group-open:rotate-45">
                <Plus aria-hidden className="size-4" />
              </span>
            </summary>
            <p className="max-w-3xl pb-6 pr-12 leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
    </>
  );
}

export function FaqSection({ faqs, title = "Questions, answered.", intro, withSchema }: { faqs: Faq[]; title?: string; intro?: string; withSchema?: boolean }) {
  if (faqs.length === 0) return null;
  return (
    <Section aria-labelledby="faq-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-heading" className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
            {title}
          </h2>
          {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
        <FaqList faqs={faqs} withSchema={withSchema} />
      </div>
    </Section>
  );
}

/* ---------- Final CTA ---------- */

export function CtaSection({
  title = "Have an idea? Let's build something that matters.",
  intro = "Tell us about your business goals, and let's explore how the right software solution can help you move forward.",
  cta = "Start Your Project",
}: {
  title?: string;
  intro?: string;
  cta?: string;
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4" aria-labelledby="cta-heading">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-bamboo-800 text-white">
        <svg aria-hidden viewBox="0 0 600 400" className="pointer-events-none absolute -right-24 top-0 h-full opacity-40" preserveAspectRatio="xMaxYMid slice">
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              {Array.from({ length: 5 }).map((_, j) => (
                <rect key={j} x={330 + i * 46} y={18 + j * 78 + (i % 2) * 34} width="28" height="70" rx="9" fill="none" stroke="var(--color-bamboo-300)" strokeOpacity={0.25 + (i / 10)} />
              ))}
            </g>
          ))}
        </svg>
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Start a project</Eyebrow>
            <h2 id="cta-heading" className="mt-5 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="light" size="lg" arrow>
                {cta}
              </ButtonLink>
              <ButtonLink href="/products" size="lg" className="border border-white/25 bg-transparent text-white shadow-none hover:bg-white/10">
                Explore Products
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ---------- Trust indicators ---------- */

export function StatsStrip({ stats = site.stats }: { stats?: Stat[] }) {
  if (stats.length === 0) {
    if (!showPlaceholders) return null;
    return (
      <Container className="py-10">
        <Placeholder title="Trust indicators">
          Add verified metrics (projects delivered, client satisfaction, years of experience, products developed) in{" "}
          <code className="font-mono">src/content/site.ts → stats</code>. This strip stays hidden until real data is added.
        </Placeholder>
      </Container>
    );
  }
  return (
    <section aria-label="Company highlights" className="border-y border-line bg-surface">
      <Container>
        <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-8 lg:px-8">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/* ---------- Testimonials ---------- */

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) {
    if (!showPlaceholders) return null;
    return (
      <Container className="py-10">
        <Placeholder title="Testimonials">
          Add genuine client testimonials in <code className="font-mono">src/content/testimonials.ts</code>. The section is omitted on the live site until then.
        </Placeholder>
      </Container>
    );
  }
  return (
    <Section tone="surface" aria-labelledby="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow="Client words" title="What working with us is like." />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-card border border-line bg-canvas p-8">
            <blockquote className="text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              {t.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.portrait} alt="" width={44} height={44} className="size-11 rounded-full object-cover" loading="lazy" />
              ) : (
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-bamboo-100 text-sm font-semibold text-bamboo-800">
                  {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              )}
              <span>
                <span className="block font-semibold text-ink">{t.name}</span>
                <span className="block text-sm text-muted">
                  {t.role}, {t.company}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
