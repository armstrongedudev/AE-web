import figma from "@figma/code-connect";
import { Marquee } from "./index";
import { Chip } from "../../basic/Chip";

// Single component. Figma 245:129.
figma.connect(Marquee, "<ARMSTRONG_FILE>?node-id=245-129", {
  props: {},
  example: () => (
    <Marquee speed={30} direction="left">
      <Chip tone="mint">Reggio Emilia</Chip>
      <Chip tone="peach">Loose Parts</Chip>
      <Chip tone="outline">Inquiry Play</Chip>
    </Marquee>
  ),
});
