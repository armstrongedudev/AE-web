# Avatar

Circular avatar showing an image, or the person's initials on a mint surface when no image is supplied.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Used for alt text and the initials fallback. |
| `src` | `string` | — | Optional image URL. |
| `size` | `number` | `56` | Pixel diameter. |

All other native `<span>` props are forwarded.

## Usage

```tsx
import { Avatar } from "@/components/basic";

<Avatar name="Camille Armstrong" size={64} />
<Avatar name="Jordan Lee" src="/jordan.jpg" />
```

Figma — shown in section: Basic components.
