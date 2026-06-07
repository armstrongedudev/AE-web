# StatsStrip

A responsive row of `Stat`s inside a soft card with column dividers. 4-up on desktop, 2×2 on tablet, stacked on phone.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `StatsStripItem[]` | — | `{ label, value?, icon? }` entries. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { StatsStrip } from "@/components/macro";
import { Certificate, GraduationCap, Brain, Clock } from "@phosphor-icons/react";

<StatsStrip
  items={[
    { icon: Brain, label: "Reggio Emilia Approach" },
    { icon: Certificate, label: "DECAL-Approved Trainer" },
    { icon: GraduationCap, label: "M.A. Educational Psychology" },
    { icon: Clock, value: "+30", label: "Years" },
  ]}
/>
```

Figma — shown in section: Macro components.
