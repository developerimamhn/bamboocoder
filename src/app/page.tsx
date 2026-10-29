import { HomeHero } from "@/components/sections/home-hero";
import { CaseStudyCard, PostCard, ProductCard, ServiceCard } from "@/components/sections/cards";
import { CtaSection, FaqSection, ProcessTimeline, StatsStrip, TestimonialsSection } from "@/components/sections/blocks";
import { Section, SectionHeading } from "@/components/ui/layout";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { caseStudies } from "@/content/case-studies";
import { posts } from "@/content/posts";
import { testimonials } from "@/content/testimonials";
import { generalFaqs } from "@/content/faqs";
import type { IconName } from "@/content/types";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ path: "/" });

const differentiators: { icon: IconName; title: string; description: string }[] = [
  { icon: "compass", title: "Business-first problem solving", description: "We start with the outcome you need, not the technology we prefer — and say so when software isn't the answer." },
  { icon: "users", title: "User-centred product design", description: "Interfaces are shaped around the people who use them every day, and tested with them before launch." },
  { icon: "layers", title: "Scalable engineering", description: "Typed, tested, documented code on modern foundations, so your product can grow without a rewrite." },
  { icon: "handshake", title: "Transparent collaboration", description: "Shared roadmaps, regular demos and direct access to the people building your product." },
  { icon: "shield-check", title: "Reliable delivery", description: "Clear scope, small iterations and honest progress updates — surprises are surfaced early." },
  { icon: "life-buoy", title: "Long-term technical support", description: "We stay available after launch to maintain, improve and extend what we've built together." },
];

export default function HomePage() {
  const featuredStudies = caseStudies.filter((c) => c.featured).slice(0, 3);
  const [leadStudy, ...otherStudies] = featuredStudies;
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      <HomeHero />
      <StatsStrip />

      {/* Services */}
      <Section tone="surface" aria-labelledby="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="Whatever you're navigating, we help you build the way through."
          intro="End-to-end software services for startups, growing businesses and established teams — from the first idea to long-term support."
          action={<ButtonLink href="/services" variant="secondary" arrow>All services</ButtonLink>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Products */}
      {products.length > 0 && (
        <Section tone="night" aria-labelledby="products-heading">
          <SectionHeading
            id="products-heading"
            tone="light"
            eyebrow="Our products"
            title="We don't only build for clients. We build our own."
            intro="Alongside client work, we develop software products that solve recurring business problems — and the lessons flow both ways."
            action={
              <ButtonLink href="/products" variant="light" arrow>
                Explore Products
              </ButtonLink>
            }
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Section>
      )}

      {/* Case studies */}
      {leadStudy && (
        <Section aria-labelledby="work-heading">
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            title="Real problems, practical software."
            intro="A look at how we approach client projects — from the business challenge to the solution we shipped."
            action={<ButtonLink href="/work" variant="secondary" arrow>View all work</ButtonLink>}
          />
          <div className="flex flex-col gap-5">
            <CaseStudyCard study={leadStudy} layout="wide" />
            {otherStudies.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2">
                {otherStudies.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Why Bamboo Coders */}
      <Section tone="surface" aria-labelledby="why-heading">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="why-heading"
              className="mb-0 sm:mb-0"
              eyebrow="Why Bamboo Coders"
              title="Like bamboo: flexible, strong and built to grow."
              intro="We combine the craft of a product studio with the discipline of an engineering partner. Here's what that means in practice."
            />
            <ArrowLink href="/about" className="mt-8">More about how we work</ArrowLink>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.title}>
                <IconTile name={d.icon} />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em] text-ink">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section aria-labelledby="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How we work"
          title="A clear process, from first call to continuous improvement."
          intro="Six stages that keep projects predictable — with working software to review at every step."
        />
        <ProcessTimeline />
      </Section>

      <TestimonialsSection testimonials={testimonials} />

      {/* Insights */}
      {latestPosts.length > 0 && (
        <Section tone="surface" aria-labelledby="insights-heading">
          <SectionHeading
            id="insights-heading"
            eyebrow="Insights"
            title="Thinking on software, products and business technology."
            action={<ButtonLink href="/insights" variant="secondary" arrow>All insights</ButtonLink>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      )}

      <FaqSection faqs={generalFaqs} intro="The things people usually ask before starting a project with us." />

      <CtaSection />
    </>
  );
}
