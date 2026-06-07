import figma from "@figma/code-connect";
import { Footer } from "./index";

// Property 1 (Desktop/tablet/phone) — responsive. Figma set 472:1666.
figma.connect(Footer, "<ARMSTRONG_FILE>?node-id=472-1666", {
  props: {},
  example: () => (
    <Footer
      brand="Armstrong Educational Services"
      tagline="Wisdom for the modern educator."
      ctas={[
        { label: "Get certified", href: "/certification", variant: "solid" },
        { label: "Pricing", href: "/pricing", variant: "ghost", arrow: true },
      ]}
      columns={[
        {
          title: "Programs",
          links: [
            { label: "Certification", href: "/certification" },
            { label: "Group trainings", href: "/programs/group-trainings" },
            { label: "Online courses", href: "/programs/self-paced-courses" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About Camille", href: "/about" },
            { label: "Reviews", href: "/reviews" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ]}
      copyright="© Armstrong Educational Services"
    />
  ),
});
