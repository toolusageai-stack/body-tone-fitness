import { normalizeInstagramUrl } from "@/lib/stories";

/**
 * Direct Instagram iframe embed — no third-party JS, no window pollution, SSR
 * safe. Uses the documented /embed suffix that Instagram serves for every
 * public post/reel/tv URL. Falls back to a link card when the URL can't be
 * normalised (owner pasted a profile URL by mistake, etc).
 */
export function InstagramEmbed({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const normalized = normalizeInstagramUrl(url);

  if (!normalized) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] px-5 py-8 text-center text-sm text-white/60 transition-colors hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold)]"
      >
        View on Instagram →
      </a>
    );
  }

  return (
    <div
      className={`relative aspect-[9/14] w-full overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] ${className ?? ""}`}
    >
      <iframe
        src={`${normalized}embed/`}
        title={title}
        loading="lazy"
        allow="encrypted-media; fullscreen"
        allowFullScreen
        scrolling="no"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
