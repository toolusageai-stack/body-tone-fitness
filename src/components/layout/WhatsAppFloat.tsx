"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappUrl } from "@/lib/business";
import { SPRING_FLOAT } from "@/lib/motion";

/**
 * Floating WhatsApp button — anchored bottom-right above the iOS safe area.
 * Opens WhatsApp with the prefilled trial-enquiry message from BUSINESS config.
 * Mobile-critical conversion surface for an Indian local business.
 */
export function WhatsAppFloat() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Body Tone Fitness on WhatsApp"
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
      transition={{ ...SPRING_FLOAT, delay: 0.6 }}
      whileHover={reduceMotion ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className="fixed right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] ring-1 ring-white/30 transition-colors hover:bg-[#1ebe5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)]"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <WhatsappLogo size={28} weight="fill" aria-hidden="true" />
      <span className="sr-only">WhatsApp Body Tone Fitness</span>
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#25D366]/60 motion-safe:animate-ping"
          style={{ animationDuration: "2.4s" }}
        />
      )}
    </motion.a>
  );
}
