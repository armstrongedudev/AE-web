import { Star, ChatCircleText, Microphone, ArrowRight } from "@phosphor-icons/react";
import Testimonials from "@/sections/Testimonials";
import SuccessStories from "@/sections/SuccessStories";
import { SectionHeader } from "@/components/macro";
import { Button, Chip, Eyebrow, Heading, Text } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Reviews.css";

const STATS: { value: string; label: string }[] = [
  { value: "5.0", label: "Average rating from post-training surveys" },
  { value: "30+", label: "Years training early-childhood educators" },
  { value: "200+", label: "Educators trained across GA, SC & NC" },
  { value: "100%", label: "DECAL-approved, GaPDS-aligned hours" },
];

/** How Camille responds to constructive feedback — a trust signal. */
const FEEDBACK: { title: string; body: string }[] = [
  {
    title: "Pacing & participation",
    body:
      "Sessions are re-timed around the room — more hands-on practice when a group wants to slow down, tighter framing when they want to move.",
  },
  {
    title: "Audio & venue",
    body:
      "A pre-event checklist (mic, sightlines, seating, materials table) is shared with every host so the day runs without friction.",
  },
  {
    title: "Follow-through",
    body:
      "Every engagement closes with a one-page plan teachers can use Monday morning — and a short check-in offer afterward.",
  },
];

/**
 * Reviews — testimonials + in-depth success stories as social proof. Header band,
 * the infinite Testimonials marquee, a trust/stats band, SuccessStories case
 * studies, a "how Camille responds to feedback" trust block, and a CTA to
 * /pricing + /contact.
 */
export default function Reviews() {
  useDocumentTitle(
    "Reviews — What Educators Say About Camille",
    "Real testimonials and success stories from directors and educators trained by Camille Hampton across Metro Atlanta and online."
  );

  return (
    <>
      {/* Header band */}
      <header className="reviews-hero section-bg--testimonials">
        <div className="reviews-hero__inner">
          <Eyebrow>Reviews & success stories</Eyebrow>
          <Heading level={1} className="reviews-hero__title">
            What educators say about Camille
          </Heading>
          <Text size="lg" tone="body" className="reviews-hero__lede">
            Directors, owners and lead teachers share what changed for their
            classrooms after training grounded in the Reggio Emilia approach.
            Honest feedback, documented from post-training surveys.
          </Text>
          <div className="reviews-hero__rating" aria-label="Rated 5 out of 5">
            <span className="reviews-hero__stars" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} weight="fill" />
              ))}
            </span>
            <Text size="sm" tone="muted">
              <strong>5.0 out of 5</strong> · from documented educator surveys
            </Text>
          </div>
        </div>
      </header>

      {/* Infinite testimonials marquee */}
      <Testimonials />

      {/* Trust / stats band */}
      <section className="reviews-stats" aria-label="Track record">
        <div className="reviews-stats__inner">
          {STATS.map((s) => (
            <div className="reviews-stat" key={s.label}>
              <p className="reviews-stat__value">{s.value}</p>
              <p className="reviews-stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Case-study success stories */}
      <SuccessStories />

      {/* How Camille responds to feedback — trust block */}
      <section className="reviews-feedback section-bg--methods" aria-labelledby="reviews-feedback-title">
        <div className="reviews-feedback__inner">
          <SectionHeader
            id="reviews-feedback-title"
            eyebrow="Constructive feedback"
            title="How Camille acts on what educators tell her"
            subtitle="Feedback isn't just collected — it shapes the next session. Here's what changes."
          />
          <div className="reviews-feedback__grid">
            {FEEDBACK.map((f, i) => (
              <article className="reviews-feedback__card" key={f.title}>
                <span className="reviews-feedback__icon" aria-hidden>
                  {i === 0 ? (
                    <ChatCircleText size={24} />
                  ) : i === 1 ? (
                    <Microphone size={24} />
                  ) : (
                    <ArrowRight size={24} />
                  )}
                </span>
                <Heading level={4} as="h3">
                  {f.title}
                </Heading>
                <Text tone="body">{f.body}</Text>
              </article>
            ))}
          </div>
          <p className="reviews-feedback__external">
            <a href="https://www.google.com/search?q=Armstrong+Educational+Services+reviews" target="_blank" rel="noopener noreferrer">
              Read more reviews on Google Business Profile
              <ArrowRight size={15} />
            </a>
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="reviews-cta" aria-labelledby="reviews-cta-title">
        <div className="reviews-cta__inner">
          <Chip tone="mint" size="sm">
            Ready when you are
          </Chip>
          <Heading level={2} id="reviews-cta-title" className="reviews-cta__title">
            Bring this to your team
          </Heading>
          <Text size="lg" tone="body" className="reviews-cta__lede">
            Build a quote in about a minute, or reach out and Camille will help
            shape a training around your classrooms.
          </Text>
          <div className="reviews-cta__actions">
            <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
              Build your quote
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Camille
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
