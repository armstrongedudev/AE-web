import {
  SealCheck,
  ArrowRight,
  GraduationCap,
  ClipboardText,
  CalendarCheck,
  Certificate,
  Users,
  Buildings,
  Monitor,
  CheckCircle,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { SectionHeader } from "@/components/macro";
import { Button, Chip, Eyebrow, IconBadge } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Certification.css";

interface Audience {
  icon: PhosphorIcon;
  title: string;
  body: string;
}

const AUDIENCES: Audience[] = [
  {
    icon: Users,
    title: "Lead & assistant teachers",
    body: "Anyone working in a licensed Georgia child care program who needs their annual DECAL clock hours.",
  },
  {
    icon: Buildings,
    title: "Directors & owners",
    body: "Centers that need to train a whole staff and keep clean records for Quality Rated and renewal.",
  },
  {
    icon: Monitor,
    title: "Individual educators",
    body: "Teachers who want to self-enroll in online CEU courses and earn hours on their own schedule.",
  },
];

interface Step {
  icon: PhosphorIcon;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    icon: ClipboardText,
    title: "Pick your format",
    body: "Choose a live group training, a self-paced online course, an annual pack, or a whole-school license.",
  },
  {
    icon: GraduationCap,
    title: "Complete the training",
    body: "Join Camille live in person or on Zoom, or work through recorded CEU courses at your own pace.",
  },
  {
    icon: Certificate,
    title: "Earn your CEU hours",
    body: "Every session and course awards DECAL CEU clock hours toward Georgia's annual 10-hour requirement.",
  },
  {
    icon: CalendarCheck,
    title: "Get your certificate",
    body: "Receive a DECAL CEU certificate for your records — ready before the July–September renewal season.",
  },
];

const FAQ_TEASERS = [
  {
    q: "How many DECAL hours do I need each year?",
    a: "Georgia educators in licensed programs need 10 DECAL-approved clock hours every calendar year.",
  },
  {
    q: "Is Camille DECAL-approved?",
    a: "Yes — Camille is a Georgia DECAL / Bright from the Start approved trainer with an M.A. and 30+ years in early childhood.",
  },
  {
    q: "Does online training count for DECAL?",
    a: "Yes. Camille's self-paced online courses are DECAL-approved and count toward your annual hours, with a CEU certificate included.",
  },
];

export default function Certification() {
  useDocumentTitle(
    "DECAL-approved training in Georgia (Bright from the Start)",
    "Georgia educators need 10 DECAL-approved clock hours a year. Earn them with Camille — a Bright from the Start approved trainer — live or online."
  );

  return (
    <>
      {/* ---- answer-first hero ---- */}
      <section className="certification__hero section-bg--programs" aria-labelledby="certification-title">
        <div className="certification__inner certification__hero-inner">
          <Eyebrow className="certification__eyebrow">Certification · DECAL / Bright from the Start</Eyebrow>
          <h1 id="certification-title" className="certification__title">
            DECAL-approved training that counts toward your Georgia hours
          </h1>
          <p className="certification__lede">
            Georgia educators in licensed child care programs need{" "}
            <strong>10 DECAL-approved clock hours every calendar year</strong>. Camille is a
            Bright from the Start (DECAL) approved trainer, so every live session and
            self-paced course you take with her counts — and comes with a CEU certificate.
          </p>
          <ul className="certification__hero-chips" role="list">
            <li>
              <Chip tone="mint" icon={SealCheck}>
                Bright from the Start approved
              </Chip>
            </li>
            <li>
              <Chip tone="mint" icon={CheckCircle}>
                10 clock hours / year
              </Chip>
            </li>
            <li>
              <Chip tone="peach" icon={Certificate}>
                CEU certificate included
              </Chip>
            </li>
          </ul>
          <div className="certification__hero-actions">
            <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
              See pricing
            </Button>
            <Button href="/programs/self-paced-courses" variant="secondary" size="lg">
              Browse online courses
            </Button>
          </div>
        </div>
      </section>

      {/* ---- what DECAL-approved means ---- */}
      <section className="certification__about section-bg--methods" aria-labelledby="certification-about-title">
        <div className="certification__inner certification__about-grid">
          <div className="certification__about-copy">
            <SectionHeader
              eyebrow="What it means"
              title={<span id="certification-about-title">What "DECAL-approved" really means</span>}
            />
            <p className="certification__about-body">
              DECAL — the Georgia Department of Early Care and Learning, also known as Bright
              from the Start (BFTS) — sets the professional-development standards for the
              state's licensed child care programs. Training that is "DECAL-approved" is
              recognised toward your required annual clock hours.
            </p>
            <p className="certification__about-body">
              Because Camille is an approved trainer, you don't have to wonder whether a
              workshop will count. Her trainings align with GELDS, Georgia Pre-K, Quality
              Rated and NAEYC developmentally appropriate practice — and every participant
              receives a DECAL CEU certificate for their records.
            </p>
            <div className="certification__season" role="note">
              <IconBadge icon={CalendarCheck} tone="peach" size={44} />
              <div>
                <p className="certification__season-title">Renewal season runs July–September</p>
                <p className="certification__season-body">
                  That's when Georgia educators scramble for hours. Get ahead and book early.
                </p>
              </div>
            </div>
          </div>

          <aside className="certification__who" aria-labelledby="certification-who-title">
            <h2 id="certification-who-title" className="certification__who-title">
              Who it's for
            </h2>
            <ul className="certification__who-list" role="list">
              {AUDIENCES.map((a) => (
                <li key={a.title} className="certification__who-item">
                  <IconBadge icon={a.icon} tone="mint" size={44} />
                  <div>
                    <h3 className="certification__who-name">{a.title}</h3>
                    <p className="certification__who-body">{a.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ---- how it works ---- */}
      <section className="certification__steps section-bg--workshops" aria-labelledby="certification-steps-title">
        <div className="certification__inner">
          <SectionHeader
            eyebrow="How it works"
            title={<span id="certification-steps-title">Earn your hours in four steps</span>}
            subtitle="From picking a format to downloading your certificate — here's the whole path."
          />
          <ol className="certification__step-list">
            {STEPS.map((step, i) => (
              <li key={step.title} className="certification__step">
                <span className="certification__step-num" aria-hidden>
                  {i + 1}
                </span>
                <IconBadge icon={step.icon} tone="mint" size={48} />
                <h3 className="certification__step-title">{step.title}</h3>
                <p className="certification__step-body">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- FAQ teaser ---- */}
      <section className="certification__faq section-bg--methods" aria-labelledby="certification-faq-title">
        <div className="certification__inner">
          <SectionHeader
            eyebrow="Common questions"
            title={<span id="certification-faq-title">DECAL questions, answered</span>}
          />
          <dl className="certification__faq-list">
            {FAQ_TEASERS.map((item) => (
              <div key={item.q} className="certification__faq-item">
                <dt className="certification__faq-q">{item.q}</dt>
                <dd className="certification__faq-a">{item.a}</dd>
              </div>
            ))}
          </dl>
          <div className="certification__faq-more">
            <Button href="/faq" variant="ghost" trailingIcon={ArrowRight}>
              See all frequently asked questions
            </Button>
          </div>
        </div>
      </section>

      {/* ---- closing CTA ---- */}
      <section className="certification__cta section-bg--pricing" aria-labelledby="certification-cta-title">
        <div className="certification__inner certification__cta-inner">
          <Eyebrow>Get ahead of renewal</Eyebrow>
          <h2 id="certification-cta-title" className="certification__cta-title">
            Get your DECAL hours done — early, and stress-free
          </h2>
          <p className="certification__cta-desc">
            Build a quote in about a minute, or tell Camille about your team and she'll
            recommend the right path to your annual hours.
          </p>
          <div className="certification__cta-actions">
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
