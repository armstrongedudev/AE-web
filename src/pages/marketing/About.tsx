import {
  GraduationCap,
  SealCheck,
  Flower,
  Clock,
  Eye,
  Handshake,
  ChatsCircle,
  PuzzlePiece,
  ArrowRight,
} from "@phosphor-icons/react";
import { StatsStrip, SectionHeader } from "../../components/macro";
import { Button, Chip, Eyebrow, Heading, Text } from "../../components/basic";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./About.css";

/** Credential stack — reuses the StatsStrip credentials band from the design system. */
const CREDENTIALS = [
  { value: "30+ years", label: "In early-childhood education", icon: Clock },
  { value: "DECAL-approved", label: "Bright from the Start trainer", icon: SealCheck },
  { value: "M.A. Ed Psych", label: "CU Denver", icon: GraduationCap },
  { value: "Reggio Emilia", label: "Boulder Journey School", icon: Flower },
];

/** The methodology / values she weaves into every training. */
const VALUES = [
  "Reggio Emilia",
  "Constructivism",
  "Social constructivism",
  "Schema theory",
  "Multiple intelligences",
  "Loose parts",
  "Emergent curriculum",
  "Documentation",
  "Reflective practice",
];

/** The principles that shape how Camille teaches and coaches. */
const PRINCIPLES = [
  {
    icon: Eye,
    title: "Observation is love",
    body: "Close, unhurried observation is the foundation of respect for the child — and the starting point for every plan, environment and conversation.",
  },
  {
    icon: PuzzlePiece,
    title: "Play is research",
    body: "Children build understanding by doing. Loose parts, schemas and emergent curriculum turn the classroom into a laboratory for thinking.",
  },
  {
    icon: ChatsCircle,
    title: "Theory you can use Monday",
    body: "Big ideas only matter if they reach the floor. Camille translates Piaget, Vygotsky and Gardner into practice teachers can try the next morning.",
  },
  {
    icon: Handshake,
    title: "Coaching, not lecturing",
    body: "Trainings are warm, reflective and practical — built around your educators, your space and the realities of your center.",
  },
];

/**
 * About Camille — Anna Camille Hampton's story page.
 * Renders inside MarketingLayout (Navbar/Footer provided), so this returns only
 * the page sections. Hero band → credentials strip → approach/philosophy →
 * value chips → closing CTA band.
 */
export default function About() {
  useDocumentTitle(
    "About Anna Camille Hampton",
    "Anna Camille Hampton — Georgia DECAL-approved trainer, M.A. Educational Psychology, 30+ years, Reggio Emilia practitioner serving Metro Atlanta and online."
  );

  return (
    <>
      {/* ---- Hero band ---- */}
      <section className="about-hero section-bg--methods" aria-labelledby="about-hero-title">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <Eyebrow>Meet Camille</Eyebrow>
            <Heading level={1} id="about-hero-title" className="about-hero__title">
              Anna Camille Hampton
            </Heading>
            <Text size="lg" className="about-hero__lede">
              Georgia DECAL-approved trainer, M.A. in Educational Psychology, and a Reggio
              Emilia practitioner with 30+ years in early-childhood education — serving Metro
              Atlanta and the Carolinas in person, and educators everywhere online.
            </Text>
            <Text className="about-hero__body">
              A mother of two and a lifelong teacher, Camille has lived every seat in the
              field: classroom teacher, center director, instructional coach, and now
              consultant. She trained in the Reggio Emilia approach at Boulder Journey School,
              earned her M.A. at CU Denver, and brought that practice from Boulder to Atlanta —
              where she helps schools and individual educators turn theory into the everyday
              work of respecting children.
            </Text>
            <div className="about-hero__actions">
              <Button href="/contact" variant="primary" size="lg" trailingIcon={ArrowRight}>
                Book a discovery call
              </Button>
              <Button href="/pricing" variant="secondary" size="lg">
                See pricing
              </Button>
            </div>
          </div>

          <figure className="about-hero__portrait">
            <img
              src="/brand/hero-camille-composite.png"
              alt="Anna Camille Hampton, early childhood consultant and DECAL-approved trainer"
              className="about-hero__img"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      {/* ---- Credentials strip ---- */}
      <section className="about-creds" aria-labelledby="about-creds-title">
        <div className="about-creds__inner">
          <h2 id="about-creds-title" className="about-creds__heading">
            A credential stack you can trust
          </h2>
          <StatsStrip items={CREDENTIALS} />
        </div>
      </section>

      {/* ---- Approach / philosophy ---- */}
      <section className="about-approach section-bg--workshops" aria-labelledby="about-approach-title">
        <div className="about-approach__inner">
          <SectionHeader
            id="about-approach-title"
            eyebrow="Her approach"
            title="Play is research. Observation is love."
            subtitle="The beliefs behind every training, woven from the research traditions Camille has practiced for three decades."
          />

          <ul className="about-approach__grid">
            {PRINCIPLES.map((p) => {
              const PIcon = p.icon;
              return (
                <li key={p.title} className="about-principle">
                  <span className="about-principle__badge" aria-hidden="true">
                    <PIcon size={24} weight="regular" />
                  </span>
                  <Heading level={4} className="about-principle__title">
                    {p.title}
                  </Heading>
                  <Text className="about-principle__body">{p.body}</Text>
                </li>
              );
            })}
          </ul>

          <div className="about-approach__methods">
            <p className="about-approach__methods-label">The traditions she draws on</p>
            <div className="about-approach__chips">
              {VALUES.map((v, i) => (
                <Chip key={v} tone={i % 2 === 0 ? "mint" : "peach"}>
                  {v}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Closing CTA band ---- */}
      <section className="about-cta section-bg--testimonials" aria-labelledby="about-cta-title">
        <div className="about-cta__inner">
          <div className="about-cta__card">
            <Eyebrow className="about-cta__eyebrow">Work with Camille</Eyebrow>
            <h2 id="about-cta-title" className="about-cta__title">
              Bring respectful, research-grounded practice to your team
            </h2>
            <p className="about-cta__body">
              Whether you direct a center or teach a single classroom, Camille will meet you
              where you are — in person across Metro Atlanta, or online anywhere.
            </p>
            <div className="about-cta__actions">
              <Button href="/contact" variant="cta" size="lg" trailingIcon={ArrowRight}>
                Book a discovery call
              </Button>
              <Button href="/pricing" variant="white" size="lg">
                Build your quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
