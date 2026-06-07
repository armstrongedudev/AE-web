import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { listContacts } from "@/lib/content";
import type { Contact, ContactStatus } from "@/lib/database.types";
import { Heading, Button } from "@/components/basic";
import { Envelope, Archive, X } from "@phosphor-icons/react";
import { badgeClass, formatDateTime } from "./_helpers";
import "./admin.css";

export default function AdminContacts() {
  useDocumentTitle("Contacts · CMS", "Contact-form submissions from the marketing site.");

  // TODO(api): load via data seam; status changes mutate local state only.
  const [contacts, setContacts] = useState<Contact[]>(() => listContacts());
  const [openId, setOpenId] = useState<string | null>(null);

  function setStatus(id: string, status: ContactStatus) {
    // TODO(api): persist contact status.
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  const open = contacts.find((c) => c.id === openId) ?? null;

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Contacts</Heading>
          <p className="cms-sub">Messages sent through the site contact form.</p>
        </div>
      </div>

      <div className="panel">
        {contacts.length === 0 ? (
          <p className="cms-empty">No contact messages yet.</p>
        ) : (
          <div className="cms-table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">From</th>
                  <th scope="col">Organisation</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>{formatDateTime(c.created_at)}</td>
                    <td>
                      <div className="cms-stack">
                        <strong>{c.name ?? "Unknown"}</strong>
                        <small>{c.email ?? "—"}</small>
                        {c.phone && <small>{c.phone}</small>}
                      </div>
                    </td>
                    <td>{c.org ?? "—"}</td>
                    <td><span className={badgeClass(c.status)}>{c.status}</span></td>
                    <td>
                      <div className="cms-actions" style={{ marginTop: 0 }}>
                        <Button size="sm" variant="ghost" leadingIcon={Envelope} onClick={() => setOpenId(c.id)}>
                          View
                        </Button>
                        {c.status !== "read" && (
                          <Button size="sm" variant="ghost" onClick={() => setStatus(c.id, "read")}>
                            Mark read
                          </Button>
                        )}
                        {c.status !== "archived" && (
                          <Button size="sm" variant="ghost" leadingIcon={Archive} onClick={() => setStatus(c.id, "archived")}>
                            Archive
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {open && (
        <section className="panel" aria-label={`Message from ${open.name ?? "contact"}`}>
          <div className="cms-card__head">
            <Heading level={3}>{open.name ?? "Message"}</Heading>
            <button type="button" className="cms-iconbtn" aria-label="Close message" onClick={() => setOpenId(null)}>
              <X size={18} />
            </button>
          </div>
          <dl className="kv">
            <dt>Email</dt><dd>{open.email ?? "—"}</dd>
            <dt>Phone</dt><dd>{open.phone ?? "—"}</dd>
            <dt>Organisation</dt><dd>{open.org ?? "—"}</dd>
            <dt>Received</dt><dd>{formatDateTime(open.created_at)}</dd>
          </dl>
          <p style={{ marginTop: 16, whiteSpace: "pre-wrap", fontFamily: "var(--font-sans)", color: "var(--ink)" }}>
            {open.message ?? "(No message)"}
          </p>
        </section>
      )}
    </>
  );
}
