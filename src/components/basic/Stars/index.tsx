import type { HTMLAttributes } from "react";
import { Star, StarHalf } from "@phosphor-icons/react";
import "./Stars.css";

export interface StarsProps extends HTMLAttributes<HTMLSpanElement> {
  /** Rating from 0 to 5 (supports halves). */
  value: number;
  /** Pixel size of each star. @default 16 */
  size?: number;
}

/** Stars — read-only rating row, full / half / empty stars in the brand star color. */
export function Stars({ value, size = 16, className, ...rest }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, value));
  const rounded = Math.round(clamped * 2) / 2;

  return (
    <span
      className={["aui-stars", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`${clamped} out of 5 stars`}
      {...rest}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const position = i + 1;
        if (rounded >= position) {
          return <Star key={i} size={size} weight="fill" aria-hidden />;
        }
        if (rounded >= position - 0.5) {
          return <StarHalf key={i} size={size} weight="fill" aria-hidden />;
        }
        return <Star key={i} size={size} weight="regular" className="aui-stars__empty" aria-hidden />;
      })}
    </span>
  );
}

export default Stars;
