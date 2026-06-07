import figma from "@figma/code-connect";
import { SectionHeader } from "./index";

// Align (Left/Center). Figma set 228:82.
figma.connect(SectionHeader, "<ARMSTRONG_FILE>?node-id=228-82", {
  props: {
    align: figma.enum("Align", { Left: "left", Center: "center" }),
  },
  example: ({ align }) => (
    <SectionHeader
      align={align}
      eyebrow="Programs"
      title="Training that fits your setting"
      subtitle="Group workshops, self-paced courses and certification."
    />
  ),
});
