import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/layout";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <Container size="xs" className="py-14 sm:py-20">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>
      <div className="mt-8 flex gap-3 rounded-xl border border-warning/25 bg-warning-soft p-4 text-sm text-warning">
        <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
        <p>
          <strong className="font-semibold">Template.</strong> This document is a starting point, not legal advice. Replace the bracketed details and
          have it reviewed by a qualified professional for your jurisdiction before publishing.
        </p>
      </div>
      <div className="prose-bc mt-12">{children}</div>
    </Container>
  );
}
