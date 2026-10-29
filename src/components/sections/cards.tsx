import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { CaseStudy, Post, Product, Service } from "@/content/types";
import { productStatusLabel } from "@/content/products";
import { formatDate } from "@/content/posts";
import { getService } from "@/content/services";
import { IconTile } from "@/components/ui/icon";
import { ArrowLink } from "@/components/ui/button";
import { Badge, SampleBadge } from "@/components/ui/layout";
import { Mockup } from "@/components/mockups/mockups";
import { cn } from "@/lib/utils";

const cardBase =
  "group relative flex flex-col rounded-card border border-line bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift";

/** Makes the whole card clickable while keeping a single, labelled link. */
function StretchedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="absolute inset-0 z-10 rounded-card" aria-label={label}>
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={cn(cardBase, "p-7")}>
      <IconTile name={service.icon} />
      <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-ink">{service.title}</h3>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">{service.summary}</p>
      <p className="mt-5 flex gap-2 border-t border-line pt-5 text-sm font-medium text-ink-soft">
        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-bamboo-600" />
        {service.benefit}
      </p>
      <div className="mt-auto pt-6">
        <ArrowLink href={`/services/${service.slug}`} className="relative z-20">
          Learn more<span className="sr-only"> about {service.title}</span>
        </ArrowLink>
      </div>
    </article>
  );
}

export function ProductMonogram({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-ink font-mono font-semibold text-white",
        size === "md" ? "size-11 text-sm" : "size-14 text-base",
      )}
    >
      {product.monogram}
    </span>
  );
}

export function ProductStatus({ product }: { product: Product }) {
  return <Badge tone={product.status === "live" ? "bamboo" : "neutral"}>{productStatusLabel[product.status]}</Badge>;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className={cn(cardBase, "overflow-hidden")}>
      <Mockup variant={product.mockup} compact className="h-64 overflow-hidden border-b border-line" />
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <ProductMonogram product={product} />
            <div>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{product.name}</h3>
              <p className="text-sm text-muted">{product.category}</p>
            </div>
          </div>
          <ProductStatus product={product} />
        </div>
        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{product.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {product.highlights.map((h) => (
            <li key={h} className="rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-inset ring-line">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <ArrowLink href={`/products/${product.slug}`} className="relative z-20">
            Explore product<span className="sr-only">: {product.name}</span>
          </ArrowLink>
          {product.isSample && <SampleBadge />}
        </div>
      </div>
    </article>
  );
}

export function CaseStudyCard({ study, layout = "stacked" }: { study: CaseStudy; layout?: "stacked" | "wide" }) {
  const serviceNames = study.services.map((slug) => getService(slug)?.navLabel).filter(Boolean);
  return (
    <article className={cn(cardBase, "overflow-hidden", layout === "wide" && "lg:grid lg:grid-cols-[1.25fr_1fr]")}>
      <Mockup variant={study.mockup} compact={layout !== "wide"} className={cn("overflow-hidden", layout === "wide" ? "h-72 lg:h-full lg:min-h-[420px] lg:border-r lg:border-line" : "h-72 border-b border-line")} />
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{study.industry}</Badge>
          {study.isSample && <SampleBadge />}
        </div>
        <h3 className={cn("mt-5 font-semibold tracking-[-0.02em] text-ink", layout === "wide" ? "text-2xl sm:text-[1.75rem] sm:leading-tight" : "text-xl")}>
          {study.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{study.summary}</p>
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">{serviceNames.join(" · ")}</p>
        <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-medium text-bamboo-700">
          Read case study
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
      <StretchedLink href={`/work/${study.slug}`} label={`Read case study: ${study.title}`} />
    </article>
  );
}

/** Abstract editorial cover — one of four compositions, chosen by category. */
export function PostCover({ post, className }: { post: Post; className?: string }) {
  const seed = [...post.category].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 4;
  return (
    <div aria-hidden className={cn("relative overflow-hidden bg-bamboo-900", className)}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {seed === 0 &&
          Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={40 + i * 48} y={240 - (60 + ((i * 37) % 120))} width="26" height={60 + ((i * 37) % 120)} rx="6" fill="var(--color-bamboo-500)" opacity={0.35 + i * 0.08} />
          ))}
        {seed === 1 &&
          Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx="320" cy="200" r={40 + i * 36} fill="none" stroke="var(--color-bamboo-400)" strokeOpacity={0.6 - i * 0.08} strokeWidth="1.5" />
          ))}
        {seed === 2 &&
          Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 9 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={40 + col * 42} cy={50 + row * 38} r={(row + col) % 3 === 0 ? 6 : 3} fill="var(--color-bamboo-300)" opacity={(row + col) % 3 === 0 ? 0.9 : 0.35} />
            )),
          )}
        {seed === 3 && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <rect key={i} x={60 + i * 20} y={40 + i * 26} width="220" height="44" rx="12" fill="none" stroke="var(--color-bamboo-300)" strokeOpacity={0.3 + i * 0.15} strokeWidth="1.5" />
            ))}
            <rect x="120" y="118" width="220" height="44" rx="12" fill="var(--color-bamboo-500)" opacity="0.8" />
          </>
        )}
      </svg>
      <span className="absolute left-5 top-5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bamboo-100 ring-1 ring-inset ring-white/15">
        {post.category}
      </span>
    </div>
  );
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={cn(cardBase, "overflow-hidden", featured && "md:grid md:grid-cols-2")}>
      <PostCover post={post} className={featured ? "aspect-[16/10] md:aspect-auto md:min-h-[340px]" : "aspect-[16/10]"} />
      <div className={cn("flex flex-1 flex-col p-7", featured && "md:p-10")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.isSample && <SampleBadge />}
        </div>
        <h3 className={cn("mt-4 font-semibold tracking-[-0.02em] text-ink", featured ? "text-2xl sm:text-3xl sm:leading-tight" : "text-lg leading-snug")}>
          {post.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-bamboo-700">
          Read article
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
      <StretchedLink href={`/insights/${post.slug}`} label={`Read article: ${post.title}`} />
    </article>
  );
}
