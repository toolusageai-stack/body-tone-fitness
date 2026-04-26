import { HOME_STATS } from "@/lib/stub-data";

/**
 * Stats strip — divider-based, not card-based, per CLAUDE.md §5 which forbids
 * generic card containers at high density. Numbers in the display font, labels
 * in tracked-out micro caps. Lives between Hero and Differentiators.
 */
export function StatsStrip() {
  return (
    <section aria-label="Body Tone Fitness at a glance" className="border-y border-[var(--color-line)] bg-[var(--color-ink-elevated)]/40">
      <div className="container-x grid grid-cols-2 divide-[var(--color-line)] md:grid-cols-4 md:divide-x">
        {HOME_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 px-2 py-10 md:px-8 md:py-14 ${
              i < 2 ? "border-b border-[var(--color-line)] md:border-b-0" : ""
            } ${i % 2 === 1 ? "border-l border-[var(--color-line)] md:border-l-0" : ""}`}
          >
            <span className="font-display text-4xl font-light leading-none tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
              {stat.value}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
              {stat.label}
            </span>
            {stat.hint && (
              <span className="mt-1 text-xs leading-relaxed text-white/45">{stat.hint}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
