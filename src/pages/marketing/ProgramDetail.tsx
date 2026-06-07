import { useParams } from "react-router-dom";
import {
  ArrowRight,
  CaretRight,
  CheckCircle,
  SealCheck,
  Clock,
  MapPin,
  Buildings,
  CurrencyDollar,
} from "@phosphor-icons/react";
import { SectionHeader } from "@/components/macro";
import { Button, Chip, Eyebrow, IconBadge } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getCourse } from "@/lib/content";
import type { Format } from "@/lib/database.types";
import "./ProgramDetail.css";

const FORMAT_LABEL: Record<Format, string> = {
  "in-person": "In person",
  online: "Online",
  "online+in-person": "Online & in person",
};

/** Per-program "what's included" detail, grounded in src/docs/sitemap.ts.
 *  Keyed by slug so each catalog entry renders realistic, on-brand content. */
interface ProgramExtra {
  eyebrow: string;
  includes: { title: string; body: string }[];
  highlights: string[];
}

const EXTRAS: Record<string, ProgramExtra> = {
  "annual-packs": {
    eyebrow: "For groups & schools",
    includes: [
      {
        title: "A full year of DECAL hours",
        body: "Bundle every educator's annual clock hours into one plan — mix live sessions and self-paced courses across the year.",
      },
      {
        title: "Lowest per-teacher rate",
        body: "The more of your team you enroll, the lower the per-teacher price. Designed to beat booking sessions one at a time.",
      },
      {
        title: "Certificates & documentation",
        body: "DECAL CEU certificates for every participant, plus the records your center needs for Quality Rated and renewal.",
      },
      {
        title: "Customised to your center",
        body: "We shape the topics around your goals, your ages served and the gaps you want to close this year.",
      },
    ],
    highlights: [
      "Whole-team access",
      "10+ CEU hours",
      "Certificates included",
      "Mix of in-person & online",
    ],
  },
  "group-trainings": {
    eyebrow: "Flagship live PD",
    includes: [
      {
        title: "Live sessions, 1–8 hours",
        body: "Choose a single 1-hour session or a full 8-hour day — delivered at your school, a partner venue, or on Zoom.",
      },
      {
        title: "Group pricing that rewards your team",
        body: "Per-teacher pricing drops as your group grows, and longer sessions cost less per hour than booking them separately.",
      },
      {
        title: "Add-ons when you need them",
        body: "Add a live Q&A block or printed DECAL CEU certificates — only pay for the extras your team wants.",
      },
      {
        title: "Built around your room",
        body: "Camille uses a wireless mic, chunked content and a venue checklist so every session runs smoothly, theory to practice.",
      },
    ],
    highlights: [
      "Small-group ratios",
      "DECAL-aligned curriculum",
      "$280 session minimum",
      "Travel: metro & beyond",
    ],
  },
  "individual-trainings": {
    eyebrow: "One educator, one topic",
    includes: [
      {
        title: "Flexible live sessions",
        body: "Book a single educator into a live session on the topic they need most — perfect for closing a specific gap.",
      },
      {
        title: "Meets your annual hours",
        body: "Every session counts toward Georgia's 10 DECAL-approved clock hours and comes with a CEU certificate.",
      },
      {
        title: "Online or in person",
        body: "Join on Zoom from anywhere, or meet in person across Metro Atlanta and the Carolinas.",
      },
    ],
    highlights: ["Choose your topic", "DECAL CEU certificate", "Online or in person"],
  },
  "self-paced-courses": {
    eyebrow: "Online · self-enroll",
    includes: [
      {
        title: "Recorded 1-hour CEU courses",
        body: "The same trainings Camille delivers live — Reggio, schemas, loose parts, infant spaces, multiple intelligences and more — on your schedule.",
      },
      {
        title: "Counts toward your DECAL hours",
        body: "Each course awards DECAL CEU clock hours and counts toward Georgia's annual 10-hour requirement.",
      },
      {
        title: "Free preview per course",
        body: "Watch a free preview lesson before you enroll, so you know exactly what you're getting.",
      },
      {
        title: "Certificate included",
        body: "Finish a course and download your DECAL CEU certificate right away — no contact form, no waiting.",
      },
    ],
    highlights: ["Take anytime", "Self-enroll", "Certificate included", "Free preview lesson"],
  },
  "school-licenses": {
    eyebrow: "Whole-staff B2B",
    includes: [
      {
        title: "Whole-school annual access",
        body: "One license covers your entire staff for a year — mix live in-person sessions with unlimited self-paced courses.",
      },
      {
        title: "Director dashboard",
        body: "Track who's trained, which hours are logged and what's left — ready for Quality Rated and DECAL records.",
      },
      {
        title: "Tiered by team size",
        body: "Pricing scales with your staff count, so the per-teacher cost keeps dropping as your center grows.",
      },
      {
        title: "Optional in-person add-on",
        body: "Layer in a live 1–2 hour session for your team on top of the online license whenever you need it.",
      },
    ],
    highlights: [
      "Per-teacher savings",
      "Director dashboard",
      "Mixed in-person + online",
      "Custom quote",
    ],
  },
};

/** Generic fallback for any catalog entry without a tailored block (e.g. workshops). */
const DEFAULT_EXTRA: ProgramExtra = {
  eyebrow: "Training",
  includes: [
    {
      title: "DECAL-approved content",
      body: "Practical, classroom-ready ideas grounded in Reggio Emilia and 30+ years of early-childhood experience.",
    },
    {
      title: "Counts toward your hours",
      body: "Earns DECAL CEU clock hours toward Georgia's annual 10-hour requirement, with a certificate on completion.",
    },
    {
      title: "Delivered your way",
      body: "Available live in person across Metro Atlanta and the Carolinas, or online on Zoom.",
    },
  ],
  highlights: ["DECAL CEU hours", "Reggio-grounded", "Online or in person"],
};

function NotFound() {
  return (
    <section className="program-detail__notfound section-bg--methods" aria-labelledby="program-notfound-title">
      <div className="program-detail__inner program-detail__notfound-inner">
        <Eyebrow>Not found</Eyebrow>
        <h1 id="program-notfound-title" className="program-detail__notfound-title">
          We couldn't find that program
        </h1>
        <p className="program-detail__notfound-desc">
          The program you're looking for may have moved or been renamed. Browse all of
          Camille's training formats instead.
        </p>
        <Button href="/programs" variant="primary" size="lg" trailingIcon={ArrowRight}>
          Back to all programs
        </Button>
      </div>
    </section>
  );
}

export default function ProgramDetail() {
  const { slug } = useParams();
  const course = slug ? getCourse(slug) : undefined;

  useDocumentTitle(
    course ? course.title : "Program not found",
    course?.description ??
      "Explore Camille's DECAL-approved early-childhood training programs."
  );

  if (!course) return <NotFound />;

  const extra = EXTRAS[course.slug] ?? DEFAULT_EXTRA;
  const isAnnualPack = course.category === "annual-pack";
  const bullets = course.bullets.length ? course.bullets : extra.highlights;

  return (
    <>
      {/* ---- breadcrumb ---- */}
      <nav className="program-detail__crumbs section-bg--programs" aria-label="Breadcrumb">
        <div className="program-detail__inner">
          <ol className="program-detail__crumb-list">
            <li>
              <a href="/programs">Programs</a>
            </li>
            <li aria-hidden className="program-detail__crumb-sep">
              <CaretRight size={14} weight="bold" />
            </li>
            <li aria-current="page">{course.title}</li>
          </ol>
        </div>
      </nav>

      {/* ---- hero band ---- */}
      <section
        className={`program-detail__hero section-bg--programs${
          isAnnualPack ? " program-detail__hero--featured" : ""
        }`}
        aria-labelledby="program-detail-title"
      >
        <div className="program-detail__inner program-detail__hero-grid">
          <div className="program-detail__hero-copy">
            <Eyebrow className="program-detail__eyebrow">{extra.eyebrow}</Eyebrow>
            <h1 id="program-detail-title" className="program-detail__title">
              {course.title}
            </h1>
            {course.description && (
              <p className="program-detail__lede">{course.description}</p>
            )}

            <ul className="program-detail__meta" role="list">
              {course.format && (
                <li className="program-detail__meta-item">
                  <MapPin size={16} weight="regular" aria-hidden />
                  {FORMAT_LABEL[course.format]}
                </li>
              )}
              {course.duration_label && (
                <li className="program-detail__meta-item">
                  <Clock size={16} weight="regular" aria-hidden />
                  {course.duration_label}
                </li>
              )}
              {course.decal_hours != null && (
                <li className="program-detail__meta-item">
                  <SealCheck size={16} weight="regular" aria-hidden />
                  {course.decal_hours} DECAL CEU hour{course.decal_hours === 1 ? "" : "s"}
                </li>
              )}
            </ul>

            <ul className="program-detail__chips" role="list">
              {bullets.map((b) => (
                <li key={b}>
                  <Chip tone={isAnnualPack ? "peach" : "mint"} icon={CheckCircle}>
                    {b}
                  </Chip>
                </li>
              ))}
            </ul>

            <div className="program-detail__hero-actions">
              <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
                See your price
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Request this training
              </Button>
            </div>
          </div>

          <aside className="program-detail__aside" aria-label="At a glance">
            <IconBadge
              icon={isAnnualPack ? Buildings : SealCheck}
              tone={isAnnualPack ? "forest" : "mint"}
              size={56}
            />
            <p className="program-detail__aside-title">At a glance</p>
            <dl className="program-detail__aside-list">
              {course.format && (
                <div className="program-detail__aside-row">
                  <dt>Format</dt>
                  <dd>{FORMAT_LABEL[course.format]}</dd>
                </div>
              )}
              <div className="program-detail__aside-row">
                <dt>Approval</dt>
                <dd>DECAL / Bright from the Start</dd>
              </div>
              <div className="program-detail__aside-row">
                <dt>Where</dt>
                <dd>Metro Atlanta &amp; online</dd>
              </div>
            </dl>
            <Button href="/pricing" variant="primary" fullWidth leadingIcon={CurrencyDollar}>
              Build your quote
            </Button>
          </aside>
        </div>
      </section>

      {/* ---- what's included ---- */}
      <section className="program-detail__includes section-bg--methods" aria-labelledby="program-includes-title">
        <div className="program-detail__inner">
          <SectionHeader
            eyebrow="What's included"
            title={<span id="program-includes-title">What you get with {course.title}</span>}
          />
          <ul className="program-detail__includes-grid" role="list">
            {extra.includes.map((item) => (
              <li key={item.title} className="program-detail__include">
                <IconBadge icon={CheckCircle} tone="mint" size={44} />
                <h3 className="program-detail__include-title">{item.title}</h3>
                <p className="program-detail__include-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- pricing + request CTA ---- */}
      <section className="program-detail__cta section-bg--pricing" aria-labelledby="program-cta-title">
        <div className="program-detail__inner program-detail__cta-card">
          <div className="program-detail__cta-copy">
            <Eyebrow>Next step</Eyebrow>
            <h2 id="program-cta-title" className="program-detail__cta-title">
              {isAnnualPack
                ? "Lock in a year of training for your whole team"
                : `Ready to bring ${course.title.toLowerCase()} to your team?`}
            </h2>
            <p className="program-detail__cta-desc">
              Build a per-teacher quote in about a minute, or tell Camille a few details
              and she'll recommend the right plan and price for your center.
            </p>
          </div>
          <div className="program-detail__cta-actions">
            <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
              See pricing
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Request this training
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
