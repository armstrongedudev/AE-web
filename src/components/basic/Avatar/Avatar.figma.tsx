import figma from "@figma/code-connect";
import { Avatar } from "./index";

// Type (Initials/Photo) — driven in code by presence of `src`. Figma set 218:62.
figma.connect(Avatar, "<ARMSTRONG_FILE>?node-id=218-62", {
  props: {},
  example: () => <Avatar name="Camille Hampton" size={56} />,
});
