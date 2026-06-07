import { useMemo, useState } from "react";
import { computePricing, type Method, type StateCode, type PricingResult } from "./pricing";

/** Shared, controlled state for every pricing-calculator variant. */
export interface PricingState {
  method: Method;
  state: StateCode;
  attendees: number;
  inPersonHours: number;
  onlineHours: number;
  qa: boolean;
  certificate: boolean;
}

export const DEFAULT_PRICING: PricingState = {
  method: "in-person",
  state: "GA",
  attendees: 20,
  inPersonHours: 2,
  onlineHours: 2,
  qa: false,
  certificate: false,
};

export interface UsePricing {
  state: PricingState;
  set: <K extends keyof PricingState>(key: K, value: PricingState[K]) => void;
  setState: React.Dispatch<React.SetStateAction<PricingState>>;
  result: PricingResult;
  /** Whether each delivery mode is active for the current method (drives which hours steppers show). */
  shows: { inPerson: boolean; online: boolean };
}

/** The single source of truth all three calculator UIs share. */
export function usePricing(initial?: Partial<PricingState>): UsePricing {
  const [state, setState] = useState<PricingState>({ ...DEFAULT_PRICING, ...initial });
  const set: UsePricing["set"] = (key, value) => setState((s) => ({ ...s, [key]: value }));
  const result = useMemo(() => computePricing(state), [state]);
  const shows = {
    inPerson: state.method === "in-person" || state.method === "online+in-person",
    online: state.method === "online" || state.method === "online+in-person",
  };
  return { state, set, setState, result, shows };
}
