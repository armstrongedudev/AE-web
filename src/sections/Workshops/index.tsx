import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeader, WorkshopCard } from "@/components/macro";
import "./Workshops.css";

const WORKSHOPS = [
  {
    tag: "2 hours",
    title: "Schemas & Play",
    description:
      "Read the repeated patterns in children's play and turn them into provocations that extend learning.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "2 hours",
    title: "Loose Parts",
    description:
      "Build open-ended environments with everyday materials that invite creativity and problem-solving.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "3 hours",
    title: "Supportive Social Learning",
    description:
      "Practical strategies for guiding conflict, collaboration and belonging in the early-years room.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "1.5 hours",
    title: "Rethinking Infant Spaces",
    description:
      "Design calm, responsive infant environments rooted in respect and close observation.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "2 hours",
    title: "Multiple Intelligences",
    description:
      "Plan for the many ways children are smart — and document growth across every domain.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "2 hours",
    title: "Documentation that Speaks",
    description:
      "Make children's thinking visible with panels and portfolios families and inspectors love.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
  {
    tag: "2.5 hours",
    title: "Emergent Curriculum",
    description:
      "Plan responsively from children's questions while still meeting your program's standards.",
    cta: "Book this workshop",
    ctaHref: "#contact",
  },
];

// Cap the rail at 7; everything else lives on the dedicated workshops page.
const MAX = 7;
const SHOWN = WORKSHOPS.slice(0, MAX);

/**
 * Workshops — SectionHeader + a horizontal, snap-scrolling rail of up to 7
 * WorkshopCards, with a "See all workshops" CTA. The rail scrolls laterally
 * (mouse / trackpad / keyboard) and snaps card-to-card; on phone it stays a
 * 1-and-a-bit peek so the swipe affordance is obvious.
 */
export default function Workshops() {
  return (
    <section className="workshops band-cream section" id="workshops" aria-labelledby="workshops-title">
      <div className="container">
        <div className="workshops__head">
          <SectionHeader
            eyebrow="Signature workshops"
            title="Workshops educators love"
            align="left"
          />
          <a className="workshops__seeall" href="#workshops-all">
            See all workshops
            <ArrowRight size={16} weight="bold" />
          </a>
        </div>

        <ul
          className="workshops__rail"
          tabIndex={0}
          role="region"
          aria-label="Workshops — scroll sideways to browse"
        >
          {SHOWN.map((w) => (
            <li key={w.title} className="workshops__slide">
              <WorkshopCard {...w} />
            </li>
          ))}
          <li className="workshops__slide workshops__slide--all">
            <a className="workshops__all-card" href="#workshops-all">
              <span className="workshops__all-arrow" aria-hidden>
                <ArrowRight size={26} weight="bold" />
              </span>
              See all workshops
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
