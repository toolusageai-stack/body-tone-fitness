"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { PRICING_FAQS } from "@/lib/pricing";
import { EASE_OUT_SOFT } from "@/lib/motion";

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <ul className="flex flex-col">
      {PRICING_FAQS.map((faq, i) => {
        const expanded = open === i;
        return (
          <li key={faq.question} className="border-b border-[var(--color-line)] last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--color-gold)] md:py-6"
            >
              <span className="font-display text-lg font-medium tracking-tight text-white md:text-xl">
                {faq.question}
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ rotate: expanded ? 45 : 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT_SOFT }}
                className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-gold)]"
              >
                <Plus size={14} weight="bold" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key="content"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT_SOFT }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-6 pr-12 text-[15px] leading-relaxed text-white/65 md:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
