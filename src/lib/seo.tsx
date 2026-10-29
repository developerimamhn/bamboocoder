import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMeta {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  /** Keep sample-only pages out of search results. */
  noIndex?: boolean;
}

export function createMetadata({ title, description = site.description, path, type = "website", noIndex }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Software Development & Products`;

  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; `<` is escaped to prevent breaking out of the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
