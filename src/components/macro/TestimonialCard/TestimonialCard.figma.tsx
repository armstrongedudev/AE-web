import figma from "@figma/code-connect";
import { TestimonialCard } from "./index";

// Tone (Mint/Rose/Peach). Figma set 355:163.
figma.connect(TestimonialCard, "<ARMSTRONG_FILE>?node-id=355-163", {
  props: {
    tone: figma.enum("Tone", { Mint: "mint", Rose: "rose", Peach: "peach" }),
  },
  example: ({ tone }) => (
    <TestimonialCard
      tone={tone}
      name="Maria T."
      role="Pre-K Lead, Atlanta"
      rating={5}
      quote="Camille's training completely changed how I set up my classroom."
    />
  ),
});
