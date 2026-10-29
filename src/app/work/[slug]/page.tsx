import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CaseStudyCard } from "@/components/sections/cards";
import { CtaSection } from "@/components/sections/blocks";
import { Badge, Container, Eyebrow, Placeholder, SampleBadge, Section } from "@/components/ui/layout";
import { Icon } from "@/components/ui/icon";
import { Mockup } from "@/components/mockups/mockups";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { getService } from "@/content/services";
import { showPlaceholders } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createMetadata({ title: study.title, description: study.summary, path: `/work/${slug}`, type: "article", noIndex: study.isSample });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const services = study.services.map(getService).filter((s) => s != null);
  const more = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="border-b border-line">
          <Container className="pb-12 pt-10 sm:pt-14">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> All work
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Badge>{study.industry}</Badge>
              {study.isSample && <SampleBadge />}
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.5rem]">{study.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{study.summary}</p>

            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              <div className="bg-surface p-5">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">Client</dt>
                <dd className="mt-2 font-medium text-ink">{study.client}</dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">Industry</dt>
                <dd className="mt-2 font-medium text-ink">{study.industry}</dd>
              </div>
              <div className="bg-surface p-5">
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">Technologies</dt>
                <dd className="mt-2 font-medium text-ink">{study.technologies.join(", ")}</dd>
              </div>
            </dl>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          <Mockup variant={study.mockup} className="overflow-hidden rounded-[1.75rem] border border-line sm:p-14 lg:p-20" />
        </Container>

        <Container className="pb-20 sm:pb-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Services delivered</Eyebrow>
              <ul className="mt-5 flex flex-col gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-bamboo-300 hover:text-bamboo-800">
                      <Icon name={s.icon} className="size-4 text-bamboo-600" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex flex-col gap-16">
              <section aria-labelledby="challenge-heading">
                <Eyebrow>The challenge</Eyebrow>
                <h2 id="challenge-heading" className="sr-only">The challenge</h2>
                <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">{study.challenge}</p>
              </section>

              <section aria-labelledby="solution-heading">
                <Eyebrow>The solution</Eyebrow>
                <h2 id="solution-heading" className="sr-only">The solution</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{study.solution}</p>
                <ol className="mt-10 grid gap-5 sm:grid-cols-3">
                  {study.approach.map((a, i) => (
                    <li key={a.title} className="rounded-2xl border border-line bg-surface p-6">
                      <span className="font-mono text-sm text-bamboo-600">0{i + 1}</span>
                      <h3 className="mt-4 font-semibold text-ink">{a.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{a.description}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {(study.results.length > 0 || showPlaceholders) && (
              <section aria-labelledby="results-heading">
                <Eyebrow>Results</Eyebrow>
                <h2 id="results-heading" className="sr-only">Results</h2>
                {study.results.length > 0 ? (
                  <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                    {study.results.map((r) => (
                      <div key={r.label} className="rounded-2xl bg-bamboo-800 p-6 text-white">
                        <dd className="text-4xl font-semibold tracking-tight">{r.value}</dd>
                        <dt className="mt-2 text-sm text-white/75">{r.label}</dt>
                      </div>
                    ))}
                  </dl>
                ) : showPlaceholders ? (
                  <Placeholder title="Verified results" className="mt-6">
                    Add measurable outcomes confirmed with the client in <code className="font-mono">results</code>. This block is hidden in production when empty.
                  </Placeholder>
                ) : null}
              </section>
              )}
            </div>
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Section tone="surface" aria-labelledby="more-heading">
          <h2 id="more-heading" className="mb-10 text-3xl font-semibold tracking-[-0.03em] text-ink">More work</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {more.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
