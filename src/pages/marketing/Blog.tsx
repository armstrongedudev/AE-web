import { ArrowRight } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/macro";
import { Button, Chip, Heading, Text, Eyebrow } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Blog.css";

/** A single blog post. `body` holds typed sections rendered on the article page. */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date (YYYY-MM-DD) — rendered inside <time dateTime>. */
  date: string;
  category: string;
  readingTime: string;
  /** Optional longer-form body for the article page. */
  body?: { heading?: string; paragraphs: string[] }[];
}

// TODO(api): move posts to CMS — wire to the topical-authority hub once content is in place.
export const POSTS: BlogPost[] = [
  {
    slug: "reggio-emilia-in-the-us-classroom",
    title: "Reggio Emilia in the U.S. classroom: where to actually begin",
    excerpt:
      "You don't need to redesign your whole room overnight. Here's how to bring the Reggio image of the child into a typical Georgia early-learning program — starting Monday.",
    date: "2026-05-28",
    category: "Reggio Emilia",
    readingTime: "7 min read",
    body: [
      {
        paragraphs: [
          "Reggio Emilia is often described as a method, but it's closer to a stance — a set of beliefs about who the child is and what learning looks like. The good news for busy educators is that you can honor that stance without importing an entire Italian preschool. You start with what you already have: children, materials, and your own attention.",
          "When I work with programs across Metro Atlanta, I ask teachers to resist the urge to buy anything for the first month. Reggio is not a shopping list. It's a way of noticing.",
        ],
      },
      {
        heading: "1. Make the child's thinking visible",
        paragraphs: [
          "Documentation is the heartbeat of a Reggio-inspired room. Photograph a child mid-investigation, transcribe what they say, and put it back on the wall at their eye level. Families see it. Children revisit it. And you begin to plan from what's actually happening rather than from a themed calendar.",
          "Start small: one panel, one investigation, one week. Documentation that's sustainable beats documentation that's perfect.",
        ],
      },
      {
        heading: "2. Slow down the environment",
        paragraphs: [
          "Open-ended materials — loose parts, natural objects, neutral trays — invite the kind of sustained, self-directed play that emergent curriculum depends on. You don't need a budget; you need a basket and a willingness to wait.",
          "The teacher's role shifts from director to co-researcher. You observe, you offer a provocation, and you let the children lead the question.",
        ],
      },
      {
        heading: "Bringing it back to your standards",
        paragraphs: [
          "None of this competes with Georgia's early-learning standards — it serves them. Emergent, observation-led practice still hits every domain; it just gets there through the child's interest instead of around it. That's the work we do together in training.",
        ],
      },
    ],
  },
  {
    slug: "reading-play-schemas",
    title: "Reading play schemas: what repetition is really telling you",
    excerpt:
      "Why does that toddler keep dumping the blocks? Schemas are the patterns beneath the behavior — and once you can read them, planning gets a whole lot easier.",
    date: "2026-05-14",
    category: "Play schemas",
    readingTime: "6 min read",
    body: [
      {
        paragraphs: [
          "Transporting, enveloping, rotating, connecting — schemas are the repeated patterns children return to as they build understanding of how the world works. The behavior that looks like 'mess' is often a child deep in research.",
          "When you can name a schema, a frustrating moment becomes a planning opportunity.",
        ],
      },
      {
        heading: "The most common schemas in the early years",
        paragraphs: [
          "Trajectory (throwing, dropping), transporting (carrying things from here to there), enclosing and enveloping, rotation, and connection. Watch for a week and you'll start to see the same children chasing the same patterns across very different activities.",
        ],
      },
      {
        heading: "Plan with the schema, not against it",
        paragraphs: [
          "A child who throws isn't being defiant — they may be exploring trajectory. Offer beanbags and a target. A child who empties every basket may be transporting; give them bags, trolleys, and a destination. You meet the developmental drive instead of fighting it.",
        ],
      },
    ],
  },
  {
    slug: "loose-parts-on-any-budget",
    title: "Loose parts on any budget: a starter kit from the recycling bin",
    excerpt:
      "Open-ended materials are the engine of creative, problem-solving play — and most of them are already in your kitchen, garage, or recycling bin.",
    date: "2026-04-30",
    category: "Loose parts",
    readingTime: "5 min read",
    body: [
      {
        paragraphs: [
          "Loose parts are materials with no fixed purpose: corks, fabric scraps, pinecones, bottle caps, tubes, rings, stones. Because they can become anything, they hand creative control back to the child.",
          "You do not need a catalogue. You need to start collecting — and to think about storage so it stays inviting rather than chaotic.",
        ],
      },
      {
        heading: "A first collection",
        paragraphs: [
          "Natural: pinecones, shells, smooth stones, sticks, seed pods. Recycled: jar lids, cardboard tubes, fabric remnants, corks. Hardware-store: washers, dowels, chain, tiles. Curate by color or material to make trays feel intentional.",
        ],
      },
      {
        heading: "Safety and the right age",
        paragraphs: [
          "Match the size of the part to the age of the child, supervise closely with under-threes, and rotate collections so they stay novel. Less, refreshed often, beats more left out forever.",
        ],
      },
    ],
  },
  {
    slug: "emergent-vs-themed-curriculum",
    title: "Emergent vs. themed curriculum: structure and following the child",
    excerpt:
      "Following children's interests doesn't mean abandoning your plan. Here's how emergent curriculum holds rigor while staying responsive.",
    date: "2026-04-16",
    category: "Emergent curriculum",
    readingTime: "8 min read",
    body: [
      {
        paragraphs: [
          "The fear with emergent curriculum is that 'following the child' becomes 'no plan at all.' In practice, the opposite is true: responsive planning asks more of you, not less.",
          "You still set intentions. You just hold them loosely enough to follow the question the children actually raise.",
        ],
      },
      {
        heading: "The weekly rhythm",
        paragraphs: [
          "Observe, document, and meet briefly as a team to decide the next provocation. The plan is written in pencil. By Friday you can show families exactly how a child's question drove the week — and exactly which standards it touched.",
        ],
      },
    ],
  },
  {
    slug: "becoming-a-decal-approved-trainer",
    title: "Becoming a DECAL-approved trainer in Georgia: the honest path",
    excerpt:
      "What it really takes to deliver approved professional development in Georgia — credentials, content, and the difference between counting hours and changing practice.",
    date: "2026-04-02",
    category: "DECAL & certification",
    readingTime: "9 min read",
    body: [
      {
        paragraphs: [
          "Georgia educators need professional development hours every year, and programs need them to count. Becoming an approved trainer means meeting Bright from the Start's requirements — and, more importantly, delivering content that actually moves practice.",
          "After 30+ years and an M.A. in Educational Psychology, my view is simple: hours are the floor, not the goal.",
        ],
      },
      {
        heading: "Credentials and approval",
        paragraphs: [
          "Approval considers your qualifications, your content, and your delivery. The paperwork matters, but so does whether teachers leave with something they can use on Monday morning.",
        ],
      },
    ],
  },
  {
    slug: "documentation-families-and-inspectors-love",
    title: "Documentation that families — and inspectors — actually love",
    excerpt:
      "Make children's thinking visible with panels and portfolios that do double duty: deepening practice while sailing through your next review.",
    date: "2026-03-19",
    category: "Documentation",
    readingTime: "6 min read",
    body: [
      {
        paragraphs: [
          "Good documentation isn't a scrapbook. It's evidence of thinking — the child's and yours — and it pays off twice: with families who finally 'get' what play-based learning is, and with reviewers who can see your intentionality at a glance.",
        ],
      },
      {
        heading: "The anatomy of a strong panel",
        paragraphs: [
          "A photo of the moment, the child's own words, a short line of your interpretation, and the standard or developmental link. Keep it honest and specific. One real panel beats ten decorative ones.",
        ],
      },
    ],
  },
];

const FEATURED = POSTS[0];
const REST = POSTS.slice(1);
const CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category)));

/** Format an ISO date as a readable label (e.g. "May 28, 2026"). */
export function formatPostDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Blog — topical-authority hub. Header band, a featured post, category chips,
 * a responsive grid of post cards (each → /blog/<slug>), and a newsletter CTA.
 * Renders inside MarketingLayout, so it returns page sections only.
 */
export default function Blog() {
  useDocumentTitle(
    "Blog — practical early-childhood articles",
    "Reggio Emilia, play schemas, loose parts and emergent curriculum — classroom-ready ideas from a DECAL-approved trainer."
  );

  return (
    <>
      {/* Header band */}
      <section className="blog-hero band-cream section" aria-labelledby="blog-title">
        <div className="container blog-hero__inner">
          <Eyebrow>From the studio</Eyebrow>
          <Heading level="display" id="blog-title" className="blog-hero__title">
            Classroom-ready ideas, grounded in 30 years of practice
          </Heading>
          <Text size="lg" tone="body" className="blog-hero__sub">
            Short, practical reads on Reggio Emilia, play schemas, loose parts and emergent
            curriculum — written for the educators and directors I work with across Metro Atlanta
            and online.
          </Text>

          <ul className="blog-cats" aria-label="Browse by topic">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Chip tone="mint" size="md">
                  {c}
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured post */}
      <section
        className="blog-featured section-bg--methods section"
        aria-labelledby="blog-featured-title"
      >
        <div className="container">
          <SectionHeader eyebrow="Featured" title="This month's read" align="left" />
          <a className="blog-featured__card" href={`/blog/${FEATURED.slug}`}>
            <article className="blog-featured__article">
              <div className="blog-featured__meta">
                <Chip tone="peach" size="sm">
                  {FEATURED.category}
                </Chip>
                <Text as="span" size="sm" tone="muted">
                  <time dateTime={FEATURED.date}>{formatPostDate(FEATURED.date)}</time> ·{" "}
                  {FEATURED.readingTime}
                </Text>
              </div>
              <Heading level={2} id="blog-featured-title" className="blog-featured__heading">
                {FEATURED.title}
              </Heading>
              <Text size="lg" tone="body" className="blog-featured__excerpt">
                {FEATURED.excerpt}
              </Text>
              <span className="blog-featured__cue">
                Read the article
                <ArrowRight size={18} weight="bold" aria-hidden />
              </span>
            </article>
          </a>
        </div>
      </section>

      {/* Post grid */}
      <section className="blog-grid-section band-mint section" aria-labelledby="blog-all-title">
        <div className="container">
          <SectionHeader eyebrow="All articles" title="More from the blog" align="left" />
          <ul className="blog-grid">
            {REST.map((p) => (
              <li key={p.slug} className="blog-grid__item">
                <a className="blog-card" href={`/blog/${p.slug}`}>
                  <article className="blog-card__body">
                    <Chip tone="mint" size="sm">
                      {p.category}
                    </Chip>
                    <Heading level={3} className="blog-card__title">
                      {p.title}
                    </Heading>
                    <Text size="md" tone="body" className="blog-card__excerpt">
                      {p.excerpt}
                    </Text>
                    <div className="blog-card__foot">
                      <Text as="span" size="sm" tone="muted">
                        <time dateTime={p.date}>{formatPostDate(p.date)}</time> · {p.readingTime}
                      </Text>
                      <span className="blog-card__arrow" aria-hidden>
                        <ArrowRight size={16} weight="bold" />
                      </span>
                    </div>
                  </article>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Newsletter / contact CTA */}
      <section className="blog-cta section-bg--testimonials section" aria-labelledby="blog-cta-title">
        <div className="container blog-cta__inner">
          <Eyebrow>Stay in the loop</Eyebrow>
          <Heading level={2} id="blog-cta-title" className="blog-cta__title">
            Want these ideas before your next planning meeting?
          </Heading>
          <Text size="lg" tone="body" className="blog-cta__sub">
            Bring a workshop to your program, or get in touch about training tailored to your team.
          </Text>
          <div className="blog-cta__actions">
            <Button href="/contact" variant="cta" size="lg" trailingIcon={ArrowRight}>
              Get in touch
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              See pricing
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
