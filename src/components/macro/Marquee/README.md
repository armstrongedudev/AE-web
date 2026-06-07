# Marquee

A real, infinite, continuous loop of children — the code equivalent of the Figma carousel.

## How it works

The children are rendered **twice** into one flex track. A CSS `@keyframes` translates the track by exactly one group width (`-50%` of the doubled track, minus half the inter-group gap) at a `linear` timing function. When the animation resets, the second copy sits pixel-identical to where the first started, so there is no visible jump — seamless. The duplicate copy is `aria-hidden`. Direction is handled with `animation-direction`. The loop pauses on hover, and on `prefers-reduced-motion: reduce` the animation is disabled and the track becomes manually scrollable. Edge fade is a `mask-image` gradient (vendor-prefixed for Safari).

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Items to scroll (duplicated internally). |
| `speed` | `number` | `30` | Seconds for one full loop (lower = faster). |
| `direction` | `"left" \| "right"` | `"left"` | Scroll direction. |
| `fade` | `boolean` | `true` | Fade the left/right edges. |
| `gap` | `number \| string` | `16` | Gap between items. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { Marquee } from "@/components/macro";

<Marquee speed={40} gap={24}>
  {photos.map((src) => (
    <img key={src} src={src} alt="" style={{ height: 220, borderRadius: 14 }} />
  ))}
</Marquee>
```

Figma — shown in section: Macro components.
