import type { HTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import "./Navbar.css";

export interface NavLink {
  label: ReactNode;
  href: string;
}

export interface NavbarCta {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Logo image src (cropped to the AÉ mark). */
  logoSrc?: string;
  logoAlt?: string;
  /** Primary navigation links. */
  links: NavLink[];
  /** Filled green CTA (e.g. "Log in" → /login). */
  primaryCta: NavbarCta;
  /** White CTA with trailing arrow (e.g. "Contact Camille"). */
  secondaryCta?: NavbarCta;
}

function Cta({
  cta,
  variant,
  arrow,
}: {
  cta: NavbarCta;
  variant: "primary" | "secondary";
  arrow?: boolean;
}) {
  const cls = `aui-nav-btn aui-nav-btn--${variant}`;
  const inner = (
    <>
      <span>{cta.label}</span>
      {arrow && <ArrowRight size={16} weight="regular" />}
    </>
  );
  return cta.href ? (
    <a className={cls} href={cta.href} onClick={cta.onClick}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} onClick={cta.onClick}>
      {inner}
    </button>
  );
}

/**
 * Navbar — floating, rounded, translucent bar that sits 24px from the top of the
 * page and is capped to the 1280px content width (80px gutters on 1440). On
 * tablet/phone the links + CTAs collapse behind a hamburger toggle.
 * Implements Figma node 140:7449 1:1.
 */
export function Navbar({
  logoSrc = "/brand/logo-ae.png",
  logoAlt = "Armstrong Educational Services",
  links,
  primaryCta,
  secondaryCta,
  className,
  ...rest
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={["aui-navbar", className].filter(Boolean).join(" ")} {...rest}>
      <div className="aui-navbar__container">
        <div className="aui-navbar__bar">
          <a href="/" className="aui-navbar__logo" aria-label={logoAlt}>
            <img src={logoSrc} alt="" />
          </a>

          <nav className="aui-navbar__links" aria-label="Primary">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="aui-navbar__link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="aui-navbar__ctas">
            <Cta cta={primaryCta} variant="primary" />
            {secondaryCta && <Cta cta={secondaryCta} variant="secondary" arrow />}
          </div>

          <button
            type="button"
            className="aui-navbar__toggle"
            aria-expanded={open}
            aria-controls="aui-navbar-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        {open && (
          <div className="aui-navbar__menu" id="aui-navbar-menu">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="aui-navbar__menu-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="aui-navbar__menu-ctas">
              <Cta cta={primaryCta} variant="primary" />
              {secondaryCta && <Cta cta={secondaryCta} variant="secondary" arrow />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
