# MethodsSection

The methods band: copy + method chips on one side, an infinite `Marquee` of photos on the other. Two columns on desktop; stacks on tablet/phone with the marquee full-width below the copy.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `eyebrow` | `ReactNode` | — | Optional uppercase eyebrow. |
| `title` | `ReactNode` | — | Section title. |
| `body` | `ReactNode` | — | Body copy. |
| `methods` | `string[]` | — | Method names rendered as mint chips. |
| `images` | `{ src, alt? }[]` | — | Photos looped in the Marquee (ignored when `children` is set). |
| `children` | `ReactNode` | — | Custom marquee content (e.g. placeholder cards); looped instead of `images`. |
| `marqueeSpeed` | `number` | `36` | Marquee loop seconds. |

All other native `<section>` props are forwarded.

## Usage

```tsx
import { MethodsSection } from "@/components/macro";

<MethodsSection
  eyebrow="The method"
  title="Play is research. Observation is love."
  body="Camille's training turns Reggio-inspired theory into daily classroom practice."
  methods={["Observation", "Documentation", "Provocations", "Reflection"]}
  images={[{ src: "/m1.jpg" }, { src: "/m2.jpg" }, { src: "/m3.jpg" }]}
/>
```

Figma — shown in section: Macro components.
