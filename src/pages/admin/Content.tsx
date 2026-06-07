import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Heading, Button } from "@/components/basic";
import "./admin.css";

/* Simple site-content editor stub. Seeded with the current marketing copy.
   TODO(api): load/save from a `site_content` table via the data seam. */

interface ContentSection {
  key: string;
  label: string;
  fields: { name: string; label: string; value: string; multiline?: boolean }[];
}

const INITIAL: ContentSection[] = [
  {
    key: "hero",
    label: "Home hero",
    fields: [
      { name: "eyebrow", label: "Eyebrow", value: "Preschool teacher training in Atlanta" },
      { name: "title", label: "Heading", value: "DECAL-approved trainings that transform early-years classrooms" },
      { name: "body", label: "Body", value: "Live and self-paced professional development from Camille Armstrong — built for your whole team.", multiline: true },
      { name: "cta", label: "CTA label", value: "Get a quote" },
    ],
  },
  {
    key: "methods",
    label: "Methods header",
    fields: [
      { name: "title", label: "Heading", value: "How Camille teaches" },
      { name: "body", label: "Body", value: "Hands-on, evidence-based methods rooted in the Reggio Emilia approach.", multiline: true },
    ],
  },
  {
    key: "programs",
    label: "Programs header",
    fields: [
      { name: "title", label: "Heading", value: "Programs for every center" },
      { name: "body", label: "Body", value: "From single workshops to whole-school annual packs.", multiline: true },
    ],
  },
];

export default function AdminContent() {
  useDocumentTitle("Site content · CMS", "Edit headline marketing copy.");

  const [sections, setSections] = useState<ContentSection[]>(INITIAL);
  const [saved, setSaved] = useState(false);

  function setField(sectionKey: string, fieldName: string, value: string) {
    // TODO(api): persist site_content.
    setSaved(false);
    setSections((prev) =>
      prev.map((s) =>
        s.key !== sectionKey
          ? s
          : { ...s, fields: s.fields.map((f) => (f.name === fieldName ? { ...f, value } : f)) },
      ),
    );
  }

  function save() {
    // TODO(api): persist all site_content sections.
    setSaved(true);
  }

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Site content</Heading>
          <p className="cms-sub">Edit the headline copy shown on the marketing site.</p>
        </div>
        <div className="cms-actions" style={{ marginTop: 0 }}>
          <Button variant="primary" onClick={save}>Save content</Button>
        </div>
      </div>
      <p aria-live="polite" style={{ minHeight: 24, marginTop: -8 }}>
        {saved && <span className="cms-saved">Saved locally (not persisted)</span>}
      </p>

      {sections.map((s) => (
        <section key={s.key} className="panel" aria-labelledby={`section-${s.key}`}>
          <Heading level={3} id={`section-${s.key}`}>{s.label}</Heading>
          {s.fields.map((f) => (
            <div className="field" key={f.name}>
              <label htmlFor={`${s.key}-${f.name}`}>{f.label}</label>
              {f.multiline ? (
                <textarea
                  id={`${s.key}-${f.name}`}
                  rows={3}
                  value={f.value}
                  onChange={(e) => setField(s.key, f.name, e.target.value)}
                />
              ) : (
                <input
                  id={`${s.key}-${f.name}`}
                  value={f.value}
                  onChange={(e) => setField(s.key, f.name, e.target.value)}
                />
              )}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
