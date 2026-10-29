import { Suspense } from "react";
import { CalendarDays, Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { InquiryForm, InquiryFormWithParams } from "@/components/forms/inquiry-form";
import { FaqSection } from "@/components/sections/blocks";
import { Container, Eyebrow } from "@/components/ui/layout";
import { generalFaqs } from "@/content/faqs";
import { site } from "@/content/site";
import { isInquiryConfigured } from "@/lib/inquiry-delivery";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact & Get a Quote",
  description: "Tell Bamboo Coders about your project. Share your goals, budget and timeline, and we'll recommend the right next step.",
  path: "/contact",
});

const steps = [
  { title: "We review your inquiry", description: "We read every submission carefully and note any questions." },
  { title: "We talk it through", description: "A conversation to understand goals, constraints and context." },
  { title: "You get a clear proposal", description: "Scope, approach and estimate — so you can decide with confidence." },
];

export default function ContactPage() {
  const configured = isInquiryConfigured();
  const { email, phone, whatsapp, bookingUrl, responseTime } = site.contact;
  const formProps = { configured, fallbackEmail: email || undefined };

  const channels = [
    email && { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: "Phone", value: phone, href: `tel:${phone}` },
    whatsapp && { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: `https://wa.me/${whatsapp}` },
    bookingUrl && { icon: CalendarDays, label: "Book a call", value: "Pick a time that suits you", href: bookingUrl },
  ].filter((c): c is { icon: typeof Mail; label: string; value: string; href: string } => Boolean(c));

  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative pb-20 pt-14 sm:pb-28 sm:pt-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20 [&>*]:min-w-0">
            <div>
              <Eyebrow>Start a project</Eyebrow>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.25rem]">
                Tell us what you&apos;re building.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                Share a few details about your project. There&apos;s no commitment — just a conversation about what you need and how we might help.
              </p>

              <ol className="mt-12 flex flex-col gap-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-bamboo-200 bg-bamboo-50 font-mono text-xs font-medium text-bamboo-700">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{s.title}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {(channels.length > 0 || responseTime) && (
                <div className="mt-12 border-t border-line pt-10">
                  <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-subtle">Other ways to reach us</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {channels.map(({ icon: ChannelIcon, label, value, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                          className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-bamboo-300"
                        >
                          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-bamboo-50 text-bamboo-700">
                            <ChannelIcon aria-hidden className="size-5" />
                          </span>
                          <span>
                            <span className="block text-sm text-muted">{label}</span>
                            <span className="block font-medium text-ink">{value}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  {responseTime && (
                    <p className="mt-6 flex items-center gap-2 text-sm text-ink-soft">
                      <Clock aria-hidden className="size-4 text-bamboo-600" />
                      {responseTime}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <Suspense fallback={<InquiryForm {...formProps} />}>
                <InquiryFormWithParams {...formProps} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection faqs={generalFaqs} title="Before you get in touch." />
    </>
  );
}
