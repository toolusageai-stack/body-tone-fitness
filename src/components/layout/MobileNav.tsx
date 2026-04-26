"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { SPRING_SNAPPY, EASE_OUT_SOFT } from "@/lib/motion";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        transition={SPRING_SNAPPY}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid size-10 place-items-center rounded-full border border-[var(--color-line-strong)] text-white/80 transition-colors hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ink)] lg:hidden"
      >
        <List size={18} weight="bold" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-overlay"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_SOFT }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[var(--color-ink)]/80 backdrop-blur-sm"
            />

            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
              transition={reduceMotion ? { duration: 0.15 } : SPRING_SNAPPY}
              className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col border-l border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-5 py-5">
                <span className="inline-flex items-center gap-3">
                  <Logo size={40} href={undefined} />
                  <span className="flex flex-col leading-none">
                    <span className="whitespace-nowrap font-display text-sm font-semibold tracking-[0.14em] text-[var(--color-gold)]">
                      BODY TONE FITNESS
                    </span>
                    <span className="mt-1 font-display text-[10px] font-medium uppercase tracking-[0.32em] text-white/60">
                      Hubballi
                    </span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-9 place-items-center rounded-full border border-[var(--color-line-strong)] text-white/80 transition-colors hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
                >
                  <X size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile primary" className="flex-1 overflow-y-auto px-2 py-4">
                <ul className="flex flex-col">
                  {items.map((item, i) => {
                    const active = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg tracking-tight text-white/85 transition-colors hover:bg-[var(--color-gold-glow)] hover:text-[var(--color-gold)]"
                          aria-current={active ? "page" : undefined}
                        >
                          <span className={active ? "text-[var(--color-gold)]" : undefined}>
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] text-white/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
