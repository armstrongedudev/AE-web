import { Footer as FooterBar } from "@/components/macro";
import "./Footer.css";

const COLUMNS = [
  {
    title: "Programs",
    links: [
      { label: "Group trainings", href: "/programs/group-trainings" },
      { label: "Self-paced courses", href: "/programs/self-paced-courses" },
      { label: "Annual packs", href: "/programs/annual-packs" },
      { label: "School licenses", href: "/programs/school-licenses" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Camille", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Speaking", href: "/speaking" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "DECAL info", href: "/certification" },
      { label: "Loose Parts guide", href: "/blog" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

/**
 * Footer — brand wordmark + tagline + CTAs + 3 link columns.
 * Responsive: desktop radial band → tablet/phone cream→green gradient with the
 * CTA block on top and the columns below (handled by the macro Footer).
 */
export default function Footer() {
  return (
    <FooterBar
      tagline="Camille Hampton — Georgia DECAL-approved trainer and early-childhood specialist. 30+ years bringing the Reggio Emilia approach to classrooms across Metro Atlanta and online."
      columns={COLUMNS}
      ctas={[
        { label: "Get certified", href: "/certification", variant: "solid", arrow: true },
        { label: "Pricing", href: "/pricing", variant: "ghost" },
      ]}
    />
  );
}
