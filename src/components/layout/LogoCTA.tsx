"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SPRING_SNAPPY } from "@/lib/motion";

type LogoCTAProps = {
  href: string;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
  external?: boolean;
};

/**
 * The brand CTA. The user asked for the primary CTA to "look like the logo" —
 * implementation: a pill with the BTF monogram in a circular gold badge on the
 * left (echoing the logo's circular shield), the action label, and an arrow.
 *
 * Used in: hero, header, final CTA section, and anywhere a primary action is
 * needed. Always renders the same brand mark so the gold-monogram-pill becomes
 * the visual fingerprint of the site.
 */
export function LogoCTA({
  href,
  label,
  size = "lg",
  variant = "solid",
  className,
  external = false,
}: LogoCTAProps) {
  const reduceMotion = useReducedMotion();

  const sizes = {
    sm: {
      pill: "h-10 gap-2 pl-1 pr-3.5 text-[10px]",
      monogram: "size-8 text-[9px]",
      icon: 12,
    },
    md: {
      pill: "h-12 gap-3 pl-1 pr-5 text-[11px]",
      monogram: "size-10 text-[10px]",
      icon: 14,
    },
    lg: {
      pill: "h-14 gap-3 pl-1.5 pr-6 text-xs",
      monogram: "size-11 text-[11px]",
      icon: 15,
    },
  } as const;

  const s = sizes[size];

  const isSolid = variant === "solid";

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={SPRING_SNAPPY}
      className={cn("inline-block", className)}
    >
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cn(
          "group relative inline-flex items-center rounded-full font-medium uppercase tracking-[0.2em] transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]",
          s.pill,
          isSolid
            ? "bg-[var(--color-gold)] text-[var(--color-ink)] shadow-[0_10px_30px_-12px_rgba(201,169,97,0.55),inset_0_1px_0_rgba(255,255,255,0.4)] hover:bg-[var(--color-gold-soft)]"
            : "border border-[var(--color-gold)]/60 bg-transparent text-[var(--color-gold)] shadow-[inset_0_1px_0_rgba(201,169,97,0.18)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-glow)]"
        )}
      >
        {/* The monogram badge — directly references the logo's circular shield */}
        <span
          className={cn(
            "relative grid place-items-center rounded-full font-display tracking-[0.05em] transition-colors duration-300",
            s.monogram,
            isSolid
              ? "bg-[var(--color-ink)] text-[var(--color-gold)] ring-1 ring-[var(--color-ink)]"
              : "border border-[var(--color-gold)]/70 bg-[var(--color-ink)] text-[var(--color-gold)]"
          )}
          aria-hidden="true"
        >
          <span className="font-semibold">BTF</span>
          {/* Inner highlight ring — the soft-skill double-bezel pattern */}
          <span className="pointer-events-none absolute inset-[3px] rounded-full ring-1 ring-[var(--color-gold)]/20" />
        </span>

        <span className="leading-none">{label}</span>

        <ArrowUpRight
          size={s.icon}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </motion.div>
  );
}
