# SectionHeader

Eyebrow + title + optional subtitle, left- or center-aligned. Composes `Eyebrow`, `Heading` and `Text`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `eyebrow` | `ReactNode` | — | Optional uppercase eyebrow. |
| `title` | `ReactNode` | — | Section title (rendered as H2). |
| `subtitle` | `ReactNode` | — | Optional supporting copy. |
| `align` | `"left" \| "center"` | `"left"` | Text alignment. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { SectionHeader } from "@/components/macro";

<SectionHeader
  align="center"
  eyebrow="For teachers & schools"
  title="Programs that fit your classroom"
  subtitle="Hands-on training grounded in the Reggio Emilia approach."
/>
```

Figma — shown in section: Macro components.
