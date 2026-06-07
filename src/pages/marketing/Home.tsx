import Hero from "../../sections/Hero";
import StatsStrip from "../../sections/StatsStrip";
import Methods from "../../sections/Methods";
import Programs from "../../sections/Programs";
import Workshops from "../../sections/Workshops";
import PricingCalculator from "../../sections/PricingCalculator";
import Testimonials from "../../sections/Testimonials";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

/** Home — the canonical section composition (Navbar/Footer come from MarketingLayout). */
export default function Home() {
  useDocumentTitle(
    "Early-childhood teacher training, Atlanta",
    "DECAL-approved Reggio Emilia training for educators and schools across Metro Atlanta and online."
  );
  return (
    <>
      <Hero />
      <StatsStrip />
      <Methods />
      <Programs />
      <Workshops />
      <PricingCalculator />
      <Testimonials />
    </>
  );
}
