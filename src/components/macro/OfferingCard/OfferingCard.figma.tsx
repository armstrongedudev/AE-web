import figma from "@figma/code-connect";
import { GraduationCap } from "@phosphor-icons/react";
import { OfferingCard } from "./index";

// Single component. Figma 239:108.
figma.connect(OfferingCard, "<ARMSTRONG_FILE>?node-id=239-108", {
  props: {},
  example: () => (
    <OfferingCard
      icon={GraduationCap}
      tone="mint"
      title="Certification"
      description="Become a Georgia DECAL-approved early-childhood educator."
      cta="Learn more"
      ctaHref="/certification"
    />
  ),
});
