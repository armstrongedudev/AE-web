import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react";
import "./Icon.css";

export interface IconProps {
  /** A Phosphor icon component, e.g. `import { Star } from "@phosphor-icons/react"` */
  name: PhosphorIcon;
  /** Pixel size of the icon. @default 20 */
  size?: number;
  /** Phosphor weight. @default "regular" */
  weight?: IconWeight;
  /** Color (any CSS color or token via `var(--…)`). Defaults to `currentColor`. */
  color?: string;
  /** Accessible label. When omitted the icon is hidden from assistive tech. */
  label?: string;
  className?: string;
}

/**
 * Icon — thin wrapper around a Phosphor icon that standardises size/weight and
 * accessibility. Decorative by default (aria-hidden); pass `label` to expose it.
 */
export function Icon({
  name: IconComponent,
  size = 20,
  weight = "regular",
  color = "currentColor",
  label,
  className,
}: IconProps) {
  return (
    <IconComponent
      className={["aui-icon", className].filter(Boolean).join(" ")}
      size={size}
      weight={weight}
      color={color}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}

export default Icon;
