import type { HTMLAttributes, ReactNode } from "react";
import { Check } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { IconBadge } from "../../basic/IconBadge";
import type { IconBadgeTone } from "../../basic/IconBadge";
import { Heading } from "../../basic/Heading";
import { Text } from "../../basic/Text";
import { ArrowLink } from "../../basic/ArrowLink";
import { Icon } from "../../basic/Icon";
import "./OfferingCard.css";

export interface OfferingCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Leading Phosphor icon shown in a tonal badge. */
  icon: PhosphorIcon;
  /** Program title. */
  title: ReactNode;
  /** Short description. */
  description: ReactNode;
  /** Call-to-action label. */
  cta: ReactNode;
  /** Destination for the CTA. */
  ctaHref?: string;
  /** Badge tone. @default "mint" */
  tone?: IconBadgeTone;
  /** Optional bullet feature list. */
  features?: string[];
}

/** OfferingCard — program card with an icon badge, title, description, optional features and a CTA. */
export function OfferingCard({
  icon,
  title,
  description,
  cta,
  ctaHref,
  tone = "mint",
  features,
  className,
  ...rest
}: OfferingCardProps) {
  return (
    <div className={["aui-offering", className].filter(Boolean).join(" ")} {...rest}>
      <IconBadge icon={icon} tone={tone} size={52} />
      <Heading level={4} className="aui-offering__title">
        {title}
      </Heading>
      <Text className="aui-offering__desc">{description}</Text>
      {features && features.length > 0 && (
        <ul className="aui-offering__features">
          {features.map((f) => (
            <li key={f} className="aui-offering__feature">
              <Icon name={Check} size={16} className="aui-offering__check" />
              <Text size="sm" as="span">
                {f}
              </Text>
            </li>
          ))}
        </ul>
      )}
      <ArrowLink href={ctaHref} className="aui-offering__cta">
        {cta}
      </ArrowLink>
    </div>
  );
}

export default OfferingCard;
