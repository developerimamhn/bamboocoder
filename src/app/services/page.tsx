import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection, PageHero, ProcessTimeline } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Services",
  description: "Custom software, web and mobile applications, UI/UX design, SaaS development and business automation from Bamboo Coders.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software services, shaped around your business."
        intro="Pick the starting point that matches your challenge. Most projects combine several of these — we'll help you find the right mix."
        actions={
          <>
            <ButtonLink href="/contact" size="lg" arrow>Start a Project</ButtonLink>
            <ButtonLink href="/work" size="lg" variant="secondary">See our work</ButtonLink>
          </>
        }
      />

      <Section aria-label="All services">
        <ul className="flex flex-col gap-4">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group grid gap-6 rounded-card border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift sm:p-9 md:grid-cols-[auto_1.1fr_1fr_auto] md:items-center md:gap-10"
              >
                <div className="flex items-center gap-4 md:block">
                  <span className="font-mono text-sm text-subtle md:hidden">0{i + 1}</span>
                  <IconTile name={service.icon} className="size-12" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">{service.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{service.summary}</p>
                </div>
                <blockquote className="border-l-2 border-bamboo-200 pl-5 text-[0.9375rem] italic leading-relaxed text-ink-soft">
                  “{service.clientVoice}”
                </blockquote>
                <span className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors group-hover:border-bamboo-700 group-hover:bg-bamboo-700 group-hover:text-white">
                  <ArrowRight aria-hidden className="size-5" />
                  <span className="sr-only">View {service.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="Our process"
          title="The same disciplined process, tailored to each service."
          intro="Every engagement moves through six stages, so you always know what's happening and what comes next."
        />
        <ProcessTimeline tone="canvas" />
      </Section>

      <CtaSection title="Not sure which service you need?" intro="Describe the problem in your own words. We'll recommend an approach — and tell you honestly if we're not the right fit." cta="Talk to us" />
    </>
  );
}
