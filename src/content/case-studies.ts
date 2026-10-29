import type { CaseStudy } from "./types";

/**
 * Client case studies.
 *
 * These are SAMPLE entries that demonstrate the template. Replace them with
 * real projects (with client permission) and set `isSample: false`.
 * Only add `results` that have been verified with the client.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-logistics-operations-platform",
    title: "Replacing spreadsheets with a single operations platform",
    client: "Sample client",
    industry: "Logistics",
    summary:
      "How a custom operations platform could replace a patchwork of spreadsheets, calls and messages for a regional logistics company.",
    challenge:
      "Dispatch, driver updates and customer notifications were managed across spreadsheets and messaging apps. Managers had no single view of daily operations, and preparing invoices meant reconciling several sources by hand.",
    solution:
      "A web-based operations platform with a live dispatch board, a mobile view for drivers and automated customer notifications, integrated with the company's accounting software for invoicing.",
    approach: [
      { title: "Process mapping", description: "Shadowed dispatchers and drivers to document the real daily workflow." },
      { title: "Phased rollout", description: "Launched the dispatch board first, then the driver view and invoicing." },
      { title: "Integration", description: "Connected job completion data directly to invoicing to remove re-typing." },
    ],
    services: ["custom-software-development", "web-application-development", "automation-integrations"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Node.js"],
    results: [],
    isSample: true,
    mockup: "board",
    featured: true,
  },
  {
    slug: "sample-healthcare-booking-app",
    title: "A patient booking app that reduces front-desk workload",
    client: "Sample client",
    industry: "Healthcare",
    summary:
      "How a mobile booking and reminders app could let patients self-serve appointments while staff focus on care.",
    challenge:
      "Most appointments were booked by phone during peak hours, creating long wait times and missed calls. No-shows were common because reminders were sent manually and inconsistently.",
    solution:
      "A cross-platform mobile app for booking, rescheduling and reminders, backed by an admin dashboard for staff and an integration with the existing scheduling system.",
    approach: [
      { title: "User research", description: "Interviewed patients and front-desk staff to prioritise the booking flow." },
      { title: "Accessible design", description: "Large touch targets, clear language and screen-reader support throughout." },
      { title: "Automated reminders", description: "Configurable push and SMS reminders with one-tap rescheduling." },
    ],
    services: ["mobile-app-development", "ui-ux-design", "automation-integrations"],
    technologies: ["React Native", "Expo", "Supabase", "TypeScript"],
    results: [],
    isSample: true,
    mockup: "mobile",
    featured: true,
  },
  {
    slug: "sample-retail-analytics-saas",
    title: "Launching a subscription analytics product for retailers",
    client: "Sample client",
    industry: "Retail",
    summary:
      "How a founding team could take a retail analytics idea from validated MVP to a multi-tenant SaaS product with subscription billing.",
    challenge:
      "The founders had a proven analysis method delivered through spreadsheets and consulting time. To grow, they needed a self-serve product customers could subscribe to.",
    solution:
      "A multi-tenant SaaS platform with data connectors, dashboards and subscription billing, launched as a focused MVP and extended based on early customer usage.",
    approach: [
      { title: "MVP definition", description: "Scoped a first release around the single most valuable report." },
      { title: "Solid foundations", description: "Built tenancy, roles and billing properly from the first version." },
      { title: "Usage analytics", description: "Instrumented activation and retention to guide the roadmap." },
    ],
    services: ["saas-development", "ui-ux-design", "web-application-development"],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    results: [],
    isSample: true,
    mockup: "analytics",
    featured: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudiesForService(serviceSlug: string) {
  return caseStudies.filter((c) => c.services.includes(serviceSlug));
}
