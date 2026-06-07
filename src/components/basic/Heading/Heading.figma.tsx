import figma from "@figma/code-connect";
import { Heading } from "./index";

// Level. Figma set 197:62.
figma.connect(Heading, "<ARMSTRONG_FILE>?node-id=197-62", {
  props: {
    level: figma.enum("Level", {
      "Display XL": "display-xl",
      Display: "display",
      H1: 1,
      H2: 2,
      H3: 3,
      H4: 4,
    }),
  },
  example: ({ level }) => <Heading level={level}>Where theory becomes everyday practice</Heading>,
});
