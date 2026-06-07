import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { listBookings, listQuotes } from "@/lib/content";
import type { BookingStatus } from "@/lib/database.types";
import { Heading, Button } from "@/components/basic";
import { CalendarPlus, ArrowLeft } from "@phosphor-icons/react";
import { routes } from "@/routes";
import { badgeClass, formatDateTime, formatUSD, titleCase } from "./_helpers";
import "./admin.css";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function AdminBookingDetail() {
  const { id } = useParams();
  // TODO(api): load single booking via data seam.
  const booking = useMemo(() => listBookings().find((b) => b.id === id) ?? null, [id]);
  const quote = useMemo(
    () => (booking?.quote_id ? listQuotes().find((q) => q.id === booking.quote_id) ?? null : null),
    [booking],
  );

  const [status, setStatus] = useState<BookingStatus>(booking?.status ?? "pending");
  const [saved, setSaved] = useState(false);

  useDocumentTitle(booking ? `Booking ${booking.id} · CMS` : "Booking not found · CMS");

  if (!booking) {
    return (
      <div className="panel">
        <Heading level={2} className="shell__title">Booking not found</Heading>
        <p className="cms-sub">No booking matches “{id}”. It may have been removed.</p>
        <div className="cms-actions">
          <Button variant="ghost" href={routes.adminBookings} leadingIcon={ArrowLeft}>Back to bookings</Button>
        </div>
      </div>
    );
  }

  function changeStatus(s: BookingStatus) {
    // TODO(api): persist booking status.
    setStatus(s);
    setSaved(false);
  }

  function save() {
    // TODO(api): persist booking status change.
    setSaved(true);
  }

  function addToCalendar() {
    // TODO(api): create a Google Calendar event and store calendar_event_id.
    alert("Add to Google Calendar — wiring pending.");
  }

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Link to={routes.adminBookings} className="cms-link">← Bookings</Link>
          <Heading level={2} className="shell__title">Booking {booking.id}</Heading>
          <p className="cms-sub"><span className={badgeClass(status)}>{status}</span></p>
        </div>
      </div>

      <section className="panel" aria-labelledby="booking-h">
        <Heading level={3} id="booking-h">Schedule</Heading>
        <dl className="kv">
          <dt>Starts</dt><dd>{formatDateTime(booking.starts_at)}</dd>
          <dt>Ends</dt><dd>{formatDateTime(booking.ends_at)}</dd>
          <dt>Meet URL</dt>
          <dd>{booking.meet_url ? <a className="cms-link" href={booking.meet_url}>{booking.meet_url}</a> : "—"}</dd>
          <dt>Calendar</dt><dd>{booking.calendar_event_id ?? "Not synced"}</dd>
        </dl>
        <div className="cms-actions">
          <Button variant="primary" leadingIcon={CalendarPlus} onClick={addToCalendar}>Add to Google Calendar</Button>
        </div>
      </section>

      <section className="panel" aria-labelledby="status-h">
        <Heading level={3} id="status-h">Status</Heading>
        <div className="field" style={{ maxWidth: 280 }}>
          <label htmlFor="booking-status">Booking status</label>
          <select id="booking-status" value={status} onChange={(e) => changeStatus(e.target.value as BookingStatus)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{titleCase(s)}</option>
            ))}
          </select>
        </div>
        <div className="cms-actions">
          <Button variant="primary" onClick={save}>Save</Button>
        </div>
        <p aria-live="polite" style={{ marginTop: 10, minHeight: 24 }}>
          {saved && <span className="cms-saved">Saved locally (not persisted)</span>}
        </p>
      </section>

      <section className="panel" aria-labelledby="quote-h">
        <Heading level={3} id="quote-h">Linked quote</Heading>
        {quote ? (
          <>
            <dl className="kv">
              <dt>Contact</dt><dd>{quote.contact_name ?? "—"}</dd>
              <dt>Organisation</dt><dd>{quote.contact_org ?? "—"}</dd>
              <dt>Email</dt><dd>{quote.contact_email ?? "—"}</dd>
              <dt>Phone</dt><dd>{quote.contact_phone ?? "—"}</dd>
              <dt>Method</dt><dd>{quote.method ?? "—"} · {quote.state ?? "—"}</dd>
              <dt>Attendees</dt><dd>{quote.attendees ?? "—"}</dd>
              <dt>Per-head</dt><dd>{formatUSD(quote.owner_price_per_head ?? quote.per_head)}</dd>
              <dt>Total</dt><dd>{formatUSD(quote.owner_total ?? quote.total)}</dd>
              <dt>Quote status</dt><dd><span className={badgeClass(quote.status)}>{quote.status}</span></dd>
            </dl>
            <div className="cms-actions">
              <Button variant="ghost" href={routes.adminQuotes}>Open in Quotes</Button>
            </div>
          </>
        ) : (
          <p className="cms-sub">No quote is linked to this booking.</p>
        )}
      </section>
    </>
  );
}
