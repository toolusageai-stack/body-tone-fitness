import { Star, GoogleLogo, Quotes } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/stub-data";

/**
 * Review card — verbatim Google review with star rating and verified-source badge.
 * Used on the homepage reviews wall. Card heights are intentionally
 * variable so the masonry layout has organic rhythm.
 */
export function ReviewCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-5 rounded-2xl border p-6 transition-colors duration-300",
        featured
          ? "border-[var(--color-gold)]/35 bg-[var(--color-gold-glow)] hover:border-[var(--color-gold)]/60"
          : "border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)]/60 hover:border-[var(--color-line-strong)]/80"
      )}
    >
      <Quotes
        size={28}
        weight="fill"
        aria-hidden="true"
        className={cn(
          "shrink-0",
          featured ? "text-[var(--color-gold)]" : "text-[var(--color-gold)]/55"
        )}
      />

      <p
        className={cn(
          "flex-1 text-[15px] leading-relaxed",
          featured ? "text-white/90" : "text-white/75"
        )}
      >
        {review.body}
      </p>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--color-line)] pt-4">
        <p className="text-sm font-medium text-white">{review.name}</p>

        <div className="flex flex-col items-end gap-1.5">
          <div
            className="flex items-center gap-0.5 text-[var(--color-gold)]"
            aria-label={`Rated ${review.rating} out of 5`}
          >
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={13} weight="fill" aria-hidden="true" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
            <GoogleLogo size={11} weight="bold" aria-hidden="true" />
            Verified
          </span>
        </div>
      </div>
    </article>
  );
}
