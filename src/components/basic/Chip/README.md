# Chip

Tag / pill / method-pill / feature chip. A static label with an optional leading icon and a soft tonal background.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"mint" \| "peach" \| "outline"` | `"mint"` | Color tone. |
| `size` | `"sm" \| "md"` | `"md"` | Size. |
| `icon` | `PhosphorIcon` | — | Optional leading icon. |
| `children` | `ReactNode` | — | Label. |

All other native `<span>` props are forwarded.

## Usage

```tsx
import { Chip } from "@/components/basic";
import { Sparkle } from "@phosphor-icons/react";

<Chip tone="mint" icon={Sparkle}>Reggio Emilia</Chip>
<Chip tone="outline" size="sm">2 hours</Chip>
```

Figma — shown in section: Basic components.
