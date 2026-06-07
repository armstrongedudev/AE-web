import { useState, type ReactNode } from "react";
import { Check, Copy } from "@phosphor-icons/react";

/* ---- very small JSX/TS highlighter (cosmetic only) ---- */
function highlight(code: string): string {
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return esc
    .replace(/(\/\/[^\n]*)/g, '<span class="tok-cmt">$1</span>')
    .replace(/(&quot;|&#39;|"|')(?:(?!\1).)*\1/g, (m) => `<span class="tok-str">${m}</span>`)
    .replace(/\b(import|from|export|const|let|return|function|default)\b/g, '<span class="tok-key">$1</span>')
    .replace(/(&lt;\/?)([A-Z][A-Za-z0-9]*)/g, '$1<span class="tok-tag">$2</span>');
}

export function CodeBlock({ code, lang = "tsx", solo = false }: { code: string; lang?: string; solo?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };
  return (
    <div className={["docs-codewrap", solo && "docs-codewrap--solo"].filter(Boolean).join(" ")}>
      <div className="docs-code__head">
        <span className="docs-code__lang">{lang}</span>
        <button className="docs-code__copy" onClick={copy} type="button">
          {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />} {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="docs-code">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  );
}

export function Preview({
  children,
  center = true,
  dark = false,
  block = false,
}: {
  children: ReactNode;
  center?: boolean;
  dark?: boolean;
  block?: boolean;
}) {
  const cls = [
    "docs-preview",
    center && !block && "docs-preview--center",
    dark && "docs-preview--dark",
    block && "docs-preview--block",
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}

/** Preview + Code joined into one block (the canonical docs example unit). */
export function Example({
  children,
  code,
  center = true,
  dark = false,
  block = false,
}: {
  children: ReactNode;
  code: string;
  center?: boolean;
  dark?: boolean;
  block?: boolean;
}) {
  return (
    <div>
      <Preview center={center} dark={dark} block={block}>
        {children}
      </Preview>
      <CodeBlock code={code} />
    </div>
  );
}

export interface PropRow {
  name: string;
  type: string;
  def?: string;
  desc: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <table className="docs-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td>
              <code>{r.name}</code>
            </td>
            <td>
              <code>{r.type}</code>
            </td>
            <td>{r.def ? <code>{r.def}</code> : <span style={{ color: "var(--muted-foreground)" }}>—</span>}</td>
            <td>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-callout">
      <Check className="docs-callout__icon" size={20} weight="bold" />
      <p>{children}</p>
    </div>
  );
}

export function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="docs-variant">
      {children}
      <span className="docs-variant__label">{label}</span>
    </span>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="docs-section">
      <h2 className="docs-section__h">{title}</h2>
      {children}
    </section>
  );
}
