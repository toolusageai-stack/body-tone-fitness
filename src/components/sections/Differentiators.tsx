import Image from "next/image";
import {
  Barbell,
  Crown,
  MusicNotes,
  Sun,
  PersonSimpleRun,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { DIFFERENTIATORS } from "@/lib/stub-data";

/**
 * "Why Body Tone" bento — visual proof of the differentiators we extracted from
 * Google reviews (3 floors, rooftop, dance studio, modern equipment, coaching,
 * member app). Bento layout per CLAUDE.md §5 — no 3-equal-card row.
 *
 * Mobile collapses to a single column stack; desktop is a 12-col asymmetric grid.
 */

const ICONS: Record<string, ComponentType<{ size?: number; weight?: "fill" | "regular" | "bold"; className?: string; "aria-hidden"?: boolean }>> = {
  Barbell,
  Crown,
  MusicNotes,
  Sun,
  PersonSimpleRun,
};

const SPAN_CLASSES: Record<"hero" | "wide" | "tall" | "square", string> = {
  hero: "lg:col-span-8",
  wide: "lg:col-span-7",
  tall: "lg:col-span-5 lg:row-span-2",
  square: "lg:col-span-4",
};

export function Differentiators() {
  return (
    <section className="relative py-24 md:py-32" aria-labelledby="why-heading">
      <div className="container-x">
        {/* Section heading — left aligned, asymmetric per the variance rule */}
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Why Body Tone</span>
            <h2
              id="why-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              Built around the
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                things you'll actually notice
              </span>
              .
            </h2>
          </div>
          <p className="max-w-[48ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Three floors of training, a rooftop you'll want to be on, a real dance studio, and
            coaches who know your name by week two. Body Tone is the gym Hubballi was missing —
            and the one you'll keep showing up for.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:mt-20 lg:grid-cols-12 lg:auto-rows-[18rem]">
          {DIFFERENTIATORS.map((item, i) => {
            const Icon = ICONS[item.iconName];
            const isFeatured = i === 0;
            return (
              <article
                key={item.slug}
                className={`group relative overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] transition-colors duration-300 hover:border-[var(--color-gold)]/40 ${SPAN_CLASSES[item.span]} ${item.span === "tall" ? "min-h-[28rem]" : "min-h-[22rem]"}`}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Gradient for legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/50 to-transparent"
                />

                {/* Icon chip top-right */}
                <div className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/70 text-[var(--color-gold)] backdrop-blur-md">
                  {Icon && <Icon size={18} weight="regular" aria-hidden={true} />}
                </div>

                {/* Caption bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3
                    className={`font-display font-medium tracking-tight text-white ${
                      isFeatured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-white/70">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
