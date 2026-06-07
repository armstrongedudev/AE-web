import {
  UsersThree,
  Monitor,
  Buildings,
  User,
  GraduationCap,
  Star,
  SealCheck,
  ArrowRight,
  Clock,
} from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  SectionHeader,
  OfferingCard,
  WorkshopCard,
} from "@/components/macro";
import { Button, Chip, Eyebrow } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getPrograms, getWorkshops } from "@/lib/content";
import type { Course, Format } from "@/lib/database.types";
import "./Programs.css";

/** Map a program category/slug to a Phosphor icon for its card. */
const PROGRAM_ICONS: Record<string, PhosphorIcon> = {
  "annual-pack": Star,
  group: UsersThree,
  individual: User,
  "self-paced": Monitor,
  "school-license": Buildings,
};

function iconFor(course: Course): PhosphorIcon {
  return PROGRAM_ICONS[course.category ?? ""] ?? GraduationCap;
}

const FORMAT_LABEL: Record<Format, string> = {
  "in-person": "In person",
  online: "Online",
  "online+in-person": "Online & in person",
};

/** The featured "Annual packs" highlight — the product we most want to sell. */
const ANNUAL_PACK_CHIPS = [
  "Whole-team access",
  "Lowest per-teacher rate",
  "10+ CEU hours",
  "Certificates",
  "Customisable to your center",
];

export default function Programs() {
  useDocumentTitle(
    "Preschool teacher training & ECE consulting, Atlanta",
    "DECAL-approved group trainings, self-paced CEU courses, annual packs and whole-school licenses for early-childhood educators across Metro Atlanta and online."
  );

  const programs = getPrograms();
  const workshops = getWorkshops();

  // Surface the annual pack as the hero banner; the rest fill the grid.
  const annualPack = programs.find((p) => p.category === "annual-pack");
  const gridPrograms = programs.filter((p) => p.category !== "annual-pack");

  return (
    <>
      {/* ---- Header ---- */}
      <section className="programs-page__intro section-bg--programs" aria-labelledby="programs-page-title">
        <div className="programs-page__inner">
          <SectionHeader
            eyebrow="What I offer"
            title={<span id="programs-page-title">Programs for teachers &amp; schools</span>}
            subtitle="DECAL-approved professional development — live trainings, self-paced CEU courses, annual packs and whole-school licenses. Choose the format that fits your team, your goals and your budget."
          />

          {/* Featured annual-packs banner */}
          {annualPack && (
            <article
              className="programs-page__feature"
              aria-labelledby="annual-pack-title"
            >
              <span className="programs-page__ribbon">
                <Star size={14} weight="fill" aria-hidden />
                Most popular · for groups &amp; schools
              </span>
              <div className="programs-page__feature-grid">
                <div className="programs-page__feature-copy">
                  <h2 id="annual-pack-title" className="programs-page__feature-title">
                    {annualPack.title}
                  </h2>
                  <p className="programs-page__feature-desc">{annualPack.description}</p>
                  <ul className="programs-page__feature-chips">
                    {(annualPack.bullets.length ? annualPack.bullets : ANNUAL_PACK_CHIPS).map(
                      (b) => (
                        <li key={b} className="programs-page__feature-chip">
                          <SealCheck size={15} weight="regular" aria-hidden />
                          {b}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="programs-page__feature-cta">
                  <Button
                    href={`/programs/${annualPack.slug}`}
                    variant="white"
                    size="lg"
                    trailingIcon={ArrowRight}
                  >
                    Explore annual packs
                  </Button>
                  <Button href="/pricing" variant="ghost" size="md" className="programs-page__feature-quote">
                    Build your quote
                  </Button>
                  <p className="programs-page__feature-note">
                    Quote in ~60 seconds · no commitment
                  </p>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* ---- All programs grid ---- */}
      <section className="programs-page__grid-band section-bg--methods" aria-labelledby="programs-grid-title">
        <div className="programs-page__inner">
          <SectionHeader
            eyebrow="Service lines"
            title={<span id="programs-grid-title">Every way to train your team</span>}
            subtitle="Four flexible formats — from a single live session to a year of unlimited access."
          />
          <ul className="programs-page__cards" role="list">
            {gridPrograms.map((program) => (
              <li key={program.id} className="programs-page__card-item">
                <OfferingCard
                  icon={iconFor(program)}
                  tone={program.category === "school-license" ? "forest" : "mint"}
                  title={program.title}
                  description={program.description ?? ""}
                  features={program.bullets.length ? program.bullets : undefined}
                  cta={`${program.title} — learn more`}
                  ctaHref={`/programs/${program.slug}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Signature workshops teaser ---- */}
      <section className="programs-page__workshops-band section-bg--workshops" aria-labelledby="programs-workshops-title">
        <div className="programs-page__inner">
          <SectionHeader
            eyebrow="Signature workshops"
            title={<span id="programs-workshops-title">Topics teachers ask for again &amp; again</span>}
            subtitle="A taste of Camille's most-requested sessions. Every workshop can run live, in person or on Zoom, and counts toward your DECAL clock hours."
          />
          <ul className="programs-page__workshops" role="list">
            {workshops.slice(0, 6).map((w) => (
              <li key={w.id} className="programs-page__workshop-item">
                <WorkshopCard
                  tag={
                    <span className="programs-page__workshop-tag">
                      <Clock size={14} weight="regular" aria-hidden />
                      {w.duration_label ?? "Live"}
                      {w.format ? ` · ${FORMAT_LABEL[w.format]}` : ""}
                    </span>
                  }
                  title={w.title}
                  description={w.description ?? ""}
                  cta="See in group trainings"
                  ctaHref="/programs/group-trainings"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="programs-page__cta section-bg--pricing" aria-labelledby="programs-cta-title">
        <div className="programs-page__inner programs-page__cta-inner">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 id="programs-cta-title" className="programs-page__cta-title">
            See your price, or tell us what your center needs
          </h2>
          <p className="programs-page__cta-desc">
            Build a per-teacher quote in about a minute, or send a few details and Camille
            will recommend the right format and pricing for your team.
          </p>
          <div className="programs-page__cta-actions">
            <Button href="/pricing" variant="cta" size="lg" trailingIcon={ArrowRight}>
              Build your quote
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact Camille
            </Button>
          </div>
          <p className="programs-page__cta-fine">
            <Chip tone="mint" size="sm" icon={SealCheck}>
              DECAL-approved
            </Chip>{" "}
            <Chip tone="peach" size="sm">
              Metro Atlanta &amp; online
            </Chip>
          </p>
        </div>
      </section>
    </>
  );
}
