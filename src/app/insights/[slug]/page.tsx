import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard, PostCover } from "@/components/sections/cards";
import { CtaSection } from "@/components/sections/blocks";
import { Container, SampleBadge, Section } from "@/components/ui/layout";
import { formatDate, getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { createMetadata, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createMetadata({ title: post.title, description: post.excerpt, path: `/insights/${slug}`, type: "article", noIndex: post.isSample });
}

export default async function PostPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <Container size="sm" className="pb-10 pt-10 sm:pt-14">
          <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink">
            <ArrowLeft aria-hidden className="size-4" /> All insights
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-subtle">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-bamboo-700">{post.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
            {post.isSample && <SampleBadge />}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{post.excerpt}</p>
          <p className="mt-8 text-sm text-ink-soft">By {post.author}</p>
        </Container>
        <Container size="md">
          <PostCover post={post} className="aspect-[21/9] rounded-[1.5rem]" />
        </Container>
        <Container size="xs" className="py-14 sm:py-20">
          <div className="prose-bc">
            {post.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <Section tone="surface" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-10 text-3xl font-semibold tracking-[-0.03em] text-ink">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaSection />

      {!post.isSample && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: site.name },
            publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/icon.svg` } },
            mainEntityOfPage: `${site.url}/insights/${post.slug}`,
          }}
        />
      )}
    </>
  );
}
