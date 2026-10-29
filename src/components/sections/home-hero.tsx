import { CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { BrowserFrame, DashboardMockup, MobileScreen, PhoneFrame } from "@/components/mockups/mockups";
import { services } from "@/content/services";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Container className="relative pb-20 pt-14 sm:pt-20 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Software services &amp; products</Eyebrow>
          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-6xl lg:text-[4.75rem]">
            Building software that moves businesses <span className="text-bamboo-700">forward.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
            From custom software and digital experiences to our own innovative products, Bamboo Coders helps businesses turn complex
            challenges into scalable technology.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg" arrow>
              Start a Project
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              Explore Our Products
            </ButtonLink>
          </div>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-ink-soft">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug} className="flex items-center gap-1.5">
                <CircleCheck aria-hidden className="size-4 text-bamboo-600" />
                {s.navLabel}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden className="relative mx-auto mt-16 max-w-[1080px] sm:mt-20">
          <div className="absolute -inset-x-6 -bottom-6 top-12 rounded-[2rem] bg-bamboo-100/60 sm:-inset-x-10" />
          <BrowserFrame url="app.yourproduct.com" className="relative max-sm:[zoom:0.62]">
            <DashboardMockup />
          </BrowserFrame>
          <PhoneFrame className="absolute -bottom-10 -left-2 hidden w-[200px] md:block lg:-left-10">
            <MobileScreen />
          </PhoneFrame>
          <div className="absolute -right-3 top-24 hidden w-56 rounded-2xl border border-line bg-surface p-4 shadow-lift md:block lg:-right-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-bamboo-50 text-bamboo-700">
                <CircleCheck className="size-4" />
              </span>
              <p className="text-xs font-semibold text-ink">Deployment complete</p>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted">All checks passed · release is live</p>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="h-5 flex-1 rounded-[3px] bg-bamboo-400" style={{ opacity: 0.35 + (i % 4) * 0.18 }} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-16 text-center text-xs text-subtle">Illustrative interface</p>
      </Container>
    </section>
  );
}
