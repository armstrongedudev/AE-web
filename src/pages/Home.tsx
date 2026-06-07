import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import StatsStrip from "@/sections/StatsStrip";
import Methods from "@/sections/Methods";
import Programs from "@/sections/Programs";
import Workshops from "@/sections/Workshops";
import PricingCalculator from "@/sections/PricingCalculator";
import Testimonials from "@/sections/Testimonials";
import Footer from "@/sections/Footer";

/**
 * Home — codes Figma "Home - desktop" (140:6819).
 * Composition of sections in the order defined by COMPONENTS.md.
 * Each section lives in src/sections/<Name>/ with its own CSS + README.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsStrip />
        <Methods />
        <Programs />
        <Workshops />
        <PricingCalculator />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
