import figma from "@figma/code-connect";
import { Stars } from "./index";

// Value (5 / 4.5 / 4 / 3). Figma set 212:106.
figma.connect(Stars, "<ARMSTRONG_FILE>?node-id=212-106", {
  props: {
    value: figma.enum("Value", { "5": 5, "4.5": 4.5, "4": 4, "3": 3 }),
  },
  example: ({ value }) => <Stars value={value} />,
});
