import type { HTMLAttributes } from "react";
import { Compass, MapPin, UsersThree, Clock, Sparkle, Receipt, ArrowRight, SealCheck, Minus, Plus } from "@phosphor-icons/react";
import { usePricing } from "./usePricing";
import { STATE_LABEL, formatUSD, type Method, type StateCode } from "./pricing";
import "./PricingCalculator.css";

const METHODS: { value: Method; label: string; full?: boolean }[] = [
  { value: "in-person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "online+in-person", label: "Online + in person", full: true },
];
const STATES: StateCode[] = ["GA", "SC", "NC"];

function Stepper({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="pcalc-hours__group">
      <p className="pcalc-hours__label">{label}</p>
      <div className="pcalc-hours__stepper" role="group" aria-label={label}>
        <button className="pcalc-hours__btn" type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label={`Decrease ${label}`}><Minus size={16} /></button>
        <span className="pcalc-hours__val" aria-live="polite">{value}</span>
        <button className="pcalc-hours__btn" type="button" onClick={() => onChange(value + 1)} aria-label={`Increase ${label}`}><Plus size={16} /></button>
      </div>
    </div>
  );
}

/**
 * PricingCalculator (v1 · "Cards") — implements Figma 288:1648 exactly and is fully
 * functional: method · state · attendees slider · hours steppers · extras → live quote
 * (per-educator + total) via the shared pricing engine.
 */
export function PricingCalculator({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  const { state, set, result, shows } = usePricing();
  const min = 1;
  const max = 60;
  const pct = ((state.attendees - min) / (max - min)) * 100;

  return (
    <section className={["pcalc", "section-bg--pricing", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pcalc__inner">
        <header className="pcalc__header">
          <p className="pcalc__eyebrow">Pricing calculator</p>
          <h2 className="pcalc__title">Get your quote</h2>
        </header>

        <div className="pcalc__grid">
          {/* Row 1 — method + state */}
          <div className="pcalc__row">
            <div className="pcalc-card pcalc-card--method">
              <div className="pcalc-card__head">
                <span className="pcalc-badge"><Compass size={28} /></span>
                <h3>Method</h3>
              </div>
              <div className="pcalc-method" role="group" aria-label="Delivery method">
                {METHODS.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    className={["pcalc-method__btn", m.full && "pcalc-method__btn--full"].filter(Boolean).join(" ")}
                    aria-pressed={state.method === m.value}
                    onClick={() => set("method", m.value)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pcalc-card pcalc-card--state">
              <div className="pcalc-state__body">
                <div className="pcalc-card__head">
                  <span className="pcalc-badge"><MapPin size={28} /></span>
                  <h3>Select your state</h3>
                </div>
                <div className="pcalc-state__chips" role="group" aria-label="State">
                  {STATES.map((s) => (
                    <button key={s} type="button" className="pcalc-chip" aria-pressed={state.state === s} onClick={() => set("state", s)}>
                      <SealCheck size={14} weight={state.state === s ? "fill" : "regular"} />
                      {STATE_LABEL[s]}
                    </button>
                  ))}
                </div>
                <p className="pcalc-note">DECAL-approved and aligned to Georgia's GaPDS training requirements.</p>
              </div>
              <img className="pcalc-state__map" src="/brand/pricing-map.png" alt="Service area: Georgia, South Carolina and North Carolina" />
            </div>
          </div>

          {/* Row 2 — attendees slider */}
          <div className="pcalc-card pcalc-card--attendees">
            <div className="pcalc-attendees__copy">
              <div className="pcalc-card__head">
                <span className="pcalc-badge"><UsersThree size={28} /></span>
                <h3>Number of attendees</h3>
              </div>
              <p className="pcalc-note">More attendees unlock lower per-teacher pricing.</p>
            </div>
            <div className="pcalc-slider">
              <span className="pcalc-slider__bubble" style={{ left: `${pct}%` }}>{state.attendees}</span>
              <input
                className="pcalc-slider__input"
                type="range"
                min={min}
                max={max}
                step={1}
                value={state.attendees}
                onChange={(e) => set("attendees", Number(e.target.value))}
                aria-label="Number of attendees"
                aria-valuetext={`${state.attendees} attendees`}
              />
              <div className="pcalc-slider__marks" aria-hidden>
                {[1, 5, 10, 20, 30, 40, 50].map((n) => <span key={n}>{n}</span>)}
              </div>
            </div>
          </div>

          {/* Row 3 — hours + extras + quote */}
          <div className="pcalc__row pcalc__row--last">
            <div className="pcalc__left">
              <div className="pcalc-card pcalc-card--hours">
                <div className="pcalc-card__head">
                  <span className="pcalc-badge"><Clock size={28} /></span>
                  <h3>Number of hours</h3>
                </div>
                <div className="pcalc-hours__groups">
                  {shows.inPerson && <Stepper label="In person trainings hours" value={state.inPersonHours} onChange={(n) => set("inPersonHours", n)} />}
                  {shows.online && <Stepper label="Online trainings hours" value={state.onlineHours} onChange={(n) => set("onlineHours", n)} />}
                </div>
              </div>

              <div className="pcalc-card pcalc-card--extras">
                <div className="pcalc-card__head">
                  <span className="pcalc-badge"><Sparkle size={28} /></span>
                  <h3>Extras</h3>
                </div>
                <div className="pcalc-extras">
                  <button type="button" className="pcalc-extra" aria-pressed={state.qa} onClick={() => set("qa", !state.qa)}>
                    <span className="pcalc-extra__plus">{state.qa ? "−" : "+"}</span>
                    <span className="pcalc-extra__label">Extra time for questions</span>
                  </button>
                  <button type="button" className="pcalc-extra" aria-pressed={state.certificate} onClick={() => set("certificate", !state.certificate)}>
                    <span className="pcalc-extra__plus">{state.certificate ? "−" : "+"}</span>
                    <span className="pcalc-extra__label">Printed certificate</span>
                  </button>
                  <p className="pcalc-note">Discounts apply automatically on annual licenses of 10+ hours.</p>
                </div>
              </div>
            </div>

            <div className="pcalc__right">
              <div className="pcalc-quote">
                <div className="pcalc-quote__top">
                  <div className="pcalc-quote__copy">
                    <div className="pcalc-quote__head">
                      <span className="pcalc-quote__badge"><Receipt size={24} /></span>
                      <h3>Your quote</h3>
                    </div>
                    <p>Contact Camille to fine-tune the final details — topics, dates and venue.</p>
                  </div>
                  <div className="pcalc-quote__price">
                    <div className="pcalc-quote__amount">
                      <b>{formatUSD(result.perHead)}</b>
                    </div>
                    <span className="pcalc-quote__per">/educator</span>
                  </div>
                </div>
                <div className="pcalc-quote__bar">
                  <span>Total</span>
                  <b>{formatUSD(result.total)}</b>
                  <span>for</span>
                  <b>{state.attendees}</b>
                  <span>educators</span>
                </div>
              </div>
              <a className="pcalc__cta" href="/contact">
                Contact &amp; Book trainings <ArrowRight size={17} weight="regular" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingCalculator;
