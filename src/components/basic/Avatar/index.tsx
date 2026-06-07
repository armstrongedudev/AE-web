import type { HTMLAttributes } from "react";
import "./Avatar.css";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Person's name — used for the alt text and the initials fallback. */
  name: string;
  /** Optional image URL; falls back to initials when absent. */
  src?: string;
  /** Pixel diameter. @default 56 */
  size?: number;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Avatar — circular image, or initials on a mint surface when no image is set. */
export function Avatar({ name, src, size = 56, className, style, ...rest }: AvatarProps) {
  const classes = ["aui-avatar", className].filter(Boolean).join(" ");
  return (
    <span
      className={classes}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38), ...style }}
      {...rest}
    >
      {src ? (
        <img className="aui-avatar__img" src={src} alt={name} width={size} height={size} />
      ) : (
        <span className="aui-avatar__initials" aria-label={name}>
          {initials(name)}
        </span>
      )}
    </span>
  );
}

export default Avatar;
