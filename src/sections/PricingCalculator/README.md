# PricingCalculator (section)

Interactive "Get your quote" tool. **Functional React state** with a live
computed price (per-head + total). Pricing logic lives in `pricing.ts`.

## Controls
- **Method toggle** — In-person · Online · Online + In-person.
- **State select** — Georgia · South Carolina · North Carolina.
- **Attendees slider** — 1–60.
- **Hours steppers** — In-person hours and/or Online hours (shown per method),
  snapped to supported options {1, 1.5, 2, 3, 4, 6, 8}.
- **Extras** — Live Q&A session (+$150 flat) · Printed certificates (+$8/attendee).

## Pricing formula (`pricing.ts`)
- Per-head base: **$35** in-person · **$25** online.
- Hours multiplier: `{1:1.0, 1.5:1.45, 2:1.8, 3:2.3, 4:2.7, 6:3.5, 8:4.0}`.
- `online+in-person` sums each mode: `base × hoursMultiplier` per mode.
- **Group discount** (fraction of list price kept, grows with attendees):
  | attendees | kept | discount |
  |---|---|---|
  | 1–5   | 1.00 | 0%  |
  | 6–10  | 0.92 | 8%  |
  | 11–20 | 0.84 | 16% |
  | 21–30 | 0.76 | 24% |
  | 31–45 | 0.68 | 32% |
  | 46–60 | 0.60 | 40% |
- **Add-ons & surcharges** sit on top of per-head charges: Q&A flat $150,
  certificates $8 × attendees, out-of-state travel (SC +$250, NC +$350; GA $0).
- `total = round(perHead) × attendees + extras`; "Save X% vs the 1:1 rate"
  hint surfaces the group discount.

## Worked example
In-person, 2h, 12 attendees, GA, no extras:
`listPerHead = 35 × 1.8 = $63` → kept 0.84 → `perHead = $53` →
`total = 53 × 12 = $636`, "Save 16% vs the 1:1 rate".

Figma: section 7 of `Home - desktop` (140:6819).
