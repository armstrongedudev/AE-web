import type { HTMLAttributes, ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Icon } from "../Icon";
import "./Chip.css";

export type ChipTone = "mint" | "peach" | "outline";
export type ChipSize = "sm" | "md";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "mint" */
  tone?: ChipTone;
  /** Size. @default "md" */
  size?: ChipSize;
  /** Optional leading Phosphor icon. */
  icon?: PhosphorIcon;
  children: ReactNode;
}

/**
 * Chip — tag / pill / method-pill / feature chip. Static label with an
 * optional leading icon and a soft tonal background.
 */
export function Chip({ tone = "mint", size = "md", icon, children, className, ...rest }: ChipProps) {
  const classes = ["aui-chip", `aui-chip--${tone}`, `aui-chip--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={classes} {...rest}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
    </span>
  );
}

export default Chip;
