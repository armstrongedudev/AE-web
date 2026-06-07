# Heading

Display / H1–H4 text. The `level` prop selects the responsive type scale; `as` overrides the rendered element so visual size and document semantics can differ.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `level` | `"display-xl" \| "display" \| 1 \| 2 \| 3 \| 4` | — | Visual scale. |
| `as` | `ElementType` | derived from `level` | Override the rendered tag. |
| `children` | `ReactNode` | — | Heading text. |

All other native heading props are forwarded.

## Usage

```tsx
import { Heading } from "@/components/basic";

<Heading level="display">Where theory becomes everyday practice</Heading>
<Heading level={2} as="h3">Workshops educators love</Heading>
```

Figma — shown in section: Basic components.
