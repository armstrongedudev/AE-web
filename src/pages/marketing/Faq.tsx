import { useState } from "react";
import { CaretDown, ArrowRight } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/macro";
import { Button, Heading, Text, Eyebrow } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Faq.css";

interface FaqItem {
  q: string;
  a: string;
}
interface FaqGroup {
  topic: string;
  items: FaqItem[];
}

// TODO(api): source FAQs from CMS so they stay in sync with pricing & policy pages.
const GROUPS: FaqGroup[] = [
  {
    topic: "Programs",
    items: [
      {
        q: "What does a typical workshop cover?",
        a: "Each session pairs a research foundation — Reggio Emilia, play schemas, loose parts, multiple intelligences, emergent curriculum — with practical strategies you can use the next morning. Theory always lands in something you can do in your own room.",
      },
      {
        q: "Are sessions in person or online?",
        a: "Both. I deliver in-person training across Metro Atlanta and live, interactive sessions online for programs further afield or teams that prefer to join from their own site.",
      },
      {
        q: "Can you tailor a workshop to my program?",
        a: "Yes. After a short conversation about your goals, ages served, and current challenges, I shape the content around what your team actually needs rather than a fixed script.",
      },
    ],
  },
  {
    topic: "DECAL & certification",
    items: [
      {
        q: "How many DECAL professional-development hours do I need each year?",
        a: "Georgia requires 10 hours of approved professional development per year for most early-childhood staff. The exact total can vary by role, so check your current requirement with your program director.",
      },
      {
        q: "Is Camille DECAL-approved?",
        a: "Yes. Camille is a Bright from the Start (DECAL)-approved trainer, holds an M.A. in Educational Psychology, and brings 30+ years of early-childhood experience.",
      },
      {
        q: "Online or in-person — which counts toward DECAL?",
        a: "Approved training counts whether it's delivered live online or in person. The key is that the session is approved and that you receive proper documentation of your hours, which is provided for every workshop.",
      },
    ],
  },
  {
    topic: "Pricing & booking",
    items: [
      {
        q: "How does group pricing work?",
        a: "Pricing is built around the session and your group rather than a flat per-head rate, so training a whole team is far more cost-effective than sending individuals out. Share your group size and topics and you'll get a clear quote.",
      },
      {
        q: "Why isn't a 3-hour session simply 3× the price of a 1-hour one?",
        a: "Longer sessions go deeper, but the planning, travel and setup are largely fixed regardless of length. A 3-hour workshop spreads that fixed work across more learning time, so it costs less per hour than a single short session.",
      },
      {
        q: "Are there travel fees or a minimum booking?",
        a: "In-person sessions carry a $280 minimum, and a travel fee may apply outside the core service area. Schools can be invoiced with net-30 terms. All of this is confirmed in writing before you commit.",
      },
    ],
  },
  {
    topic: "Online courses",
    items: [
      {
        q: "Are online sessions live or self-paced?",
        a: "Online training is delivered live and interactive — the same hands-on, discussion-rich experience as in-person, just over video so your team can join from one screen or several.",
      },
      {
        q: "What's the service area for in-person training?",
        a: "In-person workshops are available across Metro Atlanta. If you're outside that area, live online training reaches you with no travel fee.",
      },
    ],
  },
];

/** Accessible accordion item: a heading-wrapped button toggling its panel. */
function AccordionItem({
  item,
  id,
  open,
  onToggle,
}: {
  item: FaqItem;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `${id}-panel`;
  const buttonId = `${id}-button`;
  return (
    <div className={`faq-item${open ? " faq-item--open" : ""}`}>
      <h3 className="faq-item__heading">
        <button
          type="button"
          id={buttonId}
          className="faq-item__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq-item__q">{item.q}</span>
          <CaretDown size={20} weight="bold" className="faq-item__icon" aria-hidden />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-item__panel"
        hidden={!open}
      >
        <Text size="md" tone="body" className="faq-item__a">
          {item.a}
        </Text>
      </div>
    </div>
  );
}

/**
 * Faq — accessible accordion grouped by topic (Programs, DECAL/Certification,
 * Pricing & booking, Online courses) plus a closing contact CTA. Each item is a
 * <button aria-expanded> controlling a panel; multiple items can be open at once.
 * Renders inside MarketingLayout, so it returns page sections only.
 */
export default function Faq() {
  useDocumentTitle(
    "FAQ — programs, DECAL hours, pricing & online courses",
    "Answers on DECAL professional-development hours, certification, group pricing, travel fees and online vs in-person training."
  );

  // Track open items by their unique key so several can be expanded independently.
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <section className="faq-hero band-cream section" aria-labelledby="faq-title">
        <div className="container faq-hero__inner">
          <Eyebrow>Frequently asked</Eyebrow>
          <Heading level="display" id="faq-title" className="faq-hero__title">
            Questions, answered
          </Heading>
          <Text size="lg" tone="body" className="faq-hero__sub">
            The things educators and directors ask most — about programs, DECAL hours, pricing and
            online training. Still stuck? There's a contact link at the bottom.
          </Text>
        </div>
      </section>

      <section className="faq-body section-bg--methods section" aria-labelledby="faq-body-title">
        <div className="container">
          <h2 id="faq-body-title" className="sr-only">
            Frequently asked questions by topic
          </h2>
          <div className="faq-groups">
            {GROUPS.map((group, gi) => (
              <div className="faq-group" key={group.topic}>
                <SectionHeader title={group.topic} align="left" />
                <div className="faq-list">
                  {group.items.map((item, ii) => {
                    const key = `faq-${gi}-${ii}`;
                    return (
                      <AccordionItem
                        key={key}
                        id={key}
                        item={item}
                        open={!!open[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-cta section-bg--testimonials section" aria-labelledby="faq-cta-title">
        <div className="container faq-cta__inner">
          <Eyebrow>Still have questions?</Eyebrow>
          <Heading level={2} id="faq-cta-title" className="faq-cta__title">
            Happy to talk it through
          </Heading>
          <Text size="lg" tone="body" className="faq-cta__sub">
            Tell me about your program and what you're hoping your team will take away — I'll point
            you to the right training.
          </Text>
          <Button href="/contact" variant="cta" size="lg" trailingIcon={ArrowRight}>
            Contact Camille
          </Button>
        </div>
      </section>
    </>
  );
}
