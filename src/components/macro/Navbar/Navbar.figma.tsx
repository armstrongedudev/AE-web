import figma from "@figma/code-connect";
import { Navbar } from "./index";

// Desktop component. Figma 302:199 (mobile set with Menu=Closed/Open lives at 308:200).
figma.connect(Navbar, "<ARMSTRONG_FILE>?node-id=302-199", {
  props: {},
  example: () => (
    <Navbar
      links={[
        { label: "Programs", href: "/programs" },
        { label: "Certification", href: "/certification" },
        { label: "About Camille", href: "/about" },
        { label: "Reviews", href: "/reviews" },
      ]}
      primaryCta={{ label: "Log in", href: "/login" }}
      secondaryCta={{ label: "Contact Camille", href: "/contact" }}
    />
  ),
});
