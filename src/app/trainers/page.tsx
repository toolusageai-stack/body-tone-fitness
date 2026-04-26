import type { Metadata } from "next";
import { TrainerCard } from "@/components/cards/TrainerCard";
import { TRAINERS } from "@/lib/trainers";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "Trainers — The coaches at Body Tone Fitness, Hubballi",
  description:
    "Meet the coaches at Body Tone Fitness — founder Siddhanth, co-founder Laveen, strength coach Prajwal, and dance fitness instructor Sahil. Programming, posture, and progress in Vidya Nagar, Hubballi.",
  alternates: { canonical: "/trainers" },
};

export default function TrainersPage() {
  const head = TRAINERS.find((t) => t.isHead);
  const rest = TRAINERS.filter((t) => !t.isHead);

  const personSchema = TRAINERS.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.name,
    jobTitle: t.role,
    worksFor: {
      "@type": "HealthClub",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    knowsAbout: t.specialties,
    url: `${BUSINESS.url}/trainers/${t.slug}`,
  }));

  return (
    <section className="pb-24 pt-8 md:pb-32 md:pt-10" aria-labelledby="trainers-heading">
      <div className="container-x">
        {/* Header — asymmetric split */}
        <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">The coaches</span>
            <h1
              id="trainers-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[4rem]"
            >
              Who you'll train
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                with, and learn from
              </span>
              .
            </h1>
          </div>
          <p className="max-w-[52ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Every coach at Body Tone has a speciality — strength programming,
            form correction, beginner onboarding, dance fitness — and every
            member has access to all of them. Meet the people who'll know your
            name by week two.
          </p>
        </header>

        {/* Head coach — featured full-width card */}
        {head ? (
          <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-[1.15fr_1fr] md:gap-12 lg:gap-20">
            <div>
              <TrainerCard trainer={head} index={0} featured />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                Head coach · since 2019
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-white md:text-4xl">
                {head.tagline}
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-white/65 md:text-base">
                {head.bio}
              </p>
              {head.highlights && head.highlights.length > 0 ? (
                <ul className="mt-8 space-y-3 border-t border-[var(--color-line)] pt-6">
                  {head.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] block size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* The rest of the team — asymmetric staggered grid */}
        <div className="mt-20 md:mt-28">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
              The rest of the team
            </h2>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 md:inline">
              {String(rest.length).padStart(2, "0")} coaches
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {rest.map((trainer, i) => (
              <div key={trainer.slug} className={i % 2 === 1 ? "lg:mt-16" : ""}>
                <TrainerCard trainer={trainer} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </section>
  );
}
