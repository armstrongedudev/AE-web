import { Navbar as NavbarBar } from "@/components/macro";

const LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Certification", href: "/certification" },
  { label: "About Camille", href: "/about" },
  { label: "Reviews", href: "/reviews" },
];

/**
 * Navbar section — supplies the home's nav data to the macro Navbar.
 * The filled green CTA is "Log in" → /login (the two-path bridge:
 * online courses OR my account & quotes); "Contact Camille" is the
 * white CTA with a trailing arrow.
 */
export default function Navbar() {
  return (
    <NavbarBar
      links={LINKS}
      primaryCta={{ label: "Log in", href: "/login" }}
      secondaryCta={{ label: "Contact Camille", href: "/contact" }}
    />
  );
}
