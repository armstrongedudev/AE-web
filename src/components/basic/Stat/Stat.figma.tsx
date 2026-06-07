import figma from "@figma/code-connect";
import { Certificate } from "@phosphor-icons/react";
import { Stat } from "./index";

// Single component. Figma 219:62.
figma.connect(Stat, "<ARMSTRONG_FILE>?node-id=219-62", {
  props: {},
  example: () => <Stat icon={Certificate} value="+30 Years" label="Teaching & training" />,
});
