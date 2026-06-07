# WorkshopCard

Cover image with a duration tag overlay, title, description and arrow CTA. A mint gradient placeholder renders when no image is supplied. Grows to fill its grid cell.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `image` | `string` | — | Cover image URL. |
| `tag` | `ReactNode` | — | Duration / category tag over the image. |
| `title` | `ReactNode` | — | Workshop title. |
| `description` | `ReactNode` | — | Short description. |
| `cta` | `ReactNode` | — | CTA label. |
| `ctaHref` | `string` | — | CTA destination. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { WorkshopCard } from "@/components/macro";

<WorkshopCard
  image="/workshops/observation.jpg"
  tag="2 hours"
  title="The art of observation"
  description="Turn everyday moments into rich documentation."
  cta="See dates"
  ctaHref="/workshops/observation"
/>
```

Figma — shown in section: Macro components.
