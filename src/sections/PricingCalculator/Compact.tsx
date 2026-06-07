import type { HTMLAttributes } from "react";
import { UsersThree, Check, Minus, Plus, ArrowRight } from "@phosphor-icons/react";
import { usePricing } from "./usePricing";
import { formatUSD, type Method, type StateCode } from "./pricing";
import "./Compact.css";

const METHODS: { value: Method; label: string }[] = [
  { value: "in-person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "online+in-person", label: "Online + in person" },
];
const STATES: { value: StateCode; label: string }[] = [
  { value: "GA", label: "Georgia (GA)" },
  { value: "SC", label: "South Carolina (SC)" },
  { value: "NC", label: "North Carolina (NC)" },
];

function Seg<T extends string>({ options, value, onChange, label }: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void; label: string }) {
  return (
    <div className="pcc-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="pcc-seg__btn" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function PillStepper({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="pcc-hours__group">
      <p className="pcc-hours__label">{label}</p>
      <div className="pcc-stepper" role="group" aria-label={label}>
        <button className="pcc-stepper__btn" type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label={`Decrease ${label}`}><Minus size={16} /></button>
        <span className="pcc-stepper__val" aria-live="polite">{value}</span>
        <button className="pcc-stepper__btn" type="button" onClick={() => onChange(value + 1)} aria-label={`Increase ${label}`}><Plus size={16} /></button>
      </div>
    </div>
  );
}

/**
 * PricingCalculator v2 — "Compact panel" (Figma 409:1056). Stacked field cards
 * (attendees ring-slider · method/state segmented · hours steppers + extras) beside
 * a radial summary. Fully functional via the shared `usePricing` engine.
 */
export function PricingCalculatorCompact({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  const { state, set, result, shows } = usePricing();
  const min = 1;
  const max = 60;
  const pct = ((state.attendees - min) / (max - min)) * 100;

  return (
    <div className={["pcc", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pcc__form">
        {/* Attendees */}
        <div className="pcc-field">
          <p className="pcc-field__title">Attendees</p>
          <div className="pcc-slider">
            <div className="pcc-slider__track" aria-hidden>
              {[1, 5, 10, 20, 30, 40, 50].map((n) => <span key={n}>{n}</span>)}
            </div>
            <input
              className="pcc-slider__input"
              type="range"
              min={min}
              max={max}
              step={1}
              value={state.attendees}
              onChange={(e) => set("attendees", Number(e.target.value))}
              aria-label="Number of attendees"
              aria-valuetext={`${state.attendees} educators`}
            />
            <span className="pcc-slider__thumb" style={{ left: `${pct}%` }} aria-hidden><UsersThree size={24} /></span>
          </div>
          <div className="pcc-value">
            {result.groupDiscountPct > 0 && (
              <span className="pcc-value__chip"><Check size={16} weight="bold" /> −{result.groupDiscountPct}% group</span>
            )}
            <span className="pcc-value__n">{state.attendees}</span>
            <span className="pcc-value__lbl">Educators</span>
          </div>
        </div>

        {/* Method + State */}
        <div className="pcc-field">
          <div className="pcc-field__sub">
            <p className="pcc-field__title">Method</p>
            <Seg label="Delivery method" options={METHODS} value={state.method} onChange={(v) => set("method", v)} />
          </div>
          <div className="pcc-field__sub">
            <p className="pcc-field__title">State</p>
            <Seg label="State" options={STATES} value={state.state} onChange={(v) => set("state", v)} />
          </div>
        </div>

        {/* Hours + Extras */}
        <div className="pcc-field">
          <div className="pcc-field__sub">
            <p className="pcc-field__title">Hours</p>
            <div className="pcc-hours">
              {shows.inPerson && <PillStepper label="In person trainings hours" value={state.inPersonHours} onChange={(n) => set("inPersonHours", n)} />}
              {shows.online && <PillStepper label="Online trainings hours" value={state.onlineHours} onChange={(n) => set("onlineHours", n)} />}
            </div>
          </div>
          <div className="pcc-field__sub">
            <p className="pcc-field__title">Extras</p>
            <div className="pcc-extras">
              <label className="pcc-toggle">
                <input type="checkbox" checked={state.qa} onChange={(e) => set("qa", e.target.checked)} />
                <span className="pcc-toggle__box">{state.qa && <Check size={12} weight="bold" />}</span>
                Live Q&amp;A
              </label>
              <label className="pcc-toggle">
                <input type="checkbox" checked={state.certificate} onChange={(e) => set("certificate", e.target.checked)} />
                <span className="pcc-toggle__box">{state.certificate && <Check size={12} weight="bold" />}</span>
                Printed certificates
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <aside className="pcc-summary" aria-label="Quote summary">
        <div className="pcc-summary__price">
          <b>{formatUSD(result.perHead)}</b>
          <span>/educator</span>
        </div>
        <div className="pcc-summary__bottom">
          <div className="pcc-summary__total" aria-live="polite">
            <span className="lbl">Total</span>
            <b>{formatUSD(result.total)}</b>
            <span className="for">for {state.attendees} educators</span>
          </div>
          <p className="pcc-save">You save {result.savingsPct}% at this group size</p>
          <a className="pcc-cta" href="/contact">Contact &amp; book <ArrowRight size={20} /></a>
        </div>
      </aside>
    </div>
  );
}

export default PricingCalculatorCompact;
