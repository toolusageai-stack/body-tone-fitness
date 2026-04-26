import type { Transition } from "framer-motion";

/**
 * Shared Framer Motion spring presets.
 *
 * Centralising transitions keeps motion consistent across the site and lets
 * framer-motion de-duplicate config objects so these components can live in
 * the same bundle without each re-declaring its own curve.
 *
 * Anchors to CLAUDE.md §7 (spring defaults, no linear easing).
 */

/** Soft, forgiving spring — for micro-CTA hovers, arrow nudges, x/y shifts. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/** Snappy spring — for pill / button press feedback (primary CTAs). */
export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 24,
};

/** Float-in spring — for mount entrances (floating CTAs, modals, toasts). */
export const SPRING_FLOAT: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 18,
};

/**
 * Shared cubic-bezier easings.
 *
 * Framer Motion's `ease` field expects either a preset string ("easeOut" etc),
 * a function, or a 4-tuple `[x1, y1, x2, y2]`. CSS expects a `cubic-bezier(...)`
 * string. We export both shapes from the same constant so the Bezier curve
 * stays in one place.
 */
const OUT_SOFT_POINTS = [0.16, 1, 0.3, 1] as const;
const IN_OUT_SOFT_POINTS = [0.65, 0, 0.35, 1] as const;

/** CSS string form — for `style={{ transition: ... }}` / Tailwind arbitrary values. */
export const EASE_OUT_SOFT_CSS = `cubic-bezier(${OUT_SOFT_POINTS.join(", ")})`;
export const EASE_IN_OUT_SOFT_CSS = `cubic-bezier(${IN_OUT_SOFT_POINTS.join(", ")})`;

/** Tuple form — for Framer Motion `transition={{ ease: ... }}`. */
export const EASE_OUT_SOFT: [number, number, number, number] = [...OUT_SOFT_POINTS];
export const EASE_IN_OUT_SOFT: [number, number, number, number] = [...IN_OUT_SOFT_POINTS];
