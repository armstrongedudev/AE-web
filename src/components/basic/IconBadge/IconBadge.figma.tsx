import figma from "@figma/code-connect";
import { GraduationCap } from "@phosphor-icons/react";
import { IconBadge } from "./index";

// Tone (Mint/Peach/Forest). Figma set 208:71.
figma.connect(IconBadge, "<ARMSTRONG_FILE>?node-id=208-71", {
  props: {
    tone: figma.enum("Tone", { Mint: "mint", Peach: "peach", Forest: "forest" }),
  },
  example: ({ tone }) => <IconBadge icon={GraduationCap} tone={tone} label="Certification" />,
});
