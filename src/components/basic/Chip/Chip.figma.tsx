import figma from "@figma/code-connect";
import { Chip } from "./index";

// Tone × Size. Figma set 209:62.
figma.connect(Chip, "<ARMSTRONG_FILE>?node-id=209-62", {
  props: {
    tone: figma.enum("Tone", { Mint: "mint", Peach: "peach", Outline: "outline" }),
    size: figma.enum("Size", { Sm: "sm", Md: "md" }),
  },
  example: ({ tone, size }) => (
    <Chip tone={tone} size={size}>
      Reggio Emilia
    </Chip>
  ),
});
