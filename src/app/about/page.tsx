import { CtaSection, PageHero, StatsStrip } from "@/components/sections/blocks";
import { Container, Eyebrow, Placeholder, Section, SectionHeading } from "@/components/ui/layout";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon";
import { LogoMark } from "@/components/layout/logo";
import { showPlaceholders } from "@/content/site";
import type { IconName } from "@/content/types";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Us",
  description: "Bamboo Coders is a software company that builds custom solutions for clients and develops its own software products.",
  path: "/about",
});

const principles: { icon: IconName; title: string; description: string }[] = [
  { icon: "compass", title: "Outcomes over output", description: "We measure success by the business problem solved, not the number of features shipped." },
  { icon: "users", title: "Clarity for users", description: "Software should feel obvious to the people using it. We design and test until it does." },
  { icon: "layers", title: "Built to last", description: "Clean architecture, tests and documentation, so what we build stays easy to change." },
  { icon: "handshake", title: "Honest partnership", description: "Plain language, transparent progress and straight answers — including when the answer is no." },
];

const engagements = [
  { title: "Project delivery", description: "A defined scope delivered end to end — from discovery and design through launch and handover." },
  { title: "Team extension", description: "Designers and engineers who join your existing team and work within your processes and tools." },
  { title: "Product partnership", description: "A longer-term partnership to shape, build and grow a digital product alongside your team." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Bamboo Coders"
        title="A software company that builds for clients — and for itself."
        intro="We design and engineer software for businesses that need dependable technology, and we develop our own products. Doing both keeps our product thinking sharp and our engineering practical."
        actions={<ButtonLink href="/contact" size="lg" arrow>Work with us</ButtonLink>}
      />

      <StatsStrip />

      {/* Two pillars */}
      <Section aria-labelledby="pillars-heading">
        <SectionHeading id="pillars-heading" eyebrow="What we do" title="Two sides of one discipline." />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-card border border-line bg-surface p-8 sm:p-10">
            <p className="font-mono text-sm text-bamboo-600">01</p>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-ink">Software services</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Custom software, web and mobile applications, SaaS platforms, UI/UX design and automation for startups, growing businesses and established
              teams.
            </p>
            <ArrowLink href="/services" className="mt-auto pt-8">Explore services</ArrowLink>
          </div>
          <div className="flex flex-col rounded-card bg-night p-8 text-white sm:p-10">
            <p className="font-mono text-sm text-bamboo-300">02</p>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">Software products</h3>
            <p className="mt-3 leading-relaxed text-white/70">
              Our own products, built to solve problems we see across many businesses — designed, engineered and operated by the same team.
            </p>
            <ArrowLink href="/products" className="mt-auto pt-8 text-bamboo-300 hover:text-bamboo-100">Explore products</ArrowLink>
          </div>
        </div>
      </Section>

      {/* Name / story */}
      <Section tone="surface" aria-labelledby="name-heading">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <div className="flex size-40 items-center justify-center rounded-[2rem] bg-bamboo-50 sm:size-52">
            <LogoMark className="size-24 sm:size-32" />
          </div>
          <div className="max-w-2xl">
            <Eyebrow>Why bamboo</Eyebrow>
            <h2 id="name-heading" className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
              Flexible enough to adapt. Strong enough to rely on.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Bamboo grows quickly, bends without breaking and gets stronger as it grows. It&apos;s how we think good software should behave — and how
              we aim to work with every client.
            </p>
            {showPlaceholders && (
              <Placeholder title="Company story" className="mt-8">
                Add your founding story, location and milestones here once confirmed. Avoid unverified claims.
              </Placeholder>
            )}
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section aria-labelledby="principles-heading">
        <SectionHeading id="principles-heading" eyebrow="Principles" title="How we make decisions." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="rounded-card border border-line bg-surface p-7">
              <IconTile name={p.icon} />
              <h3 className="mt-6 font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engagement models */}
      <Section tone="surface" aria-labelledby="engage-heading">
        <SectionHeading id="engage-heading" eyebrow="Ways to work together" title="Choose the model that fits." intro="Every engagement starts with a conversation about your goals, timeline and team." />
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {engagements.map((e, i) => (
            <div key={e.title} className="bg-canvas p-8">
              <span className="font-mono text-sm text-bamboo-600">0{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{e.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{e.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {showPlaceholders && (
        <Container className="py-16">
          <Placeholder title="Team">
            Add team members (name, role, portrait) once you&apos;re ready to introduce them. This block is hidden in production.
          </Placeholder>
        </Container>
      )}

      <CtaSection />
    </>
  );
}
