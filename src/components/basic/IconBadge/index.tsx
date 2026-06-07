import type { HTMLAttributes } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Icon } from "../Icon";
import "./IconBadge.css";

export type IconBadgeTone = "mint" | "peach" | "forest";

export interface IconBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Phosphor icon to render inside the badge. */
  icon: PhosphorIcon;
  /** Color tone. @default "mint" */
  tone?: IconBadgeTone;
  /** Outer pixel size of the rounded square. @default 48 */
  size?: number;
  /** Accessible label for the icon (otherwise decorative). */
  label?: string;
}

/** Icon inside a soft rounded square — used to lead cards and offerings. */
export function IconBadge({ icon, tone = "mint", size = 48, label, className, style, ...rest }: IconBadgeProps) {
  const classes = ["aui-iconbadge", `aui-iconbadge--${tone}`, className].filter(Boolean).join(" ");
  return (
    <span
      className={classes}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <Icon name={icon} size={Math.round(size * 0.5)} label={label} />
    </span>
  );
}

export default IconBadge;
