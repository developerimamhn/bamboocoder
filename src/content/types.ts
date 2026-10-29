/**
 * Content model for the Bamboo Coders website.
 *
 * All content lives in `src/content/*` as typed data and is kept separate
 * from presentation. The shapes below map 1:1 to CMS collections, so the
 * data files can later be swapped for Supabase, Sanity, Contentful, etc.
 * without touching the components.
 */

export type IconName =
  | "braces"
  | "app-window"
  | "smartphone"
  | "pen-tool"
  | "cloud"
  | "workflow"
  | "compass"
  | "users"
  | "shield-check"
  | "gauge"
  | "handshake"
  | "life-buoy"
  | "layers"
  | "sparkles";

export type MockupVariant = "dashboard" | "analytics" | "board" | "mobile";

export interface Faq {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Short label used in navigation menus. */
  navLabel: string;
  icon: IconName;
  /** One-sentence explanation for cards. */
  summary: string;
  /** The key business benefit, shown on cards. */
  benefit: string;
  /** The problem as a client would phrase it. */
  clientVoice: string;
  hero: { headline: string; intro: string };
  challenges: string[];
  overview: string[];
  capabilities: Feature[];
  deliverables: string[];
  stack?: { label: string; items: string[] }[];
  /** What each of the six shared process steps means for this service. */
  processFocus: [string, string, string, string, string, string];
  faqs: Faq[];
  seo: { title: string; description: string };
}

export type ProductStatus = "concept" | "in-development" | "beta" | "live";

export interface ProductLinks {
  website?: string;
  login?: string;
  signup?: string;
  demo?: string;
  docs?: string;
  support?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  /** Marks illustrative content that must be replaced before launch. */
  isSample: boolean;
  /** Monogram shown when no logo is available. */
  monogram: string;
  mockup: MockupVariant;
  highlights: string[];
  problems: string[];
  features: Feature[];
  audience: string[];
  integrations: string[];
  /** Only set when pricing has been confirmed. */
  pricing?: { label: string; price: string; detail: string }[];
  links: ProductLinks;
  faqs: Faq[];
}

export interface CaseStudyResult {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  approach: Feature[];
  /** Service slugs. */
  services: string[];
  technologies: string[];
  /** Only add results that have been verified with the client. */
  results: CaseStudyResult[];
  isSample: boolean;
  mockup: MockupVariant;
  featured: boolean;
}

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  readingMinutes: number;
  author: string;
  isSample: boolean;
  body: PostBlock[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  portrait?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
