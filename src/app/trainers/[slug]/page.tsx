import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getTrainer, getTrainerSlugs, TRAINERS } from "@/lib/trainers";
import { BUSINESS, whatsappUrl } from "@/lib/business";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getTrainerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) return { title: "Trainer not found" };
  return {
    title: `${trainer.name} — ${trainer.role}`,
    description: trainer.bio,
    alternates: { canonical: `/trainers/${trainer.slug}` },
    openGraph: {
      type: "profile",
      title: `${trainer.name} — ${trainer.role} · Body Tone Fitness`,
      description: trainer.bio,
      url: `/trainers/${trainer.slug}`,
    },
  };
}

export default async function TrainerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) notFound();

  const isAccent = trainer.accent === "gold";
  const others = TRAINERS.filter((t) => t.slug !== trainer.slug).slice(0, 3);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: trainer.name,
    jobTitle: trainer.role,
    description: trainer.bio,
    knowsAbout: trainer.specialties,
    worksFor: {
      "@type": "HealthClub",
      name: BUSINESS.name,
      url: BUSINESS.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.region,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
    },
    url: `${BUSINESS.url}/trainers/${trainer.slug}`,
  };

  return (
    <section className="pb-24 pt-8 md:pb-32 md:pt-10">
      <div className="container-x">
        <Link
          href="/trainers"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/55 transition hover:text-[var(--color-gold)]"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          All trainers
        </Link>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Portrait */}
          <div className="order-1 lg:order-1">
            <div
              className={cn(
                "relative aspect-[4/5] overflow-hidden rounded-[2rem] border",
                isAccent
                  ? "border-[var(--color-gold)]/30"
                  : "border-[var(--color-line-strong)]",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0",
                  isAccent
                    ? "bg-gradient-to-br from-[var(--color-gold-deep)] via-[var(--color-gold)] to-[var(--color-gold-soft)]"
                    : "bg-gradient-to-br from-[var(--color-ink-elevated)] via-[var(--color-ink)] to-[var(--color-ink-soft)]",
                )}
              />
              {trainer.photo ? (
                <Image
                  src={trainer.photo}
                  alt={`Portrait of ${trainer.name}, ${trainer.role} at Body Tone Fitness Hubballi.`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="relative object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10rem] font-light leading-none tracking-[-0.06em] md:text-[14rem]",
                    isAccent ? "text-[var(--color-ink)]/85" : "text-[var(--color-gold)]/35",
                  )}
                >
                  {trainer.initials}
                </span>
              )}

              {trainer.isHead ? (
                <div className="absolute left-5 top-5 rounded-full border border-[var(--color-ink)]/30 bg-[var(--color-ink)]/80 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-gold)] backdrop-blur-md">
                  Head coach
                </div>
              ) : null}
            </div>
          </div>

          {/* Intro */}
          <div className="order-2 lg:order-2">
            <span className="eyebrow">{trainer.role}</span>
            <h1 className="display mt-4 text-4xl md:text-5xl lg:text-[3.5rem]">
              {trainer.name}
            </h1>
            <p className="mt-6 max-w-[52ch] font-display text-xl font-light leading-snug tracking-tight text-[var(--color-gold)] md:text-2xl">
              {trainer.tagline}
            </p>

            <div className="mt-10 grid gap-6 border-y border-[var(--color-line)] py-6 sm:grid-cols-3">
              {trainer.yearsCoaching !== undefined ? (
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Years coaching
                  </span>
                  <span className="mt-2 block font-display text-2xl font-medium tracking-tight text-white">
                    {trainer.yearsCoaching}+
                  </span>
                </div>
              ) : null}
              <div className="sm:col-span-2">
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Specialties
                </span>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {trainer.specialties.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] px-3 py-1 text-[11px] tracking-wide text-white/75"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-white/75 md:text-base">
              {trainer.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {trainer.highlights && trainer.highlights.length > 0 ? (
              <div className="mt-10 rounded-3xl border border-[var(--color-gold)]/25 bg-[var(--color-gold-glow)] p-6 md:p-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
                  What members notice
                </span>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {trainer.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm leading-snug text-white/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] block size-1.5 shrink-0 rounded-full bg-[var(--color-gold)]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-[var(--color-line)] pt-10">
              <a
                href={whatsappUrl(
                  `Hi Body Tone Fitness, I'd like to train with ${trainer.name}. Can we set up a free trial?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[var(--color-gold)] px-6 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-gold-soft)]"
              >
                Train with {trainer.name.split(" ")[0]}
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
              </a>
              <span className="text-sm text-white/55">
                or call <span className="text-white/80">{BUSINESS.phone.display}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Other trainers */}
        {others.length > 0 ? (
          <div className="mt-24 border-t border-[var(--color-line)] pt-16 md:mt-32 md:pt-20">
            <div className="mb-10 flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                More coaches at Body Tone
              </h2>
              <Link
                href="/trainers"
                className="hidden text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] sm:inline"
              >
                See the full team →
              </Link>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/trainers/${o.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--color-line-strong)] bg-[var(--color-ink-elevated)] p-4 transition-colors hover:border-[var(--color-gold)]/50"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-full font-display text-sm font-medium tracking-[0.05em]",
                        o.accent === "gold"
                          ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                          : "bg-[var(--color-ink)] text-[var(--color-gold)] ring-1 ring-[var(--color-gold)]/40",
                      )}
                    >
                      {o.initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-base font-medium text-white transition-colors group-hover:text-[var(--color-gold)]">
                        {o.name}
                      </span>
                      <span className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/55">
                        {o.role}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </section>
  );
}
