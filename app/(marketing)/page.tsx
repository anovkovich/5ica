import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BrandStory } from "@/components/landing/BrandStory";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Benefits />
      <HowItWorks />
      <BrandStory />
      <FAQ />
      <FinalCTA />
    </>
  );
}
