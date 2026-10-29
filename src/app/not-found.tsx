import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";

export const metadata = { title: "Page not found" };

const suggestions = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Eyebrow>Error 404</Eyebrow>
        <p aria-hidden className="mt-6 font-mono text-[6rem] font-medium leading-none tracking-tighter text-bamboo-200 sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">This page didn&apos;t make it to production.</h1>
        <p className="mt-4 max-w-md text-lg text-muted">The link may be outdated, or the page may have moved. Here are a few good places to continue.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Contact us
          </ButtonLink>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="font-medium text-bamboo-700 hover:text-bamboo-900">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
