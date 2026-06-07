import figma from "@figma/code-connect";
import { Star } from "@phosphor-icons/react";
import { Icon } from "./index";

// Single component. Figma 203:64. (39 icon/* glyph components are swapped in via instances.)
figma.connect(Icon, "<ARMSTRONG_FILE>?node-id=203-64", {
  props: {},
  example: () => <Icon name={Star} size={20} />,
});
