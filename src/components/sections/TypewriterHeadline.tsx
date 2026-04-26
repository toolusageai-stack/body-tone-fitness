"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EASE_OUT_SOFT } from "@/lib/motion";

/**
 * Letter-by-letter reveal for hero headlines. Uses a single Framer Motion
 * stagger via CSS transforms (opacity + translateY) — cheap on the GPU and
 * runs once on mount.
 *
 * Each WORD is wrapped in `inline-block; white-space: nowrap` so the browser
 * never breaks a word in the middle. Characters inside a word are individual
 * motion spans. Spaces between words render as normal text so lines wrap at
 * word boundaries the way they should.
 *
 * Performance:
 * - One DOM node per character (text content is short — 60-90 chars total)
 * - transform/opacity only (no layout thrash, per CLAUDE.md §7)
 * - Per-character animation runs ~600ms total then stops; no perpetual work
 * - Respects `prefers-reduced-motion` — skips entirely
 *
 * Accessibility:
 * - The visible characters are aria-hidden; a single screen-reader-only copy
 *   of the full text is announced as one phrase via aria-label.
 *
 * Input shape: an array of segments. Each segment is either plain text or
 * styled (e.g. the gold italic word). A `break: true` segment forces a line
 * break in the layout but doesn't add a character.
 */

export type HeadlineSegment =
  | { kind: "text"; value: string; className?: string }
  | { kind: "break" };

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.1,
    },
  },
};

const CHAR_VARIANTS = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: EASE_OUT_SOFT,
    },
  },
};

// Splits "stories worth telling" → ["stories", " ", "worth", " ", "telling"]
function tokenize(value: string): string[] {
  return value.split(/(\s+)/).filter((p) => p.length > 0);
}

export function TypewriterHeadline({
  segments,
  className,
  as: Tag = "h1",
}: {
  segments: readonly HeadlineSegment[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const fullText = segments
    .map((s) => (s.kind === "text" ? s.value : " "))
    .join("");

  // Reduced motion / no-JS fallback — render plain text.
  if (reduce) {
    return (
      <Tag className={className}>
        {segments.map((seg, i) => {
          if (seg.kind === "break") return <br key={i} />;
          return seg.className ? (
            <span key={i} className={seg.className}>
              {seg.value}
            </span>
          ) : (
            <Fragment key={i}>{seg.value}</Fragment>
          );
        })}
      </Tag>
    );
  }

  const MotionTag = motion[Tag] as typeof motion.h1;

  return (
    <MotionTag
      className={className}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      aria-label={fullText}
    >
      {segments.map((seg, i) => {
        if (seg.kind === "break") return <br key={`br-${i}`} aria-hidden="true" />;

        const tokens = tokenize(seg.value);

        return (
          <Fragment key={i}>
            {tokens.map((token, t) => {
              // Whitespace token — render as a plain space so the line can
              // wrap here. Not animated, not wrapped in inline-block.
              if (/^\s+$/.test(token)) {
                return <Fragment key={`${i}-${t}`}>{token}</Fragment>;
              }

              // Word token — keep characters together so the browser never
              // breaks inside it.
              const chars = Array.from(token);
              return (
                <span
                  key={`${i}-${t}`}
                  className={seg.className}
                  aria-hidden="true"
                  style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                  {chars.map((ch, j) => (
                    <motion.span
                      key={j}
                      variants={CHAR_VARIANTS}
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
