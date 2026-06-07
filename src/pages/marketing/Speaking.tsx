import {
  Microphone,
  Flower,
  PuzzlePiece,
  Cube,
  Lightbulb,
  Tree,
  UsersThree,
  Monitor,
  Presentation,
  CalendarCheck,
  ArrowRight,
} from "@phosphor-icons/react";
import { SectionHeader } from "../../components/macro";
import { Button, Chip, Eyebrow, Heading, Text } from "../../components/basic";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./Speaking.css";

/** Keynote & workshop topics Camille speaks on. */
const TOPICS = [
  {
    icon: Flower,
    title: "The Reggio Emilia approach in the U.S. classroom",
    body: "How an Italian philosophy of the 'image of the child' translates into American early-childhood settings — and what it asks of teachers.",
  },
  {
    icon: PuzzlePiece,
    title: "Play schemas: reading what children are really doing",
    body: "Trajectory, transporting, enclosure and more — decoding repeated play so educators can extend, not interrupt, children's thinking.",
  },
  {
    icon: Cube,
    title: "Loose parts & the prepared environment",
    body: "Designing rooms and materials that invite open-ended exploration, creativity and problem-solving across ages 2–6.",
  },
  {
    icon: Lightbulb,
    title: "Multiple intelligences in practice",
    body: "Gardner's framework as a practical lens for planning, observation and honoring the many ways young children come to know.",
  },
  {
    icon: Tree,
    title: "Constructivist & emergent curriculum",
    body: "From Piaget and Vygotsky to the daily flow of a classroom — building learning around children's questions, not a themed calendar.",
  },
  {
    icon: Microphone,
    title: "Documentation & reflective practice",
    body: "Making children's learning visible, and helping teaching teams grow through observation, dialogue and reflection.",
  },
];

/** Past & ongoing conference engagements. */
const ENGAGEMENTS = [
  {
    event: "Jean Piaget Society Symposium",
    role: "Presenter",
    summary: "Constructivist theory translated into early-childhood classroom practice.",
  },
  {
    event: "GAEYC Annual Conference",
    role: "Workshop leader",
    summary: "Play schemas and loose parts for Georgia educators and program directors.",
  },
  {
    event: "Child & Family Development Conference",
    role: "Featured speaker",
    summary: "The image of the child — respectful, observation-led early-childhood education.",
  },
];

/** Formats Camille can deliver, in person across Metro Atlanta or live-online. */
const FORMATS = [
  {
    icon: Presentation,
    title: "Conference keynotes",
    body: "A 45–75 minute keynote to open or anchor your early-childhood event, tailored to your theme.",
  },
  {
    icon: UsersThree,
    title: "Breakout workshops",
    body: "Interactive 1–3 hour sessions for educators — practical, reflective and ready for Monday.",
  },
  {
    icon: Monitor,
    title: "Live-online sessions",
    body: "The same talks delivered over Zoom for distributed teams and virtual conferences, anywhere.",
  },
];

/**
 * Speaking — keynotes & conference sessions for early-childhood events.
 * Renders inside MarketingLayout (Navbar/Footer provided). Hero band → topics
 * list → past engagements → formats → "book Camille to speak" CTA.
 */
export default function Speaking() {
  useDocumentTitle(
    "Speaking & keynotes — Anna Camille Hampton",
    "Book Anna Camille Hampton — DECAL-approved trainer and Reggio Emilia practitioner — for early-childhood keynotes and workshops in Atlanta and online."
  );

  return (
    <>
      {/* ---- Hero band ---- */}
      <section className="speak-hero section-bg--methods" aria-labelledby="speak-hero-title">
        <div className="speak-hero__inner">
          <Eyebrow>Speaking &amp; keynotes</Eyebrow>
          <Heading level={1} id="speak-hero-title" className="speak-hero__title">
            A warm, research-grounded voice for your early-childhood event
          </Heading>
          <Text size="lg" className="speak-hero__lede">
            Anna Camille Hampton brings 30+ years and a Reggio Emilia practice to conference
            stages and professional-development days — translating big ideas into practice
            educators can use the very next morning.
          </Text>
          <div className="speak-hero__actions">
            <Button href="/contact" variant="primary" size="lg" trailingIcon={ArrowRight}>
              Book Camille to speak
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              Meet Camille
            </Button>
          </div>
          <div className="speak-hero__chips">
            <Chip tone="mint" icon={Microphone}>
              Keynotes &amp; workshops
            </Chip>
            <Chip tone="peach">Metro Atlanta &amp; the Carolinas</Chip>
            <Chip tone="mint">Live-online anywhere</Chip>
          </div>
        </div>
      </section>

      {/* ---- Topics ---- */}
      <section className="speak-topics section-bg--workshops" aria-labelledby="speak-topics-title">
        <div className="speak-topics__inner">
          <SectionHeader
            id="speak-topics-title"
            eyebrow="What I speak on"
            title="Talks & workshop topics"
            subtitle="Every session is shaped to your audience — choose a topic below, or tell us your theme."
          />
          <ul className="speak-topics__grid">
            {TOPICS.map((t) => {
              const TIcon = t.icon;
              return (
                <li key={t.title} className="speak-topic">
                  <span className="speak-topic__badge" aria-hidden="true">
                    <TIcon size={24} weight="regular" />
                  </span>
                  <Heading level={4} className="speak-topic__title">
                    {t.title}
                  </Heading>
                  <Text className="speak-topic__body">{t.body}</Text>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Past engagements ---- */}
      <section className="speak-engagements" aria-labelledby="speak-engagements-title">
        <div className="speak-engagements__inner">
          <SectionHeader
            id="speak-engagements-title"
            eyebrow="Selected engagements"
            title="Where Camille has spoken"
          />
          <ul className="speak-engagements__list">
            {ENGAGEMENTS.map((e) => (
              <li key={e.event} className="speak-engagement">
                <span className="speak-engagement__icon" aria-hidden="true">
                  <CalendarCheck size={22} weight="regular" />
                </span>
                <div className="speak-engagement__body">
                  <h3 className="speak-engagement__event">{e.event}</h3>
                  <p className="speak-engagement__role">{e.role}</p>
                  <p className="speak-engagement__summary">{e.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Formats ---- */}
      <section className="speak-formats section-bg--workshops" aria-labelledby="speak-formats-title">
        <div className="speak-formats__inner">
          <SectionHeader
            id="speak-formats-title"
            eyebrow="Formats"
            title="Ways to bring Camille in"
          />
          <ul className="speak-formats__grid">
            {FORMATS.map((f) => {
              const FIcon = f.icon;
              return (
                <li key={f.title} className="speak-format">
                  <span className="speak-format__badge" aria-hidden="true">
                    <FIcon size={24} weight="regular" />
                  </span>
                  <Heading level={4} className="speak-format__title">
                    {f.title}
                  </Heading>
                  <Text className="speak-format__body">{f.body}</Text>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---- Booking CTA band ---- */}
      <section className="speak-cta section-bg--testimonials" aria-labelledby="speak-cta-title">
        <div className="speak-cta__inner">
          <div className="speak-cta__card">
            <Eyebrow className="speak-cta__eyebrow">Book a speaker</Eyebrow>
            <h2 id="speak-cta-title" className="speak-cta__title">
              Booking a speaker for your event?
            </h2>
            <p className="speak-cta__body">
              Tell us your dates, audience and theme — Camille will craft a keynote or workshop
              that fits. In person across Metro Atlanta, or live-online anywhere.
            </p>
            <div className="speak-cta__actions">
              <Button href="/contact" variant="cta" size="lg" trailingIcon={ArrowRight}>
                Book Camille to speak
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
