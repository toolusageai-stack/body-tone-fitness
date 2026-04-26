"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "@phosphor-icons/react";
import { telUrl } from "@/lib/business";
import { SPRING_FLOAT } from "@/lib/motion";

/**
 * Floating call button — mobile-only (lg:hidden) since desktop visitors won't
 * tap-to-call. Sits above the WhatsApp float in the bottom-right safe area.
 * Desktop visitors get the tel: link inline in the header instead.
 */
export function CallFloat() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={telUrl()}
      aria-label="Call Body Tone Fitness on +91 86601 69891"
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
      transition={{ ...SPRING_FLOAT, delay: 0.75 }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className="fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-[var(--color-ink)] text-[var(--color-gold)] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] ring-1 ring-[var(--color-gold)]/60 transition-colors hover:bg-[var(--color-ink-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] lg:hidden"
      style={{
        bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 4.5rem)",
      }}
    >
      <Phone size={24} weight="fill" aria-hidden="true" />
      <span className="sr-only">Call Body Tone Fitness</span>
    </motion.a>
  );
}
