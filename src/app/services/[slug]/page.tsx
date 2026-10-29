import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, CircleAlert } from "lucide-react";
import { CaseStudyCard } from "@/components/sections/cards";
import { CtaSection, FaqSection, PageHero, ProcessTimeline } from "@/components/sections/blocks";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { Icon, IconTile } from "@/components/ui/icon";
import { getService, services } from "@/content/services";
import { getCaseStudiesForService } from "@/content/case-studies";
import { site } from "@/content/site";
import { createMetadata, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({ title: service.seo.title, description: service.seo.description, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getCaseStudiesForService(service.slug).slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.hero.headline}
        intro={service.hero.intro}
        actions={
          <>
            <ButtonLink href={`/contact?service=${service.slug}`} size="lg" arrow>Start a Project</ButtonLink>
            <ButtonLink href="#capabilities" size="lg" variant="secondary">What&apos;s included</ButtonLink>
          </>
        }
        aside={
          <div className="relative rounded-card border border-line bg-surface p-8 shadow-soft">
            <IconTile name={service.icon} className="size-12" />
            <p className="mt-8 text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">“{service.clientVoice}”</p>
            <p className="mt-4 text-sm text-muted">Sound familiar? This is where {service.navLabel.toLowerCase()} helps.</p>
            <div className="mt-8 flex items-center gap-2 border-t border-line pt-6 text-sm font-medium text-ink-soft">
              <Check aria-hidden className="size-4 text-bamboo-600" />
              {service.benefit}
            </div>
          </div>
        }
      />

      {/* Challenges + overview */}
      <Section aria-labelledby="challenges-heading">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Challenges we solve</Eyebrow>
            <h2 id="challenges-heading" className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
              The problems behind the request.
            </h2>
            <ul className="mt-10 flex flex-col gap-4">
              {service.challenges.map((c) => (
                <li key={c} className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
                  <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-bamboo-600" />
                  <span className="leading-relaxed text-ink-soft">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-24">
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-6 flex flex-col gap-5 text-lg leading-relaxed text-ink-soft">
              {service.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities" tone="surface" aria-labelledby="capabilities-heading">
        <SectionHeading id="capabilities-heading" eyebrow="Key capabilities" title="What we bring to the work." />
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((cap) => (
            <div key={cap.title} className="bg-surface p-7 sm:p-8">
              <Icon name={service.icon} className="text-bamboo-600" />
              <h3 className="mt-5 font-semibold text-ink">{cap.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{cap.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Deliverables + stack */}
      <Section aria-labelledby="deliverables-heading">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Deliverables</Eyebrow>
            <h2 id="deliverables-heading" className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
              What you receive.
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 border-t border-line pt-4 text-ink-soft">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-bamboo-600" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          {service.stack && (
            <div className="rounded-card bg-night p-8 text-white sm:p-10">
              <Eyebrow tone="light">Technology</Eyebrow>
              <p className="mt-4 text-white/70">Tools we commonly use for this work. We choose the stack per project, based on your needs and existing systems.</p>
              <dl className="mt-8 flex flex-col gap-6">
                {service.stack.map((group) => (
                  <div key={group.label} className="border-t border-white/10 pt-5">
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-bamboo-300">{group.label}</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/90 ring-1 ring-inset ring-white/10">
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </Section>

      {/* Process */}
      <Section tone="surface" aria-labelledby="workflow-heading">
        <SectionHeading
          id="workflow-heading"
          eyebrow="Project workflow"
          title={`How a ${service.navLabel.toLowerCase()} project runs.`}
          intro="Our six-stage process, and what each stage looks like for this kind of work."
        />
        <ProcessTimeline focus={service.processFocus} tone="canvas" />
      </Section>

      {/* Related work */}
      {related.length > 0 && (
        <Section aria-labelledby="related-heading">
          <SectionHeading id="related-heading" eyebrow="Related work" title="Projects that used this service." action={<ButtonLink href="/work" variant="secondary" arrow>All work</ButtonLink>} />
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </Section>
      )}

      <FaqSection faqs={service.faqs} title={`${service.navLabel}: common questions.`} withSchema />

      {/* Other services */}
      <Section tone="surface" aria-labelledby="other-heading" className="py-16 sm:py-20">
        <h2 id="other-heading" className="text-lg font-semibold text-ink">Explore other services</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-canvas px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-bamboo-700 hover:text-bamboo-800">
                <Icon name={s.icon} className="size-4" />
                {s.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title={`Let's talk about your ${service.navLabel.toLowerCase()} project.`} intro="Share a few details about what you're trying to achieve. We'll come back with questions, ideas and a recommended next step." cta="Start a Project" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.seo.description,
          serviceType: service.title,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          url: `${site.url}/services/${service.slug}`,
        }}
      />
    </>
  );
}
