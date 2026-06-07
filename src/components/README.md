# Armstrong UI — Component Library

React + TypeScript component library for Armstrong Educational Services. Every component is built against the semantic design tokens in `src/tokens/tokens.css` (never hardcoded values) and mirrors the Figma sections **Basic components** (140:6817) and **Macro Components** (140:6818).

## Conventions

- One folder per component: `index.tsx` + `<Name>.css` + `README.md`.
- Function components, named **and** default exports.
- CSS uses **semantic tokens only** (`var(--primary)`, `var(--space-4)`, `var(--radius-card)`…). Class names are prefixed `aui-`.
- Icons via [`@phosphor-icons/react`](https://phosphoricons.com) (regular weight).
- Mobile-first responsive: desktop ≥1024 · tablet 640–1023 · phone ≤639.
- All interactive elements are keyboard accessible with a visible `:focus-visible` ring (defined globally in `styles/global.css`).

## Importing

```tsx
// from the root barrel (recommended)
import { Button, Marquee, color, v } from "@/";

// or per group
import { Button, Chip } from "@/components/basic";
import { Navbar, Footer } from "@/components/macro";
```

The root `src/index.ts` re-exports both groups and the token name maps (`color`, `space`, `radius`, `semanticSpace`, `semanticRadius`, `breakpoints`, `v`).

## BASIC components

`Icon` · `Button` · `ArrowLink` · `Chip` · `IconBadge` · `Eyebrow` · `Heading` · `Text` · `Stars` · `Avatar` · `Stat` · `Stepper`

## MACRO components

`SectionHeader` · `OfferingCard` · `WorkshopCard` · `TestimonialCard` · `Marquee` · `Navbar` · `Footer` · `StatsStrip` · `MethodsSection`

See each component's own `README.md` for props and usage.
