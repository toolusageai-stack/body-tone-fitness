import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getPostBySlug, getPublishedSlugs } from "@/lib/posts";
import { StoryBlocks } from "@/components/stories/StoryBlocks";
import { BUSINESS } from "@/lib/business";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.coverAlt || post.title,
            },
          ]
        : undefined,
      publishedTime: post.publishedAt?.toDate().toISOString(),
      modifiedTime: post.updatedAt.toDate().toISOString(),
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const published = post.publishedAt?.toDate() ?? post.updatedAt.toDate();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || undefined,
    datePublished: published.toISOString(),
    dateModified: post.updatedAt.toDate().toISOString(),
    author: {
      "@type": "Person",
      name: post.author || BUSINESS.name,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BUSINESS.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <article className="pb-24 pt-8 md:pb-32 md:pt-10">
      {/* Blog body uses a wider container than `container-x` so editorial
          imagery has room to breathe on large displays. */}
      <div className="mx-auto w-full max-w-[110rem] px-5 md:px-10 lg:px-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/55 transition hover:text-[var(--color-gold)]"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          All posts
        </Link>

        <header className="mt-6 max-w-4xl md:mt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
            {formatDate(published)}
            {post.author ? ` · ${post.author}` : ""}
          </p>
          <h1 className="display mt-4 text-3xl md:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-6 max-w-[68ch] text-[17px] leading-relaxed text-white/70 md:text-lg">
              {post.excerpt}
            </p>
          ) : null}
          {post.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] px-3 py-1 text-[11px] tracking-wide text-white/70"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {post.coverImage ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--color-line-strong)]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mt-12 md:mt-16">
          <StoryBlocks blocks={post.blocks} />
          <div aria-hidden="true" className="clear-both" />
        </div>

        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-8 text-xs text-white/50">
          <span>Updated {formatDate(post.updatedAt.toDate())}</span>
          <Link
            href="/blog"
            className="font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-gold-soft)]"
          >
            Read more posts →
          </Link>
        </footer>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </article>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
