import type { HTMLAttributes, ReactNode, ElementType } from "react";
import "./Heading.css";

export type HeadingLevel = "display-xl" | "display" | 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Visual scale. Display variants map to `<h1>` semantics by default. */
  level: HeadingLevel;
  /** Override the rendered element (e.g. render an h2 styled as display). */
  as?: ElementType;
  children: ReactNode;
}

const typeClass: Record<string, string> = {
  "display-xl": "t-display-xl",
  display: "t-display",
  1: "t-h1",
  2: "t-h2",
  3: "t-h3",
  4: "t-h4",
};

const defaultTag: Record<string, ElementType> = {
  "display-xl": "h1",
  display: "h1",
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

/** Heading — display/H1–H4 text. Visual scale via `level`, semantics via `as`. */
export function Heading({ level, as, children, className, ...rest }: HeadingProps) {
  const Tag = (as ?? defaultTag[String(level)]) as ElementType;
  const classes = ["aui-heading", typeClass[String(level)], className].filter(Boolean).join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Heading;
