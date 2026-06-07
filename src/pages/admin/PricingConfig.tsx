import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getPricingConfig } from "@/lib/content";
import type { PricingConfig, HoursMultiplier, GroupTier } from "@/lib/database.types";
import { Heading, Button } from "@/components/basic";
import { Plus, Trash } from "@phosphor-icons/react";
import { formatUSD } from "./_helpers";
import "./admin.css";

/* Note: src/sections/PricingCalculator/pricing.ts uses hardcoded constants and
   does NOT accept a config object, so to preview the *edited* config we apply a
   matching formula shape here against the live form values. */

const STATE_KEYS = ["GA", "SC", "NC"] as const;

export default function AdminPricingConfig() {
  useDocumentTitle("Pricing · CMS", "Edit the calculator pricing parameters.");

  // TODO(api): load via data seam.
  const [cfg, setCfg] = useState<PricingConfig>(() => getPricingConfig());
  const [saved, setSaved] = useState(false);

  // sample preview inputs
  const [pvAttendees, setPvAttendees] = useState(20);
  const [pvHours, setPvHours] = useState(3);
  const [pvMethod, setPvMethod] = useState<"in-person" | "online">("in-person");

  function set(p: Partial<PricingConfig>) {
    setSaved(false);
    setCfg((prev) => ({ ...prev, ...p }));
  }

  function num(v: string): number {
    const n = Number(v);
    return Number.isNaN(n) ? 0 : n;
  }

  // ---- hours multipliers ----
  function setHM(i: number, p: Partial<HoursMultiplier>) {
    set({ hours_multipliers: cfg.hours_multipliers.map((r, idx) => (idx === i ? { ...r, ...p } : r)) });
  }
  function addHM() { set({ hours_multipliers: [...cfg.hours_multipliers, { hours: 0, mult: 1 }] }); }
  function removeHM(i: number) { set({ hours_multipliers: cfg.hours_multipliers.filter((_, idx) => idx !== i) }); }

  // ---- group tiers ----
  function setGT(i: number, p: Partial<GroupTier>) {
    set({ group_tiers: cfg.group_tiers.map((r, idx) => (idx === i ? { ...r, ...p } : r)) });
  }
  function addGT() { set({ group_tiers: [...cfg.group_tiers, { min: 0, pct: 0 }] }); }
  function removeGT(i: number) { set({ group_tiers: cfg.group_tiers.filter((_, idx) => idx !== i) }); }

  function setSurcharge(key: string, v: string) {
    set({ state_surcharges: { ...cfg.state_surcharges, [key]: num(v) } });
  }
  function setAddon(key: string, v: string) {
    set({ addons: { ...cfg.addons, [key]: num(v) } });
  }

  function save() {
    // TODO(api): persist pricing_config row.
    setSaved(true);
  }

  // ---- live preview (robust to empty/odd config) ----
  const preview = useMemo(() => {
    const base = pvMethod === "in-person" ? cfg.base_in_person : cfg.base_online;
    // nearest hours multiplier ≤ selected hours, else first/last available
    const mults = [...cfg.hours_multipliers].sort((a, b) => a.hours - b.hours);
    let mult = 1;
    for (const m of mults) if (pvHours >= m.hours) mult = m.mult;
    if (mults.length && pvHours < mults[0].hours) mult = mults[0].mult;
    // largest group tier whose min ≤ attendees
    const tiers = [...cfg.group_tiers].sort((a, b) => a.min - b.min);
    let pct = 0;
    for (const t of tiers) if (pvAttendees >= t.min) pct = t.pct;
    const listPerHead = (base || 0) * (mult || 1);
    const perHead = listPerHead * (1 - (pct || 0) / 100);
    const total = Math.max(perHead * pvAttendees, cfg.min_total || 0);
    return { listPerHead, perHead, total, pct };
  }, [cfg, pvAttendees, pvHours, pvMethod]);

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Pricing</Heading>
          <p className="cms-sub">Parameters that drive the calculator and quiz quotes.</p>
        </div>
        <div className="cms-actions" style={{ marginTop: 0 }}>
          <Button variant="primary" onClick={save}>Save pricing</Button>
        </div>
      </div>
      <p aria-live="polite" style={{ minHeight: 24, marginTop: -8 }}>
        {saved && <span className="cms-saved">Saved locally (not persisted)</span>}
      </p>

      <section className="panel" aria-labelledby="base-h">
        <Heading level={3} id="base-h">Base rates</Heading>
        <div className="cms-grid2">
          <div className="field">
            <label htmlFor="base-ip">Base per head — in-person ($)</label>
            <input id="base-ip" type="number" value={cfg.base_in_person} onChange={(e) => set({ base_in_person: num(e.target.value) })} />
          </div>
          <div className="field">
            <label htmlFor="base-on">Base per head — online ($)</label>
            <input id="base-on" type="number" value={cfg.base_online} onChange={(e) => set({ base_online: num(e.target.value) })} />
          </div>
          <div className="field">
            <label htmlFor="min-total">Minimum total ($)</label>
            <input id="min-total" type="number" value={cfg.min_total} onChange={(e) => set({ min_total: num(e.target.value) })} />
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="hm-h">
        <div className="cms-card__head">
          <Heading level={3} id="hm-h">Hours multipliers</Heading>
          <Button size="sm" variant="ghost" leadingIcon={Plus} onClick={addHM}>Add row</Button>
        </div>
        <div className="cms-table-scroll">
          <table className="cms-minitable">
            <thead><tr><th scope="col">Hours</th><th scope="col">Multiplier</th><th scope="col"></th></tr></thead>
            <tbody>
              {cfg.hours_multipliers.map((r, i) => (
                <tr key={i}>
                  <td><input aria-label={`Hours row ${i + 1}`} type="number" step="0.5" value={r.hours} onChange={(e) => setHM(i, { hours: num(e.target.value) })} /></td>
                  <td><input aria-label={`Multiplier row ${i + 1}`} type="number" step="0.01" value={r.mult} onChange={(e) => setHM(i, { mult: num(e.target.value) })} /></td>
                  <td><button type="button" className="cms-iconbtn" aria-label={`Remove hours row ${i + 1}`} onClick={() => removeHM(i)}><Trash size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel" aria-labelledby="gt-h">
        <div className="cms-card__head">
          <Heading level={3} id="gt-h">Group tiers</Heading>
          <Button size="sm" variant="ghost" leadingIcon={Plus} onClick={addGT}>Add row</Button>
        </div>
        <div className="cms-table-scroll">
          <table className="cms-minitable">
            <thead><tr><th scope="col">Min attendees</th><th scope="col">Discount %</th><th scope="col"></th></tr></thead>
            <tbody>
              {cfg.group_tiers.map((r, i) => (
                <tr key={i}>
                  <td><input aria-label={`Min attendees row ${i + 1}`} type="number" value={r.min} onChange={(e) => setGT(i, { min: num(e.target.value) })} /></td>
                  <td><input aria-label={`Discount percent row ${i + 1}`} type="number" value={r.pct} onChange={(e) => setGT(i, { pct: num(e.target.value) })} /></td>
                  <td><button type="button" className="cms-iconbtn" aria-label={`Remove group tier row ${i + 1}`} onClick={() => removeGT(i)}><Trash size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel" aria-labelledby="surcharge-h">
        <Heading level={3} id="surcharge-h">State surcharges</Heading>
        <div className="cms-grid2">
          {STATE_KEYS.map((k) => (
            <div className="field" key={k}>
              <label htmlFor={`sc-${k}`}>{k} surcharge</label>
              <input id={`sc-${k}`} type="number" step="0.01" value={cfg.state_surcharges[k] ?? 0} onChange={(e) => setSurcharge(k, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="addons-h">
        <Heading level={3} id="addons-h">Add-ons</Heading>
        <div className="cms-grid2">
          <div className="field">
            <label htmlFor="addon-qa">Live Q&amp;A ($)</label>
            <input id="addon-qa" type="number" value={cfg.addons.qa ?? 0} onChange={(e) => setAddon("qa", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="addon-cert">Certificate (per head, $)</label>
            <input id="addon-cert" type="number" value={cfg.addons.certificate ?? 0} onChange={(e) => setAddon("certificate", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="panel" aria-labelledby="preview-h">
        <Heading level={3} id="preview-h">Live preview</Heading>
        <p className="cms-sub">Estimate using the values above (excludes add-ons and surcharges).</p>
        <div className="cms-grid2">
          <div className="field">
            <label htmlFor="pv-method">Method</label>
            <select id="pv-method" value={pvMethod} onChange={(e) => setPvMethod(e.target.value as "in-person" | "online")}>
              <option value="in-person">In-person</option>
              <option value="online">Online</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="pv-hours">Hours</label>
            <input id="pv-hours" type="number" step="0.5" min={0} value={pvHours} onChange={(e) => setPvHours(num(e.target.value))} />
          </div>
          <div className="field">
            <label htmlFor="pv-attendees">Attendees</label>
            <input id="pv-attendees" type="number" min={1} value={pvAttendees} onChange={(e) => setPvAttendees(num(e.target.value))} />
          </div>
        </div>
        <div className="kpi-grid" style={{ marginTop: 8 }}>
          <div className="cms-preview">
            <div className="cms-preview__n">{formatUSD(Math.round(preview.perHead))}</div>
            <div className="cms-preview__l">Per head ({preview.pct}% group discount)</div>
          </div>
          <div className="cms-preview">
            <div className="cms-preview__n">{formatUSD(Math.round(preview.total))}</div>
            <div className="cms-preview__l">Estimated total</div>
          </div>
        </div>
      </section>
    </>
  );
}
