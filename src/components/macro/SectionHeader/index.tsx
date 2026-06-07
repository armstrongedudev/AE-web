import type { HTMLAttributes, ReactNode } from "react";
import { Eyebrow } from "../../basic/Eyebrow";
import { Heading } from "../../basic/Heading";
import { Text } from "../../basic/Text";
import "./SectionHeader.css";

export type SectionHeaderAlign = "left" | "center";

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional uppercase eyebrow. */
  eyebrow?: ReactNode;
  /** Section title. */
  title: ReactNode;
  /** Optional supporting subtitle. */
  subtitle?: ReactNode;
  /** Text alignment. @default "left" */
  align?: SectionHeaderAlign;
}

/** SectionHeader — eyebrow + title + optional subtitle, left- or center-aligned. */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  ...rest
}: SectionHeaderProps) {
  const classes = ["aui-sectionheader", `aui-sectionheader--${align}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...rest}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading level={2} className="aui-sectionheader__title">
        {title}
      </Heading>
      {subtitle && (
        <Text size="lg" tone="body" className="aui-sectionheader__subtitle">
          {subtitle}
        </Text>
      )}
    </div>
  );
}

export default SectionHeader;
