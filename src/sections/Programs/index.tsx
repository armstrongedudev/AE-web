import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import {
  UsersThree,
  User,
  Monitor,
  Buildings,
  SealCheck,
  Star,
  ArrowRight,
} from "@phosphor-icons/react";
import "./Programs.css";

const CARDS = [
  {
    Icon: UsersThree,
    title: "Group trainings",
    body: "Live, DECAL-approved sessions for your whole staff — in person or on Zoom, priced per teacher.",
  },
  {
    Icon: User,
    title: "Individual trainings",
    body: "One educator, one topic. Flexible live sessions to meet your annual DECAL hours.",
  },
  {
    Icon: Monitor,
    title: "Self-paced courses",
    body: "Asynchronous, DECAL-approved CEU courses to take anytime, at your own pace.",
  },
];

const PACK_CHIPS = [
  "Whole-team access",
  "Lowest per-teacher rate",
  "10+ CEU hours",
  "Certificates",
  "Customisable to your center",
];

/** True when the viewport is phone-sized (≤639px). */
function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isPhone;
}

function Explore({ light = false }: { light?: boolean }) {
  return (
    <a className={`prog-explore${light ? " prog-explore--light" : ""}`} href="#contact">
      <span>Explore</span>
      <ArrowRight size={15} weight="regular" />
    </a>
  );
}

function OfferingCardEl({ Icon, title, body }: (typeof CARDS)[number]) {
  return (
    <article className="prog-card">
      <div className="prog-card__top">
        <div className="prog-card__head">
          <span className="prog-badge">
            <Icon size={24} weight="regular" />
          </span>
          <h3 className="prog-card__title">{title}</h3>
        </div>
        <p className="prog-card__body">{body}</p>
      </div>
      <Explore />
    </article>
  );
}

/** The "Annual packs" highlight — a wide banner on desktop/tablet, a compact
 *  card when it rides inside the phone carousel. */
function AnnualPackCard({ variant = "banner" }: { variant?: "banner" | "card" }) {
  const ribbon = (
    <span className="prog-ribbon">
      <Star size={14} weight="fill" />
      Most popular · for groups &amp; schools
    </span>
  );

  if (variant === "card") {
    return (
      <article className="prog-card prog-card--featured prog-card--featured-card" aria-labelledby="prog-pack-title">
        {ribbon}
        <h3 id="prog-pack-title" className="prog-card__title prog-card__title--light">
          Annual packs
        </h3>
        <p className="prog-card__body prog-card__body--light">
          A full year of Camille's trainings for your whole team — designed for groups and
          schools, at the lowest per-teacher rate.
        </p>
        <a className="prog-pack-btn" href="#contact">
          Explore annual packs
          <ArrowRight size={18} weight="bold" />
        </a>
      </article>
    );
  }

  return (
    <article className="prog-card prog-card--featured" aria-labelledby="prog-pack-title">
      {ribbon}
      <div className="prog-featured__main">
        <div className="prog-featured__copy">
          <div className="prog-card__head">
            <span className="prog-badge prog-badge--green">
              <Buildings size={24} weight="regular" />
            </span>
            <h3 id="prog-pack-title" className="prog-card__title prog-card__title--light">
              Annual packs
            </h3>
          </div>
          <p className="prog-card__body prog-card__body--light">
            A full year of Camille's trainings for your whole team — specially designed for
            groups and schools, bundling every educator's DECAL hours at the lowest per-teacher
            rate.
          </p>
          <div className="prog-chips">
            {PACK_CHIPS.map((c) => (
              <span key={c} className="prog-chip">
                <SealCheck size={14} weight="regular" />
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="prog-featured__cta">
          <a className="prog-pack-btn" href="#contact">
            Explore annual packs
            <ArrowRight size={18} weight="bold" />
          </a>
          <p className="prog-featured__note">Quote in ~60 seconds · no commitment</p>
        </div>
      </div>
    </article>
  );
}

/** Phone carousel: auto-advances left every 5s with a smooth glide, loops, fades
 *  at both edges, and shows a dot per slide. Pauses on hover/touch and honors
 *  prefers-reduced-motion. */
function ProgramsCarousel({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const count = items.length;
  const railRef = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const [active, setActive] = useState(0);

  const goTo = (i: number) => {
    const el = railRef.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setActive((a) => {
        const next = (a + 1) % count;
        goTo(next);
        return next;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [count]);

  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = Math.abs((c as HTMLElement).offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <div
      className="programs__carousel-wrap"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
    >
      <ul
        className="programs__carousel"
        ref={railRef}
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label="Programs — auto-rotating, swipe to browse"
      >
        {items.map((c, i) => (
          <li className="prog-slide" key={i}>
            {c}
          </li>
        ))}
      </ul>
      <div className="programs__dots" role="tablist" aria-label="Programs slide position">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className={`prog-dot${i === active ? " is-active" : ""}`}
            aria-label={`Go to slide ${i + 1} of ${count}`}
            aria-selected={i === active}
            onClick={() => {
              setActive(i);
              goTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Programs — leads with the highlighted "Annual packs" offer (the thing we want
 * to sell). On desktop/tablet it's a wide banner above a peek-slider of the
 * three standard offerings. On phone the whole thing becomes a 4-slide auto
 * carousel (Annual packs first) with a dot indicator and edge fade.
 */
export default function Programs() {
  const isPhone = useIsPhone();

  return (
    <section className="programs" id="programs" aria-labelledby="programs-title">
      <div className="programs__inner">
        <header className="programs__header">
          <p className="programs__eyebrow">WHAT I OFFER</p>
          <h2 id="programs-title" className="programs__title">
            Programs for teachers &amp; schools
          </h2>
        </header>

        {isPhone ? (
          <ProgramsCarousel>
            <AnnualPackCard variant="card" />
            {CARDS.map((c) => (
              <OfferingCardEl key={c.title} {...c} />
            ))}
          </ProgramsCarousel>
        ) : (
          <div className="programs__cards">
            <AnnualPackCard variant="banner" />
            <ul
              className="programs__rail"
              tabIndex={0}
              role="region"
              aria-label="Programs — scroll sideways to browse"
            >
              {CARDS.map((c) => (
                <li key={c.title} className="prog-slide">
                  <OfferingCardEl {...c} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
