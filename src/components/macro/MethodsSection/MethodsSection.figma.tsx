import figma from "@figma/code-connect";
import { MethodsSection } from "./index";

// Single component. Figma 338:365.
figma.connect(MethodsSection, "<ARMSTRONG_FILE>?node-id=338-365", {
  props: {},
  example: () => (
    <MethodsSection
      eyebrow="The method"
      title="Theory you can use on Monday morning"
      body="A blend of Reggio Emilia, loose-parts theory and inquiry-based play."
      methods={["Reggio Emilia", "Loose Parts", "Inquiry Play", "Documentation"]}
      credential="M.A. Early Childhood Education · 30+ years"
    />
  ),
});
