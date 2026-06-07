import figma from "@figma/code-connect";
import { Eyebrow } from "./index";

// Single component. Figma 193:62.
figma.connect(Eyebrow, "<ARMSTRONG_FILE>?node-id=193-62", {
  props: {},
  example: () => <Eyebrow>Our approach</Eyebrow>,
});
