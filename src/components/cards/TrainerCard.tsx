import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { Trainer } from "@/lib/trainers";

/**
 * Trainer card — image (or initials fallback), name, role, one-line tagline.
 * Entire card links to /trainers/[slug] for the full bio. The listing page
 * renders the same card with a visually distinguished treatment for the head
 * trainer via the `featured` prop.
 */
export function TrainerCard({
  trainer,
  index,
  featured = false,
}: {
  trainer: Trainer;
  index: number;
  featured?: boolean;
}) {
  const isAccent = trainer.accent === "gold" || featured;

  return (
    <Link
      href={`/trainers/${trainer.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`Read about ${trainer.name}, ${trainer.role}`}
    >
      <article
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl border transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[var(--color-gold)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[var(--color-ink)]",
          isAccent
            ? "border-[var(--color-gold)]/30 bg-gradient-to-b from-[var(--color-gold-glow)] to-transparent group-hover:border-[var(--color-gold)]/60"
            : "border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] group-hover:border-[var(--color-line-strong)]/80",
        )}
      >
        {/* Portrait block */}
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "aspect-[4/5] lg:aspect-[5/6]" : "aspect-[5/4]",
            isAccent
              ? "bg-gradient-to-br from-[var(--color-gold-deep)] via-[var(--color-gold)] to-[var(--color-gold-soft)]"
              : "bg-gradient-to-br from-[var(--color-ink-elevated)] via-[var(--color-ink)] to-[var(--color-ink-soft)]",
          )}
        >
          {trainer.photo ? (
            <Image
              src={trainer.photo}
              alt={`Portrait of ${trainer.name}, ${trainer.role} at Body Tone Fitness.`}
              fill
              sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 768px) 40vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-light leading-none tracking-[-0.06em]",
                featured ? "text-[8rem] md:text-[10rem]" : "text-[5.5rem]",
                isAccent ? "text-[var(--color-ink)]/85" : "text-[var(--color-gold)]/35",
              )}
            >
              {trainer.initials}
            </span>
          )}

          <div className="absolute left-4 top-4 font-mono text-[10px] font-medium uppercase tracking-[0.2em]">
            <span className={isAccent ? "text-[var(--color-ink)]/60" : "text-[var(--color-gold)]/70"}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {trainer.isHead ? (
            <div className="absolute right-4 top-4 rounded-full border border-[var(--color-ink)]/30 bg-[var(--color-ink)]/80 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] backdrop-blur-md">
              Head coach
            </div>
          ) : null}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col gap-1.5 p-5 md:p-6">
          <h3
            className={cn(
              "font-display font-medium tracking-tight text-white",
              featured ? "text-2xl md:text-3xl" : "text-xl",
            )}
          >
            {trainer.name}
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-gold)]/80">
            {trainer.role}
          </p>
          <p className="mt-1 text-sm leading-snug text-white/60">{trainer.tagline}</p>

          <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors duration-300 group-hover:text-[var(--color-gold-soft)]">
            Read about {trainer.name.split(" ")[0]}
            <ArrowUpRight
              size={13}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
