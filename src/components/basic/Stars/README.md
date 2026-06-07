# Stars

Read-only rating row rendering full, half and empty stars in the brand star color. Exposed to assistive tech as "N out of 5 stars".

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` (0–5) | — | Rating; rounded to nearest half. |
| `size` | `number` | `16` | Pixel size of each star. |

All other native `<span>` props are forwarded.

## Usage

```tsx
import { Stars } from "@/components/basic";

<Stars value={4.5} size={20} />
```

Figma — shown in section: Basic components.
