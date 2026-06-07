# OfferingCard

Program card with a tonal icon badge, title, description, an optional feature list and an arrow CTA. Grows to fill its grid cell; CTA pins to the bottom.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `PhosphorIcon` | — | Leading icon shown in a badge. |
| `title` | `ReactNode` | — | Program title. |
| `description` | `ReactNode` | — | Short description. |
| `cta` | `ReactNode` | — | CTA label. |
| `ctaHref` | `string` | — | CTA destination. |
| `tone` | `"mint" \| "peach" \| "forest"` | `"mint"` | Badge tone. |
| `features` | `string[]` | — | Optional bullet list. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { OfferingCard } from "@/components/macro";
import { GraduationCap } from "@phosphor-icons/react";

<OfferingCard
  icon={GraduationCap}
  tone="forest"
  title="On-site teacher training"
  description="A full day of hands-on learning in your school."
  features={["Up to 30 educators", "Printed certificates", "Follow-up Q&A"]}
  cta="Learn more"
  ctaHref="/programs/onsite"
/>
```

Figma — shown in section: Macro components.
