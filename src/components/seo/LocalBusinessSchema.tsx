import { BUSINESS } from "@/lib/business";

const DAY_MAP = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
} as const;

/**
 * LocalBusiness + HealthClub composite schema. Rendered once in the root layout.
 * Includes openingHoursSpecification (mandatory for the local pack), priceRange,
 * geo coordinates, and sameAs for social profiles. Read by Google Rich Results.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub", "ExerciseGym"],
    "@id": `${BUSINESS.url}/#business`,
    name: BUSINESS.name,
    alternateName: "BTF Hubli",
    description:
      "Premium three-floor strength and conditioning gym in Vidya Nagar, Hubballi. Modern equipment, dedicated coaches, dance fitness studio, and a rooftop functional training area.",
    url: BUSINESS.url,
    telephone: BUSINESS.phone.raw,
    image: `${BUSINESS.url}/logo.png`,
    logo: `${BUSINESS.url}/logo.png`,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: `${BUSINESS.address.locality}, ${BUSINESS.address.city}`,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.lat,
      longitude: BUSINESS.geo.lng,
    },
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_MAP[h.day as keyof typeof DAY_MAP],
      opens: h.iso.open,
      closes: h.iso.close,
    })),
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.facebook, BUSINESS.social.google].filter(
      Boolean
    ),
    areaServed: [
      { "@type": "City", name: "Hubballi" },
      { "@type": "City", name: "Hubli" },
      { "@type": "City", name: "Dharwad" },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Three-floor training facility", value: true },
      { "@type": "LocationFeatureSpecification", name: "Rooftop functional training area", value: true },
      { "@type": "LocationFeatureSpecification", name: "Dance fitness studio", value: true },
      { "@type": "LocationFeatureSpecification", name: "Personal training", value: true },
      { "@type": "LocationFeatureSpecification", name: "Member workout app", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
