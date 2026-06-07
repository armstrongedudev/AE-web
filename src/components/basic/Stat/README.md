# Stat

A single credential or metric, optionally led by an icon badge. Used inside `StatsStrip`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Main label / credential. |
| `value` | `ReactNode` | — | Optional emphasised value (e.g. "+30 Years"). |
| `icon` | `PhosphorIcon` | — | Optional leading icon shown in a soft badge. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { Stat } from "@/components/basic";
import { Certificate } from "@phosphor-icons/react";

<Stat icon={Certificate} label="DECAL-Approved Trainer" />
<Stat value="+30" label="Years of experience" />
```

Figma — shown in section: Basic components.
