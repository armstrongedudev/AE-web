# Button

Primary action control. Renders an `<a>` when `href` is supplied (styled identically) or a `<button>` otherwise. Supports leading and trailing Phosphor icons.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost"` | `"primary"` | Visual style. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size. |
| `leadingIcon` | `PhosphorIcon` | — | Icon before the label. |
| `trailingIcon` | `PhosphorIcon` | — | Icon after the label. |
| `fullWidth` | `boolean` | `false` | Stretch to container width. |
| `href` | `string` | — | When set, renders an anchor. |
| `onClick` | `(e) => void` | — | Click handler (button mode). |
| `children` | `ReactNode` | — | Label. |

All other native `<button>` / `<a>` props are forwarded.

## Usage

```tsx
import { Button } from "@/components/basic";
import { ArrowRight } from "@phosphor-icons/react";

<Button variant="primary" size="lg" trailingIcon={ArrowRight}>
  Book a training
</Button>

<Button variant="secondary" href="/courses">Online courses</Button>
```

Figma — shown in section: Basic components.
