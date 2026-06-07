import figma from "@figma/code-connect";
import { ArrowLink } from "./index";

// State (Default/Hover) — hover is CSS-only. Figma set 204:70.
figma.connect(ArrowLink, "<ARMSTRONG_FILE>?node-id=204-70", {
  props: {},
  example: () => <ArrowLink href="#">Explore programs</ArrowLink>,
});
