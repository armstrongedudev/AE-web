import type { HTMLAttributes } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { Icon } from "../Icon";
import "./Stepper.css";

export interface StepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Current value (controlled). */
  value: number;
  /** Minimum allowed value. @default 0 */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Increment / decrement amount. @default 1 */
  step?: number;
  /** Called with the next clamped value. */
  onChange: (value: number) => void;
  /** Accessible label for the control group. */
  label?: string;
}

/** Stepper — numeric +/- control with clamped min/max and keyboard support. */
export function Stepper({
  value,
  min = 0,
  max,
  step = 1,
  onChange,
  label = "Quantity",
  className,
  ...rest
}: StepperProps) {
  const clamp = (n: number) => {
    let next = n;
    if (max !== undefined) next = Math.min(max, next);
    next = Math.max(min, next);
    return next;
  };

  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <div
      className={["aui-stepper", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={label}
      {...rest}
    >
      <button
        type="button"
        className="aui-stepper__btn"
        onClick={() => onChange(clamp(value - step))}
        disabled={!canDecrement}
        aria-label="Decrease"
      >
        <Icon name={Minus} size={16} />
      </button>
      <span className="aui-stepper__value t-body-lg-bold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="aui-stepper__btn"
        onClick={() => onChange(clamp(value + step))}
        disabled={!canIncrement}
        aria-label="Increase"
      >
        <Icon name={Plus} size={16} />
      </button>
    </div>
  );
}

export default Stepper;
