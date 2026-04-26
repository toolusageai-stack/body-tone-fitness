import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { PhotoTile, type Photo } from "@/components/gallery/PhotoTile";
import { InstagramCard } from "@/components/gallery/InstagramCard";
import { LogoCTA } from "@/components/layout/LogoCTA";
import { getSlotsForPage } from "@/lib/instagram";
import { BUSINESS, whatsappUrl } from "@/lib/business";

// Static imports give us width/height + automatic blur placeholders, so the
// masonry below can render every photo at its natural proportions.
import Image3 from "../../../public/images/gym/Image3.webp";
import Image5 from "../../../public/images/gym/Image5.webp";
import Image6 from "../../../public/images/gym/Image6.jpg";
import Image7 from "../../../public/images/gym/Image7.webp";
import Image8 from "../../../public/images/gym/Image8.webp";
import Image9 from "../../../public/images/gym/Image9.webp";
import Image10 from "../../../public/images/gym/Image10.webp";
import Image11 from "../../../public/images/gym/Image11.webp";
import Image12 from "../../../public/images/gym/Image12.webp";
import Machine2 from "../../../public/images/gym/Machine2_Body-Tone.webp";
import Treadmill from "../../../public/images/gym/ThreadMill_Body-Tone.webp";

// Revalidate the gallery once a day. The admin Publish flow will trigger
// on-demand revalidation when slots are saved.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Gallery — inside Body Tone Fitness, Hubballi",
  description:
    "A look inside Body Tone Fitness in Vidya Nagar, Hubballi — three floors, modern equipment, dance studio, rooftop, and live moments from our Instagram.",
  alternates: { canonical: "/gallery" },
};

const HERO_TILES: readonly Photo[] = [
  {
    src: Image3,
    alt: "Hexagonal LED ceiling lights illuminate a wide gym floor with strength machines at Body Tone Fitness Hubballi.",
    tag: "Strength floor",
    span: "tall",
  },
  {
    src: Image7,
    alt: "Body Tone Fitness rooftop training area at sunset — functional rig and weight plates overlooking Hubballi.",
    tag: "Rooftop",
    span: "wide",
  },
];

// Natural-aspect masonry — no `span` set, photos render at their intrinsic
// proportions so portrait, landscape, and square shots all coexist.
const MASONRY_PHOTOS: readonly Photo[] = [
  {
    src: Image5,
    alt: "Group dance fitness class at Body Tone Fitness Hubballi under coloured neon lighting in the mirrored studio.",
    caption: "Friday night in the dance studio.",
  },
  {
    src: Image8,
    alt: "Bodybuilder mural lit by hexagonal LED lighting on the wall of Body Tone Fitness Hubballi.",
    caption: "The signature wall — hex-lit, every evening.",
  },
  {
    src: Image10,
    alt: "Trainer guiding a member through a routine in the dimly lit weights area at Body Tone Fitness.",
    caption: "Coaching that knows your name by week two.",
  },
  {
    src: Machine2,
    alt: "Elliptical cardio machines lined up under a wooden slat ceiling divider at Body Tone Fitness.",
    caption: "Cardio rigs, kept spotless.",
  },
  {
    src: Image11,
    alt: "Members training on machines at Body Tone Fitness Hubballi under warm LED lighting.",
    caption: "Quiet evenings, full racks.",
  },
  {
    src: Image9,
    alt: "Cardio zone at Body Tone Fitness Hubballi.",
    caption: "Cardio zone, with a view.",
  },
  {
    src: Image12,
    alt: "Free-weights and dumbbell area at Body Tone Fitness Hubballi.",
    caption: "Free weights area, third floor.",
  },
  {
    src: Treadmill,
    alt: "Treadmills lined up on the cardio floor at Body Tone Fitness Hubballi.",
    caption: "Treadmills, third floor.",
  },
  {
    src: Image6,
    alt: "Functional training rig at Body Tone Fitness Hubballi.",
    caption: "Functional rig, second floor.",
  },
];

export default async function GalleryPage() {
  const slots = await getSlotsForPage("gallery");
  const igHandleRaw =
    BUSINESS.social.instagram.split("/").filter(Boolean).pop() ??
    "body_tone_fitness_hubli";
  const igHandle = `@${igHandleRaw}`;

  return (
    <section className="pb-32 pt-8 md:pb-40 md:pt-10" aria-labelledby="gallery-heading">
      <div className="container-x">
        {/* Header */}
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Gallery</span>
            <h1
              id="gallery-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[4.25rem]"
            >
              Inside the floor.
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                Live from the floor
              </span>
              .
            </h1>
          </div>
          <p className="max-w-[52ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Three floors of strength, a rooftop, a dance studio that runs every
            evening — and the members who make it all real. The static shots
            are ours; the reels come straight from our Instagram and update
            every week.
          </p>
        </header>

        {/* Hero mosaic — two hand-curated, fixed-aspect tiles. The rest of the
            photos (including the dance studio crowd) render at their natural
            proportions in the masonry below. */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-12 lg:mt-20 lg:gap-5">
          <div className="sm:col-span-5">
            <PhotoTile photo={HERO_TILES[0]} index={0} priority />
          </div>
          <div className="sm:col-span-7">
            <PhotoTile photo={HERO_TILES[1]} index={1} priority />
          </div>
        </div>

        {/* Instagram strip — surfaced early so the dynamic content lands above the fold on most desktops */}
        <section className="mt-24 md:mt-28" aria-labelledby="ig-heading">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <span className="eyebrow">
                <InstagramLogo size={12} weight="fill" aria-hidden="true" />
                Live on Instagram
              </span>
              <h2
                id="ig-heading"
                className="display mt-5 text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                What we&rsquo;re posting
                <br />
                <span className="italic font-light text-[var(--color-gold)]">
                  this week
                </span>
                .
              </h2>
            </div>
            {BUSINESS.social.instagram ? (
              <div className="flex md:items-end md:justify-end">
                <a
                  href={BUSINESS.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/50 px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] transition-colors hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-glow)]"
                >
                  <InstagramLogo size={14} weight="fill" aria-hidden="true" />
                  Follow {igHandle}
                  <ArrowUpRight
                    size={13}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            ) : null}
          </div>

          {slots.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-[var(--color-line-strong)] p-12 text-center md:mt-16 md:p-16">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-to-tr from-[#fcb045] via-[#fd1d1d] to-[#833ab4] text-white">
                <InstagramLogo size={22} weight="fill" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-medium text-white">
                Fresh reels coming soon
              </h3>
              <p className="mx-auto mt-2 max-w-[44ch] text-sm text-white/55">
                We&rsquo;re curating the next batch from the floor. Follow us
                on Instagram for the live feed in the meantime.
              </p>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
              {slots.map((slot, i) => (
                <div
                  key={slot.id ?? i}
                  className={
                    i % 3 === 1 ? "lg:mt-12" : i % 3 === 2 ? "lg:mt-6" : ""
                  }
                >
                  <InstagramCard
                    url={slot.url}
                    caption={slot.caption}
                    index={i}
                    handle={igHandle}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Masonry — every other photo, natural aspects */}
        <section className="mt-28 md:mt-36" aria-labelledby="masonry-heading">
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <span className="eyebrow">The space</span>
              <h2
                id="masonry-heading"
                className="display mt-5 text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                Walk through it
                <br />
                <span className="italic font-light text-[var(--color-gold)]">
                  one frame at a time
                </span>
                .
              </h2>
            </div>
            <p className="max-w-[44ch] self-end text-[15px] leading-relaxed text-white/65">
              Real lighting, no filters. Every floor, every corner — what
              members actually see when they walk in.
            </p>
          </div>

          {/* CSS columns produce a real masonry: each photo keeps its native
              aspect ratio, columns balance themselves, and break-inside-avoid
              prevents a tile from being split across columns. */}
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:mt-16 lg:columns-3 lg:gap-5">
            {MASONRY_PHOTOS.map((photo, i) => (
              <div key={i} className="mb-4 break-inside-avoid lg:mb-5">
                <PhotoTile photo={photo} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section
          aria-labelledby="gallery-cta"
          className="relative mt-28 overflow-hidden rounded-[2rem] border border-[var(--color-gold)]/25 bg-gradient-to-br from-[var(--color-gold-glow)] via-[var(--color-ink-elevated)] to-[var(--color-ink)] px-7 py-14 md:mt-36 md:px-12 md:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-[24rem] rounded-full bg-[var(--color-gold)]/10 blur-[100px]"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
            <div>
              <span className="eyebrow">See it in person</span>
              <h2
                id="gallery-cta"
                className="display mt-5 text-3xl md:text-4xl lg:text-[3rem]"
              >
                Photos only do so much.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-white/70 md:text-base">
                Walk in for a free trial — train on the floor, hear the music,
                meet the coaches. Decide after.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <LogoCTA
                href={whatsappUrl()}
                label="Book a free trial"
                size="lg"
                external
              />
              <Link
                href="/pricing"
                className="text-xs font-medium uppercase tracking-[0.18em] text-white/55 hover:text-[var(--color-gold)]"
              >
                or see pricing first →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
