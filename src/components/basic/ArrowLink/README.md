# ArrowLink

Inline text link with a trailing arrow that slides on hover ("Explore →"). Renders an `<a>` when `href` is supplied, otherwise a `<button>`.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Link label. |
| `href` | `string` | — | When set, renders an anchor. |
| `onClick` | `(e) => void` | — | Click handler (button mode). |
| `className` | `string` | — | Extra class. |

All other native `<a>` / `<button>` props are forwarded.

## Usage

```tsx
import { ArrowLink } from "@/components/basic";

<ArrowLink href="/programs">Explore programs</ArrowLink>
```

Figma — shown in section: Basic components.
