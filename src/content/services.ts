import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    navLabel: "Custom Software",
    icon: "braces",
    summary:
      "Purpose-built software shaped around the way your business actually operates — not the other way around.",
    benefit: "Replace workarounds with systems that fit your operations.",
    clientVoice: "Our business runs on spreadsheets and tools that don't talk to each other.",
    hero: {
      headline: "Software built around how your business really works.",
      intro:
        "When off-the-shelf tools force your team into workarounds, custom software removes the friction. We design and engineer internal systems, operational platforms and line-of-business applications that fit your processes and scale with you.",
    },
    challenges: [
      "Critical processes depend on spreadsheets, email threads and manual copy-paste.",
      "Off-the-shelf tools cover 70% of the need, and the remaining 30% costs hours every week.",
      "Legacy systems are hard to change, poorly documented or kept alive by one person.",
      "Data lives in several places, so nobody trusts the numbers in reports.",
    ],
    overview: [
      "Custom software is an investment, so we start by finding where it pays off. We map the workflow end to end, identify the steps that cost the most time or create the most errors, and focus the first release there.",
      "From there we design and build in small, reviewable increments. You see working software early, give feedback on real screens and keep control of priorities as the system grows.",
    ],
    capabilities: [
      { title: "Internal tools & back-office systems", description: "Admin panels, operations consoles and approval workflows that replace manual processes." },
      { title: "Legacy modernisation", description: "Incremental re-platforming of ageing systems without stopping the business." },
      { title: "Data & reporting layers", description: "A single source of truth with dashboards your team can rely on." },
      { title: "Role-based access", description: "Granular permissions, audit trails and secure authentication from day one." },
      { title: "APIs & integrations", description: "Connect the new system to the tools you already use — accounting, CRM, ERP." },
      { title: "Documentation & handover", description: "Clear technical documentation so your system is never a black box." },
    ],
    deliverables: [
      "Process map and prioritised requirements",
      "Solution architecture and technical plan",
      "Clickable prototype of key workflows",
      "Production-ready application and source code",
      "Automated tests and deployment pipeline",
      "Technical and user documentation",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"] },
      { label: "Backend", items: ["Node.js", "Python", "REST & GraphQL APIs"] },
      { label: "Data", items: ["PostgreSQL", "Redis"] },
      { label: "Infrastructure", items: ["AWS", "Vercel", "Docker", "CI/CD"] },
    ],
    processFocus: [
      "Shadow the people who do the work today and document the real process.",
      "Rank opportunities by time saved and risk reduced; agree the first release.",
      "Prototype the busiest screens and test them with the people who'll use them.",
      "Build in two-week increments with a working demo at the end of each.",
      "Test business rules, permissions and data migration with real scenarios.",
      "Roll out in stages, train the team and measure adoption.",
    ],
    faqs: [
      { question: "Is custom software worth it compared to an off-the-shelf tool?", answer: "Not always. If an existing product covers your needs, we will tell you. Custom software makes sense when your process is a competitive advantage, when integration costs outweigh licence costs, or when workarounds are consuming significant team time." },
      { question: "Can you work with our existing systems?", answer: "Yes. Most projects integrate with tools already in place. During discovery we assess what to keep, what to connect and what to replace." },
      { question: "Who owns the code?", answer: "Ownership and licensing terms are defined in the project agreement. Our standard approach is for clients to own the custom code we write for them." },
      { question: "How do you estimate cost?", answer: "After a discovery conversation we provide a written scope and estimate. For larger or less defined projects we recommend a short paid discovery phase first, so the estimate is grounded in real detail." },
    ],
    seo: {
      title: "Custom Software Development",
      description: "Purpose-built internal tools, operational platforms and line-of-business applications designed around how your business works.",
    },
  },
  {
    slug: "web-application-development",
    title: "Web Application Development",
    navLabel: "Web Applications",
    icon: "app-window",
    summary:
      "Fast, secure and accessible web applications — from customer portals to complex multi-user platforms.",
    benefit: "Give customers and teams a product they actually enjoy using.",
    clientVoice: "We need a web platform our customers can log into and manage everything themselves.",
    hero: {
      headline: "Web applications that are fast, secure and easy to use.",
      intro:
        "We build browser-based products that customers and teams rely on every day — portals, dashboards, marketplaces and workflow tools — engineered for performance, accessibility and long-term maintainability.",
    },
    challenges: [
      "Customers call or email for things they should be able to do themselves.",
      "The current web app is slow, fragile and difficult to extend.",
      "Different user types need different views, permissions and workflows.",
      "You need a reliable platform that can grow without a rewrite.",
    ],
    overview: [
      "A good web application feels simple even when the logic behind it isn't. We pair careful interface design with a modern, typed codebase so new features can be added without breaking what already works.",
      "Performance and accessibility are treated as requirements, not extras. We measure Core Web Vitals, test with keyboard and screen readers, and design for the slowest realistic connection your users have.",
    ],
    capabilities: [
      { title: "Customer & partner portals", description: "Self-service accounts, orders, documents, billing and support in one place." },
      { title: "Dashboards & admin consoles", description: "Data-dense interfaces that stay readable and quick to navigate." },
      { title: "Multi-tenant platforms", description: "Secure data separation, roles and organisation-level settings." },
      { title: "Payments & subscriptions", description: "Checkout, invoicing and subscription billing via trusted providers." },
      { title: "Performance engineering", description: "Server rendering, caching and asset optimisation for fast first loads." },
      { title: "Accessibility", description: "Interfaces built against WCAG guidelines, tested with assistive technology." },
    ],
    deliverables: [
      "User roles, journeys and feature map",
      "UI design system and high-fidelity screens",
      "Responsive, accessible web application",
      "Admin tools for managing content and users",
      "Monitoring, error tracking and analytics setup",
      "Deployment pipeline and hosting configuration",
    ],
    stack: [
      { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js", "Server Actions", "REST & GraphQL"] },
      { label: "Data & auth", items: ["PostgreSQL", "Supabase", "OAuth / SSO"] },
      { label: "Hosting", items: ["Vercel", "AWS", "Cloudflare"] },
    ],
    processFocus: [
      "Define every user type and what each one needs to accomplish.",
      "Agree the launch feature set, technical architecture and hosting approach.",
      "Design the interface system and the key flows at full fidelity.",
      "Build features end to end — interface, API and data — in short cycles.",
      "Run cross-browser, accessibility, performance and security testing.",
      "Launch with monitoring in place and iterate based on real usage.",
    ],
    faqs: [
      { question: "Will the application work on mobile devices?", answer: "Yes. Every web application we build is responsive and tested on common phone and tablet sizes. If you need offline use or device features, we will discuss a native or progressive web app approach." },
      { question: "Can you take over an existing web application?", answer: "Often, yes. We start with a code and architecture review, then recommend whether to improve, refactor or gradually replace parts of it." },
      { question: "Where will the application be hosted?", answer: "We recommend hosting based on your needs and budget — commonly Vercel, AWS or your existing cloud. The accounts can be set up in your company's name." },
      { question: "Do you provide maintenance after launch?", answer: "Yes. Ongoing support and improvement can be arranged as a separate agreement after launch." },
    ],
    seo: {
      title: "Web Application Development",
      description: "Customer portals, dashboards and multi-user platforms engineered for performance, accessibility and long-term maintainability.",
    },
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    navLabel: "Mobile Apps",
    icon: "smartphone",
    summary:
      "iOS and Android apps with native-quality experiences, built from a single, maintainable codebase where it makes sense.",
    benefit: "Reach customers and field teams wherever they are.",
    clientVoice: "Our customers and field staff need to do this from their phones.",
    hero: {
      headline: "Mobile apps people keep on their home screen.",
      intro:
        "We design and build mobile applications for iOS and Android — customer-facing apps, field-team tools and companion apps for existing platforms — with the polish users expect from the best apps on their phone.",
    },
    challenges: [
      "Customers expect to self-serve from their phone, and your competitors already allow it.",
      "Field teams rely on paper forms, calls or messaging apps to report work.",
      "You need iOS and Android, but not the cost of two separate codebases.",
      "App store approval, push notifications and offline use feel like unknowns.",
    ],
    overview: [
      "Mobile is a different context: smaller screens, interrupted sessions, unreliable connections. We design for those realities first — short flows, clear states and graceful offline behaviour.",
      "For most products we recommend a cross-platform approach that shares one codebase across iOS and Android without compromising the experience. Where a product needs deep platform features, we advise when native development is the better choice.",
    ],
    capabilities: [
      { title: "Cross-platform apps", description: "One codebase for iOS and Android with platform-appropriate behaviour." },
      { title: "Offline-first data", description: "Local storage and sync so work continues without a signal." },
      { title: "Push notifications", description: "Targeted, respectful notifications that bring users back." },
      { title: "Device features", description: "Camera, location, biometrics and file handling where they add value." },
      { title: "App store release", description: "Store listings, review guidelines, signing and release management." },
      { title: "Companion apps", description: "Mobile access to an existing web platform via shared APIs." },
    ],
    deliverables: [
      "Mobile UX flows and interface design",
      "iOS and Android applications",
      "Backend API or integration with your platform",
      "Analytics and crash reporting",
      "App Store and Google Play submission support",
      "Release and update process documentation",
    ],
    stack: [
      { label: "Mobile", items: ["React Native", "Expo", "TypeScript"] },
      { label: "Native", items: ["Swift", "Kotlin"] },
      { label: "Backend", items: ["Node.js", "Supabase", "Firebase"] },
      { label: "Delivery", items: ["EAS Build", "TestFlight", "Play Console"] },
    ],
    processFocus: [
      "Understand where, when and why people will open the app.",
      "Choose cross-platform or native, and define the launch scope.",
      "Design mobile-first flows and test them on real devices early.",
      "Build with internal test builds shared after every iteration.",
      "Test across devices, OS versions, network conditions and edge cases.",
      "Handle store submission, staged rollout and post-launch updates.",
    ],
    faqs: [
      { question: "Do we need a mobile app or a responsive website?", answer: "If users visit occasionally, a responsive web app is often enough. An app makes sense for frequent use, offline work, push notifications or device features. We'll help you decide honestly." },
      { question: "Can you publish the app under our company account?", answer: "Yes, and we recommend it. We guide you through setting up Apple and Google developer accounts so the apps belong to your business." },
      { question: "How are app updates handled?", answer: "We set up a release process for store updates and, where appropriate, over-the-air updates for quick fixes within store guidelines." },
    ],
    seo: {
      title: "Mobile App Development",
      description: "iOS and Android applications for customers and field teams, designed for real-world mobile use and built to be maintained.",
    },
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    navLabel: "UI/UX Design",
    icon: "pen-tool",
    summary:
      "Research-led product design that makes complex software feel clear, consistent and easy to adopt.",
    benefit: "Reduce friction, support load and training time.",
    clientVoice: "Our product works, but people find it confusing and support tickets keep growing.",
    hero: {
      headline: "Design that makes complex software feel simple.",
      intro:
        "We help teams understand their users, simplify flows and build interface systems that scale — whether you are shaping a new product or improving one that people already use.",
    },
    challenges: [
      "Users get stuck, drop off or contact support for basic tasks.",
      "The interface has grown feature by feature and no longer feels consistent.",
      "Developers lack clear specifications, so design intent is lost in build.",
      "A new product idea needs to be validated before committing to development.",
    ],
    overview: [
      "Good design starts with understanding. We talk to users, review analytics and support data, and audit the existing product to find where people struggle and why.",
      "We then translate those insights into flows, prototypes and a reusable design system that developers can implement faithfully. The result is a product that is easier to use and faster to evolve.",
    ],
    capabilities: [
      { title: "User research", description: "Interviews, usability testing and analytics review to ground decisions in evidence." },
      { title: "UX audits", description: "Heuristic and accessibility reviews with prioritised, actionable findings." },
      { title: "Information architecture", description: "Navigation and content structures that match how users think." },
      { title: "Prototyping", description: "Interactive prototypes to test ideas before development starts." },
      { title: "Design systems", description: "Tokens, components and guidelines shared between design and code." },
      { title: "Developer handoff", description: "Annotated specifications and close collaboration through build." },
    ],
    deliverables: [
      "Research findings and user insights",
      "User journeys and flow diagrams",
      "Wireframes and interactive prototypes",
      "High-fidelity interface designs",
      "Design system and component library",
      "Handoff specifications for development",
    ],
    stack: [
      { label: "Design", items: ["Figma", "FigJam"] },
      { label: "Research", items: ["Usability testing", "Analytics review", "Interviews"] },
      { label: "Systems", items: ["Design tokens", "Storybook"] },
    ],
    processFocus: [
      "Talk to users and stakeholders; review analytics and support data.",
      "Define the problems worth solving and the success measures for each.",
      "Sketch, wireframe and prototype — then test with real users.",
      "Work alongside developers to implement the design system faithfully.",
      "Run usability and accessibility checks on the built product.",
      "Measure adoption and task success, and refine based on results.",
    ],
    faqs: [
      { question: "Can you design for a product another team will build?", answer: "Yes. We deliver developer-ready specifications and design systems, and can stay involved during build to answer questions and review implementation." },
      { question: "Do you need access to our users for research?", answer: "It helps a lot. If direct access is difficult, we can work with analytics, support tickets, sales feedback and recruited participants." },
      { question: "Can you improve an existing product without a full redesign?", answer: "Usually that's the better approach. We prioritise the changes with the biggest impact and roll them out incrementally." },
    ],
    seo: {
      title: "UI/UX Design",
      description: "User research, UX audits, prototyping and design systems that make complex software clear and easy to adopt.",
    },
  },
  {
    slug: "saas-development",
    title: "SaaS Development",
    navLabel: "SaaS Development",
    icon: "cloud",
    summary:
      "From first version to scalable platform — multi-tenant SaaS products built with subscriptions, security and growth in mind.",
    benefit: "Launch faster on foundations that won't need rebuilding.",
    clientVoice: "We have a product idea and need a team that can take it from MVP to a real business.",
    hero: {
      headline: "SaaS products built to launch fast and scale cleanly.",
      intro:
        "We partner with founders and product teams to turn ideas into subscription software — scoping a focused MVP, building it on solid multi-tenant foundations and evolving it as customers arrive. It's also how we build our own products.",
    },
    challenges: [
      "You need to validate the idea with paying customers before over-investing.",
      "Shortcuts taken in an MVP can become expensive rewrites later.",
      "Subscriptions, billing, onboarding and permissions all need to work from launch.",
      "Your technical team needs extra capacity or senior product engineering.",
    ],
    overview: [
      "SaaS rewards focus. We help you define the smallest product that proves value, then build it on foundations — tenancy, authentication, billing, observability — that won't need replacing when you grow.",
      "Because we build and operate our own software products, we bring product thinking as well as engineering: onboarding, activation, pricing pages and the metrics that tell you whether it's working.",
    ],
    capabilities: [
      { title: "MVP scoping", description: "A focused first release that tests the riskiest assumptions." },
      { title: "Multi-tenant architecture", description: "Organisations, workspaces, roles and secure data isolation." },
      { title: "Subscription billing", description: "Plans, trials, usage-based pricing and invoicing via Stripe or similar." },
      { title: "Onboarding & activation", description: "First-run experiences that help new users reach value quickly." },
      { title: "Product analytics", description: "Event tracking and dashboards for activation, retention and revenue." },
      { title: "Scaling & reliability", description: "Performance tuning, background jobs, monitoring and incident readiness." },
    ],
    deliverables: [
      "Product strategy and MVP scope",
      "SaaS architecture and data model",
      "Marketing site, app and admin console",
      "Billing, onboarding and email flows",
      "Analytics and monitoring setup",
      "Post-launch roadmap",
    ],
    stack: [
      { label: "Application", items: ["Next.js", "TypeScript", "Node.js"] },
      { label: "Platform", items: ["Supabase", "PostgreSQL", "Stripe"] },
      { label: "Operations", items: ["Vercel", "AWS", "Sentry", "PostHog"] },
    ],
    processFocus: [
      "Clarify the customer, the problem and the riskiest assumptions.",
      "Shape the MVP scope, pricing model and technical foundations.",
      "Design onboarding and the core loop that delivers value.",
      "Build the product, billing and admin tooling in parallel.",
      "Test tenancy isolation, billing edge cases and load.",
      "Launch to early customers, measure activation and iterate.",
    ],
    faqs: [
      { question: "How long does an MVP take?", answer: "It depends on scope. After an initial workshop we provide a phased plan with a realistic timeline for the first release." },
      { question: "Can you join our existing product team?", answer: "Yes. We can work as an extension of your team, contributing engineering and design capacity within your processes and tools." },
      { question: "Do you take equity instead of fees?", answer: "Engagements are normally fee-based. If you'd like to discuss a different arrangement, raise it during the first conversation." },
    ],
    seo: {
      title: "SaaS Development",
      description: "MVPs and multi-tenant SaaS platforms with subscriptions, onboarding and analytics, built on foundations that scale.",
    },
  },
  {
    slug: "automation-integrations",
    title: "Business Automation & Integrations",
    navLabel: "Automation & Integrations",
    icon: "workflow",
    summary:
      "Connect the tools you already use and automate repetitive work, so information flows without manual effort.",
    benefit: "Free your team from repetitive, error-prone tasks.",
    clientVoice: "We re-type the same information into three different systems every day.",
    hero: {
      headline: "Connect your systems. Automate the busywork.",
      intro:
        "We integrate CRMs, accounting tools, e-commerce platforms and internal systems, and automate the repetitive steps between them — so data stays consistent and your team can focus on work that needs a human.",
    },
    challenges: [
      "The same data is entered manually into several systems.",
      "Errors creep in between tools, and nobody notices until a customer does.",
      "Reports take days to assemble from exports and spreadsheets.",
      "Existing no-code automations have become fragile and hard to maintain.",
    ],
    overview: [
      "Automation works best when it is reliable and visible. We map how information moves today, then design integrations that handle errors, retries and edge cases — and alert someone when something needs attention.",
      "Depending on the need, we use direct API integrations, lightweight services or established automation platforms, choosing the simplest approach that will be dependable over time.",
    ],
    capabilities: [
      { title: "API integrations", description: "Reliable, two-way connections between your business systems." },
      { title: "Workflow automation", description: "Trigger-based processes for approvals, notifications and data updates." },
      { title: "Data synchronisation", description: "Keep customers, orders and inventory consistent across tools." },
      { title: "Document automation", description: "Generate quotes, invoices and reports from templates automatically." },
      { title: "Monitoring & alerts", description: "Logging, retries and notifications when an integration needs attention." },
      { title: "No-code clean-up", description: "Stabilise or replace fragile automations built on no-code tools." },
    ],
    deliverables: [
      "Current-state process and data-flow map",
      "Integration architecture and error-handling plan",
      "Implemented integrations and automations",
      "Monitoring dashboard and alerting",
      "Runbook for common issues",
      "Handover and team training",
    ],
    stack: [
      { label: "Integration", items: ["REST & GraphQL APIs", "Webhooks", "Node.js", "Python"] },
      { label: "Platforms", items: ["Zapier", "Make", "n8n"] },
      { label: "Infrastructure", items: ["Serverless functions", "Queues", "Cron jobs"] },
    ],
    processFocus: [
      "Map every system involved and how data moves between them today.",
      "Prioritise automations by hours saved and errors prevented.",
      "Design data mappings, triggers and failure handling for each flow.",
      "Build integrations with logging and safe retry behaviour.",
      "Test with real data samples, including edge cases and failures.",
      "Monitor in production and extend automation to the next process.",
    ],
    faqs: [
      { question: "Which tools can you integrate?", answer: "Any system with an API or reliable export/import mechanism. During discovery we confirm what each of your tools supports." },
      { question: "Should we use Zapier or custom code?", answer: "No-code platforms are great for simple, low-volume flows. Custom integrations are better for complex logic, high volume or business-critical data. We often combine both." },
      { question: "What happens when an integration fails?", answer: "We design for it: failed steps are logged, retried where safe and flagged to the right person, so problems surface quickly." },
    ],
    seo: {
      title: "Business Automation & Integrations",
      description: "Connect CRMs, accounting, e-commerce and internal tools, and automate repetitive work with reliable, monitored integrations.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
