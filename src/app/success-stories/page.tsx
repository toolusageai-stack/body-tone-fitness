import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getPublishedStories } from "@/lib/stories";
import { InstagramEmbed } from "@/components/stories/InstagramEmbed";
import { BUSINESS } from "@/lib/business";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Member stories — Body Tone Fitness, Hubballi",
  description:
    "Real members of Body Tone Fitness, Hubballi, in their own words — transformations, training milestones, and the sessions that got them there.",
  alternates: { canonical: "/success-stories" },
};

export default async function SuccessStoriesPage() {
  const stories = await getPublishedStories();

  return (
    <section
      className="pb-24 pt-8 md:pb-32 md:pt-10"
      aria-labelledby="stories-heading"
    >
      <div className="container-x">
        {/* Header */}
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Member stories</span>
            <h1
              id="stories-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[4rem]"
            >
              The floor did the
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                talking for them
              </span>
              .
            </h1>
          </div>
          <p className="max-w-[52ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Real members of {BUSINESS.name} — their training, their progress,
            their own words, straight from our Instagram. Tap any story to see
            the full session and read what got them there.
          </p>
        </header>

        {/* Stories grid */}
        {stories.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-dashed border-[var(--color-line-strong)] p-12 text-center md:mt-24 md:p-16">
            <h2 className="font-display text-lg font-medium text-white">
              New member stories are on the way
            </h2>
            <p className="mt-2 text-sm text-white/55">
              We&apos;re publishing fresh training reels from the floor — check
              back soon.
            </p>
          </div>
        ) : (
          <ul className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-24 md:gap-12 lg:grid-cols-3 lg:gap-14">
            {stories.map((story, i) => {
              const hasDetail = story.blocks.length > 0;
              return (
                <li
                  key={story.id}
                  className={i % 3 === 1 ? "lg:mt-20" : i % 3 === 2 ? "lg:mt-10" : ""}
                >
                  <article className="flex flex-col gap-5">
                    <InstagramEmbed
                      url={story.instagramUrl}
                      title={`${story.memberName} — Body Tone Fitness member reel`}
                    />
                    <div>
                      <h2 className="font-display text-xl font-medium tracking-tight text-white">
                        {story.memberName}
                      </h2>
                      <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-white/65">
                        {story.shortDescription}
                      </p>
                      {hasDetail ? (
                        <Link
                          href={`/success-stories/${story.slug}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-soft)]"
                        >
                          Read the full story
                          <ArrowUpRight
                            size={13}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
