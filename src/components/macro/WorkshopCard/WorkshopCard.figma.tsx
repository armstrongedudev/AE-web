import figma from "@figma/code-connect";
import { WorkshopCard } from "./index";

// Single component. Figma 346:380.
figma.connect(WorkshopCard, "<ARMSTRONG_FILE>?node-id=346-380", {
  props: {},
  example: () => (
    <WorkshopCard
      tag="In person · Atlanta"
      title="Loose Parts & Inquiry Play"
      description="A hands-on day reimagining your classroom around child-led discovery."
      cta="Register"
      ctaHref="/programs/group-trainings"
    />
  ),
});
