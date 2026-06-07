import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { listBookings, listQuotes } from "@/lib/content";
import { Heading } from "@/components/basic";
import { routes } from "@/routes";
import { badgeClass, formatDateTime } from "./_helpers";
import "./admin.css";

export default function AdminBookings() {
  useDocumentTitle("Bookings · CMS", "Confirmed and pending training engagements.");

  // TODO(api): load via data seam.
  const bookings = useMemo(() => listBookings(), []);
  const quotes = useMemo(() => listQuotes(), []);

  function quoteFor(quoteId: string | null) {
    return quoteId ? quotes.find((q) => q.id === quoteId) ?? null : null;
  }

  const sorted = useMemo(
    () =>
      [...bookings].sort((a, b) => {
        const ta = a.starts_at ? new Date(a.starts_at).getTime() : 0;
        const tb = b.starts_at ? new Date(b.starts_at).getTime() : 0;
        return ta - tb;
      }),
    [bookings],
  );

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Bookings</Heading>
          <p className="cms-sub">Engagements created from accepted quotes.</p>
        </div>
      </div>

      <div className="panel">
        {sorted.length === 0 ? (
          <p className="cms-empty">No bookings yet.</p>
        ) : (
          <div className="cms-table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Date &amp; time</th>
                  <th scope="col">Client / quote</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((b) => {
                  const q = quoteFor(b.quote_id);
                  return (
                    <tr key={b.id} className="is-clickable">
                      <td>{formatDateTime(b.starts_at)}</td>
                      <td>
                        <div className="cms-stack">
                          <strong>{q?.contact_name ?? "—"}</strong>
                          <small>{q?.contact_org ?? (b.quote_id ? `Quote ${b.quote_id}` : "No linked quote")}</small>
                        </div>
                      </td>
                      <td><span className={badgeClass(b.status)}>{b.status}</span></td>
                      <td className="num">
                        <Link to={routes.adminBooking(b.id)} className="cms-link">Open →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
