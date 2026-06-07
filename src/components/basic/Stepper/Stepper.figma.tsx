import figma from "@figma/code-connect";
import { Stepper } from "./index";

// Property 1 (Default/Variant2). Figma set 409:816.
figma.connect(Stepper, "<ARMSTRONG_FILE>?node-id=409-816", {
  props: {},
  example: () => <Stepper value={1} min={0} max={10} onChange={() => {}} label="Participants" />,
});
