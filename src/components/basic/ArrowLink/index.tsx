import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Icon } from "../Icon";
import "./ArrowLink.css";

interface BaseProps {
  children: ReactNode;
  className?: string;
}

export type ArrowLinkProps =
  | (BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">)
  | (BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">);

/**
 * ArrowLink — inline text link with a trailing arrow that slides on hover
 * ("Explore →"). Renders an `<a>` when `href` is given, otherwise a `<button>`.
 */
export function ArrowLink(props: ArrowLinkProps) {
  const { children, className, ...rest } = props;
  const classes = ["aui-arrowlink", className].filter(Boolean).join(" ");

  const content = (
    <>
      <span className="aui-arrowlink__label">{children}</span>
      <Icon name={ArrowRight} size={18} className="aui-arrowlink__arrow" />
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a className={classes} href={href} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}

export default ArrowLink;
