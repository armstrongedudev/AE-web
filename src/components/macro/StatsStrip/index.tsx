import { Fragment } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Stat } from "../../basic/Stat";
import "./StatsStrip.css";

export interface StatsStripItem {
  label: ReactNode;
  value?: ReactNode;
  icon?: PhosphorIcon;
  /** Optional image (e.g. a seal) shown instead of the icon badge. */
  image?: string;
}

export interface StatsStripProps extends HTMLAttributes<HTMLDivElement> {
  /** Stats to display. */
  items: StatsStripItem[];
}

/** StatsStrip — a credentials band: stats spread edge-to-edge with thin dividers
 *  between (transparent, no card). Wraps on tablet/phone. */
export function StatsStrip({ items, className, ...rest }: StatsStripProps) {
  return (
    <div className={["aui-statsstrip", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="aui-statsstrip__divider" aria-hidden />}
          <Stat
            className="aui-statsstrip__item"
            label={item.label}
            value={item.value}
            icon={item.icon}
            image={item.image}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default StatsStrip;
