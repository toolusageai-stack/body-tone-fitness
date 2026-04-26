/**
 * Pricing tiers — single source of truth. Owner-supplied values land here in
 * one edit; no admin UI needed because pricing changes once or twice a year
 * and always needs owner approval anyway.
 *
 * NOTE: numbers below are placeholders that match a premium gym in Hubballi.
 * Confirm with the owner before going live.
 */

export type PricingTier = {
  slug: "monthly" | "quarterly" | "annual";
  name: string;
  tagline: string;
  priceMonthly: number;       // ₹ amount the user pays per month
  priceTotal: number;         // ₹ total billed at start of period
  durationLabel: string;      // "1 month" / "3 months" / "12 months"
  savingsLabel?: string;      // "Save ₹2,500" — undefined for the cheapest tier
  popular?: boolean;          // gold-treatment, "Most popular" badge
  features: readonly string[];
};

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    slug: "monthly",
    name: "Monthly",
    tagline: "Try the floor with no long-term commitment.",
    priceMonthly: 2500,
    priceTotal: 2500,
    durationLabel: "1 month",
    features: [
      "Unlimited access to all three floors",
      "Strength, cardio, and functional zones",
      "Rooftop training area",
      "Dance fitness studio classes",
      "Locker access",
      "Body Tone member app",
    ],
  },
  {
    slug: "quarterly",
    name: "Quarterly",
    tagline: "The sweet spot — three months, real progress.",
    priceMonthly: 2167,
    priceTotal: 6500,
    durationLabel: "3 months",
    savingsLabel: "Save ₹1,000",
    popular: true,
    features: [
      "Everything in Monthly",
      "2 personal-training sessions included",
      "Free fitness assessment in week one",
      "Dedicated coach check-ins every 4 weeks",
      "Member-only programming guides",
    ],
  },
  {
    slug: "annual",
    name: "Annual",
    tagline: "The members who never miss. Best value, by a lot.",
    priceMonthly: 1500,
    priceTotal: 18000,
    durationLabel: "12 months",
    savingsLabel: "Save ₹12,000",
    features: [
      "Everything in Quarterly",
      "6 personal-training sessions included",
      "4 guest passes for friends & family",
      "Priority booking for group classes",
      "Free Body Tone branded gear",
      "Quarterly body-composition reviews",
    ],
  },
] as const;

export type PricingAddon = {
  slug: string;
  name: string;
  price: string;
  description: string;
};

export const PRICING_ADDONS: readonly PricingAddon[] = [
  {
    slug: "personal-training",
    name: "Personal training",
    price: "₹4,000 / month",
    description:
      "Twelve 1-on-1 sessions a month with a dedicated coach. Programmed for your goals, tracked weekly.",
  },
  {
    slug: "couple",
    name: "Couple membership",
    price: "15% off both plans",
    description:
      "Train together — applied to any pair of memberships purchased together.",
  },
  {
    slug: "student",
    name: "Student plan",
    price: "10% off any tier",
    description:
      "Show a valid student ID at the front desk. Available year-round, no limit on session timing.",
  },
] as const;

export type PricingFAQ = {
  question: string;
  answer: string;
};

export const PRICING_FAQS: readonly PricingFAQ[] = [
  {
    question: "Can I try the gym before I commit?",
    answer:
      "Yes. Every prospective member gets a free trial session — walk the floors, train with a coach, ask anything you want, and decide after. WhatsApp us to book one.",
  },
  {
    question: "Is there a registration or admission fee?",
    answer:
      "No. The price you see is the price you pay. No hidden registration, locker, or maintenance fees.",
  },
  {
    question: "What does \"unlimited access\" actually include?",
    answer:
      "All three floors, the rooftop, the dance studio, all equipment, and any group class. Personal training sessions are separate (included in Quarterly and Annual; available as an add-on otherwise).",
  },
  {
    question: "Can I freeze my membership if I'm travelling?",
    answer:
      "Quarterly members can freeze for up to 2 weeks. Annual members can freeze for up to 4 weeks. Speak to the front desk a week before you leave.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Monthly memberships can be cancelled at any time and you keep access through the paid period. Quarterly and Annual memberships are non-refundable but transferable to a family member.",
  },
  {
    question: "Are women's-only timings or sections available?",
    answer:
      "Yes — we have a separate ladies-friendly zone and dedicated trainer support throughout the day. Drop in and we'll show you around.",
  },
];
