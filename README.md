# Bamboo Coders — Corporate Website

Marketing site, service showcase, product catalogue and lead-generation system for Bamboo Coders.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons. Vercel-ready.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server (placeholders visible) |
| `npm run build` | Production build — all pages prerendered |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/                  Routes (one folder per page) + sitemap, robots, OG image, API
    api/inquiry/        Secure inquiry endpoint (validation, spam checks, delivery)
  components/
    ui/                 Design-system primitives: Button, Container, Section, Eyebrow, Badge, Icon
    layout/             Header (dropdowns + mobile menu), Footer, Logo
    sections/           Reusable page sections: cards, hero, process, FAQ, CTA, filters
    mockups/            Code-drawn product interfaces (no image files to break)
    forms/              Project inquiry form
  content/              ALL editable content — typed data, separate from presentation
  lib/                  SEO helpers, inquiry validation and delivery
```

## Editing content

Everything lives in `src/content/`. Pages, navigation, footer and sitemap update automatically.

| File | Contains |
| --- | --- |
| `site.ts` | Company name, URL, contact details, social links, **verified stats** |
| `services.ts` | The six services and their detail-page content |
| `products.ts` | Product catalogue (status, features, links, pricing) |
| `case-studies.ts` | Portfolio entries |
| `posts.ts` | Insights articles |
| `testimonials.ts` | Client testimonials (section hidden while empty) |
| `faqs.ts` | General FAQ |
| `process.ts` | The six-step delivery process |

The shapes in `src/content/types.ts` map 1:1 to CMS collections. To move to Supabase, Sanity or another CMS later, replace the arrays with fetch calls that return the same types.

### Content honesty rules built in

- **Sample content** (`isSample: true`) shows an amber "Sample content" badge, is excluded from `sitemap.xml`, gets `noindex`, and emits no structured data. Replace it with real data and set `isSample: false`.
- **Empty stats, testimonials, case-study results and the team/story blocks** render as dashed placeholders in development and are **hidden in production**.
- **Contact channels** (email, phone, WhatsApp, booking link, response time) and **social links** only appear once configured.
- **Product pricing** only renders when `pricing` is set. Product links (website, login, signup, demo, docs, support) only render when provided.

### Before launch checklist

- [ ] Replace sample products, case studies and articles (or delete them)
- [ ] Add verified stats in `site.ts → stats` (or leave empty)
- [ ] Add genuine testimonials (or leave empty)
- [ ] Set contact details and social profiles via env vars / `site.ts`
- [ ] Review the technology stacks listed on service pages and the engagement models on the About page
- [ ] Have `/privacy` and `/terms` reviewed — they are templates with `[bracketed]` placeholders
- [ ] Set `NEXT_PUBLIC_SITE_URL` (used for canonical URLs, sitemap and Open Graph)
- [ ] Configure inquiry delivery (below)

## Contact form & lead delivery

`POST /api/inquiry` (`src/app/api/inquiry/route.ts`) handles submissions server-side:

1. **Spam protection:** hidden honeypot field, minimum time-to-fill (3 s), and per-IP rate limiting (5 per 10 minutes).
2. **Validation:** shared rules in `src/lib/inquiry.ts` run in the browser and again on the server.
3. **Delivery:** configured through server-only environment variables. Secrets never reach the browser.
   - **Email via Resend:** set `RESEND_API_KEY`, `INQUIRY_TO_EMAIL` and `INQUIRY_FROM_EMAIL`. Attachments up to 4 MB are forwarded.
   - **CRM / automation webhook:** set `INQUIRY_WEBHOOK_URL` (and optionally `INQUIRY_WEBHOOK_SECRET`) to send JSON to HubSpot, Zapier, Make, n8n or a Supabase Edge Function.
   - Both can be active at once.

**If no delivery channel is configured,** the form is in **prototype mode**. It shows a visible notice, and the API returns `503` instead of pretending the inquiry was sent.

For high-traffic production use, consider adding Cloudflare Turnstile and a shared rate-limit store such as Upstash Redis. The built-in limiter only works per server instance.

Service and product pages link to `/contact?service=<slug>` or `?type=product` to preselect the project type.

## Design system

Tokens are defined in `src/app/globals.css` under `@theme`. Change them there to rebrand:

- **Surfaces:** `canvas` (off-white), `surface`, `sunken`, `night` (dark sections)
- **Text:** `ink`, `ink-soft`, `muted`, `subtle`
- **Accent:** `bamboo-50` … `bamboo-900`
- **Shape:** `rounded-card`, `rounded-control`, `shadow-soft`, `shadow-lift`
- **Type:** Geist Sans for text, Geist Mono for the bracketed eyebrow labels

The motion is deliberately restrained, and all of it is disabled under `prefers-reduced-motion`.

## SEO & accessibility

- Unique titles and descriptions, canonical URLs, and Open Graph/Twitter metadata on every page (`src/lib/seo.tsx`)
- `sitemap.xml`, `robots.txt` and a generated Open Graph image
- JSON-LD structured data: Organization, Service, FAQPage, Article and SoftwareApplication (real content only)
- Semantic landmarks, a skip link, visible focus rings, labelled form fields with linked error messages, `aria-expanded` on menus, and Escape to close menus
- A custom 404 page

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel. The framework is detected automatically.
2. Add the environment variables from `.env.example`.
3. Deploy. Every page is statically prerendered, and only `/api/inquiry` runs on demand.
