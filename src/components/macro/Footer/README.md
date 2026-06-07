# Footer

Forest-green footer with a brand block (wordmark, tagline, optional CTAs) and columns of links, plus a copyright bar. Two-column on desktop, stacks on tablet/phone.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `brand` | `ReactNode` | `"Armstrong"` | Logo / wordmark. |
| `tagline` | `ReactNode` | — | Short tagline under the brand. |
| `columns` | `FooterColumn[]` | — | `{ title, links: { label, href }[] }`. |
| `ctas` | `FooterCta[]` | — | Optional CTA buttons in the brand block. |

All other native `<footer>` props are forwarded.

## Usage

```tsx
import { Footer } from "@/components/macro";

<Footer
  brand="Armstrong"
  tagline="Where theory becomes everyday practice."
  ctas={[
    { label: "Get certified", href: "/certification" },
    { label: "Pricing", href: "#pricing" },
  ]}
  columns={[
    { title: "Programs", links: [{ label: "On-site", href: "#" }] },
    { title: "Company", links: [{ label: "About", href: "#" }] },
    { title: "Contact", links: [{ label: "Email", href: "#" }] },
  ]}
/>
```

Figma — shown in section: Macro components.
