import { CaseStudyCard } from "@/components/sections/cards";
import { CtaSection, PageHero } from "@/components/sections/blocks";
import { Section } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/button";
import { caseStudies } from "@/content/case-studies";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Work & Case Studies",
  description: "Selected client projects from Bamboo Coders: the business challenge, the solution and the services involved.",
  path: "/work",
});

export default function WorkPage() {
  const [lead, ...rest] = caseStudies;
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work that solves real business problems."
        intro="Each project starts with a business challenge. These case studies show how we approached it, what we built and the services involved."
        actions={<ButtonLink href="/contact" size="lg" arrow>Start a Project</ButtonLink>}
      />
      <Section aria-label="Case studies">
        {lead ? (
          <div className="flex flex-col gap-5">
            <CaseStudyCard study={lead} layout="wide" />
            {rest.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {rest.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-line-strong bg-surface p-12 text-center">
            <p className="text-lg font-semibold text-ink">Case studies are being prepared.</p>
            <p className="mt-2 text-muted">Get in touch and we&apos;ll share relevant examples of our work.</p>
          </div>
        )}
      </Section>
      <CtaSection />
    </>
  );
}
