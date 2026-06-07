# Navbar

Sticky top navigation: brand, centered links and one or two CTAs. Below the desktop breakpoint (≤1023px) the links and CTAs collapse behind a hamburger toggle that opens a full-width panel.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `brand` | `ReactNode` | `"Armstrong"` | Logo / wordmark. |
| `links` | `NavLink[]` | — | `{ label, href }` items. |
| `primaryCta` | `NavbarCta` | — | Filled CTA `{ label, href?, onClick? }`. |
| `secondaryCta` | `NavbarCta` | — | Outline CTA. |

All other native `<header>` props are forwarded.

## Usage

```tsx
import { Navbar } from "@/components/macro";

<Navbar
  brand="Armstrong"
  links={[
    { label: "Certification", href: "#certification" },
    { label: "Programs", href: "#programs" },
    { label: "About Camille", href: "#about" },
    { label: "Reviews", href: "#reviews" },
  ]}
  secondaryCta={{ label: "Online courses", href: "/courses" }}
  primaryCta={{ label: "Contact Camille", href: "/contact" }}
/>
```

Figma — shown in section: Macro components.
