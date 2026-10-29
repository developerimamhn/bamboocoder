"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/content/types";
import { ProductCard } from "./cards";
import { cn } from "@/lib/utils";

/** Category filter + search. Search appears once the catalog grows. */
export function ProductExplorer({ products, categories }: { products: Product[]; categories: string[] }) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const showSearch = products.length > 6;
  const showFilters = categories.length > 1;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || [p.name, p.tagline, p.category, ...p.highlights].some((v) => v.toLowerCase().includes(q))),
    );
  }, [products, category, query]);

  if (products.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-line-strong bg-surface p-12 text-center">
        <p className="text-lg font-semibold text-ink">Products are on the way.</p>
        <p className="mt-2 text-muted">We&apos;re preparing our product catalog. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {(showFilters || showSearch) && (
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {showFilters && (
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "h-9 rounded-full px-4 text-sm font-medium transition-colors",
                    category === c ? "bg-ink text-white" : "border border-line-strong bg-surface text-ink-soft hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {showSearch && (
            <label className="relative block sm:w-72">
              <span className="sr-only">Search products</span>
              <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="h-10 w-full rounded-full border border-line-strong bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-subtle focus:border-bamboo-500 focus:outline-none focus:ring-4 focus:ring-bamboo-100"
              />
            </label>
          )}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "product" : "products"} shown
      </p>

      {visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-dashed border-line-strong bg-surface p-12 text-center">
          <p className="font-semibold text-ink">No products match your filters.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="mt-3 text-sm font-medium text-bamboo-700 hover:text-bamboo-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
