import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  getStoryBySlug,
  getPublishedStorySlugs,
  getPublishedStories,
} from "@/lib/stories";
import { InstagramEmbed } from "@/components/stories/InstagramEmbed";
import { StoryBlocks } from "@/components/stories/StoryBlocks";
import { BUSINESS } from "@/lib/business";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: `${story.memberName} — Member story`,
    description: story.shortDescription,
    alternates: { canonical: `/success-stories/${story.slug}` },
    openGraph: {
      type: "article",
      title: `${story.memberName} — Body Tone Fitness member story`,
      description: story.shortDescription,
      url: `/success-stories/${story.slug}`,
      images: story.coverImage
        ? [{ url: story.coverImage, alt: story.coverAlt || story.memberName }]
        : undefined,
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const all = await getPublishedStories();
  const others = all.filter((s) => s.slug !== story.slug).slice(0, 3);
  const published = story.publishedAt?.toDate() ?? story.updatedAt.toDate();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${story.memberName} — Body Tone Fitness member story`,
    description: story.shortDescription,
    datePublished: published.toISOString(),
    dateModified: story.updatedAt.toDate().toISOString(),
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BUSINESS.url}/success-stories/${story.slug}`,
    },
  };

  return (
    <section className="pb-24 pt-8 md:pb-32 md:pt-10">
      <div className="container-x">
        <Link
          href="/success-stories"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/55 transition hover:text-[var(--color-gold)]"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          All stories
        </Link>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Instagram reel */}
          <div className="order-1 lg:sticky lg:top-24 lg:self-start">
            <InstagramEmbed
              url={story.instagramUrl}
              title={`${story.memberName} — member reel`}
            />
          </div>

          {/* Long-form body */}
          <div className="order-2">
            <span className="eyebrow">Member story</span>
            <h1 className="display mt-4 text-4xl md:text-5xl lg:text-[3.5rem]">
              {story.memberName}
            </h1>
            <p className="mt-6 max-w-[52ch] font-display text-xl font-light leading-snug tracking-tight text-[var(--color-gold)] md:text-2xl">
              {story.shortDescription}
            </p>

            {story.tags.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {story.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] px-3 py-1 text-[11px] tracking-wide text-white/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10 border-t border-[var(--color-line)] pt-10">
              <StoryBlocks blocks={story.blocks} />
            </div>
          </div>
        </div>

        {/* Other stories */}
        {others.length > 0 ? (
          <div className="mt-24 border-t border-[var(--color-line)] pt-16 md:mt-32 md:pt-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                More member stories
              </h2>
              <Link
                href="/success-stories"
                className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] sm:inline"
              >
                See all stories →
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.id}>
                  <Link
                    href={`/success-stories/${o.slug}`}
                    className="group flex flex-col gap-2 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] p-5 transition-colors hover:border-[var(--color-gold)]/50"
                  >
                    <span className="font-display text-lg font-medium tracking-tight text-white transition-colors group-hover:text-[var(--color-gold)]">
                      {o.memberName}
                    </span>
                    <span className="text-sm leading-snug text-white/60">
                      {o.shortDescription}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </section>
  );
}
