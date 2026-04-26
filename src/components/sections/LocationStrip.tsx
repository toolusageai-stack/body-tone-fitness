import { MapPin, Clock, NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { BUSINESS, mapsDirectionsUrl } from "@/lib/business";

/**
 * Location strip — embedded Google Map + address + hours + directions CTA.
 * Uses the real NAP from business.ts. The map iframe loads lazily.
 * Per CLAUDE.md §5 this is asymmetric two-column, not centred.
 */
export function LocationStrip() {
  const todayIndex = new Date().getDay(); // 0=Sun,1=Mon...
  const todayHours = BUSINESS.hours[todayIndex === 0 ? 6 : todayIndex - 1];

  return (
    <section className="py-24 md:py-32" aria-labelledby="location-heading">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Map */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[var(--color-line-strong)] lg:aspect-auto lg:min-h-[28rem]">
            <iframe
              title="Body Tone Fitness location on Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`Body Tone Fitness, ${BUSINESS.address.full}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[0.3]"
              allowFullScreen
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-10">
            <div>
              <span className="eyebrow">Find us</span>
              <h2
                id="location-heading"
                className="display mt-5 text-3xl md:text-4xl lg:text-[2.75rem]"
              >
                Vidya Nagar, Hubballi
              </h2>
            </div>

            {/* Address */}
            <div className="flex gap-4">
              <MapPin
                size={20}
                weight="regular"
                className="mt-0.5 shrink-0 text-[var(--color-gold)]"
                aria-hidden
              />
              <p className="text-[15px] leading-relaxed text-white/70">
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.locality}, {BUSINESS.address.city},{" "}
                {BUSINESS.address.region} {BUSINESS.address.postalCode}
              </p>
            </div>

            {/* Today's hours */}
            <div className="flex gap-4">
              <Clock
                size={20}
                weight="regular"
                className="mt-0.5 shrink-0 text-[var(--color-gold)]"
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-white/80">
                  Today ({todayHours.day})
                </p>
                <p className="mt-0.5 text-[15px] text-white/55">
                  {todayHours.open} — {todayHours.close}
                </p>
              </div>
            </div>

            {/* Hours table */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 border-t border-[var(--color-line)] pt-6">
              {BUSINESS.hours.map((h) => (
                <div key={h.day} className="flex items-baseline justify-between text-sm">
                  <span className="text-white/50">{h.day.slice(0, 3)}</span>
                  <span className="font-mono text-xs text-white/70">
                    {h.open} – {h.close}
                  </span>
                </div>
              ))}
            </div>

            {/* Directions CTA */}
            <a
              href={mapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--color-gold)]/60 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-gold)] transition-all duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold-glow)]"
            >
              <NavigationArrow
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
