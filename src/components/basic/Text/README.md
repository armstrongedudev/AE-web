# Text

Body copy at four sizes and three tonal roles. Renders a `<p>` by default; override with `as`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"lg" \| "md" \| "sm" \| "caption"` | `"md"` | Type scale. |
| `tone` | `"ink" \| "body" \| "muted"` | `"body"` | Color role. |
| `as` | `ElementType` | `"p"` | Rendered element. |
| `children` | `ReactNode` | — | Copy. |

All other native props are forwarded.

## Usage

```tsx
import { Text } from "@/components/basic";

<Text size="lg">Camille trains educators across the country.</Text>
<Text size="sm" tone="muted" as="span">DECAL-approved</Text>
```

Figma — shown in section: Basic components.
