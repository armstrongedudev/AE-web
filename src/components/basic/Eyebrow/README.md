# Eyebrow

Small uppercase, wide-tracked label that sits above a section title. Renders a `<p>` with the responsive `.t-eyebrow` type class.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Label text. |
| `className` | `string` | — | Extra class. |

All other native `<p>` props are forwarded.

## Usage

```tsx
import { Eyebrow } from "@/components/basic";

<Eyebrow>Programs for teachers</Eyebrow>
```

Figma — shown in section: Basic components.
