import { notFound } from "next/navigation";
import { BookOpen, Check, ExternalLink, LifeBuoy, LogIn } from "lucide-react";
import { ProductMonogram, ProductStatus } from "@/components/sections/cards";
import { CtaSection, FaqSection } from "@/components/sections/blocks";
import { Container, Eyebrow, SampleBadge, Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Mockup } from "@/components/mockups/mockups";
import { getProduct, products } from "@/content/products";
import { site } from "@/content/site";
import { createMetadata, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return createMetadata({
    title: `${product.name} — ${product.category}`,
    description: product.tagline,
    path: `/products/${slug}`,
    noIndex: product.isSample,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { links } = product;
  const primaryCta = links.signup ?? links.demo;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
        <Container className="relative pb-16 pt-14 sm:pb-20 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <ProductMonogram product={product} size="lg" />
                <div>
                  <Eyebrow>{product.category}</Eyebrow>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <ProductStatus product={product} />
                    {product.isSample && <SampleBadge />}
                  </div>
                </div>
              </div>
              <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.5rem]">{product.name}</h1>
              <p className="mt-4 text-xl font-medium leading-snug tracking-[-0.01em] text-ink-soft sm:text-2xl">{product.tagline}</p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{product.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                {primaryCta ? (
                  <a href={primaryCta} className={buttonClasses({ size: "lg" })} target="_blank" rel="noopener noreferrer">
                    {links.signup ? "Get started" : "Book a demo"} <ExternalLink aria-hidden className="size-4" />
                  </a>
                ) : (
                  <ButtonLink href={`/contact?type=product&product=${product.slug}`} size="lg" arrow>
                    Request a demo
                  </ButtonLink>
                )}
                {links.website && (
                  <a href={links.website} className={buttonClasses({ size: "lg", variant: "secondary" })} target="_blank" rel="noopener noreferrer">
                    Visit website <ExternalLink aria-hidden className="size-4" />
                  </a>
                )}
                {links.login && (
                  <a href={links.login} className={buttonClasses({ size: "lg", variant: "ghost" })} target="_blank" rel="noopener noreferrer">
                    <LogIn aria-hidden className="size-4" /> Log in
                  </a>
                )}
              </div>
            </div>
            <Mockup variant={product.mockup} className="overflow-hidden rounded-[1.5rem] border border-line" />
          </div>
        </Container>
      </section>

      {/* Problems solved */}
      <Section aria-labelledby="problems-heading">
        <SectionHeading id="problems-heading" eyebrow="Problems solved" title={`Why teams choose ${product.name}.`} />
        <div className="grid gap-5 md:grid-cols-3">
          {product.problems.map((p, i) => (
            <div key={p} className="rounded-card border border-line bg-surface p-7">
              <span className="font-mono text-sm text-bamboo-600">0{i + 1}</span>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section tone="surface" aria-labelledby="features-heading">
        <SectionHeading id="features-heading" eyebrow="Features & benefits" title="Everything you need, nothing you don't." />
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {product.features.map((f) => (
            <div key={f.title} className="bg-surface p-8">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-bamboo-50 text-bamboo-700">
                <Check aria-hidden className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Audience + integrations */}
      <Section aria-label="Audience and integrations">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-8 sm:p-10">
            <Eyebrow>Built for</Eyebrow>
            <ul className="mt-6 flex flex-col gap-3">
              {product.audience.map((a) => (
                <li key={a} className="flex gap-3 text-lg text-ink-soft">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-bamboo-600" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-night p-8 text-white sm:p-10">
            <Eyebrow tone="light">Integrations</Eyebrow>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.integrations.map((i) => (
                <li key={i} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-inset ring-white/10">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Pricing — only when confirmed */}
      {product.pricing && product.pricing.length > 0 && (
        <Section tone="surface" aria-labelledby="pricing-heading">
          <SectionHeading id="pricing-heading" eyebrow="Pricing" title="Simple, transparent plans." align="center" />
          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            {product.pricing.map((plan) => (
              <div key={plan.label} className="rounded-card border border-line bg-canvas p-8">
                <p className="font-semibold text-ink">{plan.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-tight text-ink">{plan.price}</p>
                <p className="mt-3 text-muted">{plan.detail}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <FaqSection faqs={product.faqs} title={`${product.name}: questions.`} withSchema={!product.isSample} />

      {/* Support & docs */}
      {(links.docs || links.support) && (
        <Section tone="surface" aria-label="Support and documentation" className="py-14 sm:py-16">
          <div className="flex flex-wrap gap-3">
            {links.docs && (
              <a href={links.docs} className={buttonClasses({ variant: "secondary" })} target="_blank" rel="noopener noreferrer">
                <BookOpen aria-hidden className="size-4" /> Documentation
              </a>
            )}
            {links.support && (
              <a href={links.support} className={buttonClasses({ variant: "secondary" })} target="_blank" rel="noopener noreferrer">
                <LifeBuoy aria-hidden className="size-4" /> Support
              </a>
            )}
          </div>
        </Section>
      )}

      <CtaSection title={`See ${product.name} in action.`} intro="Tell us a little about your team and what you're looking to solve, and we'll arrange a walkthrough." cta="Request a demo" />

      {!product.isSample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            applicationCategory: "BusinessApplication",
            description: product.description,
            url: links.website ?? `${site.url}/products/${product.slug}`,
            publisher: { "@type": "Organization", name: site.name },
          }}
        />
      )}
    </>
  );
}
