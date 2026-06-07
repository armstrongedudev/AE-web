import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { getCourses } from "@/lib/content";
import type { Course, CourseKind } from "@/lib/database.types";
import { Heading, Button } from "@/components/basic";
import { Plus, Trash } from "@phosphor-icons/react";
import "./admin.css";

const KINDS: CourseKind[] = ["program", "workshop"];
const KIND_LABEL: Record<CourseKind, string> = { program: "Programs", workshop: "Workshops" };

const now = () => new Date().toISOString();

function blankCourse(kind: CourseKind, sort: number): Course {
  return {
    id: `new-${Math.random().toString(36).slice(2, 8)}`,
    slug: "new-course",
    kind,
    category: null,
    title: "Untitled course",
    subtitle: null,
    description: "",
    format: null,
    duration_label: null,
    duration_hours: null,
    decal_hours: null,
    bullets: [],
    image_url: null,
    featured: false,
    active: true,
    sort_order: sort,
    created_at: now(),
    updated_at: now(),
  };
}

export default function AdminCatalog() {
  useDocumentTitle("Course catalog · CMS", "Manage programs and workshops.");

  // TODO(api): getCourses() returns only active rows today; full CMS would load all.
  const [courses, setCourses] = useState<Course[]>(() => getCourses());
  const [saved, setSaved] = useState(false);

  function patch(id: string, p: Partial<Course>) {
    // TODO(api): persist course edit.
    setSaved(false);
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...p } : c)));
  }

  function addCourse(kind: CourseKind) {
    // TODO(api): persist new course.
    setSaved(false);
    const sort = courses.filter((c) => c.kind === kind).length + 1;
    setCourses((prev) => [...prev, blankCourse(kind, sort)]);
  }

  function removeCourse(id: string) {
    // TODO(api): delete course.
    setSaved(false);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function saveAll() {
    // TODO(api): persist the whole catalog.
    setSaved(true);
  }

  return (
    <>
      <div className="cms-head">
        <div className="cms-head__text">
          <Heading level={2} className="shell__title">Course catalog</Heading>
          <p className="cms-sub">Edit programs and workshops shown across the site.</p>
        </div>
        <div className="cms-actions" style={{ marginTop: 0 }}>
          <Button variant="primary" onClick={saveAll}>Save catalog</Button>
        </div>
      </div>
      <p aria-live="polite" style={{ minHeight: 24, marginTop: -8 }}>
        {saved && <span className="cms-saved">Saved locally (not persisted)</span>}
      </p>

      {KINDS.map((kind) => {
        const group = courses
          .filter((c) => c.kind === kind)
          .sort((a, b) => a.sort_order - b.sort_order);
        return (
          <section key={kind} aria-labelledby={`group-${kind}`}>
            <div className="cms-group-label" id={`group-${kind}`}>{KIND_LABEL[kind]}</div>
            {group.length === 0 && <p className="cms-sub">No {kind}s yet.</p>}
            {group.map((c) => (
              <article key={c.id} className={"cms-card" + (c.active ? "" : " is-inactive")}>
                <div className="cms-card__head">
                  <label className="cms-toggle">
                    <input
                      type="checkbox"
                      checked={c.active}
                      onChange={(e) => patch(c.id, { active: e.target.checked })}
                    />
                    {c.active ? "Active" : "Inactive"}
                  </label>
                  <button
                    type="button"
                    className="cms-iconbtn"
                    aria-label={`Delete ${c.title}`}
                    onClick={() => removeCourse(c.id)}
                  >
                    <Trash size={18} />
                  </button>
                </div>

                <div className="cms-grid2">
                  <div className="field">
                    <label htmlFor={`title-${c.id}`}>Title</label>
                    <input id={`title-${c.id}`} value={c.title} onChange={(e) => patch(c.id, { title: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`cat-${c.id}`}>Price category</label>
                    <input
                      id={`cat-${c.id}`}
                      value={c.category ?? ""}
                      placeholder="e.g. annual-pack"
                      onChange={(e) => patch(c.id, { category: e.target.value || null })}
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor={`desc-${c.id}`}>Description</label>
                  <textarea
                    id={`desc-${c.id}`}
                    rows={2}
                    value={c.description ?? ""}
                    onChange={(e) => patch(c.id, { description: e.target.value })}
                  />
                </div>

                <div className="cms-grid2">
                  <div className="field">
                    <label htmlFor={`slug-${c.id}`}>Slug</label>
                    <input id={`slug-${c.id}`} value={c.slug} onChange={(e) => patch(c.id, { slug: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor={`sort-${c.id}`}>Sort order</label>
                    <input
                      id={`sort-${c.id}`}
                      type="number"
                      value={c.sort_order}
                      onChange={(e) => patch(c.id, { sort_order: Number(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </article>
            ))}

            <div className="cms-actions">
              <Button variant="ghost" leadingIcon={Plus} onClick={() => addCourse(kind)}>
                Add {kind}
              </Button>
            </div>
          </section>
        );
      })}
    </>
  );
}
