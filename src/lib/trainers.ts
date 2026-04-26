/**
 * Trainer roster — real names supplied by the owner. Bios are respectful
 * Hubballi-context placeholders until real copy + headshots arrive (client to
 * supply). Siddhanth is flagged `isHead` so the /trainers listing renders his
 * card at a larger visual weight as the founder and head of the facility.
 *
 * Listing card uses `tagline` + `bio`. Detail page uses `paragraphs[]` and
 * optional `highlights[]`. Photos are absolute paths under /images/trainers/ —
 * missing photos render the designed initials block fallback.
 */

export type Trainer = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  specialties: readonly string[];
  tagline: string;
  bio: string;
  paragraphs: readonly string[];
  highlights?: readonly string[];
  photo?: string;
  accent: "gold" | "ink";
  isHead?: boolean;
  yearsCoaching?: number;
};

export const TRAINERS: readonly Trainer[] = [
  {
    slug: "siddhanth",
    name: "Siddhanth",
    role: "Founder · Head Coach",
    initials: "SD",
    specialties: ["Strength", "Programming", "Member experience"],
    tagline: "Founder. On the floor most evenings.",
    bio: "Built Body Tone Fitness from a single floor into the three-storey training home it is today. Spends most evenings on the floor making sure every member feels seen.",
    paragraphs: [
      "Siddhanth started Body Tone Fitness in 2019 with an idea that was simple and, for Hubballi at the time, a little unusual — build a gym that treats members the way a good coach treats an athlete. Personal attention, modern equipment, and an atmosphere that doesn't apologise for being serious about the work.",
      "Five years later, what started as a single training floor is now three storeys of strength, cardio, dance, and rooftop training. The scale changed. The principle didn't. Siddhanth is still the person you'll most often see on the floor in the evenings, checking in with members, adjusting programmes, and correcting form without being asked.",
      "He heads coaching across the facility and leads the weekly team meetings where every trainer reviews their members' progress. If you train at Body Tone, there is a very good chance Siddhanth knows your goals, your last training block, and what you've been struggling with this week — even if you've never had a formal session with him.",
    ],
    highlights: [
      "Heads coaching across all three floors",
      "Founder since 2019",
      "Programmes strength blocks for long-term members",
    ],
    accent: "gold",
    isHead: true,
    yearsCoaching: 8,
  },
  {
    slug: "laveen",
    name: "Laveen",
    role: "Co-founder · Senior Coach",
    initials: "LV",
    specialties: ["Powerlifting", "Hypertrophy", "Posture coaching"],
    tagline: "Unrushed form correction that breaks plateaus.",
    bio: "Leads powerlifting and hypertrophy coaching. Known for the kind of unrushed form correction that turns a six-month plateau into a personal best.",
    paragraphs: [
      "Laveen co-founded Body Tone with Siddhanth and has spent the last five years building out the strength programme that Hubballi lifters now travel across the city for. His coaching style is quiet, patient, and unhurried — he would rather spend ten minutes on a single cue than rush you through a set that reinforces the wrong pattern.",
      "Members who have plateaued elsewhere tend to find their way to Laveen. He programmes in blocks, tracks progress in a log he actually reads back, and refuses to chase numbers at the cost of form. That philosophy is why several of the gym's long-term members credit him with their first real squat, first pull-up, first competition-prep block.",
      "Outside of coaching, Laveen oversees trainer development at Body Tone — every new coach on the floor has been taught by him first.",
    ],
    highlights: [
      "Co-founder since 2019",
      "Leads trainer development",
      "Specialises in plateau-breaking strength work",
    ],
    accent: "gold",
    yearsCoaching: 9,
  },
  {
    slug: "prajwal",
    name: "Prajwal",
    role: "Strength Coach",
    initials: "PR",
    specialties: ["Beginner onboarding", "Fat loss", "Functional strength"],
    tagline: "The coach members ask for by name.",
    bio: "The coach members ask for by name. Prajwal's strength is making the first month feel like the friendliest part of your week, not the hardest.",
    paragraphs: [
      "Prajwal is the coach members talk about in their Google reviews before they think to mention anything else. He has a particular gift for the first month — the month when most people quit — and he spends it making sure you feel at home on the floor.",
      "His programming for new members is deliberately unintimidating: a handful of movements done well, progressed honestly, with the form tightened a little every session. For members coming back from a long break, or stepping into a gym for the first time, Prajwal's the name to ask for at the front desk.",
      "He also runs the functional-training block upstairs and is known across the trainer team for his patience with members who need to rebuild confidence before they rebuild strength.",
    ],
    highlights: [
      "Most requested for beginner onboarding",
      "Runs the functional-training block",
      "Named repeatedly in member reviews",
    ],
    accent: "ink",
    yearsCoaching: 5,
  },
  {
    slug: "sahil",
    name: "Sahil",
    role: "Dance Fitness Instructor",
    initials: "SH",
    specialties: ["Dance fitness", "Choreography", "Group energy"],
    tagline: "Studio classes. High-energy, judgment-free.",
    bio: "Runs the studio classes that turn a Tuesday evening into the highlight of the week. High-energy, beginner-friendly, and absolutely judgment-free.",
    paragraphs: [
      "Sahil runs the dance studio on the middle floor — the room members hear before they see. His classes are the reason the studio is packed on weeknights, and the reason plenty of Body Tone members who said they'd \"never do a dance class\" now schedule their week around them.",
      "The format is deliberately beginner-friendly: no prior choreography experience assumed, no judgement, no expectation that you get it right the first time. Sahil builds routines that look harder than they are, and a room that feels a lot friendlier than most dance classes do anywhere in the city.",
      "For members mixing strength training with conditioning, Sahil's classes are also a favourite recovery-day workout — high heart rate, low joint stress, and a better mood walking out than walking in.",
    ],
    highlights: [
      "Dance studio lead since 2022",
      "Runs the evening group classes",
      "Beginner-friendly choreography",
    ],
    accent: "ink",
    yearsCoaching: 4,
  },
] as const;

export function getTrainer(slug: string): Trainer | undefined {
  return TRAINERS.find((t) => t.slug === slug);
}

export function getTrainerSlugs(): string[] {
  return TRAINERS.map((t) => t.slug);
}
