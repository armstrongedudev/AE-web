import { ArrowRight } from "@phosphor-icons/react";
import "./Hero.css";

/**
 * Hero — implements Figma 288:1335 exactly.
 * Radial green→cream gradient bg + decorative blurred ellipses; a 656px text
 * block (with its own cream ellipse glow at the exact Figma position) beside a
 * masked Camille/chalkboard composite. Responsive: 2-col desktop → stacked
 * tablet/phone. Content capped to max-width 1280.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* decorative blurred ellipses (288:1336–1338) over the radial gradient */}
      <img className="hero__blob hero__blob--2" src="/brand/hero-ellipse2.svg" alt="" aria-hidden="true" />
      <img className="hero__blob hero__blob--1r" src="/brand/hero-ellipse1.svg" alt="" aria-hidden="true" />
      <img className="hero__blob hero__blob--1l" src="/brand/hero-ellipse1.svg" alt="" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          {/* text-block ellipse (288:1341) — exact position behind the copy */}
          <img className="hero__textglow" src="/brand/hero-ellipse3.svg" alt="" aria-hidden="true" />

          <div className="hero__copy">
            <span className="hero__eyebrow">ARMSTRONG EDUCATIONAL SERVICES</span>
            <div className="hero__headings">
              <h1 id="hero-title" className="hero__title">
                Where theory becomes
                <br />
                everyday practice
              </h1>
              <p className="hero__body">
                Hi, I'm Camille Hampton — a Georgia DECAL-approved trainer and early-childhood specialist with 30+ years
                grounded in the Reggio Emilia approach. I help educators and schools turn child-development theory into
                the daily practice that changes classrooms — across Metro Atlanta and online.
              </p>
            </div>
          </div>

          <div className="hero__ctas">
            <a className="hero-btn hero-btn--primary" href="#book">
              <span>Book a training</span>
              <ArrowRight size={17} weight="regular" />
            </a>
            <a className="hero-btn hero-btn--ghost" href="/login">
              Log in
            </a>
          </div>
        </div>

        <div className="hero__media">
          <img src="/brand/hero-camille-composite.png" alt="Camille Hampton pointing, in front of a chalkboard" />
        </div>
      </div>
    </section>
  );
}
