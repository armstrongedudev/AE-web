import { useDocumentTitle } from "../hooks/useDocumentTitle";

/** Temporary on-brand placeholder used by page stubs until they're built out. */
export default function Placeholder({ title, note }: { title: string; note?: string }) {
  useDocumentTitle(title);
  return (
    <section className="section" style={{ padding: "120px 24px", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: 720, margin: "0 auto" }}>
        <p style={{ font: "600 12px/1.2 var(--font-sans)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent-ink)" }}>
          Armstrong Educational Services
        </p>
        <h1 style={{ font: "600 40px/1.05 var(--font-sans)", color: "var(--ink)", margin: "12px 0" }}>{title}</h1>
        <p style={{ font: "400 18px/1.6 var(--font-sans)", color: "var(--body)" }}>
          {note ?? "This page is being built."}
        </p>
      </div>
    </section>
  );
}
