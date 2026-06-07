import type { HTMLAttributes } from "react";
import { Minus, Plus, Check, ArrowRight } from "@phosphor-icons/react";
import { usePricing } from "./usePricing";
import { formatUSD, type Method } from "./pricing";
import "./Inline.css";

const METHODS: { value: Method; label: string }[] = [
  { value: "in-person", label: "In person" },
  { value: "online", label: "Online" },
  { value: "online+in-person", label: "Both" },
];

/**
 * PricingCalculator v3 — "Inline / embeddable" bar (Figma 409:1059). A slim one-row
 * widget (method chips · attendees · hours · group pill · price · CTA) to drop into
 * any page. Functional via the shared `usePricing` engine.
 */
export function PricingCalculatorInline({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  const { state, set, result, shows } = usePricing();

  // single hours control bound to the active mode (in-person takes priority)
  const hours = shows.inPerson ? state.inPersonHours : state.onlineHours;
  const setHours = (n: number) => set(shows.inPerson ? "inPersonHours" : "onlineHours", Math.max(1, n));

  return (
    <div className={["pci", className].filter(Boolean).join(" ")} {...rest}>
      <div className="pci-methods" role="group" aria-label="Delivery method">
        {METHODS.map((m) => (
          <button key={m.value} type="button" className="pci-method" aria-pressed={state.method === m.value} onClick={() => set("method", m.value)}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="pci-stepper" role="group" aria-label="Attendees">
        <button className="pci-stepper__btn" type="button" onClick={() => set("attendees", Math.max(1, state.attendees - 1))} disabled={state.attendees <= 1} aria-label="Fewer attendees"><Minus size={16} /></button>
        <span className="pci-stepper__val" aria-live="polite"><b>{state.attendees}</b><span>educators</span></span>
        <button className="pci-stepper__btn" type="button" onClick={() => set("attendees", state.attendees + 1)} aria-label="More attendees"><Plus size={16} /></button>
      </div>

      <div className="pci-stepper" role="group" aria-label="Training hours">
        <button className="pci-stepper__btn" type="button" onClick={() => setHours(hours - 1)} disabled={hours <= 1} aria-label="Fewer hours"><Minus size={16} /></button>
        <span className="pci-stepper__val" aria-live="polite"><b>{hours}</b><span>h</span></span>
        <button className="pci-stepper__btn" type="button" onClick={() => setHours(hours + 1)} aria-label="More hours"><Plus size={16} /></button>
      </div>

      {result.groupDiscountPct > 0 && (
        <span className="pci-group"><Check size={16} weight="bold" /> −{result.groupDiscountPct}% group</span>
      )}

      <div className="pci-spacer" aria-hidden />

      <div className="pci-price" aria-live="polite">
        <b>{formatUSD(result.perHead)}</b>
        <span>/educator</span>
        <span>·</span>
        <b>{formatUSD(result.total)}</b>
        <span>total</span>
      </div>

      <a className="pci-cta" href="/contact">Get quote <ArrowRight size={16} /></a>
    </div>
  );
}

export default PricingCalculatorInline;
