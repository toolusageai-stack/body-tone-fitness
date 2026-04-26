import { LogoCTA } from "@/components/layout/LogoCTA";
import { BUSINESS, whatsappUrl } from "@/lib/business";

/**
 * Final CTA — full-bleed conversion-focused closer. Left-aligned per CLAUDE.md
 * §9 (no centred heroes at variance > 4). Two actions: primary LogoCTA to
 * WhatsApp (the real conversion path for a Hubballi gym), secondary tel link.
 */
export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-ink)]"
      aria-labelledby="final-cta-heading"
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[28rem] rounded-full bg-[var(--color-gold)]/6 blur-[120px]"
      />

      <div className="container-x relative py-28 md:py-36 lg:py-44">
        <div className="max-w-2xl">
          <span className="eyebrow">Start today</span>

          <h2
            id="final-cta-heading"
            className="display mt-6 text-4xl md:text-5xl lg:text-[3.75rem]"
          >
            Your first session is
            <br />
            <span className="italic font-light text-[var(--color-gold)]">
              on us
            </span>
            .
          </h2>

          <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-white/60 md:text-base">
            Walk in, look around, train with a coach, and decide after.
            No commitment, no hard sell — just the floor and someone who knows
            what they&rsquo;re doing.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <LogoCTA
              href={whatsappUrl()}
              label="Book a free trial"
              size="lg"
              variant="solid"
              external
            />

            <span className="text-sm font-medium text-white/55">
              or call{" "}
              <span className="text-white/75">{BUSINESS.phone.display}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
