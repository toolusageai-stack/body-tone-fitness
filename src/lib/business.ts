/**
 * Single source of truth for NAP, hours, and contact data.
 * Update this one file when the client supplies real coordinates / social links.
 * Header, Footer, Contact page, JSON-LD, sitemap, and metadata all read from here.
 */

export const BUSINESS = {
  name: "Body Tone Fitness",
  legalName: "Body Tone Fitness",
  tagline: "Hubballi's premium strength & conditioning gym",

  address: {
    street: "4th floor, Arihant Elite Complex, above FirstCry, Shirur Park",
    locality: "Vidya Nagar",
    city: "Hubballi",
    region: "Karnataka",
    postalCode: "580031",
    country: "IN",
    full: "4th floor, Arihant Elite Complex, above FirstCry, Shirur Park, Vidya Nagar, Hubballi, Karnataka 580031",
  },

  phone: {
    raw: "+918660169891",         // for tel: links
    display: "+91 86601 69891",   // for visible UI
  },

  whatsapp: {
    number: "918660169891",       // for wa.me links
    prefilledMessage:
      "Hi Body Tone Fitness, I'd like to know more about membership and would love to book a free trial session.",
  },

  hours: [
    { day: "Monday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Tuesday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Wednesday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Thursday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Friday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Saturday", open: "5:00 AM", close: "10:30 PM", iso: { open: "05:00", close: "22:30" } },
    { day: "Sunday", open: "7:00 AM", close: "12:00 PM", iso: { open: "07:00", close: "12:00" } },
  ],

  geo: {
    // Exact coordinates from the GBP listing.
    lat: 15.3627797,
    lng: 75.119555,
  },

  priceRange: "₹₹",

  social: {
    instagram: "https://instagram.com/body_tone_fitness_hubli",
    facebook: "",
    google:
      "https://www.google.com/maps/place/Body+Tone+Fitness/@15.3627797,75.1169801,17z/data=!4m6!3m5!1s0x3bb8d7751f873047:0x7606a96e2b66d358!8m2!3d15.3627797!4d75.119555!16s%2Fg%2F11p647gt5x",
  },

  googleReviewsUrl:
    "https://www.google.com/maps/place/Body+Tone+Fitness/@15.3627797,75.1169801,17z/data=!4m18!1m9!3m8!1s0x3bb8d7751f873047:0x7606a96e2b66d358!2sBody+Tone+Fitness!8m2!3d15.3627797!4d75.119555!9m1!1b1!16s%2Fg%2F11p647gt5x!3m7!1s0x3bb8d7751f873047:0x7606a96e2b66d358!8m2!3d15.3627797!4d75.119555!9m1!1b1!16s%2Fg%2F11p647gt5x",

  founders: ["Siddhanth", "Laveen"],

  url: "https://bodytonefitness.in", // placeholder canonical
} as const;

/** Build the WhatsApp click-through URL with the prefilled message encoded. */
export function whatsappUrl(message: string = BUSINESS.whatsapp.prefilledMessage): string {
  return `https://wa.me/${BUSINESS.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Build the tel: link. */
export function telUrl(): string {
  return `tel:${BUSINESS.phone.raw}`;
}

/** Build the Google Maps embed src for the Vidya Nagar address. */
export function mapsEmbedUrl(): string {
  const query = encodeURIComponent(
    `Body Tone Fitness, ${BUSINESS.address.full}`
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

/** Build the "Get directions" link. */
export function mapsDirectionsUrl(): string {
  const query = encodeURIComponent(
    `Body Tone Fitness, ${BUSINESS.address.full}`
  );
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}
