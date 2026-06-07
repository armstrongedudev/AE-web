# Armstrong UI — Component Manifest (build contract)

Single source of truth for the React library **and** the Figma design-system frames.
Names here MUST match the Figma component/section names and the React export names.

## Conventions
- Stack: **Vite + React 18 + TypeScript**, plain CSS per component (`Component.css`) using **semantic tokens only** (`var(--primary)`, `var(--space-4)`, `var(--radius-card)`…). Never hardcode hex/px that a token exists for.
- Icons: **Phosphor** via `@phosphor-icons/react` (regular weight to match the design).
- Folder per component: `src/components/<group>/<Name>/index.tsx` + `<Name>.css` + `README.md`.
  - `README.md` must contain: **Name**, one-line **description**, **props table** (prop · type · default · description), **usage example**, and **Figma** node note ("shown in section: Basic/Macro components").
- Each group has a barrel `src/components/basic/index.ts` and `src/components/macro/index.ts`; root `src/index.ts` re-exports both + tokens.
- All interactive elements: visible `:focus-visible` ring (`--ring`), keyboard accessible, semantic HTML.

## Responsive breakpoints
- **desktop** ≥ 1024px · **tablet** 640–1023px · **phone** ≤ 639px
- Container: `max-width 1280`, gutters 80 / 40 / 20 (desktop/tablet/phone) — use `.container`.
- Mobile-first CSS; scale type via the `.t-*` classes (already responsive in typography.css).

---

## BASIC components  → Figma section `Basic components` (140:6817)
| Name | Description | Key props |
|---|---|---|
| `Icon` | Phosphor icon wrapper | `name` (PhosphorIcon), `size=20`, `weight="regular"`, `color` |
| `Button` | Primary action | `variant: "primary"\|"secondary"\|"ghost"`, `size: "sm"\|"md"\|"lg"`, `trailingIcon?`, `href?`, `onClick?`, `fullWidth?` |
| `ArrowLink` | Inline text link with arrow ("Explore →") | `children`, `href?`, `onClick?` |
| `Chip` | Tag / pill / method-pill / feature chip | `tone: "mint"\|"peach"\|"outline"`, `icon?`, `size: "sm"\|"md"` |
| `IconBadge` | Icon in a soft rounded square | `icon`, `tone: "mint"\|"peach"\|"forest"`, `size=48` |
| `Eyebrow` | Uppercase section label | `children` |
| `Heading` | Display/H1–H4 | `level: "display-xl"\|"display"\|1\|2\|3\|4`, `as?` |
| `Text` | Body copy | `size: "lg"\|"md"\|"sm"\|"caption"`, `tone: "ink"\|"body"\|"muted"` |
| `Stars` | Rating row | `value: 0–5`, `size=16` |
| `Avatar` | Initial or image | `name`, `src?`, `size=56` |
| `Stat` | Single stat (stats strip) | `label`, `value?`, `icon?` |
| `Stepper` | Numeric +/- control | `value`, `min`, `max`, `step=1`, `onChange` |

## MACRO components  → Figma section `Macro Components` (140:6818)
| Name | Description | Key props |
|---|---|---|
| `SectionHeader` | Eyebrow + title + optional subtitle | `eyebrow?`, `title`, `subtitle?`, `align: "left"\|"center"` |
| `OfferingCard` | Program card (icon, title, desc, link) | `icon`, `title`, `description`, `cta`, `tone?`, `features?: string[]` |
| `WorkshopCard` | Image, duration tag, title, desc, CTA | `image?`, `tag`, `title`, `description`, `cta` |
| `TestimonialCard` | Avatar, name, role, stars, quote | `name`, `role`, `rating`, `quote`, `avatarSrc?` |
| `Marquee` | **Infinite continuous loop** of children (CSS) | `speed=30` (s), `direction: "left"\|"right"`, `fade?=true`, `gap=16` |
| `Navbar` | Top nav | `links`, `primaryCta`, `secondaryCta` |
| `Footer` | Footer w/ columns | `columns`, `tagline`, `ctas` |
| `StatsStrip` | Row of `Stat` | `items` |
| `MethodsSection` | Methods band (copy + method chips + Marquee of photos) | `eyebrow`, `title`, `body`, `methods: string[]`, `images` |

> `Marquee` is the React equivalent of the Figma carousel: real infinite loop with CSS `@keyframes` translateX, duplicated track for seamlessness, edge fade via mask-image, pauses on `prefers-reduced-motion`.

---

## HOME page (codes Figma `Home - desktop` 140:6819) — `src/pages/Home.tsx`
Section order (each a composition of the components above), responsive desktop → tablet → phone:
1. **Navbar** — logo · Certification · Programs · About Camille · Reviews · [Online courses] secondary · [Contact Camille] primary. Tablet/phone: collapse links into a hamburger menu.
2. **Hero** — eyebrow + H1 "Where theory becomes everyday practice" + intro + dual CTA (Book a training / Meet Camille) + hero image. Desktop 2-col; phone stacked, image below.
3. **Stats strip** — Reggio Emilia Approach · DECAL-Approved Trainer · M.A. Educational Psychology · +30 Years. Desktop 4-col → tablet 2×2 → phone 2×2 or stacked.
4. **Methods** — "Play is research. Observation is love." copy left + method chips + `Marquee` of children photos right (loop, fade). Desktop 2-col → phone stacked (marquee full-width below copy).
5. **Programs for teachers & schools** — `SectionHeader` + grid: 3 `OfferingCard` + 2 wide cards. Desktop 3-up/2-up → tablet 2-up → phone 1-up.
6. **Workshops educators love** — `SectionHeader` + 5 `WorkshopCard`. Desktop 4-up (wrap, 5th wraps) → tablet 2-up → phone 1-up (or horizontal scroll).
7. **Pricing calculator "Get your quote"** — interactive: method toggle, state select, attendees slider, hours steppers, extras, live price. Functional state (compute price from the pricing doc decay curve: 1h=$35/head with group + multi-hour discounts; show per-head + total).
8. **Testimonials** — `SectionHeader` + 3 `TestimonialCard`. Desktop 3-up → tablet 2-up → phone 1-up (scroll).
9. **Footer** — brand + tagline + Get certified/Pricing + 3 link columns. Stacks on phone.

Pricing logic (from Armstrong-Pricing-Strategy.docx): per-head base $35 (in-person) / $25 (online), hours multiplier {1:1.0,1.5:1.45,2:1.8,3:2.3,4:2.7,6:3.5,8:4.0}, group discount tiers by attendee count; add-ons: Q&A + printed certificate. Show live total and per-head.
