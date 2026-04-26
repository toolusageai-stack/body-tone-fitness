import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { REVIEWS } from "@/lib/stub-data";
import { BUSINESS } from "@/lib/business";

/**
 * Real Reviews — a sample of verified Google reviews on the home page with a
 * single outbound link to the full Google Business Profile reviews page. We do
 * not host a separate /reviews route; Google is the canonical source.
 */
export function ReviewsWall() {
  const displayed = REVIEWS.slice(0, 4);
  const reviewsHref = BUSINESS.googleReviewsUrl || "#";
  const hasUrl = Boolean(BUSINESS.googleReviewsUrl);

  return (
    <section
      className="border-y border-[var(--color-line)] bg-[var(--color-ink-elevated)]/40 py-24 md:py-32"
      aria-labelledby="reviews-heading"
    >
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Real reviews</span>
            <h2
              id="reviews-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              Don&rsquo;t take our word.
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                Take theirs.
              </span>
            </h2>
          </div>
          <p className="max-w-[48ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Verbatim from Google. No edits, no cherry-picking. These are the
            people who train here every day.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {displayed.map((review, i) => (
            <div key={review.slug} className={i % 2 === 1 ? "md:mt-12" : ""}>
              <ReviewCard review={review} featured={i === 0} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-16">
          <a
            href={reviewsHref}
            target={hasUrl ? "_blank" : undefined}
            rel={hasUrl ? "noopener noreferrer" : undefined}
            aria-disabled={!hasUrl}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/50 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-glow)]"
          >
            Read all reviews on Google
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
