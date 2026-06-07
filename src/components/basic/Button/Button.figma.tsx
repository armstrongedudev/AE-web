import figma from "@figma/code-connect";
import { Button } from "./index";

// Pill set — Variant (primary/secondary/ghost) × Size × State. Figma set 188:116.
figma.connect(Button, "<ARMSTRONG_FILE>?node-id=188-116", {
  props: {
    variant: figma.enum("Variant", {
      primary: "primary",
      secondary: "secondary",
      ghost: "ghost",
    }),
    size: figma.enum("Size", { sm: "sm", md: "md", lg: "lg" }),
  },
  example: ({ variant, size }) => (
    <Button variant={variant} size={size}>
      Get certified
    </Button>
  ),
});

// System set — Color (White/Clear green/Dark green) × State. Figma set 323:335.
figma.connect(Button, "<ARMSTRONG_FILE>?node-id=323-335", {
  props: {
    variant: figma.enum("Color", {
      White: "white",
      "Clear green": "cta",
      "Dark green": "forest",
    }),
  },
  example: ({ variant }) => <Button variant={variant}>Get certified</Button>,
});
