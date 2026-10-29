import type { Stat } from "./types";

/**
 * Company-level configuration.
 *
 * Anything left empty is hidden on the live site. Only add verified details:
 * real contact channels, active social profiles and confirmed statistics.
 */
export const site = {
  name: "Bamboo Coders",
  legalName: "Bamboo Coders", // TODO: replace with the registered legal entity name
  tagline: "Software that moves businesses forward.",
  description:
    "Bamboo Coders designs and builds custom software, web and mobile applications, and SaaS platforms — and develops its own software products.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_US",

  /** Shown in the footer copyright line. Update once a year. */
  copyrightYear: 2026,

  contact: {
    /** Public inbox shown on the site, e.g. "hello@bamboocoders.com". */
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    /** E.164 format, e.g. "+8801XXXXXXXXX". */
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    /** Digits only, e.g. "8801XXXXXXXXX". Renders a wa.me link. */
    whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "",
    /** Calendly / Cal.com / Google booking page. */
    bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
    /** e.g. "We reply within one business day." Leave empty until established. */
    responseTime: process.env.NEXT_PUBLIC_RESPONSE_TIME ?? "",
    address: "",
  },

  /** Only list active, official profiles. */
  social: [
    // { label: "LinkedIn", href: "https://www.linkedin.com/company/..." },
    // { label: "GitHub", href: "https://github.com/..." },
  ] as { label: string; href: string }[],

  /** Verified company statistics. Leave empty to hide the trust strip. */
  stats: [
    // { value: "40+", label: "Projects delivered" },
  ] as Stat[],
};

/**
 * Editable placeholders (empty stats, team, testimonials) are shown in
 * development so the gaps are visible, and hidden in production.
 * Override with NEXT_PUBLIC_SHOW_PLACEHOLDERS=true|false.
 */
export const showPlaceholders =
  process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS != null
    ? process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true"
    : process.env.NODE_ENV !== "production";

export const navigation = {
  primary: [
    { label: "Products", href: "/products" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
