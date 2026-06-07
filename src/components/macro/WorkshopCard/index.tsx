import type { HTMLAttributes, ReactNode } from "react";
import { Heading } from "../../basic/Heading";
import { Text } from "../../basic/Text";
import { ArrowLink } from "../../basic/ArrowLink";
import "./WorkshopCard.css";

export interface WorkshopCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional cover image URL. A mint placeholder is shown when absent. */
  image?: string;
  /** Duration / format tag shown over the image, e.g. "2h · in person". */
  tag: ReactNode;
  /** Workshop title (forest). */
  title: ReactNode;
  /** Short description. */
  description: ReactNode;
  /** CTA label. @default "Register" */
  cta?: ReactNode;
  /** CTA destination. */
  ctaHref?: string;
}

/** WorkshopCard — cover image (650:433) fading into the card, a white text tag,
 *  a forest title, body copy and a Register link. Figma 140:7074. */
export function WorkshopCard({
  image,
  tag,
  title,
  description,
  cta = "Register",
  ctaHref,
  className,
  ...rest
}: WorkshopCardProps) {
  return (
    <div className={["aui-workshop", className].filter(Boolean).join(" ")} {...rest}>
      <div className="aui-workshop__media">
        {image ? (
          <img className="aui-workshop__img" src={image} alt="" loading="lazy" />
        ) : (
          <div className="aui-workshop__placeholder" aria-hidden />
        )}
        <div className="aui-workshop__fade" aria-hidden />
        <span className="aui-workshop__tag">{tag}</span>
      </div>
      <div className="aui-workshop__body">
        <Heading level={4} className="aui-workshop__title">
          {title}
        </Heading>
        <Text className="aui-workshop__desc">{description}</Text>
        <ArrowLink href={ctaHref} className="aui-workshop__cta">
          {cta}
        </ArrowLink>
      </div>
    </div>
  );
}

export default WorkshopCard;
