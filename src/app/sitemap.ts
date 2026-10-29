import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { products } from "@/content/products";
import { caseStudies } from "@/content/case-studies";
import { posts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const staticPages = ["", "/services", "/products", "/work", "/about", "/insights", "/contact", "/privacy", "/terms"];

  return [
    ...staticPages.map((p) => ({ url: url(p || "/"), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    // Sample content is excluded from search engines until replaced.
    ...products.filter((p) => !p.isSample).map((p) => ({ url: url(`/products/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...caseStudies.filter((c) => !c.isSample).map((c) => ({ url: url(`/work/${c.slug}`), changeFrequency: "yearly" as const, priority: 0.6 })),
    ...posts.filter((p) => !p.isSample).map((p) => ({ url: url(`/insights/${p.slug}`), lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
