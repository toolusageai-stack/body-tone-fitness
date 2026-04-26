import type { Metadata } from "next";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";
import { PricingTiers } from "@/components/pricing/PricingTiers";
import { PricingFAQ } from "@/components/pricing/PricingFAQ";
import { LogoCTA } from "@/components/layout/LogoCTA";
import { PRICING_ADDONS, PRICING_FAQS } from "@/lib/pricing";
import { BUSINESS, whatsappUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: "Pricing — gym membership in Vidya Nagar, Hubballi",
  description:
    "Monthly, quarterly, and annual memberships at Body Tone Fitness — Hubballi's premium 3-floor gym. Personal training included on longer plans. Free trial first.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQS.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <section className="pb-32 pt-8 md:pb-40 md:pt-10">
      <div className="container-x">
        {/* Header */}
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Pricing</span>
            <h1 className="display mt-5 text-4xl md:text-5xl lg:text-[4rem]">
              Pick the plan that
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                matches your commitment
              </span>
              .
            </h1>
          </div>
          <p className="max-w-[52ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            One price, three floors, every coach, every class. No registration
            fee, no hidden charges, no upsells at the front desk. Walk in for a
            free trial first — decide after.
          </p>
        </header>

        {/* Tiers */}
        <div className="mt-16 md:mt-24">
          <PricingTiers />
        </div>

        {/* Trust strip */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] md:mt-20 md:grid-cols-4">
          {[
            { value: "0", label: "Hidden fees" },
            { value: "Free", label: "Trial session" },
            { value: "5", label: "Years in Hubballi" },
            { value: "7", label: "Days a week, open" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-[var(--color-ink-elevated)] px-6 py-7 md:px-8 md:py-9"
            >
              <span className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <section
          aria-labelledby="addons-heading"
          className="mt-24 md:mt-32"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-12">
            <div>
              <span className="eyebrow">
                <Sparkle size={12} weight="fill" aria-hidden="true" />
                Add-ons
              </span>
              <h2
                id="addons-heading"
                className="display mt-5 text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                Stack on what you need.
              </h2>
              <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-white/65">
                Membership covers the floors, the classes, and the equipment.
                These are for members who want a coach beside them, or want to
                bring someone with them.
              </p>
            </div>

            <ul className="flex min-w-0 flex-col divide-y divide-[var(--color-line)] overflow-hidden rounded-3xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)]">
              {PRICING_ADDONS.map((addon) => (
                <li
                  key={addon.slug}
                  className="flex flex-col gap-3 p-6 md:flex-row md:items-center md:justify-between md:gap-6 md:p-7"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-medium tracking-tight text-white md:text-xl">
                      {addon.name}
                    </h3>
                    <p className="mt-1.5 max-w-[55ch] text-sm leading-relaxed text-white/60">
                      {addon.description}
                    </p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap font-display text-base font-medium tracking-tight text-[var(--color-gold)] md:text-lg">
                    {addon.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="mt-24 md:mt-32"
        >
          <div className="grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-16">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2
                id="faq-heading"
                className="display mt-5 text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                Honest answers
                <br />
                <span className="italic font-light text-[var(--color-gold)]">
                  before you pay
                </span>
                .
              </h2>
              <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-white/65">
                Still have a question? WhatsApp us — we usually reply in
                under an hour during business hours.
              </p>
            </div>
            <div>
              <PricingFAQ />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="pricing-cta"
          className="relative mt-24 overflow-hidden rounded-[2rem] border border-[var(--color-gold)]/25 bg-gradient-to-br from-[var(--color-gold-glow)] via-[var(--color-ink-elevated)] to-[var(--color-ink)] px-7 py-14 md:mt-32 md:px-12 md:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-[24rem] rounded-full bg-[var(--color-gold)]/10 blur-[100px]"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
            <div>
              <span className="eyebrow">Start today</span>
              <h2
                id="pricing-cta"
                className="display mt-5 text-3xl md:text-4xl lg:text-[3rem]"
              >
                The first session is on us.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-white/70 md:text-base">
                Walk in, train with a coach, look around. If it&rsquo;s the
                right gym for you, pick a plan after — and not a second before.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <LogoCTA
                href={whatsappUrl()}
                label="Book a free trial"
                size="lg"
                external
              />
              <span className="text-xs text-white/55">
                or call <span className="text-white/80">{BUSINESS.phone.display}</span>
              </span>
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
