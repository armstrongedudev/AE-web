import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { listQuotes } from "@/lib/content";
import type { Quote, QuoteStatus } from "@/lib/database.types";
import { Heading, Button } from "@/components/basic";
import { X, ArrowRight } from "@phosphor-icons/react";
import { badgeClass, formatDate, formatUSD, titleCase } from "./_helpers";
import "./admin.css";

const STATUSES: QuoteStatus[] = ["new", "reviewed", "sent", "accepted", "declined"];
const FILTERS: Array<QuoteStatus | "all"> = ["all", ...STATUSES];

export default function AdminQuotes() {
  useDocumentTitle("Quotes · CMS", "Review incoming quote requests and set per-client pricing.");

  // TODO(api): load via data seam; edits below mutate local state only.
  const [quotes, setQuotes] = useState<Quote[]>(() => listQuotes());
  const [filter, setFilter] = useState<QuoteStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const visible = useMemo(
    () => (filter === "all" ? quotes : quotes.filter((q) => q.status === filter)),
    [quotes, filter],
  );
  const selected = quotes.find((q) => q.id === selectedId) ?? null;

  function counts(status: QuoteStatus | "all") {
    return status === "all" ? quotes.length : quotes.filter((q) => q.status === status).length;
  }

  function patchSelected(patch: Partial<Quote>) {
    if (!selectedId) return;
    setSaved(false);
    setQuotes((prev) => prev.map((q) => (q.id === selectedId ? { ...q, ...patch } : q)));
  }

  function saveSelected() {
    // TODO(api): persist owner override + status + notes; send email on "sent".
    setSaved(true);
  }

  function convertToBooking() {
    // TODO(api): create a bookings row from this quote and route to /admin/bookings/:id.
    alert("Convert to booking — wiring pending. This will create a booking from the quote.");
  }

  function num(v: string): number | null {
    const n = Number(v);
    return v === "" || Number.isNaN(n) ? null : n;
  }

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Quotes</Heading>
          <p className="cms-sub">Incoming requests from the calculator and quiz. Review, set a price, send.</p>
        </div>
      </div>

      <div className="cms-filters" role="group" aria-label="Filter quotes by status">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={"cms-chip" + (filter === f ? " is-active" : "")}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : titleCase(f)} ({counts(f)})
          </button>
        ))}
      </div>

      <div className={"cms-split" + (selected ? " is-open" : "")}>
        <div className="panel">
          {visible.length === 0 ? (
            <p className="cms-empty">No quotes with this status.</p>
          ) : (
            <div className="cms-table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">Created</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Source</th>
                    <th scope="col">Engagement</th>
                    <th scope="col" className="num">Per-head</th>
                    <th scope="col" className="num">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((q) => (
                    <tr
                      key={q.id}
                      className={"is-clickable" + (q.id === selectedId ? " is-selected" : "")}
                      onClick={() => { setSelectedId(q.id); setSaved(false); }}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") { setSelectedId(q.id); setSaved(false); } }}
                    >
                      <td>{formatDate(q.created_at)}</td>
                      <td>
                        <div className="cms-stack">
                          <strong>{q.contact_name ?? "Unnamed"}</strong>
                          <small>{q.contact_org ?? "—"}</small>
                          <small>{q.contact_email ?? ""}</small>
                          <small>{q.contact_phone ?? ""}</small>
                        </div>
                      </td>
                      <td>{titleCase(q.source)}</td>
                      <td>
                        <div className="cms-stack">
                          <span>{q.method ?? "—"} · {q.state ?? "—"}</span>
                          <small>
                            {q.attendees ?? 0} attendees ·{" "}
                            {(q.in_person_hours ?? 0)}h in-person / {(q.online_hours ?? 0)}h online
                          </small>
                        </div>
                      </td>
                      <td className="num">{formatUSD(q.owner_price_per_head ?? q.per_head)}</td>
                      <td className="num">{formatUSD(q.owner_total ?? q.total)}</td>
                      <td><span className={badgeClass(q.status)}>{q.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selected && (
          <aside className="panel" aria-label={`Quote detail for ${selected.contact_name ?? "quote"}`}>
            <div className="cms-card__head">
              <Heading level={3}>Quote detail</Heading>
              <button type="button" className="cms-iconbtn" aria-label="Close detail" onClick={() => setSelectedId(null)}>
                <X size={18} />
              </button>
            </div>

            <dl className="kv">
              <dt>Contact</dt><dd>{selected.contact_name ?? "—"}</dd>
              <dt>Organisation</dt><dd>{selected.contact_org ?? "—"}</dd>
              <dt>Email</dt><dd>{selected.contact_email ?? "—"}</dd>
              <dt>Phone</dt><dd>{selected.contact_phone ?? "—"}</dd>
              <dt>Source</dt><dd>{titleCase(selected.source)}</dd>
              <dt>Method</dt><dd>{selected.method ?? "—"}</dd>
              <dt>State</dt><dd>{selected.state ?? "—"}</dd>
              <dt>Attendees</dt><dd>{selected.attendees ?? "—"}</dd>
              <dt>Hours</dt><dd>{(selected.in_person_hours ?? 0)}h in-person · {(selected.online_hours ?? 0)}h online</dd>
              <dt>Add-ons</dt><dd>{[selected.qa && "Live Q&A", selected.certificate && "Certificates"].filter(Boolean).join(", ") || "None"}</dd>
              <dt>Calc per-head</dt><dd>{formatUSD(selected.per_head)}</dd>
              <dt>Calc total</dt><dd>{formatUSD(selected.total)}</dd>
            </dl>

            <hr style={{ border: 0, borderTop: "1px solid var(--hairline)", margin: "18px 0" }} />

            <Heading level={4}>Owner override</Heading>
            <div className="cms-grid2">
              <div className="field">
                <label htmlFor="owner-per-head">Price per head ($)</label>
                <input
                  id="owner-per-head"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={selected.owner_price_per_head ?? ""}
                  onChange={(e) => patchSelected({ owner_price_per_head: num(e.target.value) })}
                />
              </div>
              <div className="field">
                <label htmlFor="owner-total">Total ($)</label>
                <input
                  id="owner-total"
                  type="number"
                  min={0}
                  inputMode="decimal"
                  value={selected.owner_total ?? ""}
                  onChange={(e) => patchSelected({ owner_total: num(e.target.value) })}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="quote-status">Status</label>
              <select
                id="quote-status"
                value={selected.status}
                onChange={(e) => patchSelected({ status: e.target.value as QuoteStatus })}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{titleCase(s)}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="quote-notes">Notes</label>
              <textarea
                id="quote-notes"
                rows={3}
                value={selected.notes ?? ""}
                onChange={(e) => patchSelected({ notes: e.target.value })}
                placeholder="Internal notes about this quote…"
              />
            </div>

            <div className="cms-actions">
              <Button variant="primary" onClick={saveSelected}>Save changes</Button>
              <Button variant="ghost" trailingIcon={ArrowRight} onClick={convertToBooking}>Convert to booking</Button>
            </div>
            <p aria-live="polite" style={{ marginTop: 10, minHeight: 24 }}>
              {saved && <span className="cms-saved">Saved locally (not persisted)</span>}
            </p>
          </aside>
        )}
      </div>
    </>
  );
}
