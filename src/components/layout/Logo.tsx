import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  className?: string;
  withWordmark?: boolean;
  href?: string;
};

/**
 * Renders the brand mark — used in the header, footer, and a couple of
 * decorative spots. The PNG is heavy (798KB source) but next/image will
 * resize and serve it as optimized AVIF/WebP at the requested size.
 */
export function Logo({ size = 48, className, withWordmark = false, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className="relative inline-block shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--color-gold)]/35"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Body Tone Fitness logo"
          fill
          sizes={`${size}px`}
          className="object-cover"
          priority={size >= 64}
        />
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="whitespace-nowrap font-display text-sm font-semibold tracking-[0.14em] text-[var(--color-gold)]">
            BODY TONE FITNESS
          </span>
          <span className="mt-1 font-display text-[10px] font-medium uppercase tracking-[0.32em] text-white/60">
            Hubballi
          </span>
        </span>
      )}
    </span>
  );

  return href ? (
    <Link href={href} aria-label="Body Tone Fitness — home" className="group">
      {content}
    </Link>
  ) : (
    content
  );
}
