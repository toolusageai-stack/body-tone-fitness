import { Fragment, type ReactNode } from "react";

/**
 * Tiny inline-markdown parser. Supports:
 *   **bold**            → <strong>
 *   *italic* or _it_    → <em>
 *   [text](url)         → <a target="_blank" rel="noopener noreferrer">
 *
 * Deliberately does NOT support: nested marks, code spans, tables, raw HTML.
 * The block-level structure (headings, lists, callouts, etc.) is owned by the
 * block schema; this only walks the text inside one block.
 *
 * URLs are validated — anything not http(s) or a relative path is rendered as
 * plain text. Prevents javascript: / data: URI injection from malicious paste.
 */

const TOKEN_RE = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]+\]\([^)\n]+\))/g;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;

function isSafeHref(href: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    const url = new URL(href);
    return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:" || url.protocol === "tel:";
  } catch {
    return false;
  }
}

export function renderInline(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(TOKEN_RE);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2 && !part.startsWith("**")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("_") && part.endsWith("_") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = LINK_RE.exec(part);
    if (link) {
      const [, label, href] = link;
      if (!isSafeHref(href)) return <Fragment key={i}>{part}</Fragment>;
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <a
          key={i}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[var(--color-gold)] underline decoration-[var(--color-gold)]/40 underline-offset-[3px] transition-colors hover:decoration-[var(--color-gold)]"
        >
          {label}
        </a>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
