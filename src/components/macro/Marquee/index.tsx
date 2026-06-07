import type { HTMLAttributes, ReactNode, CSSProperties } from "react";
import { Children } from "react";
import "./Marquee.css";

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  /** Children to scroll. The track is duplicated internally for a seamless loop. */
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. @default 30 */
  speed?: number;
  /** Scroll direction. @default "left" */
  direction?: "left" | "right";
  /** Fade the left/right edges with a mask. @default true */
  fade?: boolean;
  /** Gap between items (CSS length). @default "16px" */
  gap?: number | string;
}

/**
 * Marquee — a real infinite, continuous loop.
 *
 * The children are rendered twice into a single flex track. The track is animated
 * with a CSS @keyframes that translates it by exactly -50% (one full copy) at a
 * linear timing function, so when it resets the second copy is pixel-identical to
 * where the first started — seamless, no jump. The duplicate copy is aria-hidden.
 * Direction is handled by reversing the animation. Respects prefers-reduced-motion
 * (animation paused) and pauses on hover.
 */
export function Marquee({
  children,
  speed = 30,
  direction = "left",
  fade = true,
  gap = 16,
  className,
  style,
  ...rest
}: MarqueeProps) {
  const gapValue = typeof gap === "number" ? `${gap}px` : gap;
  const items = Children.toArray(children);

  const cssVars = {
    "--aui-marquee-duration": `${speed}s`,
    "--aui-marquee-gap": gapValue,
    "--aui-marquee-direction": direction === "right" ? "reverse" : "normal",
  } as CSSProperties;

  const classes = ["aui-marquee", fade && "aui-marquee--fade", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={{ ...cssVars, ...style }} {...rest}>
      <div className="aui-marquee__track">
        <ul className="aui-marquee__group">
          {items.map((child, i) => (
            <li className="aui-marquee__item" key={`a-${i}`}>
              {child}
            </li>
          ))}
        </ul>
        <ul className="aui-marquee__group" aria-hidden="true">
          {items.map((child, i) => (
            <li className="aui-marquee__item" key={`b-${i}`}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Marquee;
