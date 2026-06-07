import type { HTMLAttributes, ReactNode, ElementType } from "react";
import "./Text.css";

export type TextSize = "lg" | "md" | "sm" | "caption";
export type TextTone = "ink" | "body" | "muted";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Type scale. @default "md" */
  size?: TextSize;
  /** Color role. @default "body" */
  tone?: TextTone;
  /** Rendered element. @default "p" */
  as?: ElementType;
  children: ReactNode;
}

const typeClass: Record<TextSize, string> = {
  lg: "t-body-lg",
  md: "t-body",
  sm: "t-small",
  caption: "t-caption",
};

/** Text — body copy at four sizes and three tonal roles. */
export function Text({ size = "md", tone = "body", as, children, className, ...rest }: TextProps) {
  const Tag = (as ?? "p") as ElementType;
  const classes = ["aui-text", typeClass[size], `aui-text--${tone}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}

export default Text;
