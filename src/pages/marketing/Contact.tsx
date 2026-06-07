import { useState } from "react";
import type { FormEvent } from "react";
import {
  EnvelopeSimple,
  LinkedinLogo,
  MapPin,
  Clock,
  Calculator,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";
import { submitContact } from "@/lib/content";
import { Button, Chip, Eyebrow, Heading, Text } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Contact.css";

interface FormFields {
  name: string;
  email: string;
  org: string;
  phone: string;
  message: string;
}

const EMPTY: FormFields = { name: "", email: "", org: "", phone: "", message: "" };

/**
 * Contact — intro + contact form (name, email, organization, phone, message) and
 * a side panel with alternative contact info. UI only: submit calls submitContact
 * (a no-op data seam) and shows an aria-live success state. No real backend yet.
 */
export default function Contact() {
  useDocumentTitle(
    "Contact Camille — Book a Discovery Call",
    "Reach out to Camille Hampton to plan DECAL-approved early-childhood training for your team. Metro Atlanta + the Carolinas in person, online nationally."
  );

  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const update =
    (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // TODO(api): submitContact currently no-ops (data seam). Wire to Supabase +
    // owner notification in the API phase; add field-level error handling then.
    const { ok } = await submitContact({
      name: fields.name,
      email: fields.email,
      org: fields.org,
      phone: fields.phone,
      message: fields.message,
    });
    if (ok) {
      setStatus("sent");
      setFields(EMPTY);
    } else {
      setStatus("idle");
    }
  }

  return (
    <>
      <header className="contact-hero section-bg--testimonials">
        <div className="contact-hero__inner">
          <Eyebrow>Contact</Eyebrow>
          <Heading level={1} className="contact-hero__title">
            Let's plan training for your team
          </Heading>
          <Text size="lg" tone="body" className="contact-hero__lede">
            Not quite ready to self-quote? Tell Camille a little about your
            program and what you're hoping to work on. She'll reply with next
            steps — and you can always book a free 30-minute discovery call.
          </Text>
        </div>
      </header>

      <section className="contact-body" aria-label="Contact Camille">
        <div className="contact-body__inner">
          {/* ---- form ---- */}
          <div className="contact-form-wrap">
            {status === "sent" ? (
              <div className="contact-success" role="status" aria-live="polite">
                <span className="contact-success__icon" aria-hidden>
                  <CheckCircle size={40} weight="fill" />
                </span>
                <Heading level={2} as="h2" className="contact-success__title">
                  Thank you — your message is on its way
                </Heading>
                <Text tone="body">
                  Camille typically replies within two business days. In the
                  meantime, you can build a quote or read what other educators say.
                </Text>
                <div className="contact-success__actions">
                  <Button href="/pricing" variant="primary" trailingIcon={ArrowRight}>
                    Build a quote
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <Heading level={2} as="h2" className="contact-form__title">
                  Send a message
                </Heading>
                {/* aria-live region for status (always present for SR users) */}
                <p className="sr-only" role="status" aria-live="polite">
                  {status === "submitting" ? "Sending your message…" : ""}
                </p>

                <div className="contact-field">
                  <label htmlFor="contact-name">
                    Name <span className="contact-req" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-required="true"
                    value={fields.name}
                    onChange={update("name")}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    Email <span className="contact-req" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    value={fields.email}
                    onChange={update("email")}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-org">Organization / center</label>
                  <input
                    id="contact-org"
                    name="org"
                    type="text"
                    autoComplete="organization"
                    value={fields.org}
                    onChange={update("org")}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-phone">Phone</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={update("phone")}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message">
                    How can Camille help?{" "}
                    <span className="contact-req" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    aria-required="true"
                    placeholder="Tell us about your team, ages served, and the training you have in mind."
                    value={fields.message}
                    onChange={update("message")}
                  />
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  fullWidth
                  trailingIcon={ArrowRight}
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </Button>
                <Text size="sm" tone="muted" className="contact-form__note">
                  Required fields are marked *. We'll only use your details to
                  reply about training.
                </Text>
              </form>
            )}
          </div>

          {/* ---- side panel ---- */}
          <aside className="contact-aside" aria-label="Other ways to reach Camille">
            <div className="contact-card">
              <Heading level={3} as="h2" className="contact-card__title">
                Other ways to connect
              </Heading>
              <ul className="contact-list">
                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden>
                    <EnvelopeSimple size={20} />
                  </span>
                  <div>
                    <p className="contact-list__label">Email</p>
                    <a href="mailto:hello@armstrongeducational.com">
                      hello@armstrongeducational.com
                    </a>
                  </div>
                </li>
                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden>
                    <LinkedinLogo size={20} />
                  </span>
                  <div>
                    <p className="contact-list__label">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/acamillehampton"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /in/acamillehampton
                    </a>
                  </div>
                </li>
                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden>
                    <MapPin size={20} />
                  </span>
                  <div>
                    <p className="contact-list__label">Service area</p>
                    <p className="contact-list__value">
                      Metro Atlanta &amp; the Carolinas in person · online nationally
                    </p>
                  </div>
                </li>
                <li className="contact-list__item">
                  <span className="contact-list__icon" aria-hidden>
                    <Clock size={20} />
                  </span>
                  <div>
                    <p className="contact-list__label">Availability</p>
                    <p className="contact-list__value">
                      Monday–Friday, 9am–5pm ET
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="contact-quote-cta">
              <span className="contact-quote-cta__icon" aria-hidden>
                <Calculator size={24} />
              </span>
              <Chip tone="mint" size="sm">
                Prefer numbers first?
              </Chip>
              <Text tone="body">
                You can build a per-head and total quote yourself in about a
                minute — then bring it to the conversation.
              </Text>
              <Button href="/pricing" variant="secondary" trailingIcon={ArrowRight}>
                Build a quote
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
