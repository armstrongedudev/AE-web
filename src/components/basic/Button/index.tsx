import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Icon } from "../Icon";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "white" | "cta" | "forest";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** Control size. @default "md" */
  size?: ButtonSize;
  /** Optional Phosphor icon shown after the label. */
  trailingIcon?: PhosphorIcon;
  /** Optional Phosphor icon shown before the label. */
  leadingIcon?: PhosphorIcon;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

export type ButtonProps =
  | (BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">)
  | (BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">);

const iconSize: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

/**
 * Button — primary action control. Renders an `<a>` when `href` is given
 * (styled identically) or a `<button>` otherwise. Supports leading/trailing icons.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    trailingIcon,
    leadingIcon,
    fullWidth,
    children,
    className,
    ...rest
  } = props;

  const classes = [
    "aui-btn",
    `aui-btn--${variant}`,
    `aui-btn--${size}`,
    fullWidth && "aui-btn--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={iconSize[size]} />}
      <span className="aui-btn__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={iconSize[size]} />}
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

export default Button;
