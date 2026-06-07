import type { HTMLAttributes, ReactNode } from "react";
import { SectionHeader } from "../../components/macro/SectionHeader";
import { Chip } from "../../components/basic/Chip";
import type { ChipTone } from "../../components/basic/Chip";
import { Heading } from "../../components/basic/Heading";
import { Text } from "../../components/basic/Text";
import "./SuccessStories.css";

export interface SuccessCase {
  /** Short context tag, e.g. "Private preschool · Decatur, GA". */
  context: string;
  /** Chip + dot tone. */
  tone: ChipTone & ("mint" | "peach" | "outline");
  /** Result metric. */
  metric: { value: ReactNode; label: ReactNode };
  /** Outcome headline. */
  title: ReactNode;
  /** The story (challenge → approach → result). */
  story: ReactNode;
  /** Attribution (role/person). */
  by: string;
}

export interface SuccessStoriesProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  cases?: SuccessCase[];
  /** Show the "sample content" note. @default true */
  showSampleNote?: boolean;
}

/**
 * SAMPLE success stories — placeholders grounded in Camille's real service
 * (Georgia DECAL trainer, Reggio Emilia, ages 2–6, directors/owners, Metro
 * Atlanta + online). Replace with Camille's real case studies when available.
 */
const SAMPLE_CASES: SuccessCase[] = [
  {
    context: "Private preschool · Decatur, GA",
    tone: "mint",
    metric: { value: "12", label: "educators DECAL-certified together" },
    title: "One team, one way of observing",
    story:
      "A three-classroom center booked an on-site group training. Over a term the staff adopted shared observation and documentation routines grounded in the Reggio Emilia approach — and met their annual Bright from the Start hours as a team.",
    by: "Director · private preschool",
  },
  {
    context: "Lead teacher · Online",
    tone: "peach",
    metric: { value: "30+", label: "DECAL hours, self-paced" },
    title: "From theory to Monday morning",
    story:
      "An individual pre-K teacher used the self-paced courses to complete her annual DECAL hours, then rebuilt her room around loose parts and emergent curriculum — putting child-development theory into daily practice.",
    by: "Pre-K lead teacher",
  },
  {
    context: "Daycare network · Metro Atlanta",
    tone: "outline",
    metric: { value: "4", label: "sites on one shared method" },
    title: "Consistency across every room",
    story:
      "A multi-site owner licensed the annual training pack so every educator — across four locations — develops on the same Reggio-grounded practices and documentation standards, keeping quality consistent as the network grows.",
    by: "Owner / director",
  },
];

const dotTone = (t: SuccessCase["tone"]) => (t === "outline" ? "rose" : t);

/** SuccessStories — "casos de éxito" band: 3 case-study cards. */
export function SuccessStories({
  eyebrow = "Success stories",
  title = "Real classrooms, real change",
  subtitle = "How directors and educators put the training to work — and what changed for their teams.",
  cases = SAMPLE_CASES,
  showSampleNote = true,
  className,
  ...rest
}: SuccessStoriesProps) {
  return (
    <section className={["aui-success", className].filter(Boolean).join(" ")} {...rest}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      {showSampleNote && (
        <p className="aui-success__note">
          Sample stories — placeholder content until Camille's real case studies are added.
        </p>
      )}
      <div className="aui-success__grid">
        {cases.map((c, i) => (
          <article className="aui-case" key={i}>
            <Chip tone={c.tone} size="sm">
              {c.context}
            </Chip>
            <div className="aui-case__metric">
              <Heading level={3} as="p" className="aui-case__num">
                {c.metric.value}
              </Heading>
              <Text size="sm" tone="muted">
                {c.metric.label}
              </Text>
            </div>
            <Heading level={4} as="h3">
              {c.title}
            </Heading>
            <Text className="aui-case__story">{c.story}</Text>
            <div className="aui-case__by">
              <span className={`aui-case__dot aui-case__dot--${dotTone(c.tone)}`}>
                {String(c.by).trim()[0]?.toUpperCase()}
              </span>
              <Text size="sm" tone="muted">
                {c.by}
              </Text>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SuccessStories;
