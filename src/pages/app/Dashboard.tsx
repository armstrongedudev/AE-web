import { useMemo, useState } from "react";
import { CalendarDot, Plus } from "@phosphor-icons/react";
import { Heading, Text } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { listQuotes, listBookings, getProfile } from "@/lib/content";
import type { Quote, QuoteStatus } from "@/lib/database.types";
import { routes } from "@/routes";
import "./Dashboard.css";

/** Human label per quote status. */
const STATUS_LABEL: Record<QuoteStatus, string> = {
  new: "New",
  reviewed: "In review",
  sent: "Quoted",
  accepted: "Accepted",
  declined: "Declined",
};

/** Maps a status to an existing .badge--* modifier in layouts.css. */
const STATUS_BADGE: Record<QuoteStatus, string> = {
  new: "new",
  reviewed: "reviewed",
  sent: "sent",
  accepted: "confirmed", // reuse the success badge style
  declined: "declined",
};

/** A quote awaiting the client's decision can be accepted/declined. */
function isActionable(status: QuoteStatus): boolean {
  return status === "sent";
}

function currency(n: number | null): string {
  if (n == null) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatDateRange(start: string | null, end: string | null): string {
  if (!start) return "Date to be confirmed";
  const s = new Date(start);
  const datePart = s.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const startTime = s.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endTime = end
    ? new Date(end).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : null;
  return `${datePart} · ${startTime}${endTime ? `–${endTime}` : ""}`;
}

/**
 * /app — client dashboard (UI shell; auth not wired, data is mock).
 * Renders the main content; AppLayout provides the sidebar chrome + banner.
 */
export default function Dashboard() {
  useDocumentTitle("My quotes & bookings");

  const profile = getProfile(); // TODO(api): scoped to auth.uid()
  // TODO(api): RLS-scoped to the signed-in client's rows only.
  const [quotes, setQuotes] = useState<Quote[]>(() => listQuotes());
  const bookings = useMemo(() => listBookings(), []);

  const greetingName = profile.full_name?.split(" ")[0] ?? "there";

  const openQuotes = quotes.filter((q) => isActionable(q.status)).length;
  const upcoming = useMemo(() => {
    const now = Date.now();
    return bookings
      .filter((b) => b.starts_at && new Date(b.starts_at).getTime() >= now)
      .filter((b) => b.status !== "cancelled")
      .sort((a, b) => (a.starts_at! < b.starts_at! ? -1 : 1));
  }, [bookings]);

  function decide(id: string, status: Extract<QuoteStatus, "accepted" | "declined">) {
    // TODO(api): supabase.from("quotes").update({ status }).eq("id", id)
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  }

  return (
    <div className="dash">
      <header className="dash__head">
        <div>
          <Heading level={2}>Welcome back, {greetingName}</Heading>
          <Text tone="muted">
            Review the prices Camille has prepared, accept or decline quotes, and
            keep track of your upcoming trainings.
          </Text>
        </div>
        <a href={routes.pricing} className="btn-primary dash__newquote">
          <Plus size={18} aria-hidden="true" />
          Build a new quote
        </a>
      </header>

      {/* KPIs */}
      <section className="kpi-grid" aria-label="Account summary">
        <div className="kpi">
          <div className="kpi__n">{openQuotes}</div>
          <div className="kpi__l">Quotes awaiting your decision</div>
        </div>
        <div className="kpi">
          <div className="kpi__n">{upcoming.length}</div>
          <div className="kpi__l">Upcoming bookings</div>
        </div>
      </section>

      {/* Quotes */}
      <section className="panel dash__panel" aria-labelledby="dash-quotes-h">
        <Heading level={4} id="dash-quotes-h" className="dash__panel-title">
          My quotes
        </Heading>
        {quotes.length === 0 ? (
          <Text tone="muted">
            You don't have any quotes yet.{" "}
            <a href={routes.pricing} className="dash__link">Build your first quote</a>.
          </Text>
        ) : (
          <div className="dash__tablewrap">
            <table className="data-table">
              <caption className="dash__sr-only">
                Your quotes, with per-head and total prices, status, and actions.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Training</th>
                  <th scope="col">Attendees</th>
                  <th scope="col">Per head</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const perHead = q.owner_price_per_head ?? q.per_head;
                  const total = q.owner_total ?? q.total;
                  return (
                    <tr key={q.id}>
                      <td>
                        <div className="dash__cell-title">{q.contact_org ?? "Training quote"}</div>
                        <div className="dash__cell-sub">
                          {q.method?.replace("+", " + ") ?? "—"}
                          {q.state ? ` · ${q.state}` : ""}
                        </div>
                      </td>
                      <td>{q.attendees ?? "—"}</td>
                      <td>{currency(perHead)}</td>
                      <td>{currency(total)}</td>
                      <td>
                        <span className={`badge badge--${STATUS_BADGE[q.status]}`}>
                          {STATUS_LABEL[q.status]}
                        </span>
                      </td>
                      <td>
                        {isActionable(q.status) ? (
                          <div className="dash__actions">
                            <button
                              type="button"
                              className="btn-primary dash__btn-sm"
                              onClick={() => decide(q.id, "accepted")}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="btn-ghost dash__btn-sm"
                              onClick={() => decide(q.id, "declined")}
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <Text size="sm" tone="muted" as="span">
                            {q.status === "accepted"
                              ? "You accepted this quote"
                              : q.status === "declined"
                                ? "You declined this quote"
                                : "Awaiting Camille's price"}
                          </Text>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Upcoming bookings */}
      <section className="panel dash__panel" aria-labelledby="dash-bookings-h">
        <Heading level={4} id="dash-bookings-h" className="dash__panel-title">
          Upcoming bookings
        </Heading>
        {upcoming.length === 0 ? (
          <Text tone="muted">No upcoming trainings scheduled yet.</Text>
        ) : (
          <ul className="dash__bookings">
            {upcoming.map((b) => (
              <li key={b.id} className="dash__booking">
                <span className="dash__booking-icon" aria-hidden="true">
                  <CalendarDot size={22} />
                </span>
                <div className="dash__booking-body">
                  <div className="dash__cell-title">{formatDateRange(b.starts_at, b.ends_at)}</div>
                  {b.meet_url && (
                    <a href={b.meet_url} className="dash__link">Join online</a>
                  )}
                </div>
                <span className={`badge badge--${b.status}`}>
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
