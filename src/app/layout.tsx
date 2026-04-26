import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { CallFloat } from "@/components/layout/CallFloat";
import { SkipLink } from "@/components/layout/SkipLink";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { BUSINESS } from "@/lib/business";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "Body Tone Fitness — Premium Gym in Vidya Nagar, Hubballi",
    template: "%s | Body Tone Fitness — Hubballi",
  },
  description:
    "A three-floor strength and conditioning gym in Vidya Nagar, Hubballi. Modern equipment, dedicated coaches, dance studio, rooftop training. Book a free trial.",
  keywords: [
    "gym in Hubballi",
    "best gym in Hubli",
    "gym in Vidya Nagar Hubballi",
    "personal trainer Hubballi",
    "fitness center Hubli",
    "weight loss Hubballi",
    "dance fitness Hubli",
  ],
  authors: [{ name: "Body Tone Fitness" }],
  creator: "Body Tone Fitness",
  publisher: "Body Tone Fitness",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    title: "Body Tone Fitness — Premium Gym in Vidya Nagar, Hubballi",
    description:
      "Three floors of strength, conditioning, and community in the heart of Vidya Nagar. Free trial sessions available.",
    images: [
      {
        url: "/images/gym/Image3.webp",
        width: 1200,
        height: 630,
        alt: "Body Tone Fitness — hex-lit training floor in Hubballi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Tone Fitness — Premium Gym in Hubballi",
    description:
      "Three floors of strength, conditioning, and community in Vidya Nagar, Hubballi.",
    images: ["/images/gym/Image3.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Hubballi",
    "geo.position": `${BUSINESS.geo.lat};${BUSINESS.geo.lng}`,
    ICBM: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Preconnect to origins the Google Maps embed pulls from — shaves
            ~100-300ms off the location-strip iframe's first byte. */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </head>
      <body className="grain">
        <SkipLink />
        <LocalBusinessSchema />
        <Header />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <CallFloat />
      </body>
    </html>
  );
}
