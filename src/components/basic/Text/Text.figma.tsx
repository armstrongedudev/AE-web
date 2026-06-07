import figma from "@figma/code-connect";
import { Text } from "./index";

// Size × Tone. Figma set 199:62.
figma.connect(Text, "<ARMSTRONG_FILE>?node-id=199-62", {
  props: {
    size: figma.enum("Size", { Lg: "lg", Md: "md", Sm: "sm", Caption: "caption" }),
    tone: figma.enum("Tone", { Ink: "ink", Body: "body", Muted: "muted" }),
  },
  example: ({ size, tone }) => (
    <Text size={size} tone={tone}>
      Practical, research-based training for early-childhood educators.
    </Text>
  ),
});
