import Link from "next/link";
import { InstagramLogo, MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { BUSINESS, mapsDirectionsUrl } from "@/lib/business";

/**
 * Site footer — NAP block, hours, navigation, social, legal.
 * NAP appears in full so Google can pick it up consistently with the JSON-LD
 * (CLAUDE.md §8 — NAP consistency is mandatory for local SEO).
 */
export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--color-line)] bg-[var(--color-ink-soft)]">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Logo size={56} withWordmark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              A three-floor strength and conditioning home in the heart of Vidya
              Nagar, Hubballi. Modern equipment, dedicated coaches, and a community
              that actually shows up.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Body Tone Fitness on Instagram"
                className="grid size-10 place-items-center rounded-full border border-[var(--color-line-strong)] text-white/70 transition-colors hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold)]"
              >
                <InstagramLogo size={16} weight="fill" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Visit */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Visit
            </h3>
            <address className="mt-5 space-y-3 not-italic text-sm text-white/70">
              <div className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" weight="fill" aria-hidden="true" />
                <span>{BUSINESS.address.full}</span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" weight="fill" aria-hidden="true" />
                <span>{BUSINESS.phone.display}</span>
              </div>
              <a
                href={mapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 pt-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-gold-soft)]"
              >
                Get directions →
              </a>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Hours
            </h3>
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" weight="fill" aria-hidden="true" />
                <div>
                  <div>Mon – Sat</div>
                  <div className="text-white/50">5:00 AM – 10:30 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3 pl-7">
                <div>
                  <div>Sunday</div>
                  <div className="text-white/50">7:00 AM – 12:00 PM</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-white/70">
              <li><Link href="/trainers" className="hover:text-[var(--color-gold)]">Trainers</Link></li>
              <li><Link href="/success-stories" className="hover:text-[var(--color-gold)]">Member stories</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-gold)]">Blog</Link></li>
              <li><Link href="/gallery" className="hover:text-[var(--color-gold)]">Gallery</Link></li>
              <li><Link href="/pricing" className="hover:text-[var(--color-gold)]">Pricing</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6 text-xs text-white/40">
            <li><Link href="/privacy" className="hover:text-white/70">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white/70">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
