"use client";

import { useState } from "react";
import type { Post } from "@/content/types";
import { PostCard } from "./cards";
import { cn } from "@/lib/utils";

export function InsightsExplorer({ posts, categories }: { posts: Post[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const visible = category === "All" ? posts : posts.filter((p) => p.category === category);
  const [featured, ...rest] = visible;

  if (posts.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-line-strong bg-surface p-12 text-center">
        <p className="text-lg font-semibold text-ink">No articles yet.</p>
        <p className="mt-2 text-muted">Our first insights are being written. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      {categories.length > 1 && (
        <div role="group" aria-label="Filter by topic" className="mb-10 flex flex-wrap gap-2">
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
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "article" : "articles"} shown
      </p>
      <div className="flex flex-col gap-5">
        {featured && <PostCard post={featured} featured />}
        {rest.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
