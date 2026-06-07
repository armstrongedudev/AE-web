# IconBadge

An icon inside a soft rounded square. Used to lead offering and feature cards.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `PhosphorIcon` | — | Icon to render. |
| `tone` | `"mint" \| "peach" \| "forest"` | `"mint"` | Color tone. |
| `size` | `number` | `48` | Outer pixel size of the square (icon scales to ~50%). |
| `label` | `string` | — | Accessible label (otherwise decorative). |

All other native `<span>` props are forwarded.

## Usage

```tsx
import { IconBadge } from "@/components/basic";
import { GraduationCap } from "@phosphor-icons/react";

<IconBadge icon={GraduationCap} tone="forest" size={56} />
```

Figma — shown in section: Basic components.
