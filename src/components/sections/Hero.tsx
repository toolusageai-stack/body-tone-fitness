import Image from "next/image";
import { MapPin, Star } from "@phosphor-icons/react/dist/ssr";
import { LogoCTA } from "@/components/layout/LogoCTA";
import { whatsappUrl } from "@/lib/business";
import {
  TypewriterHeadline,
  type HeadlineSegment,
} from "@/components/sections/TypewriterHeadline";

const HERO_HEADLINE: readonly HeadlineSegment[] = [
  { kind: "text", value: "Three floors of" },
  { kind: "break" },
  {
    kind: "text",
    value: "strength",
    className: "italic font-light text-[var(--color-gold)]",
  },
  { kind: "text", value: ", sweat, and" },
  { kind: "break" },
  { kind: "text", value: "stories worth telling." },
];

/**
 * Hero — split-screen layout (text left, hero photo right) per CLAUDE.md §5
 * which bans centered heroes at variance > 4. Mobile collapses to single column,
 * image follows the text. The headline uses inline-image typography permitted by
 * CLAUDE.md §9 — but kept restrained so text never overlaps the image.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Subtle gold ambient glow on the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 -z-10 size-[40rem] -translate-y-1/2 rounded-full bg-[var(--color-gold)]/8 blur-3xl"
      />

      <div className="container-x grid gap-12 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-20">
        {/* Left: text */}
        <div>
          <span className="eyebrow">
            <MapPin size={12} weight="fill" aria-hidden="true" />
            Vidya Nagar · Hubballi
          </span>

          <TypewriterHeadline
            segments={HERO_HEADLINE}
            className="display mt-6 text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
          />

          <p className="mt-7 max-w-[42ch] text-[15px] leading-relaxed text-white/65 md:text-base">
            Body Tone Fitness is the gym Hubballi has been waiting for — modern equipment, dedicated
            coaches, a dance studio, and a rooftop where the best sessions happen at golden hour.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <LogoCTA
              href={whatsappUrl()}
              label="Start a free trial"
              size="lg"
              external
            />

            <div className="flex items-center gap-3 text-xs text-white/55">
              <div className="flex items-center gap-0.5 text-[var(--color-gold)]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} weight="fill" />
                ))}
              </div>
              <span>
                Rated 5.0 by members
                <span className="mx-1.5 text-white/25">·</span>
                Open 7 days
              </span>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-12 grid max-w-md grid-cols-3 divide-x divide-[var(--color-line)] border-y border-[var(--color-line)] py-5">
            {[
              { value: "3", label: "Floors" },
              { value: "5+", label: "Years" },
              { value: "30+", label: "Machines" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center first:pl-0">
                <span className="font-display text-2xl font-medium text-white md:text-[1.75rem]">
                  {item.value}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: hero photo with offset gold frame */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[var(--color-line-strong)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/gym/Image3.webp"
              alt="The signature hexagonal LED ceiling lighting and wood-grain training floor at Body Tone Fitness Hubballi, with members training on machines in the background."
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            {/* Soft gradient for legibility of any overlaid text/badge */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[var(--color-ink)]/60 via-transparent to-transparent"
            />

            {/* Floating badge — bottom-left over image, anchored to brand */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/70 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="font-display text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
                  Now training
                </p>
                <p className="mt-0.5 text-sm text-white">All three floors · Studio · Rooftop</p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-gold)]/15 text-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/40">
                <span className="block size-2 rounded-full bg-[var(--color-gold)]" />
              </span>
            </div>
          </div>

          {/* Decorative offset card behind */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-[2rem] border border-[var(--color-gold)]/20 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
