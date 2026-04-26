"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING_SOFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Photo = {
  src: StaticImageData | string;
  alt: string;
  caption?: string;
  tag?: string;
  /**
   * Force a specific aspect ratio. When omitted the image renders at its
   * intrinsic ratio — used for the masonry sections so portrait, landscape,
   * and square photos arrange themselves naturally.
   */
  span?: "tall" | "wide" | "square";
};

const SPAN_CLASSES: Record<NonNullable<Photo["span"]>, string> = {
  tall: "aspect-[3/4] md:aspect-[4/5]",
  wide: "aspect-[16/10] md:aspect-[16/9]",
  square: "aspect-square",
};

export function PhotoTile({
  photo,
  index,
  priority = false,
  className,
}: {
  photo: Photo;
  index: number;
  priority?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isFixedSpan = photo.span !== undefined;

  // Common animation wrapper.
  const motionProps = {
    initial: reduce ? false : ({ opacity: 0, y: 24 } as const),
    whileInView: reduce ? undefined : ({ opacity: 1, y: 0 } as const),
    viewport: { once: true, margin: "-40px" } as const,
    transition: { ...SPRING_SOFT, delay: 0.04 * (index % 6) },
  };

  if (!isFixedSpan && typeof photo.src !== "string") {
    // Natural-aspect masonry tile — width/height come from the static import,
    // so the figure shrinks/expands to the photo's real proportions.
    return (
      <motion.figure
        {...motionProps}
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl border border-[var(--color-line)]",
          className,
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <Overlay photo={photo} />
      </motion.figure>
    );
  }

  // Fixed aspect-ratio tile (used by the hand-curated hero mosaic).
  const span = photo.span ?? "square";
  return (
    <motion.figure
      {...motionProps}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--color-line)]",
        SPAN_CLASSES[span],
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder={typeof photo.src === "string" ? "empty" : "blur"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <Overlay photo={photo} />
    </motion.figure>
  );
}

function Overlay({ photo }: { photo: Photo }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      {photo.tag ? (
        <span className="absolute left-4 top-4 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/70 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-[var(--color-gold)] backdrop-blur-md">
          {photo.tag}
        </span>
      ) : null}
      {photo.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-5 text-sm leading-snug text-white/85 transition-transform duration-500 group-hover:translate-y-0 md:p-6">
          {photo.caption}
        </figcaption>
      ) : null}
    </>
  );
}
