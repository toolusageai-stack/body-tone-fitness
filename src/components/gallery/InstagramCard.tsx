"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import { normalizeInstagramUrl } from "@/lib/instagram";
import { SPRING_SOFT } from "@/lib/motion";

/**
 * Decorated Instagram embed. Native IG embeds look basic; we wrap them in a
 * gold-bordered card with a top "live from Instagram" bar and a bottom open-on-IG
 * action so the embed feels like part of the brand.
 *
 * Performance:
 * - The iframe doesn't mount until the card scrolls into view (IntersectionObserver).
 *   A page with 30 IG embeds therefore loads at most a few iframes initially.
 * - `loading="lazy"` provides a second layer of native browser lazy-loading.
 * - Falls back to a link card when the URL isn't a valid IG post/reel.
 */
export function InstagramCard({
  url,
  caption,
  index,
  handle,
}: {
  url: string;
  caption?: string;
  index: number;
  handle: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const normalized = normalizeInstagramUrl(url);

  useEffect(() => {
    if (!ref.current || shouldLoad) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  if (!normalized) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="grid aspect-[9/14] place-items-center rounded-3xl border border-dashed border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] p-6 text-center text-sm text-white/60 transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
      >
        View on Instagram →
      </a>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...SPRING_SOFT, delay: 0.04 * (index % 6) }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-[var(--color-gold)]/50"
    >
      {/* Decorative gold gradient ring on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-[var(--color-gold)]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#fcb045] via-[#fd1d1d] to-[#833ab4] text-white">
            <InstagramLogo size={14} weight="bold" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-mono text-[11px] font-medium tracking-wide text-white">
              {handle}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
              From Instagram
            </span>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-[var(--color-gold)] shadow-[0_0_8px_var(--color-gold)]"
        />
      </div>

      {/* Iframe slot */}
      <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
        {shouldLoad ? (
          <iframe
            src={`${normalized}embed/`}
            title={caption || `Instagram post ${index + 1}`}
            loading="lazy"
            allow="encrypted-media; fullscreen"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#fcb045]/10 via-[#fd1d1d]/10 to-[#833ab4]/10"
          >
            <span className="grid size-12 place-items-center rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-ink)]/70 text-[var(--color-gold)] backdrop-blur-md">
              <InstagramLogo size={20} weight="fill" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        {caption ? (
          <p className="line-clamp-1 flex-1 text-xs text-white/70">{caption}</p>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Body Tone Hubli
          </span>
        )}
        <a
          href={normalized}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors hover:text-[var(--color-gold-soft)]"
        >
          Open
          <ArrowUpRight size={11} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}
