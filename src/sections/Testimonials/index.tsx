import { SectionHeader, TestimonialCard, Marquee } from "@/components/macro";
import type { TestimonialTone } from "@/components/macro";
import "./Testimonials.css";

const QUOTES: {
  name: string;
  role: string;
  rating: number;
  quote: string;
  tone: TestimonialTone;
}[] = [
  {
    name: "Maria T.",
    role: "Center Director, Decatur",
    rating: 5,
    tone: "mint",
    quote:
      "Camille's training shifted how our whole team sees the classroom. We stopped managing behavior and started observing children — and our rooms feel calmer for it.",
  },
  {
    name: "Daniela R.",
    role: "Lead Pre-K Teacher",
    rating: 5,
    tone: "rose",
    quote:
      "The loose parts workshop gave me things I could try Monday morning. My kids are more engaged and I finally understand the 'why' behind the play.",
  },
  {
    name: "Aisha K.",
    role: "Owner, Home-based Program",
    rating: 5,
    tone: "peach",
    quote:
      "Practical, warm, and grounded in real research. Camille meets you where you are and leaves you with a plan you actually use.",
  },
  {
    name: "Marcus B.",
    role: "Assistant Director, Savannah",
    rating: 5,
    tone: "mint",
    quote:
      "Grounded in real classrooms. Our team left with concrete things to try and the confidence to keep going.",
  },
  {
    name: "Lena P.",
    role: "Pre-K Lead, Macon",
    rating: 5,
    tone: "rose",
    quote:
      "The best professional development we've done — close observation finally clicked for the whole team.",
  },
];

/**
 * Testimonials — SectionHeader + an infinite, slow auto-scrolling Marquee of
 * TestimonialCards. The track loops seamlessly, fades in/out at both edges, and
 * pauses on hover so a visitor can stop and read a card. Honors
 * prefers-reduced-motion (motion off, manual scroll instead).
 */
export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title="What educators said about Camille"
          align="left"
        />
      </div>
      <Marquee
        className="testimonials__marquee"
        speed={55}
        fade
        gap={24}
        aria-label="What educators say about Camille"
      >
        {QUOTES.map((q) => (
          <TestimonialCard key={q.name} {...q} />
        ))}
      </Marquee>
    </section>
  );
}
