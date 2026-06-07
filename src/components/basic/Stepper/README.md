# Stepper

Numeric +/- control with clamped min/max bounds. Controlled — owns no internal state. Buttons disable at the bounds and are keyboard accessible.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Current value (controlled). |
| `min` | `number` | `0` | Minimum allowed value. |
| `max` | `number` | — | Maximum allowed value. |
| `step` | `number` | `1` | Increment / decrement amount. |
| `onChange` | `(value: number) => void` | — | Called with the next clamped value. |
| `label` | `string` | `"Quantity"` | Accessible group label. |

All other native `<div>` props are forwarded.

## Usage

```tsx
import { Stepper } from "@/components/basic";

const [hours, setHours] = useState(2);
<Stepper value={hours} min={1} max={8} onChange={setHours} label="Hours" />
```

Figma — shown in section: Basic components.
