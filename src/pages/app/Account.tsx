import { useState, type FormEvent } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { Heading, Text } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getProfile } from "@/lib/content";
import "./Account.css";

/**
 * /app/account — client profile & preferences (UI shell; auth not wired).
 * Prefilled from getProfile(); Save is local-only. AppLayout provides chrome.
 */
export default function Account() {
  useDocumentTitle("Account & profile");

  const profile = getProfile(); // TODO(api): scoped to auth.uid()

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [org, setOrg] = useState(profile.org ?? "");
  // email lives on the auth user, not the profile row — seeded blank for now.
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [invoiceFormat, setInvoiceFormat] = useState<"pdf" | "email">("pdf");

  const [saved, setSaved] = useState(false);

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(api): supabase.from("profiles").update({ full_name, org, phone }).eq("id", profile.id)
    //            + supabase.auth.updateUser({ email }) and a preferences row.
    setSaved(true);
  }

  return (
    <div className="acct">
      <header className="acct__head">
        <Heading level={2}>Account &amp; profile</Heading>
        <Text tone="muted">
          These details pre-fill your quotes and appear on your invoices.
        </Text>
      </header>

      <form className="panel acct__form" onSubmit={handleSave} noValidate>
        <Heading level={4} className="acct__section-title">Your details</Heading>

        <div className="acct__grid">
          <div className="field">
            <label htmlFor="acct-name">Full name</label>
            <input
              id="acct-name"
              name="name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setSaved(false); }}
            />
          </div>

          <div className="field">
            <label htmlFor="acct-org">Organization / center</label>
            <input
              id="acct-org"
              name="organization"
              type="text"
              autoComplete="organization"
              value={org}
              onChange={(e) => { setOrg(e.target.value); setSaved(false); }}
            />
          </div>

          <div className="field">
            <label htmlFor="acct-email">Email address</label>
            <input
              id="acct-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@yourcenter.org"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
            />
          </div>

          <div className="field">
            <label htmlFor="acct-phone">Phone</label>
            <input
              id="acct-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setSaved(false); }}
            />
          </div>
        </div>

        <Heading level={4} className="acct__section-title acct__section-title--spaced">
          Preferences
        </Heading>

        <fieldset className="acct__fieldset">
          <legend className="acct__sr-only">Notification and invoice preferences</legend>

          <label className="acct__check" htmlFor="acct-updates">
            <input
              id="acct-updates"
              name="emailUpdates"
              type="checkbox"
              checked={emailUpdates}
              onChange={(e) => { setEmailUpdates(e.target.checked); setSaved(false); }}
            />
            <span>
              <span className="acct__check-title">Email me about quotes &amp; bookings</span>
              <span className="acct__check-desc">
                Get a note when Camille sends a price or confirms a date.
              </span>
            </span>
          </label>

          <div className="field acct__pref-field">
            <label htmlFor="acct-invoice">Invoice delivery</label>
            <select
              id="acct-invoice"
              name="invoiceFormat"
              value={invoiceFormat}
              onChange={(e) => {
                setInvoiceFormat(e.target.value as "pdf" | "email");
                setSaved(false);
              }}
            >
              <option value="pdf">Downloadable PDF</option>
              <option value="email">Emailed receipt</option>
            </select>
          </div>
        </fieldset>

        <div className="acct__actions">
          <button type="submit" className="btn-primary">Save changes</button>
          <p className="acct__status" role="status" aria-live="polite">
            {saved && (
              <>
                <CheckCircle size={18} weight="fill" aria-hidden="true" />
                Your changes have been saved.
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}
