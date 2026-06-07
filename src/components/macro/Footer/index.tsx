import type { HTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import "./Footer.css";

export interface FooterLink {
  label: ReactNode;
  href: string;
}

export interface FooterColumn {
  title: ReactNode;
  links: FooterLink[];
}

export interface FooterCta {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  /** "solid" = filled green (Get certified), "ghost" = white outlined (Pricing). */
  variant?: "solid" | "ghost";
  /** Show a trailing arrow. */
  arrow?: boolean;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Eyebrow wordmark next to the logo. */
  brand?: ReactNode;
  /** Logo image (cropped to the AÉ mark). */
  logoSrc?: string;
  /** Dark-green tagline paragraph. */
  tagline?: ReactNode;
  /** CTA buttons (Get certified / Pricing). */
  ctas?: FooterCta[];
  /** The three link columns. */
  columns: FooterColumn[];
  /** Monospace copyright line. */
  copyright?: ReactNode;
}

/**
 * Footer — implements Figma 288:1917 1:1: a radial cream→green band with a left
 * CTA block (logo + eyebrow + tagline + Get certified / Pricing) and three white
 * link columns on the green side, over a monospace copyright bar.
 */
export function Footer({
  brand = "Armstrong Educational Services",
  logoSrc = "/brand/logo-ae.png",
  tagline,
  ctas,
  columns,
  copyright = "© 2026 Armstrong education",
  className,
  ...rest
}: FooterProps) {
  return (
    <footer className={["aui-footer", className].filter(Boolean).join(" ")} {...rest}>
      <div className="aui-footer__body">
        <div className="aui-footer__cta">
          <img className="aui-footer__glow" src="/brand/footer-ellipse.svg" alt="" aria-hidden />

          <div className="aui-footer__brandrow">
            <span className="aui-footer__logo">
              <img src={logoSrc} alt="" />
            </span>
            <p className="aui-footer__eyebrow">{brand}</p>
          </div>

          {tagline && <p className="aui-footer__tagline">{tagline}</p>}

          {ctas && ctas.length > 0 && (
            <div className="aui-footer__ctas">
              {ctas.map((cta, i) => {
                const cls = ["aui-footer__btn", cta.variant === "ghost" && "aui-footer__btn--ghost"]
                  .filter(Boolean)
                  .join(" ");
                const inner = (
                  <>
                    {cta.label}
                    {cta.arrow && <ArrowRight size={17} weight="regular" />}
                  </>
                );
                return cta.href ? (
                  <a key={i} className={cls} href={cta.href} onClick={cta.onClick}>
                    {inner}
                  </a>
                ) : (
                  <button key={i} type="button" className={cls} onClick={cta.onClick}>
                    {inner}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {columns.map((col, i) => (
          <nav className="aui-footer__col" key={i} aria-label={typeof col.title === "string" ? col.title : undefined}>
            <h3 className="aui-footer__col-title">{col.title}</h3>
            <ul className="aui-footer__col-links">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href={link.href} className="aui-footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="aui-footer__copy">
        <span>{copyright}</span>
      </div>
    </footer>
  );
}

export default Footer;
