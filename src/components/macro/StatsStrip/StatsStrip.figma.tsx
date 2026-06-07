import figma from "@figma/code-connect";
import { ChalkboardTeacher, Certificate, GraduationCap } from "@phosphor-icons/react";
import { StatsStrip } from "./index";

// Single component. Figma 317:359.
figma.connect(StatsStrip, "<ARMSTRONG_FILE>?node-id=317-359", {
  props: {},
  example: () => (
    <StatsStrip
      items={[
        { icon: ChalkboardTeacher, value: "+30 Years", label: "Teaching & training" },
        { icon: GraduationCap, value: "2,000+", label: "Educators trained" },
        { icon: Certificate, value: "DECAL", label: "State-approved" },
      ]}
    />
  ),
});
