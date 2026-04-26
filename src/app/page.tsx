import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Differentiators } from "@/components/sections/Differentiators";
import { FeaturedStory } from "@/components/sections/FeaturedStory";
import { TrainersSection } from "@/components/sections/TrainersSection";
import { ReviewsWall } from "@/components/sections/ReviewsWall";
import { LocationStrip } from "@/components/sections/LocationStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Body Tone Fitness — Premium gym in Vidya Nagar, Hubballi",
  description:
    "Three floors of strength training, a rooftop workout area, dance fitness studio, and personal coaching. Body Tone Fitness is the gym Hubballi trusts since 2019. Book a free trial today.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Differentiators />
      <FeaturedStory />
      <TrainersSection />
      <ReviewsWall />
      <LocationStrip />
      <FinalCTA />
    </>
  );
}
