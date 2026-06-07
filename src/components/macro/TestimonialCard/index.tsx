import type { HTMLAttributes, ReactNode } from "react";
import { Stars } from "../../basic/Stars";
import { Text } from "../../basic/Text";
import "./TestimonialCard.css";

export type TestimonialTone = "mint" | "rose" | "peach";

export interface TestimonialCardProps extends Omit<HTMLAttributes<HTMLElement>, "role"> {
  /** Person's name. */
  name: string;
  /** Person's role / organisation. */
  role: ReactNode;
  /** Rating 0–5. */
  rating: number;
  /** The quote. */
  quote: ReactNode;
  /** Optional avatar image URL (falls back to a tinted initial placeholder). */
  avatarSrc?: string;
  /** Placeholder tone when no image. @default "mint" */
  tone?: TestimonialTone;
}

const initialOf = (name: string) => (name.trim()[0] || "?").toUpperCase();

/**
 * TestimonialCard — a review: a tall tinted avatar placeholder (89px pill) beside
 * the name, role, star rating and quote. The placeholder tone (mint / rose / peach)
 * varies per card. Figma 140:7310.
 */
export function TestimonialCard({
  name,
  role,
  rating,
  quote,
  avatarSrc,
  tone = "mint",
  className,
  ...rest
}: TestimonialCardProps) {
  return (
    <figure className={["aui-testimonial", className].filter(Boolean).join(" ")} {...rest}>
      <div className={`aui-testimonial__avatar aui-testimonial__avatar--${tone}`}>
        {avatarSrc ? (
          <img className="aui-testimonial__img" src={avatarSrc} alt={name} />
        ) : (
          <span className="aui-testimonial__initial" aria-label={name}>
            {initialOf(name)}
          </span>
        )}
      </div>
      <div className="aui-testimonial__main">
        <div className="aui-testimonial__head">
          <figcaption className="aui-testimonial__person">
            <Text as="span" tone="ink" className="aui-testimonial__name">
              {name}
            </Text>
            <Text as="span" size="sm" tone="muted">
              {role}
            </Text>
          </figcaption>
          <Stars value={rating} size={16} />
        </div>
        <blockquote className="aui-testimonial__quote">
          <Text size="lg" tone="ink" as="p">
            {quote}
          </Text>
        </blockquote>
      </div>
    </figure>
  );
}

export default TestimonialCard;
