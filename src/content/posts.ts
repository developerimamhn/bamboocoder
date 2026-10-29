import type { Post } from "./types";

/**
 * Insights articles. These are SAMPLE drafts — review, edit and set
 * `isSample: false` before publishing, or replace with CMS content.
 */
export const posts: Post[] = [
  {
    slug: "build-vs-buy-custom-software",
    title: "Build or buy? A practical framework for custom software decisions",
    excerpt:
      "Off-the-shelf tools are fast to start and custom software fits perfectly. Here's how to decide which one your business actually needs.",
    category: "Business Technology",
    date: "2026-10-14",
    readingMinutes: 6,
    author: "Bamboo Coders Team",
    isSample: true,
    body: [
      { type: "p", text: "Almost every growing business reaches the same crossroads: the tools that got you here are starting to slow you down. Do you buy a more capable product, or build something of your own?" },
      { type: "p", text: "There's no universal answer, but there is a reliable way to think about it. The decision comes down to how unique the process is, how much it costs you today and how central it is to the way you compete." },
      { type: "h2", text: "When buying makes sense" },
      { type: "ul", items: [
        "The process is standard across your industry — accounting, payroll, email marketing.",
        "A mature product covers most of your requirements without heavy customisation.",
        "You need something working this month, not this quarter.",
      ] },
      { type: "h2", text: "When building makes sense" },
      { type: "ul", items: [
        "The process is how you differentiate — the way you quote, schedule or serve customers.",
        "Your team spends hours each week on workarounds between tools.",
        "Licence and integration costs keep growing with every new hire.",
      ] },
      { type: "h2", text: "The hybrid option" },
      { type: "p", text: "Often the best answer is both: buy the commodity pieces and build the thin layer that connects them and captures what makes your business different. Integrations and focused internal tools tend to deliver the highest return for the smallest investment." },
      { type: "p", text: "Whichever route you take, start by measuring the problem. Hours lost, errors made and opportunities missed are the numbers that turn a technology decision into a business one." },
    ],
  },
  {
    slug: "scoping-a-saas-mvp",
    title: "How to scope a SaaS MVP without building the wrong thing",
    excerpt:
      "A minimum viable product should test your riskiest assumption — not your entire roadmap. A step-by-step approach to scoping.",
    category: "SaaS & Product",
    date: "2026-09-30",
    readingMinutes: 7,
    author: "Bamboo Coders Team",
    isSample: true,
    body: [
      { type: "p", text: "Most MVPs fail not because they're too small, but because they're the wrong size in the wrong places. They polish features nobody asked for and skip the foundations every SaaS product needs." },
      { type: "h2", text: "Start with the riskiest assumption" },
      { type: "p", text: "Write down what must be true for the business to work. Will customers pay? Will they connect their data? Will they come back weekly? The MVP's job is to test the one you're least sure about." },
      { type: "h2", text: "Separate the core loop from the scaffolding" },
      { type: "p", text: "The core loop is the repeated action that delivers value. Everything else — settings, exports, advanced permissions — is scaffolding that can be minimal at launch." },
      { type: "h2", text: "Don't skip the foundations" },
      { type: "ul", items: [
        "Authentication and organisation accounts",
        "A data model that supports multiple tenants",
        "Billing, even if there's only one plan",
        "Basic analytics on activation and retention",
      ] },
      { type: "p", text: "These are expensive to retrofit. Getting them right early is what lets an MVP grow into a product instead of being rewritten." },
    ],
  },
  {
    slug: "designing-dashboards-people-use",
    title: "Designing dashboards people actually use",
    excerpt:
      "Most dashboards show everything and explain nothing. Principles for interfaces that help people make decisions.",
    category: "UX & Design",
    date: "2026-09-12",
    readingMinutes: 5,
    author: "Bamboo Coders Team",
    isSample: true,
    body: [
      { type: "p", text: "A dashboard is successful when someone opens it, understands what's happening and knows what to do next — in under a minute. That rarely happens by adding more charts." },
      { type: "h2", text: "Design for a question, not a dataset" },
      { type: "p", text: "Every dashboard should answer a specific question for a specific person. \"Are we on track this week?\" leads to a very different design than \"What happened last quarter?\"" },
      { type: "h2", text: "Principles we follow" },
      { type: "ul", items: [
        "Lead with the few numbers that matter, then offer detail on demand.",
        "Always show comparison — a number without context is just a number.",
        "Use colour to signal status, not decoration.",
        "Make the next action one click away.",
      ] },
      { type: "p", text: "Test dashboards the same way you test any interface: give real users a real task and watch where they hesitate." },
    ],
  },
  {
    slug: "automation-starting-points",
    title: "Five automation starting points for growing businesses",
    excerpt:
      "You don't need a digital transformation programme to save hours every week. Start with these high-return automations.",
    category: "Automation",
    date: "2026-08-26",
    readingMinutes: 4,
    author: "Bamboo Coders Team",
    isSample: true,
    body: [
      { type: "p", text: "Automation doesn't have to start big. The best first projects are small, frequent and annoying — the tasks everyone does and nobody enjoys." },
      { type: "h2", text: "Where to start" },
      { type: "ul", items: [
        "Lead capture: send website enquiries straight into your CRM with the right owner assigned.",
        "Invoicing: generate invoices automatically when a job or order is marked complete.",
        "Onboarding: trigger welcome emails, accounts and tasks when a new customer signs.",
        "Reporting: compile weekly numbers from several tools into one summary.",
        "Data sync: keep customer details identical across sales, support and billing.",
      ] },
      { type: "h2", text: "Make it reliable" },
      { type: "p", text: "Every automation should log what it does and alert someone when it fails. A silent failure is worse than a manual process, because nobody knows to step in." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const postCategories = Array.from(new Set(posts.map((p) => p.category)));

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
