"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowUpRight } from "@phosphor-icons/react";
import { PRICING_TIERS, type PricingTier } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/business";
import { cn } from "@/lib/utils";
import { SPRING_SOFT } from "@/lib/motion";

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

function tierCtaUrl(tier: PricingTier): string {
  return whatsappUrl(
    `Hi Body Tone Fitness, I'd like to start the ${tier.name} plan (₹${formatINR(tier.priceTotal)} for ${tier.durationLabel}). Can we set up a free trial first?`,
  );
}

export function PricingTiers() {
  const reduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-7">
      {PRICING_TIERS.map((tier, i) => (
        <motion.article
          key={tier.slug}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...SPRING_SOFT, delay: 0.06 * i }}
          className={cn(
            "group relative flex flex-col overflow-hidden rounded-3xl border p-7 md:p-8 lg:p-9",
            tier.popular
              ? "border-[var(--color-gold)]/45 bg-gradient-to-b from-[var(--color-gold-glow)] via-[var(--color-ink-elevated)] to-[var(--color-ink)] lg:scale-[1.03]"
              : "border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)]",
          )}
        >
          {/* Decorative gold orb on the popular card */}
          {tier.popular ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-[var(--color-gold)]/15 blur-3xl"
            />
          ) : null}

          {tier.popular ? (
            <span className="absolute right-6 top-6 rounded-full border border-[var(--color-gold)]/60 bg-[var(--color-ink)]/70 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] backdrop-blur-md">
              Most popular
            </span>
          ) : null}

          <div className="relative">
            <p
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.22em]",
                tier.popular ? "text-[var(--color-gold)]" : "text-white/45",
              )}
            >
              {tier.durationLabel}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
              {tier.name}
            </h2>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/65">
              {tier.tagline}
            </p>
          </div>

          <div className="relative mt-8 flex items-baseline gap-2">
            <span className="font-display text-5xl font-medium tracking-tighter text-white md:text-[3.5rem]">
              ₹{formatINR(tier.priceMonthly)}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              / month
            </span>
          </div>
          <p className="mt-2 text-xs text-white/50">
            Billed ₹{formatINR(tier.priceTotal)} for {tier.durationLabel}
            {tier.savingsLabel ? (
              <>
                <span className="mx-2 text-white/25">·</span>
                <span className="text-[var(--color-gold)]">{tier.savingsLabel}</span>
              </>
            ) : null}
          </p>

          <ul className="relative mt-8 flex flex-col gap-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-[13.5px] leading-snug text-white/80">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                    tier.popular
                      ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                      : "bg-[var(--color-gold-glow)] text-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/30",
                  )}
                >
                  <Check size={11} weight="bold" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-10 flex flex-col gap-3 border-t border-[var(--color-line)] pt-7">
            <a
              href={tierCtaUrl(tier)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group/cta inline-flex h-12 items-center justify-center gap-2 rounded-full text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                tier.popular
                  ? "bg-[var(--color-gold)] text-[var(--color-ink)] hover:bg-[var(--color-gold-soft)]"
                  : "border border-[var(--color-gold)]/50 text-[var(--color-gold)] hover:bg-[var(--color-gold-glow)] hover:border-[var(--color-gold)]",
              )}
            >
              Start {tier.name.toLowerCase()}
              <ArrowUpRight
                size={14}
                weight="bold"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
            <span className="text-center text-[11px] text-white/40">
              First session is free — no card needed.
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
