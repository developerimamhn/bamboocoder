import type { Product, ProductStatus } from "./types";

/**
 * Bamboo Coders' own software products.
 *
 * The entries below are SAMPLE products used to demonstrate the layout.
 * Replace them with real products (set `isSample: false`), or delete them.
 * Add, edit or remove entries freely — listing, detail pages, navigation,
 * footer and sitemap all update automatically.
 */
export const products: Product[] = [
  {
    slug: "sample-operations-suite",
    name: "Operations Suite",
    category: "Operations",
    tagline: "One workspace for jobs, teams and day-to-day operations.",
    description:
      "A sample product listing that shows how an operations management tool would be presented: scheduling, task tracking and reporting in one place for service businesses.",
    status: "in-development",
    isSample: true,
    monogram: "OS",
    mockup: "dashboard",
    highlights: ["Job scheduling", "Team workload view", "Live reporting"],
    problems: [
      "Work is scheduled across calendars, spreadsheets and messaging apps.",
      "Managers can't see team capacity or job status at a glance.",
      "Reporting requires manual exports at the end of every month.",
    ],
    features: [
      { title: "Scheduling board", description: "Drag-and-drop planning across people, days and locations." },
      { title: "Job tracking", description: "Status, notes and files for every job in one timeline." },
      { title: "Team workload", description: "See who is available and who is overloaded before you assign." },
      { title: "Reports", description: "Operational dashboards that update as work is completed." },
    ],
    audience: ["Service businesses", "Operations managers", "Small and mid-sized teams"],
    integrations: ["Google Calendar", "Accounting software", "Email"],
    links: {},
    faqs: [
      { question: "Is this a real product?", answer: "This is sample content used to demonstrate the product page template. Replace it with real product information before launch." },
    ],
  },
  {
    slug: "sample-insights-platform",
    name: "Insights Platform",
    category: "Analytics",
    tagline: "Turn scattered business data into decisions.",
    description:
      "A sample listing for an analytics product: connect data sources, build shared dashboards and get alerts when key metrics change.",
    status: "concept",
    isSample: true,
    monogram: "IP",
    mockup: "analytics",
    highlights: ["Connected data sources", "Shared dashboards", "Metric alerts"],
    problems: [
      "Key numbers live in different tools and never quite match.",
      "Building reports depends on one analyst or developer.",
      "Teams learn about problems after they've already cost money.",
    ],
    features: [
      { title: "Data connectors", description: "Bring sales, finance and product data into one model." },
      { title: "Dashboards", description: "Clear, shareable dashboards built from reusable metrics." },
      { title: "Alerts", description: "Notifications when a metric crosses a threshold you define." },
      { title: "Scheduled reports", description: "Automatic summaries sent to the right people every week." },
    ],
    audience: ["Founders", "Finance and operations leads", "Growing companies"],
    integrations: ["Spreadsheets", "Payment providers", "CRM", "Databases"],
    links: {},
    faqs: [
      { question: "Is this a real product?", answer: "This is sample content used to demonstrate the product page template. Replace it with real product information before launch." },
    ],
  },
  {
    slug: "sample-field-app",
    name: "Field App",
    category: "Mobile",
    tagline: "Mobile forms and checklists for teams on the move.",
    description:
      "A sample listing for a mobile product: digital checklists, photo capture and offline sync for field and on-site teams.",
    status: "beta",
    isSample: true,
    monogram: "FA",
    mockup: "mobile",
    highlights: ["Offline checklists", "Photo evidence", "Instant sync"],
    problems: [
      "Paper forms get lost, are hard to read and need re-typing.",
      "Office teams wait days for updates from the field.",
      "There's no reliable record of what was done, when and by whom.",
    ],
    features: [
      { title: "Custom checklists", description: "Build inspection and service forms without code." },
      { title: "Offline mode", description: "Complete work without signal; data syncs automatically later." },
      { title: "Photos & signatures", description: "Capture evidence and approvals directly in the form." },
      { title: "Office dashboard", description: "Review submissions and export reports in real time." },
    ],
    audience: ["Field service teams", "Inspection companies", "Facilities management"],
    integrations: ["Cloud storage", "Email", "Web dashboard"],
    links: {},
    faqs: [
      { question: "Is this a real product?", answer: "This is sample content used to demonstrate the product page template. Replace it with real product information before launch." },
    ],
  },
];

export const productStatusLabel: Record<ProductStatus, string> = {
  concept: "Concept",
  "in-development": "In development",
  beta: "Beta",
  live: "Available",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const productCategories = Array.from(new Set(products.map((p) => p.category)));
