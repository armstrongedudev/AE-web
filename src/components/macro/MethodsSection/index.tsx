import type { HTMLAttributes, ReactNode } from "react";
import { Eyebrow } from "../../basic/Eyebrow";
import { Heading } from "../../basic/Heading";
import { Text } from "../../basic/Text";
import { Chip } from "../../basic/Chip";
import type { ChipTone } from "../../basic/Chip";
import { Marquee } from "../Marquee";
import "./MethodsSection.css";

export interface MethodsSectionImage {
  src: string;
  alt?: string;
}

export interface MethodsSectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Uppercase eyebrow (accent orange). */
  eyebrow?: ReactNode;
  /** Section title (H2). */
  title: ReactNode;
  /** Body copy. */
  body: ReactNode;
  /** Method names rendered as scattered, tilted chips. */
  methods: string[];
  /** Credential line under the chips (e.g. "M.A. … · 30+ years"). */
  credential?: ReactNode;
  /** Portrait images (280:460) looped in the Marquee. Ignored when `children` is set. */
  images?: MethodsSectionImage[];
  /** Custom marquee content (portrait cards). Looped instead of `images`. */
  children?: ReactNode;
  /** Marquee loop speed in seconds. @default 40 */
  marqueeSpeed?: number;
}

/** Playful tilt + tone pattern for the method chips (deterministic, matches the design's scatter). */
const CHIP_ROTATIONS = [-5.8, 4.96, -4.49, 8.55, 0, -7.01, 5.57, 0, -5.38];
const CHIP_TONES: ChipTone[] = ["mint", "peach", "mint", "peach", "mint", "mint", "outline", "mint", "outline"];

/**
 * MethodsSection — Camille's philosophy band (Figma 140:6870): eyebrow + H2 + body
 * + scattered method chips + credential line, beside an infinite `Marquee` of
 * PORTRAIT 280×460 photo cards with edge fade. Two columns on desktop, stacked on
 * phone with the marquee full-width below the copy. Composes Eyebrow, Heading,
 * Text, Chip and Marquee atoms. Pair with the `section-bg--methods` background.
 */
export function MethodsSection({
  eyebrow,
  title,
  body,
  methods,
  credential,
  images,
  children,
  marqueeSpeed = 40,
  className,
  ...rest
}: MethodsSectionProps) {
  return (
    <section className={["aui-methods", className].filter(Boolean).join(" ")} {...rest}>
      <div className="aui-methods__copy">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading level={2}>{title}</Heading>
        <Text className="aui-methods__body">{body}</Text>
        <ul className="aui-methods__chips">
          {methods.map((m, i) => (
            <li
              key={m}
              className="aui-methods__chip"
              style={{ transform: `rotate(${CHIP_ROTATIONS[i % CHIP_ROTATIONS.length]}deg)` }}
            >
              <Chip tone={CHIP_TONES[i % CHIP_TONES.length]}>{m}</Chip>
            </li>
          ))}
        </ul>
        {credential && (
          <Text as="p" size="lg" className="aui-methods__credential">
            {credential}
          </Text>
        )}
      </div>

      <div className="aui-methods__media">
        <Marquee speed={marqueeSpeed} gap={16} fade>
          {children
            ? children
            : (images ?? []).map((img, i) => (
                <img key={i} className="aui-methods__photo" src={img.src} alt={img.alt ?? ""} loading="lazy" />
              ))}
        </Marquee>
      </div>
    </section>
  );
}

export default MethodsSection;
