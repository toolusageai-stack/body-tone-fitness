/**
 * "Skip to content" link for keyboard users — required by CLAUDE.md §10.
 * Hidden by default, visible only on focus.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-50 rounded-md bg-[var(--color-gold)] px-4 py-2 text-sm font-medium text-[var(--color-ink)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 focus:ring-offset-[var(--color-ink)]"
    >
      Skip to content
    </a>
  );
}
