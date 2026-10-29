import { CtaSection, PageHero } from "@/components/sections/blocks";
import { InsightsExplorer } from "@/components/sections/insights-explorer";
import { Section } from "@/components/ui/layout";
import { postCategories, posts } from "@/content/posts";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Insights",
  description: "Articles on software engineering, SaaS and product development, UX design, automation and business technology.",
  path: "/insights",
});

export default function InsightsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on software and business."
        intro="Notes from our work on engineering, product development, design and automation — written for founders, operators and product teams."
      />
      <Section aria-label="Articles">
        <InsightsExplorer posts={sorted} categories={postCategories} />
      </Section>
      <CtaSection />
    </>
  );
}
