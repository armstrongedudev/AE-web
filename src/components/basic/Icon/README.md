# Icon

Thin wrapper around a [Phosphor](https://phosphoricons.com) icon that standardises size, weight and accessibility. Decorative by default.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `PhosphorIcon` | — | A Phosphor icon component (e.g. `Star`). |
| `size` | `number` | `20` | Pixel size. |
| `weight` | `IconWeight` | `"regular"` | Phosphor weight. |
| `color` | `string` | `currentColor` | Any CSS color or `var(--token)`. |
| `label` | `string` | — | Accessible label; when omitted the icon is `aria-hidden`. |
| `className` | `string` | — | Extra class. |

## Usage

```tsx
import { Icon } from "@/components/basic";
import { Star } from "@phosphor-icons/react";

<Icon name={Star} size={24} color="var(--star)" label="Rating" />
```

Figma — shown in section: Basic components.
