import { useMemo, useState } from "react";
import {
  Calculator,
  ListChecks,
  ArrowRight,
  ArrowLeft,
  Receipt,
  BookmarkSimple,
  SealCheck,
  Compass,
  MapPin,
  UsersThree,
  Clock,
  Sparkle,
} from "@phosphor-icons/react";
import PricingCalculator from "@/sections/PricingCalculator";
import { usePricing } from "@/sections/PricingCalculator/usePricing";
import {
  STATE_LABEL,
  formatUSD,
  type Method,
  type StateCode,
} from "@/sections/PricingCalculator/pricing";
import { SectionHeader } from "@/components/macro";
import { Button, Chip, Eyebrow, Heading, Text, Stepper } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import "./Pricing.css";

type Mode = "calculator" | "quiz";

const METHODS: { value: Method; label: string; hint: string }[] = [
  { value: "in-person", label: "In person", hint: "On-site at your center" },
  { value: "online", label: "Online", hint: "Live or self-paced, anywhere" },
  { value: "online+in-person", label: "Online + in person", hint: "A blended engagement" },
];
const STATES: StateCode[] = ["GA", "SC", "NC"];

/* ------------------------------------------------------------------ */
/*  Quiz — the same questions, one per step, sharing the pricing engine */
/* ------------------------------------------------------------------ */

function Quiz() {
  const { state, set, result, shows } = usePricing();
  const [step, setStep] = useState(0);

  // Steps shown depend on the chosen method (which hours questions apply).
  const steps = useMemo(() => {
    const base = ["method", "state", "attendees"] as const;
    const hours: ("inPersonHours" | "onlineHours")[] = [];
    if (shows.inPerson) hours.push("inPersonHours");
    if (shows.online) hours.push("onlineHours");
    return [...base, ...hours, "extras"] as const;
  }, [shows.inPerson, shows.online]);

  const total = steps.length;
  const safeStep = Math.min(step, total - 1);
  const current = steps[safeStep];
  const isLast = safeStep === total - 1;

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="pquiz">
      <div className="pquiz__bar">
        <Stepper
          value={safeStep + 1}
          min={1}
          max={total}
          onChange={(n) => setStep(n - 1)}
          label="Quiz step"
        />
        <Text size="sm" tone="muted">
          Step {safeStep + 1} of {total}
        </Text>
        <div className="pquiz__progress" aria-hidden>
          <span style={{ width: `${((safeStep + 1) / total) * 100}%` }} />
        </div>
      </div>

      <div className="pquiz__panel" role="group" aria-live="polite">
        {current === "method" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <Compass size={20} /> How would you like the training delivered?
            </legend>
            <div className="pquiz__options pquiz__options--stack">
              {METHODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className="pquiz__option"
                  aria-pressed={state.method === m.value}
                  onClick={() => set("method", m.value)}
                >
                  <span className="pquiz__option-label">{m.label}</span>
                  <span className="pquiz__option-hint">{m.hint}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {current === "state" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <MapPin size={20} /> Where is your program?
            </legend>
            <div className="pquiz__options">
              {STATES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="pquiz__chip"
                  aria-pressed={state.state === s}
                  onClick={() => set("state", s)}
                >
                  <SealCheck size={16} weight={state.state === s ? "fill" : "regular"} />
                  {STATE_LABEL[s]}
                </button>
              ))}
            </div>
            <Text size="sm" tone="muted" className="pquiz__note">
              DECAL-approved and aligned to Georgia's GaPDS training requirements.
            </Text>
          </fieldset>
        )}

        {current === "attendees" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <UsersThree size={20} /> How many educators will attend?
            </legend>
            <div className="pquiz__attendees">
              <Stepper
                value={state.attendees}
                min={1}
                max={60}
                onChange={(n) => set("attendees", n)}
                label="Number of attendees"
              />
              <label className="pquiz__slider-label">
                <span className="sr-only">Number of attendees</span>
                <input
                  type="range"
                  min={1}
                  max={60}
                  step={1}
                  value={state.attendees}
                  onChange={(e) => set("attendees", Number(e.target.value))}
                  aria-label="Number of attendees"
                  aria-valuetext={`${state.attendees} attendees`}
                />
              </label>
            </div>
            <Text size="sm" tone="muted" className="pquiz__note">
              More attendees unlock lower per-teacher pricing
              {result.groupDiscountPct > 0
                ? ` — you're at ${result.groupDiscountPct}% off per head.`
                : "."}
            </Text>
          </fieldset>
        )}

        {current === "inPersonHours" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <Clock size={20} /> How many in-person training hours?
            </legend>
            <Stepper
              value={state.inPersonHours}
              min={1}
              max={40}
              onChange={(n) => set("inPersonHours", n)}
              label="In-person hours"
            />
            <Text size="sm" tone="muted" className="pquiz__note">
              Discounts apply automatically on annual licenses of 10+ hours.
            </Text>
          </fieldset>
        )}

        {current === "onlineHours" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <Clock size={20} /> How many online training hours?
            </legend>
            <Stepper
              value={state.onlineHours}
              min={1}
              max={40}
              onChange={(n) => set("onlineHours", n)}
              label="Online hours"
            />
            <Text size="sm" tone="muted" className="pquiz__note">
              Discounts apply automatically on annual licenses of 10+ hours.
            </Text>
          </fieldset>
        )}

        {current === "extras" && (
          <fieldset className="pquiz__field">
            <legend className="pquiz__q">
              <Sparkle size={20} /> Add any extras?
            </legend>
            <div className="pquiz__options pquiz__options--stack">
              <button
                type="button"
                className="pquiz__option"
                aria-pressed={state.qa}
                onClick={() => set("qa", !state.qa)}
              >
                <span className="pquiz__option-label">Extra time for questions</span>
                <span className="pquiz__option-hint">A dedicated live Q&amp;A session</span>
              </button>
              <button
                type="button"
                className="pquiz__option"
                aria-pressed={state.certificate}
                onClick={() => set("certificate", !state.certificate)}
              >
                <span className="pquiz__option-label">Printed certificate</span>
                <span className="pquiz__option-hint">Mailed certificates per attendee</span>
              </button>
            </div>
          </fieldset>
        )}
      </div>

      <div className="pquiz__nav">
        <Button
          variant="ghost"
          size="md"
          leadingIcon={ArrowLeft}
          onClick={back}
          disabled={safeStep === 0}
        >
          Back
        </Button>
        {!isLast ? (
          <Button variant="primary" size="md" trailingIcon={ArrowRight} onClick={next}>
            Next
          </Button>
        ) : (
          <span className="pquiz__done">Your quote is ready below</span>
        )}
      </div>

      <QuoteSummary perHead={result.perHead} total={result.total} attendees={state.attendees} extras={result.extras} discount={result.groupDiscountPct} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared quote summary (used by the Quiz path)                       */
/* ------------------------------------------------------------------ */

function QuoteSummary({
  perHead,
  total,
  attendees,
  extras,
  discount,
}: {
  perHead: number;
  total: number;
  attendees: number;
  extras: { label: string; amount: number }[];
  discount: number;
}) {
  return (
    <div className="pquote" aria-live="polite">
      <div className="pquote__top">
        <div className="pquote__head">
          <span className="pquote__badge" aria-hidden>
            <Receipt size={22} />
          </span>
          <Heading level={3} as="h3">
            Your quote
          </Heading>
        </div>
        <div className="pquote__price">
          <b>{formatUSD(perHead)}</b>
          <span>/educator</span>
        </div>
      </div>

      {extras.length > 0 && (
        <ul className="pquote__extras">
          {extras.map((e) => (
            <li key={e.label}>
              <span>{e.label}</span>
              <span>{formatUSD(e.amount)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="pquote__bar">
        <span>Total</span>
        <b>{formatUSD(total)}</b>
        <span>
          for {attendees} educator{attendees === 1 ? "" : "s"}
          {discount > 0 ? ` · ${discount}% group savings` : ""}
        </span>
      </div>

      <div className="pquote__actions">
        <Button href="/contact" variant="cta" size="md" trailingIcon={ArrowRight}>
          Contact &amp; book trainings
        </Button>
        {/* TODO(api): when auth is wired, save the quote to the client's account (/app).
            Guests are sent to /login first, then the quote persists to Supabase. */}
        <Button href="/login" variant="secondary" size="md" leadingIcon={BookmarkSimple}>
          Save quote
        </Button>
      </div>
      <Text size="sm" tone="muted" className="pquote__login-note">
        Saving a quote requires an account — you'll be asked to log in first.
      </Text>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

/**
 * Pricing — build-your-quote page. A toggle lets the user pick how they answer:
 * the live Calculator (v1) or a guided Quiz wizard. Both feed the SAME pricing
 * engine and reach the same quote. "Save quote" links to /login until auth is wired.
 */
export default function Pricing() {
  useDocumentTitle(
    "Pricing — Build Your Training & See the Price",
    "Get a per-head and total quote in about a minute — via an interactive calculator or a guided quiz. DECAL-approved training across GA, SC & NC."
  );
  const [mode, setMode] = useState<Mode>("calculator");

  return (
    <>
      {/* Header */}
      <header className="pricing-hero section-bg--pricing">
        <div className="pricing-hero__inner">
          <Eyebrow>Pricing</Eyebrow>
          <Heading level={1} className="pricing-hero__title">
            Build your training and see the price
          </Heading>
          <Text size="lg" tone="body" className="pricing-hero__lede">
            Get a per-head and total quote in about a minute. Choose how you'd
            like to answer — fill the live calculator, or let the guided quiz walk
            you through it one question at a time. Both reach the same quote.
          </Text>

          {/* Toggle */}
          <div className="pricing-toggle" role="tablist" aria-label="Choose how to build your quote">
            <button
              role="tab"
              type="button"
              id="tab-calculator"
              aria-selected={mode === "calculator"}
              aria-controls="panel-calculator"
              className="pricing-toggle__btn"
              onClick={() => setMode("calculator")}
            >
              <Calculator size={18} />
              Calculator
            </button>
            <button
              role="tab"
              type="button"
              id="tab-quiz"
              aria-selected={mode === "quiz"}
              aria-controls="panel-quiz"
              className="pricing-toggle__btn"
              onClick={() => setMode("quiz")}
            >
              <ListChecks size={18} />
              Guided quiz
            </button>
          </div>
        </div>
      </header>

      {/* Calculator path — the full v1 section */}
      {mode === "calculator" && (
        <div id="panel-calculator" role="tabpanel" aria-labelledby="tab-calculator">
          <PricingCalculator />
        </div>
      )}

      {/* Quiz path */}
      {mode === "quiz" && (
        <section
          id="panel-quiz"
          role="tabpanel"
          aria-labelledby="tab-quiz"
          className="pricing-quiz-section section-bg--pricing"
        >
          <div className="pricing-quiz-section__inner">
            <SectionHeader
              eyebrow="Guided quiz"
              title="Answer a few quick questions"
              subtitle="One question at a time — your quote updates as you go."
              align="center"
            />
            <Quiz />
          </div>
        </section>
      )}

      {/* Reassurance band */}
      <section className="pricing-info" aria-label="What's included">
        <div className="pricing-info__inner">
          <Chip tone="mint" size="sm">
            Transparent pricing
          </Chip>
          <Heading level={2} className="pricing-info__title">
            No surprises, no obligation
          </Heading>
          <Text size="lg" tone="body" className="pricing-info__lede">
            Every quote is a deterministic, client-side estimate from the same
            formula — group rates improve automatically with more attendees and
            more hours. Final details (topics, dates, venue) are confirmed with
            Camille. Prefer to talk it through first?
          </Text>
          <div className="pricing-info__actions">
            <Button href="/contact" variant="primary" size="lg" trailingIcon={ArrowRight}>
              Talk to Camille
            </Button>
            <Button href="/reviews" variant="ghost" size="lg">
              See what educators say
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
