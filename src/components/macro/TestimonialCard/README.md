# TestimonialCard

Avatar, name, role, star rating and a quote in a soft card. Rendered as a semantic `<figure>` / `<blockquote>` / `<figcaption>`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Person's name. |
| `role` | `ReactNode` | — | Role / organisation. |
| `rating` | `number` (0–5) | — | Star rating. |
| `quote` | `ReactNode` | — | The quote. |
| `avatarSrc` | `string` | — | Optional avatar image (falls back to initials). |

All other native props are forwarded.

## Usage

```tsx
import { TestimonialCard } from "@/components/macro";

<TestimonialCard
  name="Maria Gonzalez"
  role="Pre-K Director, Atlanta"
  rating={5}
  quote="Camille's training changed how our whole team sees children."
/>
```

Figma — shown in section: Macro components.
