/**
 * Inline stub data for the home page (build phase 1-2 per the plan).
 * In phase 3 this gets replaced by `lib/content.ts` reading `content/*.md` files.
 * The shape of these objects matches the eventual frontmatter schema so the
 * card components stay identical when we swap the source.
 *
 * IMPORTANT: trainer bios and member stories are respectful Hubballi-context
 * placeholders per CLAUDE.md §8 (no John Doe, no Lorem). Reviews are real
 * verbatim Google reviews supplied by the user.
 */

import type { ComponentType } from "react";

export type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export const HOME_STATS: readonly Stat[] = [
  { value: "3", label: "Floors of training", hint: "Strength · cardio · studio" },
  { value: "5+", label: "Years in Hubballi", hint: "Trusted since 2019" },
  { value: "30+", label: "Pieces of equipment", hint: "Free weights · machines · functional" },
  { value: "7", label: "Days a week", hint: "Open Mon–Sat 5am, Sun 7am" },
] as const;

export type Differentiator = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  span: "hero" | "wide" | "tall" | "square";
  iconName: "Barbell" | "Crown" | "MusicNotes" | "Sun" | "PersonSimpleRun";
};

/**
 * The "Why Body Tone" bento — visual proof of the differentiators we extracted
 * from the Google reviews. Photos do the heavy lifting here, copy paraphrases
 * the underlying facts (never lifts review text per the user's review-quote rule).
 */
export const DIFFERENTIATORS: readonly Differentiator[] = [
  {
    slug: "rooftop",
    title: "A rooftop you'll actually want to train on",
    description:
      "Open-sky functional rigs and weights on the top floor — sunrise sessions, golden-hour finishers, no fluorescent burnout.",
    image: "/images/gym/Image7.webp",
    imageAlt:
      "Body Tone Fitness rooftop training area at sunset — functional rig, weight plates, and turf flooring overlooking Hubballi.",
    span: "hero",
    iconName: "Sun",
  },
  {
    slug: "three-floors",
    title: "Three floors. Your space to lift.",
    description:
      "Each floor has a purpose — heavy strength, conditioning, and the studio. Move freely without waiting for a rack.",
    image: "/images/gym/Image3.webp",
    imageAlt:
      "Hexagonal LED ceiling lights illuminate a wide gym floor with strength machines and a wood-grain finish at Body Tone Fitness Hubballi.",
    span: "square",
    iconName: "Barbell",
  },
  {
    slug: "dance-studio",
    title: "Dance fitness that actually moves you",
    description:
      "Mirror-walled studio with a sprung floor. Choreography-led classes led by Sahil — high energy, lower impact.",
    image: "/images/gym/Image5.webp",
    imageAlt:
      "Group dance fitness class at Body Tone Fitness Hubballi under coloured neon lighting in the mirrored studio.",
    span: "tall",
    iconName: "MusicNotes",
  },
  {
    slug: "coaches",
    title: "Coaches who correct your form",
    description:
      "Posture cues, programming, and the kind of unhurried attention you only get from coaches who actually know your name.",
    image: "/images/gym/Image10.webp",
    imageAlt:
      "Trainer guiding a member through a posing routine in the dimly lit weights area at Body Tone Fitness.",
    span: "wide",
    iconName: "PersonSimpleRun",
  },
  {
    slug: "equipment",
    title: "Modern equipment, kept clean",
    description:
      "Cables, plate-loaded machines, free weights, cardio rigs — maintained the way it would be if you owned the place.",
    image: "/images/gym/Machine2_Body-Tone.webp",
    imageAlt:
      "Elliptical cardio machines lined up under a wooden slat ceiling divider on the Body Tone Fitness training floor.",
    span: "wide",
    iconName: "Crown",
  },
] as const;

export type Review = {
  slug: string;
  name: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string;
  source: "google";
  body: string;
};

/**
 * Real verbatim Google reviews supplied by the user. Verbatim is allowed here
 * because this IS the review section. Marketing sections elsewhere paraphrase
 * the underlying facts in the gym's voice instead of lifting these quotes.
 */
export const REVIEWS: readonly Review[] = [
  {
    slug: "ctj-cubing-channel",
    name: "CTJ The Cubing Channel",
    rating: 5,
    date: "2 months ago",
    source: "google",
    body: "Gym is divided into 3 floors, that's the best part for me. Privacy, trainers, good environment, good songs for lifting heavy. Overall deserves a 5 star. The manager is too chill and talks in such a nice way. I appreciate it. Thank you body tone, I love gym now.",
  },
  {
    slug: "tasneem-sf",
    name: "Tasneem S F",
    rating: 5,
    date: "2 months ago",
    source: "google",
    body: "Amazing gym with very supportive and knowledgeable trainers. They correct posture and motivate us to push our limits safely. Best place for fitness and consistency!",
  },
  {
    slug: "amit-hiremath",
    name: "Amit Hiremath",
    rating: 5,
    date: "2 months ago",
    source: "google",
    body: "I've been going to this gym for a few months now and I'm really happy with it. The equipment is modern and always clean, and there's a good variety of machines and free weights. The staff are welcoming and always willing to help.",
  },
  {
    slug: "vidya-hegde",
    name: "Vidya Hegde",
    rating: 5,
    date: "2 months ago",
    source: "google",
    body: "Very best and excellent trainers, very supportive, kind hearted and caring. Owners Siddhanth and Laveen sir, thank you for supporting.",
  },
  {
    slug: "anket-kalburgi",
    name: "Anket Kalburgi",
    rating: 5,
    date: "6 months ago",
    source: "google",
    body: "Best gym in Hubli city, highly recommended. Manager and trainers are very humble and understanding. All equipments at best condition.",
  },
  {
    slug: "karthik-gouripur",
    name: "Karthik Gouripur",
    rating: 5,
    date: "11 months ago",
    source: "google",
    body: "The facility is always clean, well-organized, and stocked with modern equipment that caters to all kinds of workouts — from heavy lifting to cardio to functional training.",
  },
] as const;

export type FeaturedStory = {
  name: string;
  age: number;
  duration: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
};

/**
 * Featured story — placeholder narrative until a real member supplies a
 * release-form story. Deliberately avoids medical claims and specific weight-
 * loss numbers (regulatory risk for a real Indian gym). Focuses on consistency,
 * mindset, and community — themes that match the actual review content.
 */
export const FEATURED_STORY: FeaturedStory = {
  name: "Aakash B.",
  age: 27,
  duration: "Eight months in",
  headline: "I came in to lose weight. I stayed because I finally felt strong.",
  body: "Aakash walked in last winter the way most members do — quiet, a little anxious, sure he'd quit by week three. Eight months later he's deadlifting twice his starting weight and the only thing he's missed is one Sunday morning. Not because of the numbers. Because the floor felt like his.",
  image: "/images/gym/Image8.webp",
  imageAlt:
    "Bodybuilder mural lit by hexagonal LED lighting on the wall of Body Tone Fitness Hubballi — the gym's signature interior.",
};
