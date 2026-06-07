/**
 * Armstrong pricing engine (from Armstrong-Pricing-Strategy.docx).
 *
 * per-head base:  $35 in-person · $25 online
 * hours multiplier (decay curve — more hours, lower marginal cost per hour):
 *   {1:1.0, 1.5:1.45, 2:1.8, 3:2.3, 4:2.7, 6:3.5, 8:4.0}
 * group discount: grows with attendee count (more heads → lower per-head)
 * add-ons: fixed dollar amounts added to the total
 *
 * "online + in-person" = a blended engagement: each delivery mode is priced on
 * its own base × its own hours, then summed (one group discount on the heads).
 */

export type Method = "in-person" | "online" | "online+in-person";
export type StateCode = "GA" | "SC" | "NC";

export const HOURS_OPTIONS = [1, 1.5, 2, 3, 4, 6, 8] as const;
export type Hours = (typeof HOURS_OPTIONS)[number];

export const BASE = { "in-person": 35, online: 25 } as const;

export const HOURS_MULTIPLIER: Record<number, number> = {
  1: 1.0,
  1.5: 1.45,
  2: 1.8,
  3: 2.3,
  4: 2.7,
  6: 3.5,
  8: 4.0,
};

export const ADDONS = {
  qa: { label: "Live Q&A session", amount: 150 },
  certificate: { label: "Printed certificates", amount: 8 }, // per attendee
} as const;
export type AddonKey = keyof typeof ADDONS;

/** Travel/admin surcharge applied per out-of-state engagement. */
export const STATE_SURCHARGE: Record<StateCode, number> = {
  GA: 0, // home state — no travel
  SC: 250,
  NC: 350,
};

export const STATE_LABEL: Record<StateCode, string> = {
  GA: "Georgia",
  SC: "South Carolina",
  NC: "North Carolina",
};

export const ATTENDEES = { min: 1, max: 60, step: 1 } as const;

/**
 * Group discount that grows with attendee count.
 * Returns the fraction kept (1.0 = full price, 0.55 = 45% off per head).
 * Tiered, smooth-ish step-down so larger cohorts get a better per-head rate.
 */
export function groupKeptFraction(attendees: number): number {
  if (attendees <= 5) return 1.0;
  if (attendees <= 10) return 0.92;
  if (attendees <= 20) return 0.84;
  if (attendees <= 30) return 0.76;
  if (attendees <= 45) return 0.68;
  return 0.6;
}

export function groupDiscountPct(attendees: number): number {
  return Math.round((1 - groupKeptFraction(attendees)) * 100);
}

/** Hours → cost multiplier. Interpolates the decay table and extrapolates beyond
 *  8h at the 6→8 marginal slope, so any hour value (incl. 10h+ annual) works. */
function nearestMultiplier(hours: number): number {
  const pts = HOURS_OPTIONS; // ascending [1,1.5,2,3,4,6,8]
  const h = Math.max(0, hours);
  if (h <= pts[0]) return HOURS_MULTIPLIER[pts[0]];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (h <= b) {
      const ma = HOURS_MULTIPLIER[a];
      const mb = HOURS_MULTIPLIER[b];
      return ma + (mb - ma) * ((h - a) / (b - a));
    }
  }
  const slope = (HOURS_MULTIPLIER[8] - HOURS_MULTIPLIER[6]) / (8 - 6); // 0.25 / hr
  return HOURS_MULTIPLIER[8] + slope * (h - 8);
}

export interface PricingInput {
  method: Method;
  state: StateCode;
  attendees: number;
  inPersonHours: number;
  onlineHours: number;
  qa: boolean;
  certificate: boolean;
}

export interface PricingResult {
  /** Final per-head price (rounded). */
  perHead: number;
  /** Final total (rounded). */
  total: number;
  /** Per-head before the group discount (the "1:1 rate"). */
  listPerHead: number;
  /** % saved vs the undiscounted 1:1 per-head rate. */
  savingsPct: number;
  groupDiscountPct: number;
  /** Itemized fixed add-ons + surcharges that sit on top of per-head charges. */
  extras: { label: string; amount: number }[];
}

/**
 * Per-head "list" charge (before group discount) for the selected method/hours.
 * Sums each active delivery mode: base × hours-multiplier.
 */
function listPerHeadFor(input: PricingInput): number {
  const { method, inPersonHours, onlineHours } = input;
  let v = 0;
  if (method === "in-person" || method === "online+in-person") {
    v += BASE["in-person"] * nearestMultiplier(inPersonHours);
  }
  if (method === "online" || method === "online+in-person") {
    v += BASE["online"] * nearestMultiplier(onlineHours);
  }
  return v;
}

export function computePricing(input: PricingInput): PricingResult {
  const attendees = Math.max(ATTENDEES.min, Math.round(input.attendees));

  const listPerHead = listPerHeadFor(input);
  const kept = groupKeptFraction(attendees);
  const perHead = listPerHead * kept;

  const headsTotal = perHead * attendees;

  const extras: { label: string; amount: number }[] = [];
  if (input.qa) extras.push({ label: ADDONS.qa.label, amount: ADDONS.qa.amount });
  if (input.certificate) {
    extras.push({
      label: `${ADDONS.certificate.label} (×${attendees})`,
      amount: ADDONS.certificate.amount * attendees,
    });
  }
  const surcharge = STATE_SURCHARGE[input.state];
  if (surcharge > 0) {
    extras.push({ label: `${STATE_LABEL[input.state]} travel`, amount: surcharge });
  }

  const extrasTotal = extras.reduce((s, e) => s + e.amount, 0);
  const total = headsTotal + extrasTotal;

  return {
    perHead: Math.round(perHead),
    total: Math.round(total),
    listPerHead: Math.round(listPerHead),
    savingsPct: groupDiscountPct(attendees),
    groupDiscountPct: groupDiscountPct(attendees),
    extras,
  };
}

export function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
