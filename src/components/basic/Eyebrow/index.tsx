import type { HTMLAttributes, ReactNode } from "react";
import "./Eyebrow.css";

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

/** Eyebrow — small uppercase, wide-tracked label that sits above section titles. */
export function Eyebrow({ children, className, ...rest }: EyebrowProps) {
  return (
    <p className={["aui-eyebrow", "t-eyebrow", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </p>
  );
}

export default Eyebrow;
