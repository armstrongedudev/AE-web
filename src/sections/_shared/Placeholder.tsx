import "./Placeholder.css";

type Tone = "mint" | "peach" | "cream" | "forest";

/**
 * Placeholder — labeled tinted block standing in for a real photo.
 * Replace with real <img> assets later; the `label` documents what goes here.
 */
export default function Placeholder({
  label,
  tone = "mint",
  ratio = "4 / 3",
  rounded = true,
  className,
}: {
  label: string;
  tone?: Tone;
  ratio?: string;
  rounded?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`ph ph--${tone}${rounded ? " ph--rounded" : ""}${className ? ` ${className}` : ""}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder image: ${label}`}
    >
      <span className="ph__label">{label}</span>
    </div>
  );
}
