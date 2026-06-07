import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { routes } from "@/routes";
import { listQuotes, listContacts, listBookings, getCourses } from "@/lib/content";
import { Heading, Text } from "@/components/basic";
import { badgeClass, formatDate, formatUSD, titleCase } from "./_helpers";
import "./admin.css";

export default function AdminDashboard() {
  useDocumentTitle("Dashboard · CMS", "Owner overview of quotes, contacts and bookings.");

  // TODO(api): these are mock reads via the data seam; later become live queries.
  const quotes = useMemo(() => listQuotes(), []);
  const contacts = useMemo(() => listContacts(), []);
  const bookings = useMemo(() => listBookings(), []);
  const courses = useMemo(() => getCourses(), []);

  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const newContacts = contacts.filter((c) => c.status === "new").length;
  const upcomingBookings = bookings.filter(
    (b) => b.starts_at && new Date(b.starts_at).getTime() >= Date.now() && b.status !== "cancelled",
  ).length;

  const latestQuotes = quotes.slice(0, 5);
  const recentContacts = contacts.slice(0, 5);

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Dashboard</Heading>
          <p className="cms-sub">Welcome back, Camille — here's what's waiting for you.</p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi__n">{newQuotes}</div>
          <div className="kpi__l">New quotes</div>
        </div>
        <div className="kpi">
          <div className="kpi__n">{newContacts}</div>
          <div className="kpi__l">New contacts</div>
        </div>
        <div className="kpi">
          <div className="kpi__n">{upcomingBookings}</div>
          <div className="kpi__l">Upcoming bookings</div>
        </div>
        <div className="kpi">
          <div className="kpi__n">{courses.length}</div>
          <div className="kpi__l">Active courses</div>
        </div>
      </div>

      <section className="panel" aria-labelledby="latest-quotes-h">
        <div className="cms-head">
          <Heading level={3} id="latest-quotes-h">Latest quotes</Heading>
          <Link to={routes.adminQuotes} className="cms-link">View all quotes →</Link>
        </div>
        {latestQuotes.length === 0 ? (
          <p className="cms-empty">No quotes yet.</p>
        ) : (
          <div className="cms-table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Created</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Source</th>
                  <th scope="col" className="num">Total</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestQuotes.map((q) => (
                  <tr key={q.id} className="is-clickable">
                    <td>{formatDate(q.created_at)}</td>
                    <td>
                      <div className="cms-stack">
                        <Link to={routes.adminQuotes} className="cms-link">
                          {q.contact_name ?? "Unnamed"}
                        </Link>
                        <small>{q.contact_org ?? "—"}</small>
                      </div>
                    </td>
                    <td>{titleCase(q.source)}</td>
                    <td className="num">{formatUSD(q.owner_total ?? q.total)}</td>
                    <td><span className={badgeClass(q.status)}>{q.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel" aria-labelledby="recent-contacts-h">
        <div className="cms-head">
          <Heading level={3} id="recent-contacts-h">Recent contacts</Heading>
          <Link to={routes.adminContacts} className="cms-link">View all contacts →</Link>
        </div>
        {recentContacts.length === 0 ? (
          <p className="cms-empty">No contact messages yet.</p>
        ) : (
          <ul className="cms-recent">
            {recentContacts.map((c) => (
              <li key={c.id}>
                <div className="cms-recent__top">
                  <span className="cms-recent__name">{c.name ?? "Unknown"}</span>
                  <span className={badgeClass(c.status)}>{c.status}</span>
                </div>
                <div className="cms-recent__meta">
                  {c.org ? `${c.org} · ` : ""}{c.email ?? "—"} · {formatDate(c.created_at)}
                </div>
                {c.message && <Text size="sm" tone="muted">{c.message}</Text>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
