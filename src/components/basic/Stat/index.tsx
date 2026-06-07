import type { HTMLAttributes, ReactNode } from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { IconBadge } from "../IconBadge";
import "./Stat.css";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  /** Main label / credential. */
  label: ReactNode;
  /** Optional emphasised value (e.g. "+30 Years"). */
  value?: ReactNode;
  /** Optional leading Phosphor icon shown in a soft badge. */
  icon?: PhosphorIcon;
  /** Optional image (e.g. a seal/badge) shown instead of the icon badge. */
  image?: string;
}

/** Stat — a single credential/metric, optionally led by an icon badge or image. */
export function Stat({ label, value, icon, image, className, ...rest }: StatProps) {
  return (
    <div className={["aui-stat", className].filter(Boolean).join(" ")} {...rest}>
      {image ? (
        <img className="aui-stat__img" src={image} alt="" />
      ) : icon ? (
        <IconBadge icon={icon} tone="mint" size={44} className="aui-stat__icon" />
      ) : null}
      <div className="aui-stat__body">
        {value && <span className="aui-stat__value t-h3">{value}</span>}
        <span className="aui-stat__label t-small">{label}</span>
      </div>
    </div>
  );
}

export default Stat;
