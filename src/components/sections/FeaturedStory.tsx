"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quotes, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { FEATURED_STORY } from "@/lib/stub-data";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Featured member story — asymmetric two-column layout per CLAUDE.md §5 (no
 * centred heroes when variance > 4). Left column: big pull-quote + attribution.
 * Right column: moody interior image. CTA to /success-stories for more.
 */
export function FeaturedStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink-elevated)]/50 py-24 md:py-32"
      aria-labelledby="story-heading"
    >
      <div className="container-x">
        <div className="grid items-center gap-12 md:gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Member story</span>

            <Quotes
              size={40}
              weight="fill"
              className="mt-8 text-[var(--color-gold)]/50"
              aria-hidden
            />

            <h2
              id="story-heading"
              className="display mt-4 text-3xl md:text-4xl lg:text-[2.75rem]"
            >
              <span className="italic font-light text-[var(--color-gold)]">
                {FEATURED_STORY.headline}
              </span>
            </h2>

            <p className="mt-6 max-w-[55ch] text-[15px] leading-relaxed text-white/65 md:text-base">
              {FEATURED_STORY.body}
            </p>

            <p className="mt-4 text-sm text-white/45">
              <span className="font-medium text-white/70">{FEATURED_STORY.name}</span>
              {" "}· {FEATURED_STORY.age} · {FEATURED_STORY.duration}
            </p>

            <motion.div
              whileHover={reduceMotion ? undefined : { x: 4 }}
              transition={SPRING_SOFT}
              className="mt-8 inline-block"
            >
              <Link
                href="/success-stories"
                className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-gold)] transition-colors duration-300 hover:text-[var(--color-gold-soft)]"
              >
                Read more stories
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] max-h-[32rem] overflow-hidden rounded-3xl lg:max-h-none">
              <Image
                src={FEATURED_STORY.image}
                alt={FEATURED_STORY.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {/* Gradient scrim bottom */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
