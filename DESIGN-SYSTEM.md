# Armstrong Design System — Usage Guide

How to use every token, foundation and component in the Armstrong UI library.
Built for **Armstrong Educational Services** (Reggio‑Emilia early‑childhood education).
Stack: **Vite + React 18 + TypeScript**, plain CSS per component, **semantic design tokens only**, Phosphor icons.
The library is 1:1 with the Figma file *Amstrong Education* (`ptXZAsCg3bkJhtTm7zu0Or`). Live docs: `npm run dev` → the docs site (`src/docs/`).

> **Golden rule:** components consume **semantic tokens** (`var(--primary)`, `var(--space-4)`, `var(--radius-card)`) — never raw hex/px that a token already exists for, and never primitives directly.

---

## 1. Install & import

```bash
npm i   # then
npm run dev      # docs site / playground
```

```tsx
import { Button, Chip, OfferingCard, StatsStrip /* … */ } from "armstrong-ui";
import "armstrong-ui/src/styles/global.css"; // tokens + typography + resets
```

`src/index.ts` re-exports every component, its types, and the token name maps (`color`, `space`, `radius`, `semanticSpace`, `semanticRadius`, `v`, `breakpoints`).

---

## 2. Design tokens

Architecture: **Primitives** (raw values) → **Semantic** roles (Light/Dark) → components. Defined in `src/tokens/tokens.css`; name maps in `src/tokens/tokens.ts`. Mirrored as Figma variables (collections *Primitives* + *Semantic*).

### Color — semantic roles (use these)
| Token | Role |
|---|---|
| `--primary` / `--primary-hover` / `--on-primary` | Main green action, links, focus |
| `--cta` / `--on-cta` | Bright **call‑to‑action** green (`#3ba563`) for filled buttons |
| `--forest` / `--on-forest` | Deep green — footers, dark bands |
| `--mint` / `--on-mint` | Soft mint — chips, avatars, badges |
| `--accent` / `--accent-hover` / `--on-accent` / `--accent-soft` / `--on-accent-soft` | Warm orange highlights |
| `--background` `--surface-card` `--surface-cream` `--surface-mint` `--surface-peach` `--muted` | Surfaces |
| `--ink` `--body` `--muted-foreground` | Text (heading / body / secondary) |
| `--hairline` `--hairline-strong` `--ring` | Borders & focus ring |
| `--star` | Rating stars |
| `--success` `--warning` `--error` `--info` (+ `-soft` / `on-` pairs) `--destructive` | Status |

Dark mode: set `data-theme="dark"` on `<html>` — every role flips automatically.

### Radius — **iOS‑style (soft, larger)**
`--radius-sm 8` · `--radius-md 12` · `--radius-lg 16` · `--radius-xl 24` · `--radius-2xl 32` · `--radius-full 9999`
Semantic: `--radius-control` (md, controls) · `--radius-card` (lg, cards) · `--radius-modal` (xl) · `--radius-pill` (full).

**When to use each radius** (prefer the semantic token; raw `sm…2xl` for one‑offs):
| Token | Value | Use for |
|---|---|---|
| `--radius-sm` | 8px | Small tags, tooltips, inline badges, compact inputs |
| `--radius-md` / `--radius-control` | 12px | Interactive controls — buttons, inputs, selects, steppers, small chips |
| `--radius-lg` / `--radius-card` | 16px | Cards, panels, list items, media thumbnails |
| `--radius-xl` / `--radius-modal` | 24px | Modals, sheets, large media & carousel cards |
| `--radius-2xl` | 32px | Extra‑large feature / hero surfaces |
| `--radius-full` / `--radius-pill` | 9999px | Pills, avatars, fully‑rounded chips, circular buttons |

### Spacing — 4px grid
Primitives `--space-0 … --space-30` (e.g. `--space-4 = 16px`). Semantic intents: `--space-inset-sm/md/lg`, `--space-gap-sm/md`, `--space-stack`, `--space-section`.

### Typography — `Armstrong/*` text styles → `.t-*` classes
`.t-display-xl` `.t-display` `.t-h1…t-h4` `.t-body-lg` `.t-body` `.t-small` `.t-caption` `.t-button` `.t-eyebrow`.
Fonts: **Source Sans 3** (display/UI), **Inter** (long body).

---

## 3. Iconography

Icons are **Phosphor** (`@phosphor-icons/react`, *regular* weight), wrapped by `<Icon>` for consistent size + a11y. ~39 icons make up the system set (see the *Iconography* page in the docs / the *Icon set* sheet in Figma).

```tsx
import { GraduationCap } from "@phosphor-icons/react";
<Icon name={GraduationCap} size={24} />        // decorative (aria-hidden)
<Icon name={GraduationCap} label="Programs" /> // meaningful (role=img + label)
```

---

## 4. Basic components (atoms)

### Icon
Phosphor wrapper. `name` (PhosphorIcon), `size=20`, `weight="regular"`, `color`, `label?`.

### Button
Primary action. Renders `<a>` when `href` is set, else `<button>`.
- `variant`: `primary | secondary | ghost` (pill) **·** `white | cta | forest` (**system buttons** — filled, elevated, rounded `--radius-control`)
- `size`: `sm | md | lg` · `leadingIcon?` / `trailingIcon?` (Phosphor) · `fullWidth?` · `href?`
- States: hover, `:active`, `:focus-visible` ring, `disabled` (all built in).
```tsx
<Button variant="primary" trailingIcon={ArrowRight}>Book a training</Button>
<Button variant="cta" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Online courses</Button>
<Button variant="forest" disabled>Disabled</Button>
```

### ArrowLink
Inline text link with trailing arrow, underlines on hover. `children`, `href?`, `onClick?`.
```tsx
<ArrowLink href="/programs">Explore programs</ArrowLink>
```

### Chip
Tag / pill / method‑pill. `tone`: `mint | peach | outline` · `size`: `sm | md` · `icon?`.
```tsx
<Chip tone="mint">Reggio Emilia</Chip>
<Chip tone="peach" icon={Clock}>2 hours</Chip>
```

### IconBadge
Icon in a soft rounded square. `icon` · `tone`: `mint | peach | forest` · `size=48` · `label?`.

### Eyebrow
Uppercase wide‑tracked label above section titles. `children`. (Renders `<p>` — not a heading.)

### Heading
Display & H1–H4 ramp. `level`: `display-xl | display | 1 | 2 | 3 | 4` · `as?` (keep semantic order; visual size ≠ tag).

### Text
Body copy. `size`: `lg | md | sm | caption` · `tone`: `ink | body | muted` · `as?`.

### Stars
Read‑only rating 0–5 (halves). `value` · `size=16`. (role=img + “X out of 5 stars”.)

### Avatar
Circular image or initials on mint. `name` · `src?` · `size=56`.

### Stat
A credential/metric: optional badge + value + label. `label` · `value?` · `icon?` · **`image?`** (seal instead of badge).
```tsx
<Stat icon={Clock} value="30+" label="Years of practice" />
```

### Stepper
Numeric +/− control, clamped, keyboard‑accessible. `value` · `min=0` · `max?` · `step=1` · `onChange` · `label?`.

---

## 5. Macro components (molecules & organisms)

### SectionHeader
Eyebrow + H2 title + optional subtitle. `eyebrow?` · `title` · `subtitle?` · `align: left | center`.

### OfferingCard
Program card. `icon` · `title` · `description` · `cta` / `ctaHref?` · `tone?` · `features?: string[]`.

### WorkshopCard
Cover media + duration tag + title + description + CTA. `image?` · `tag` · `title` · `description` · `cta` / `ctaHref?`.

### TestimonialCard
Stars + quote + avatar/name/role. `name` · `role` · `rating` · `quote` · `avatarSrc?`. (Renders `<figure>/<blockquote>`.)

### StatsStrip
Credentials band — stats spread **edge‑to‑edge** with thin dividers, **transparent** (no card), **no lateral padding**. Wraps on tablet/phone. `items: { label, value?, icon?, image? }[]`.
```tsx
<StatsStrip items={[
  { icon: ChalkboardTeacher, value: "Reggio Emilia", label: "Approach · GA, NC, SC" },
  { icon: Clock,       value: "30+",   label: "Years of practice" },
  { icon: Certificate, value: "DECAL", label: "Approved Trainer" },
  { icon: GraduationCap, value: "M.A.", label: "Educational Psychology" },
]} />
```

### Marquee
Real infinite CSS loop of children (duplicated track, edge‑fade, pauses on hover / reduced‑motion). `speed=30` (s) · `direction: left | right` · `fade=true` · `gap=16`.

### MethodsSection
Methods band: eyebrow + H2 + body + method `Chip`s beside a photo `Marquee`. `eyebrow?` · `title` · `body` · `methods: string[]` · `images?` / `children`.

### Navbar
Floating, rounded, **translucent gradient** bar (`linear-gradient(to right,#fff 18%, rgba(255,255,255,.62) 66%)` + `backdrop-filter: blur(11.5px)`), capped to 1280, AÉ logo (`/brand/logo-ae.png`). Collapses to a hamburger + dropdown on ≤1023px. `links: NavLink[]` · `primaryCta` (filled `cta` green) · `secondaryCta?` (white + arrow) · `logoSrc?`.

### Footer
Radial **cream→green** band (Figma 288:1917). Left (cream side): AÉ logo + eyebrow wordmark + dark‑green tagline + **Get certified** (solid green, arrow) / **Pricing** (white, `#bbe1c9` border). Right (green side): three **white** link columns. Bottom: monospace copyright bar (`#f8f8f8`). Props: `brand?` (eyebrow) · `logoSrc?` · `tagline?` · `ctas?: { label, href?, variant?: "solid"|"ghost", arrow? }[]` · `columns: FooterColumn[]` · `copyright?`. Stacks on tablet/phone.

---

## 6. Patterns & conventions

- **Theming:** `data-theme="light" | "dark"` on `<html>`. Components never hardcode mode‑specific colors.
- **Accessibility:** semantic HTML, visible `:focus-visible` ring (`--ring`), keyboard support; decorative icons `aria-hidden`, meaningful ones labelled; Body tone meets WCAG AA on white (reserve Muted for secondary text).
- **Two button languages:** pill (`primary/secondary/ghost`) for inline/links; **system** (`white/cta/forest`, rounded + elevated) for prominent page actions / navbar.
- **Section backgrounds:** the only allowed section fills are the 5 `.section-bg--*` classes (`src/styles/section-backgrounds.css`). **Any background works on any section** — they are *not* tied to the section they're named after. Chain them by color: a background's **top** must match the bottom of the section above (the outgoing color), and its **bottom / exit** must match the **top** of the section below. Reorder/reuse freely; only the boundary matching matters, so seams stay invisible.
- **Figma parity:** component & token names match the Figma file. Foundations (variables, text styles) are the shared source of truth — change a token once and it propagates to code and Figma.
- **Responsive breakpoints:** desktop ≥1024 · tablet 640–1023 · phone ≤639. Container max 1280, gutters 80/40/20.

---

## 7. Quote experience — Calculator | Quiz (+ Save quote)

On `/pricing` the user gets a quote **two interchangeable ways** — they pick via a toggle:

- **Calculator** — the live form (`src/sections/PricingCalculator/`): v1 Cards (exact design), v2 Compact, v3 Inline. Pick the layout that fits the context.
- **Quiz** — the *same questions asked one at a time* (guided / wizard): method → state → attendees → hours → extras, then the quote. To be built reusing existing components: `SectionHeader` (step intro), segmented controls / `Chip` (method, state), `Stepper` (attendees, hours), `Button` for Back/Next, and the same quote summary card as the calculator.

**Both paths share one engine.** Build the Quiz on `pricing.ts` + the `usePricing` hook — same `PricingState` → `computePricing` → identical quote (`perHead`, `total`, savings). Never fork the pricing math; only the *input UX* differs (form vs. wizard).

**Save quote (requires the account layer — Supabase).** A produced quote (from either path) can be saved:
- **Logged-in client** → "Save quote" persists a `quotes` row (the `PricingState` + result) to Supabase, visible in `/app`.
- **Guest** → "Save quote" routes to `/login`; after auth the quote persists and returns the user to it.
- Roles & data model live in `src/docs/sitemap.ts` → `seoNotes.accounts` (client/owner, RLS, quotes/bookings tables). The owner (Camille) can then price/accept the booking in `/admin`.

> Implementation note: keep the quote as a serialisable `PricingState` so it round-trips through URL params (shareable), the Quiz, and the Supabase `quotes` row identically.

---

*Keep this file in sync with `src/tokens/`, the components in `src/components/`, and the Figma `Design system` page. See `COMPONENTS.md` for the build contract / Figma node mapping.*
