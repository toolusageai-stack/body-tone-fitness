import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TrainerCard } from "@/components/cards/TrainerCard";
import { TRAINERS } from "@/lib/trainers";

/**
 * Trainers section — asymmetric 2-column zig-zag on desktop per CLAUDE.md §5
 * (the 3-equal-card row is banned). Stacks single-column on mobile.
 * Only shows the first 4 trainers on the home page; /about shows the full roster.
 */
export function TrainersSection() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="trainers-heading">
      <div className="container-x">
        {/* Section heading — asymmetric split */}
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <span className="eyebrow">Your coaches</span>
            <h2
              id="trainers-heading"
              className="display mt-5 text-4xl md:text-5xl lg:text-[3.5rem]"
            >
              People who know
              <br />
              <span className="italic font-light text-[var(--color-gold)]">
                your name by week two
              </span>
              .
            </h2>
          </div>
          <p className="max-w-[48ch] self-end text-[15px] leading-relaxed text-white/65 md:text-base">
            Body Tone runs on coaching, not just equipment. Every trainer here
            programs for their members, corrects form without being asked, and
            sticks around after hours when someone needs a spot.
          </p>
        </div>

        {/* Cards grid — asymmetric: 2 cols with staggered offset on lg */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:gap-8">
          {TRAINERS.map((trainer, i) => (
            <div key={trainer.slug} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <TrainerCard trainer={trainer} index={i} />
            </div>
          ))}
        </div>

        {/* Link to full team */}
        <div className="mt-12 flex justify-center lg:mt-16">
          <Link
            href="/trainers"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-gold)] transition-colors duration-300 hover:text-[var(--color-gold-soft)]"
          >
            Meet the full team
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
