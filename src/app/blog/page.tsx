import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Training, recovery, nutrition, and member stories from Body Tone Fitness in Vidya Nagar, Hubballi.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="pb-24 pt-8 md:pb-32 md:pt-10" aria-labelledby="blog-heading">
      <div className="container-x">
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Field notes</span>
            <h1
              id="blog-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[4rem]"
            >
              Training, recovery,
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                and what we&rsquo;re thinking about
              </span>
              .
            </h1>
          </div>
          <p className="max-w-[52ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Notes from the floor — programming we like, nutrition we agree with,
            members we&apos;ve learned from. Written by the coaches at Body Tone
            in Vidya Nagar, Hubballi.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-[var(--color-line-strong)] p-12 text-center md:mt-24 md:p-16">
            <h2 className="font-display text-lg font-medium text-white">
              New posts are on the way
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Check back soon — we&apos;re writing the first wave now.
            </p>
          </div>
        ) : (
          <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li
                key={post.id}
                className={i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:mt-8" : ""}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 focus-visible:outline-none"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line-strong)]">
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt || post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-2xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)]" />
                  )}
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {formatDate(post.publishedAt?.toDate() ?? post.updatedAt.toDate())}
                      {post.tags[0] ? ` · ${post.tags[0]}` : ""}
                    </p>
                    <h2 className="font-display text-xl font-medium tracking-tight text-white transition group-hover:text-[var(--color-gold)]">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="max-w-[45ch] text-sm leading-relaxed text-white/60">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors group-hover:text-[var(--color-gold-soft)]">
                      Read post
                      <ArrowUpRight
                        size={13}
                        weight="bold"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
