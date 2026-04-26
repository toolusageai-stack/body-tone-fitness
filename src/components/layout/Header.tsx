import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { LogoCTA } from "./LogoCTA";
import { MobileNav } from "./MobileNav";
import { BUSINESS, whatsappUrl } from "@/lib/business";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/trainers", label: "Trainers" },
  { href: "/success-stories", label: "Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
];

/**
 * Sticky top header. Logo + wordmark on the left, primary nav center (desktop),
 * tel: link + LogoCTA on the right. Mobile collapses to logo + CTA only — the
 * floating WhatsApp/Call buttons cover the secondary actions, and a future hamburger
 * will live here when the rest of the routes ship.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full">
      <div className="absolute inset-0 bg-[var(--color-ink)]/85 backdrop-blur-md" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--color-line)]" aria-hidden="true" />

      <div className="container-x relative flex h-20 items-center justify-between gap-4">
        <Logo size={48} withWordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[13px] font-medium tracking-wide text-white/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative transition-colors duration-200 hover:text-[var(--color-gold)] focus-visible:text-[var(--color-gold)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="hidden items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-4 py-2 text-[12px] font-medium tracking-wide text-white/80 xl:inline-flex"
            aria-label={`${BUSINESS.name} phone number`}
          >
            <Phone size={14} weight="fill" className="text-[var(--color-gold)]" aria-hidden="true" />
            {BUSINESS.phone.display}
          </span>

          <span className="hidden lg:inline-block">
            <LogoCTA
              href={whatsappUrl()}
              label="Free trial"
              size="md"
              external
            />
          </span>

          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}
