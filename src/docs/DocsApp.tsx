import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Moon, Sun, GithubLogo } from "@phosphor-icons/react";
import { entries, basicEntries, macroEntries, type DocEntry } from "./registry";
import { systemIcons } from "./icons-list";
import { Example, Section, CodeBlock, Callout } from "./ui";
import { sitemap, seoNotes, type SitemapPage } from "./sitemap";
import Hero from "../sections/Hero";
import SuccessStories from "../sections/SuccessStories";
import { PricingCalculator } from "../sections/PricingCalculator";
import { PricingCalculatorCompact } from "../sections/PricingCalculator/Compact";
import { PricingCalculatorInline } from "../sections/PricingCalculator/Inline";
import Navbar from "../sections/Navbar";
import StatsStrip from "../sections/StatsStrip";
import Methods from "../sections/Methods";
import Programs from "../sections/Programs";
import Workshops from "../sections/Workshops";
import Testimonials from "../sections/Testimonials";
import Footer from "../sections/Footer";
import "./docs.css";

/* ---------------- routing (hash based, no deps) ---------------- */
function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/");
  useEffect(() => {
    const on = () => {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
const go = (path: string) => {
  window.location.hash = path;
};

/* ---------------- foundations data ---------------- */
const primitives: { name: string; val: string }[] = [
  { name: "green/600 · primary", val: "#006a3e" },
  { name: "green/450 · cta", val: "#3ba563" },
  { name: "green/800 · forest", val: "#124c34" },
  { name: "green/100 · mint", val: "#cbeee0" },
  { name: "orange/500 · accent", val: "#e9923b" },
  { name: "orange/50 · cream", val: "#fff7ec" },
  { name: "neutral/700 · body", val: "#45413a" },
  { name: "neutral/200 · hairline", val: "#e6e1d4" },
  { name: "red/600 · error", val: "#b22124" },
];
const typeScale = [
  { name: "Display", cls: "t-display", note: "Source Sans 3 · 64 / 500" },
  { name: "Heading 1", cls: "t-h1", note: "Source Sans 3 · 48 / 600" },
  { name: "Heading 2", cls: "t-h2", note: "Source Sans 3 · 36 / 600" },
  { name: "Heading 3", cls: "t-h3", note: "Source Sans 3 · 28 / 600" },
  { name: "Body Large", cls: "t-body-lg", note: "Inter · 18 / 400" },
  { name: "Body", cls: "t-body", note: "Source Sans 3 · 16 / 400" },
  { name: "Caption", cls: "t-caption", note: "Source Sans 3 · 12 / 400" },
];
const spaceScale = [
  ["space-1", 4], ["space-2", 8], ["space-3", 12], ["space-4", 16],
  ["space-6", 24], ["space-8", 32], ["space-12", 48], ["space-16", 64],
] as const;

/* ---------------- pages ---------------- */
function Home() {
  return (
    <div className="docs-content">
      <div className="docs-hero">
        <p className="docs-hero__eyebrow">Armstrong Educational Services</p>
        <h1 className="docs-hero__title">The Armstrong Design System</h1>
        <p className="docs-hero__sub">
          A Reggio-Emilia-inspired component library for early-childhood education — 21 accessible React components built
          on a token foundation shared 1:1 with Figma.
        </p>
        <button className="docs-hero__cta" onClick={() => go("/components/button")}>
          Browse components <ArrowRight size={18} weight="bold" />
        </button>
      </div>

      <div className="docs-stats">
        {[
          ["21", "Components"],
          ["136", "Design tokens"],
          ["13", "Text styles"],
          ["AA", "WCAG target"],
        ].map(([n, l]) => (
          <div className="docs-stat" key={l}>
            <div className="docs-stat__n">{n}</div>
            <div className="docs-stat__l">{l}</div>
          </div>
        ))}
      </div>

      <Section title="How it's built — atomic design">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, lineHeight: 1.6, color: "var(--body)", maxWidth: "70ch", margin: "0 0 var(--space-2)" }}>
          The library is layered like <strong>atomic design</strong>: design tokens feed atoms, atoms compose into
          molecules, and those build organisms and whole sections. Each layer only ever uses the layer below it — so a
          token change ripples up everywhere, in code and in Figma.
        </p>
        <div className="docs-atomic">
          {[
            { tier: "01", name: "Design tokens", tone: "var(--surface-cream)", desc: "Color, type, spacing, radius, icons & section backgrounds — the shared source of truth, 1:1 with Figma.", items: ["136 variables", "13 text styles", "39 icons", "5 backgrounds"] },
            { tier: "02", name: `Atoms · ${basicEntries.length}`, tone: "var(--surface-mint)", desc: "The smallest building blocks. They consume only tokens.", items: basicEntries.map((e) => e.title) },
            { tier: "03", name: "Molecules", tone: "var(--surface-peach)", desc: "A few atoms composed into a reusable unit.", items: ["SectionHeader", "OfferingCard", "WorkshopCard", "TestimonialCard", "StatsStrip", "Stat"] },
            { tier: "04", name: "Organisms & sections", tone: "var(--mint)", desc: "Whole page regions composed from molecules and atoms.", items: ["MethodsSection", "Navbar", "Footer", "Marquee"] },
            { tier: "05", name: "Pages", tone: "var(--surface-card)", desc: "Sections stacked on a seamless section-background chain.", items: ["Home"] },
          ].map((l, i, arr) => (
            <div key={l.name}>
              <div className="docs-atomic__row" style={{ background: l.tone }}>
                <div className="docs-atomic__tier">{l.tier}</div>
                <div className="docs-atomic__main">
                  <div className="docs-atomic__name">{l.name}</div>
                  <div className="docs-atomic__desc">{l.desc}</div>
                  <div className="docs-atomic__items">
                    {l.items.map((it) => (
                      <span className="docs-atomic__chip" key={it}>{it}</span>
                    ))}
                  </div>
                </div>
              </div>
              {i < arr.length - 1 && <div className="docs-atomic__arrow">↓</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Basic components">
        <div className="docs-grid">
          {basicEntries.map((e) => (
            <GalleryCard key={e.id} e={e} />
          ))}
        </div>
      </Section>

      <Section title="Macro components">
        <div className="docs-grid">
          {macroEntries.map((e) => (
            <GalleryCard key={e.id} e={e} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function GalleryCard({ e }: { e: DocEntry }) {
  return (
    <button className="docs-card" onClick={() => go(`/components/${e.id}`)}>
      <div className="docs-card__mini">{e.thumb()}</div>
      <div className="docs-card__name">{e.title}</div>
      <div className="docs-card__desc">{e.blurb}</div>
    </button>
  );
}

function ComponentPage({ entry }: { entry: DocEntry }) {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">{entry.group} component</p>
      <h1 className="docs-page__title">{entry.title}</h1>
      <p className="docs-page__lead">{entry.blurb}</p>
      <div style={{ marginBottom: 24 }}>
        <CodeBlock solo lang="ts" code={`import { ${entry.title} } from "armstrong-ui";`} />
      </div>
      {entry.content()}
    </div>
  );
}

function Colors() {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Foundations</p>
      <h1 className="docs-page__title">Color</h1>
      <p className="docs-page__lead">
        A warm green/cream/orange palette. Primitives feed semantic role tokens (primary, surface, ink…) which support
        light & dark modes. Components only ever consume semantic tokens.
      </p>
      <Section title="Key palette">
        <div className="docs-swatches">
          {primitives.map((s) => (
            <div className="docs-swatch" key={s.name}>
              <div className="docs-swatch__chip" style={{ background: s.val }} />
              <div className="docs-swatch__meta">
                <div className="docs-swatch__name">{s.name}</div>
                <div className="docs-swatch__val">{s.val}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Semantic roles">
        <Example
          block
          code={`background: var(--primary);\ncolor: var(--on-primary);\nborder: 1px solid var(--hairline);`}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["--primary", "--cta", "--forest", "--accent", "--mint", "--surface-cream", "--surface-peach"].map((t) => (
              <div key={t} style={{ textAlign: "center" }}>
                <div style={{ width: 84, height: 56, borderRadius: 10, background: `var(${t})`, border: "1px solid var(--hairline)" }} />
                <code style={{ fontSize: 11 }}>{t}</code>
              </div>
            ))}
          </div>
        </Example>
      </Section>
    </div>
  );
}

function Typography() {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Foundations</p>
      <h1 className="docs-page__title">Typography</h1>
      <p className="docs-page__lead">Source Sans 3 for display & UI, Inter for long-form body. Mirrors the Armstrong/* Figma text styles.</p>
      <Section title="Type scale">
        {typeScale.map((t) => (
          <div className="docs-type-row" key={t.name}>
            <div className="docs-type-row__meta">{t.note}</div>
            <span className={t.cls} style={{ color: "var(--ink)" }}>{t.name}</span>
          </div>
        ))}
      </Section>
    </div>
  );
}

function Spacing() {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Foundations</p>
      <h1 className="docs-page__title">Spacing & radius</h1>
      <p className="docs-page__lead">A 4px base grid. Semantic spacing tokens (inset, gap, stack, section) compose the primitives.</p>
      <Section title="Scale (4px grid)">
        {spaceScale.map(([name, px]) => (
          <div className="docs-space-row" key={name}>
            <span className="docs-space-row__meta">{name} · {px}</span>
            <span className="docs-space-row__bar" style={{ width: px * 3 }} />
          </div>
        ))}
      </Section>
      <Section title="Radius">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[["sm", 8], ["md", 12], ["lg", 16], ["xl", 24], ["pill", 40]].map(([n, r]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 64, background: "var(--mint)", borderRadius: r as number }} />
              <code style={{ fontSize: 11 }}>radius-{n}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="When to use each radius">
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "var(--body)", margin: "0 0 var(--space-4)", maxWidth: "66ch" }}>
          iOS-style soft radii. Prefer the <strong>semantic</strong> tokens (<code>--radius-control / card / modal / pill</code>) so intent stays
          consistent; reach for raw <code>--radius-sm…2xl</code> only for one-offs.
        </p>
        <div className="docs-radius-use">
          {[
            { name: "--radius-sm", val: "8px", use: "Small tags, tooltips, inline badges, compact inputs." },
            { name: "--radius-md · --radius-control", val: "12px", use: "Interactive controls — buttons, inputs, selects, steppers, small chips." },
            { name: "--radius-lg · --radius-card", val: "16px", use: "Cards, panels, list items, media thumbnails." },
            { name: "--radius-xl · --radius-modal", val: "24px", use: "Modals, sheets, large media & carousel cards." },
            { name: "--radius-2xl", val: "32px", use: "Extra-large feature / hero surfaces." },
            { name: "--radius-full · --radius-pill", val: "9999px", use: "Pills, avatars, fully-rounded chips, circular buttons." },
          ].map((r) => (
            <div className="docs-radius-use__row" key={r.name}>
              <div className="docs-radius-use__demo" style={{ borderRadius: Math.min(parseInt(r.val) || 20, 20) }} />
              <div>
                <div className="docs-radius-use__name">{r.name}</div>
                <div className="docs-radius-use__val">{r.val}</div>
              </div>
              <div className="docs-radius-use__use">{r.use}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Icons() {
  const [q, setQ] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const list = systemIcons.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
  const copy = (name: string) => {
    navigator.clipboard?.writeText(`<${name} size={20} />`).then(() => {
      setCopied(name);
      setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200);
    });
  };
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Foundations</p>
      <h1 className="docs-page__title">Iconography</h1>
      <p className="docs-page__lead">
        Icons are <a href="https://phosphoricons.com" target="_blank" rel="noreferrer" style={{ color: "var(--primary)", fontWeight: 600 }}>Phosphor</a> (regular weight),
        wrapped by the <code>Icon</code> component for consistent sizing and accessibility. {systemIcons.length} icons make up the
        system set. Click any icon to copy its JSX.
      </p>
      <Section title="Usage">
        <Example
          code={`import { GraduationCap } from "@phosphor-icons/react";\nimport { Icon } from "armstrong-ui";\n\n<Icon name={GraduationCap} size={24} />`}
        >
          {systemIcons.slice(0, 6).map(({ name, Icon: I }) => (
            <I key={name} size={28} />
          ))}
        </Example>
      </Section>
      <Section title="System icons">
        <input
          className="docs-iconsearch"
          placeholder={`Search ${systemIcons.length} icons…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="docs-icongrid">
          {list.map(({ name, Icon: I }) => (
            <button
              key={name}
              className={["docs-icontile", copied === name && "is-copied"].filter(Boolean).join(" ")}
              onClick={() => copy(name)}
              title={`Copy <${name} />`}
            >
              <I size={28} />
              <span className="docs-icontile__name">{copied === name ? "Copied!" : name}</span>
            </button>
          ))}
          {list.length === 0 && <p style={{ color: "var(--muted-foreground)" }}>No icons match “{q}”.</p>}
        </div>
      </Section>
    </div>
  );
}

const sectionBgs = [
  { name: "Methods", flow: "cream → white → cream", cls: "section-bg--methods" },
  { name: "Programs", flow: "gray · mint glow · cream", cls: "section-bg--programs" },
  { name: "Workshops", flow: "gray → mint → gray", cls: "section-bg--workshops" },
  { name: "Pricing", flow: "mint → cream → gray", cls: "section-bg--pricing" },
  { name: "Testimonials", flow: "mint → cream", cls: "section-bg--testimonials" },
];

function SectionBackgrounds() {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Foundations</p>
      <h1 className="docs-page__title">Section backgrounds</h1>
      <p className="docs-page__lead">
        These are the <strong>only</strong> backgrounds a page section may use — soft gradients between cream, white,
        gray and mint. They’re <strong>not tied to the section they’re named after</strong>: any background can be used
        on <em>any</em> section, as long as the colors chain.
      </p>
      <div className="docs-callout">
        <span className="docs-callout__icon">↕</span>
        <p>
          <strong>Chaining rule (use on any section):</strong> a background’s <strong>top</strong> color must match the
          color of the section <em>above</em> it (the outgoing section’s bottom), and its <strong>bottom / exit</strong>
          color must match the <strong>top</strong> color of the section <em>below</em>. Chain them so every boundary
          shares a color — the seams stay invisible. Reorder or reuse freely; only the matching matters.
        </p>
      </div>
      <Section title="The five backgrounds">
        <div className="docs-bg-list">
          {sectionBgs.map((b) => (
            <div className="docs-bg-item" key={b.cls}>
              <div className={`docs-bg-item__swatch ${b.cls}`} />
              <div className="docs-bg-item__meta">
                <span className="docs-bg-item__name">{b.name}</span>
                <span className="docs-bg-item__flow">{b.flow}</span>
                <code className="docs-bg-item__code">.{b.cls}</code>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Usage">
        <CodeBlock
          solo
          lang="tsx"
          code={`// apply to a full-bleed section wrapper\n<section className="section-bg--methods">…</section>\n<section className="section-bg--programs">…</section>`}
        />
        <p style={{ marginTop: "var(--space-4)", color: "var(--muted-foreground)", fontFamily: "var(--font-inter)", fontSize: 14 }}>
          Below: the home order chained so each boundary shares a color — no visible seam.
        </p>
        <div className="docs-bg-chain" style={{ marginTop: "var(--space-3)" }}>
          {sectionBgs.map((b) => (
            <div className={b.cls} key={b.cls}>{b.name}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------------- Sitemap & SEO ---------------- */

// Titles that appear in the primary navbar (matched against seoNotes.navbar.links).
const NAV_TITLES = seoNotes.navbar.links; // ["Programs", "Certification", "About Camille", "Reviews"]
const isNavPage = (p: SitemapPage) =>
  NAV_TITLES.some((l) => p.title === l || p.title.startsWith(l + " "));

const AREA_LABEL: Record<NonNullable<SitemapPage["area"]>, string> = {
  marketing: "marketing",
  auth: "auth · bridge",
  app: "client app",
  admin: "owner / admin",
};

function TreeNode({ page, pages, depth }: { page: SitemapPage; pages: SitemapPage[]; depth: number }) {
  const kids = pages.filter((p) => p.parent === page.path && p.path !== page.path);
  const area = page.area ?? "marketing";
  return (
    <li className="docs-tree__item">
      <div className="docs-tree__node" style={{ paddingLeft: depth * 20 }} title={page.purpose}>
        <span className="docs-tree__title">{page.title}</span>
        <code className="docs-tree__path">{page.path}</code>
        {isNavPage(page) && <span className="docs-tree__pill docs-tree__pill--nav">nav</span>}
        {page.seoPrimary && <span className="docs-tree__pill docs-tree__pill--seo">SEO primary</span>}
        {area !== "marketing" && (
          <span className={`docs-tree__pill docs-tree__pill--${area}`}>{AREA_LABEL[area]}</span>
        )}
        {page.index === false && <span className="docs-tree__pill docs-tree__pill--noindex">noindex</span>}
      </div>
      {kids.length > 0 && (
        <ul className="docs-tree__list">
          {kids.map((k) => (
            <TreeNode key={k.path} page={k} pages={pages} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SitemapTree({ pages }: { pages: SitemapPage[] }) {
  // Top level = pages whose parent doesn't point at another page in the set
  // (no parent, or a parent path that isn't itself a page — e.g. "/" when no "/" page).
  const paths = new Set(pages.map((p) => p.path));
  const tops = pages.filter((p) => !p.parent || !paths.has(p.parent));
  return (
    <ul className="docs-tree__list">
      {tops.map((t) => (
        <TreeNode key={t.path} page={t} pages={pages} depth={0} />
      ))}
    </ul>
  );
}

function SitemapSeo() {
  const isPublic = (p: SitemapPage) => (p.area ?? "marketing") === "marketing";
  const publicPages = sitemap.filter(isPublic);
  const appPages = sitemap.filter((p) => !isPublic(p));

  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Site &amp; SEO</p>
      <h1 className="docs-page__title">Sitemap &amp; SEO</h1>
      <p className="docs-page__lead">
        The canonical information architecture for Armstrong Educational Services — split into two zones: the{" "}
        <strong>public, indexable SEO site</strong> (marketing) and the <strong>authenticated Supabase app</strong>{" "}
        (client + owner, behind login, noindex). Each public page lists its purpose, primary keyword + monthly volume,
        recommended SEO/schema, and an accessibility hotspot. Grounded in the SEO Master Plan, copy/schema spec, client
        profile and pricing strategy.
      </p>

      <div className="docs-noindex">
        <strong>noindex.</strong> This documentation book is set to <code>noindex</code> / robots-disallow so it isn’t
        crawled or scraped when deployed. (A teammate is wiring the actual headers.)
      </div>

      {/* ── Navbar & main SEO categories ─────────────────────────────────── */}
      <Section title="Navbar & main SEO categories">
        <div className="docs-navbar-block">
          <div className="docs-navbar-block__bar" role="img" aria-label="Primary navbar preview">
            <span className="docs-navbar-block__brand">Armstrong</span>
            <span className="docs-navbar-block__links">
              {seoNotes.navbar.links.map((l) => (
                <span className="docs-nav-link" key={l}>
                  {l}
                </span>
              ))}
            </span>
            <span className="docs-navbar-block__ctas">
              {seoNotes.navbar.ctas.map((c) => {
                const isLogin = c.toLowerCase().startsWith("log in");
                return (
                  <span
                    className={`docs-nav-cta${isLogin ? " docs-nav-cta--login" : ""}`}
                    key={c}
                  >
                    {c}
                  </span>
                );
              })}
            </span>
          </div>
          <p className="docs-navbar-block__note">{seoNotes.navbar.note}</p>
          <div className="docs-seo-note" style={{ marginTop: "var(--space-3)" }}>
            <h3>Main SEO categories</h3>
            <p>{seoNotes.seoCategories}</p>
          </div>
        </div>
      </Section>

      {/* ── ZONE 1: PUBLIC SITE ──────────────────────────────────────────── */}
      <Section title="Public site (indexable · SEO)">
        <p className="docs-tree__intro">
          {publicPages.length} indexable marketing pages. Pages that appear in the primary navbar are marked{" "}
          <span className="docs-tree__pill docs-tree__pill--nav docs-tree__pill--inline">nav</span>. Top-level pages sit
          under the site root; <code>/programs/*</code> children nest under the Programs hub.
        </p>
        <nav className="docs-tree" aria-label="Public site map">
          <SitemapTree pages={publicPages} />
        </nav>

        <div className="docs-seo-tablewrap" style={{ marginTop: "var(--space-5)" }}>
          <table className="docs-table docs-seo-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Purpose &amp; key content</th>
                <th>Primary keyword</th>
                <th>Volume</th>
                <th>SEO / schema</th>
                <th>Accessibility</th>
              </tr>
            </thead>
            <tbody>
              {publicPages.map((p) => (
                <tr key={p.path}>
                  <td>
                    <div className="docs-seo-table__title">
                      {p.title}
                      {isNavPage(p) && <span className="docs-tree__pill docs-tree__pill--nav">nav</span>}
                    </div>
                    <code>{p.path}</code>
                  </td>
                  <td>
                    <p className="docs-seo-table__purpose">{p.purpose}</p>
                    <ul className="docs-seo-table__content">
                      {p.content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <span className="docs-seo-table__kw">{p.primaryKeyword}</span>
                    {p.keywords.length > 0 && (
                      <ul className="docs-seo-table__kwlist">
                        {p.keywords.map((k, i) => (
                          <li key={i}>{k}</li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <span className="docs-seo-table__vol">{p.searchVolume}</span>
                  </td>
                  <td className="docs-seo-table__seo">{p.seo}</td>
                  <td className="docs-seo-table__a11y">{p.a11y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── ZONE 2: AUTHENTICATED APP ────────────────────────────────────── */}
      <Section title="Authenticated app — Supabase (noindex)">
        <p className="docs-tree__intro">
          {appPages.length} pages behind login — never in the navbar (only the <strong>Log in</strong> CTA), never in{" "}
          <code>sitemap.xml</code>, all <code>noindex</code>. Three groups: the <strong>bridge</strong>{" "}
          (<code>/login</code>), the <strong>client app</strong> (<code>/app*</code>), and the{" "}
          <strong>owner / admin</strong> console (<code>/admin*</code>).
        </p>
        <nav className="docs-tree docs-tree--app" aria-label="Authenticated app map">
          <SitemapTree pages={appPages} />
        </nav>

        <div className="docs-seo-tablewrap" style={{ marginTop: "var(--space-5)" }}>
          <table className="docs-table docs-seo-table docs-seo-table--app">
            <thead>
              <tr>
                <th>Page</th>
                <th>Purpose &amp; key content</th>
                <th>Zone</th>
                <th>Indexable?</th>
              </tr>
            </thead>
            <tbody>
              {appPages.map((p) => {
                const area = p.area ?? "marketing";
                return (
                  <tr key={p.path}>
                    <td>
                      <div className="docs-seo-table__title">{p.title}</div>
                      <code>{p.path}</code>
                    </td>
                    <td>
                      <p className="docs-seo-table__purpose">{p.purpose}</p>
                      <ul className="docs-seo-table__content">
                        {p.content.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <span className={`docs-tree__pill docs-tree__pill--${area}`}>{AREA_LABEL[area]}</span>
                    </td>
                    <td>
                      <span className="docs-tree__pill docs-tree__pill--noindex">no · noindex</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Accounts, roles & data (Supabase) ────────────────────────────── */}
      <Section title="Accounts, roles & data (Supabase)">
        <div className="docs-flow">
          <div className="docs-flow__node docs-flow__node--start">
            Navbar <strong>Log in</strong>
          </div>
          <span className="docs-flow__arrow" aria-hidden="true">→</span>
          <div className="docs-flow__node">
            <code>/login</code>
            <span className="docs-flow__sub">sign in · role-aware</span>
          </div>
          <span className="docs-flow__arrow" aria-hidden="true">→</span>
          <div className="docs-flow__paths">
            <div className="docs-flow__path">
              <span className="docs-flow__badge">①</span>
              <div>
                <strong>My quotes & account at Armstrong Education</strong>
                <span className="docs-flow__sub">
                  → <code>/app</code> (client dashboard)
                </span>
              </div>
            </div>
            <div className="docs-flow__path">
              <span className="docs-flow__badge">②</span>
              <div>
                <strong>Online trainings platform</strong>
                <span className="docs-flow__sub">
                  → <code>/programs/self-paced-courses</code> (self-enroll CEUs)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="docs-roles">
          <div className="docs-roles__card">
            <h3>Auth providers</h3>
            <div className="docs-roles__providers">
              {["Google", "Apple", "Microsoft", "Email + password"].map((p) => (
                <span className="docs-provider" key={p}>
                  {p}
                </span>
              ))}
            </div>
            <p className="docs-seo-note__muted">Supabase Auth (OAuth + email). Redirect URLs allow-listed; secure cookies.</p>
          </div>
          <div className="docs-roles__card">
            <h3>Client</h3>
            <p>A school director / owner / educator.</p>
            <ul>
              <li>Sees the price Camille set per booking (per-head + total)</li>
              <li>Accept / decline a quote; request changes</li>
              <li>Reads only their own rows (RLS: <code>client_id = auth.uid()</code>)</li>
            </ul>
          </div>
          <div className="docs-roles__card">
            <h3>Owner — Camille</h3>
            <p>The business owner / admin.</p>
            <ul>
              <li>Sets the price per booking (per-head + total) using the calculator model</li>
              <li>Sends / accepts the quote; schedules & marks paid</li>
              <li>Owner role bypasses RLS via policy</li>
            </ul>
          </div>
        </div>

        <div className="docs-seo-note" style={{ marginTop: "var(--space-4)" }}>
          <h3>Architecture</h3>
          <p>{seoNotes.accounts}</p>
        </div>
      </Section>

      <Section title="Site-wide SEO & GEO">
        <div className="docs-seo-notes">
          <div className="docs-seo-note">
            <h3>Brand & entity</h3>
            <p><strong>{seoNotes.brand.name}</strong> — {seoNotes.brand.person}.</p>
            <p>{seoNotes.brand.entityDefinition}</p>
            <p className="docs-seo-note__muted">{seoNotes.brand.market}</p>
          </div>

          <div className="docs-seo-note">
            <h3>Titles, meta & headings</h3>
            <p><strong>Title pattern.</strong> {seoNotes.titlePattern}</p>
            <p><strong>Meta description.</strong> {seoNotes.metaDescription}</p>
            <p><strong>Headings.</strong> {seoNotes.headings}</p>
          </div>

          <div className="docs-seo-note">
            <h3>Schema (JSON-LD)</h3>
            <p className="docs-seo-note__sub">Sitewide</p>
            <ul>
              {seoNotes.schemaTypes.sitewide.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <p className="docs-seo-note__sub">Per page</p>
            <ul>
              {Object.entries(seoNotes.schemaTypes.perPage).map(([k, v]) => (
                <li key={k}>
                  <code>{k}</code> — {v}
                </li>
              ))}
            </ul>
            <p className="docs-seo-note__muted">{seoNotes.schemaTypes.note}</p>
          </div>

          <div className="docs-seo-note">
            <h3>GEO / AI search</h3>
            <p>{seoNotes.geo.summary}</p>
            <ul>
              {seoNotes.geo.tactics.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="docs-seo-note">
            <h3>Robots & crawl</h3>
            <p>{seoNotes.robotsAndCrawl}</p>
            <h3>sitemap.xml</h3>
            <p>{seoNotes.sitemapXml}</p>
            <h3>Technical</h3>
            <p>{seoNotes.technical}</p>
          </div>

          <div className="docs-seo-note">
            <h3>IA reconciliation</h3>
            <p>{seoNotes.hierarchyNote}</p>
          </div>
        </div>
      </Section>

      <Section title="Accessibility">
        <Callout>
          Target <strong>WCAG 2.2 AA sitewide</strong>: skip link to <code>#main</code>, one H1 + logical heading order
          per page, native interactive elements with visible <code>:focus-visible</code> (≥3:1), 24px (pref. 44px)
          targets, color never the sole signal, <code>prefers-reduced-motion</code> honored, <code>lang="en"</code>, and
          consistent nav/help placement. Highest-risk surfaces: the <code>/book</code> pricing calculator (slider needs a
          non-drag alternative 2.5.7, live price via <code>aria-live</code>, warning via <code>role="alert"</code>, focus
          not obscured by the sticky price rail 2.4.11) and the <code>/contact</code> + school-license quote forms
          (labels, <code>aria-required</code>, <code>role="alert"</code> errors with focus management, redundant-entry
          avoidance 3.3.7). Media (course previews, talk videos) need captions + transcripts; verify cream/forest-green
          text combos meet 4.5:1.
        </Callout>
      </Section>
    </div>
  );
}

function HeroPage() {
  return (
    <div>
      <div className="docs-content" style={{ paddingBottom: "var(--space-6)" }}>
        <p className="docs-page__eyebrow">Page sections</p>
        <h1 className="docs-page__title">Hero</h1>
        <p className="docs-page__lead">
          The home hero (Figma 288:1335) — full-bleed below. Resize the window to see the tablet & phone layouts.
        </p>
      </div>
      <Hero />
    </div>
  );
}

function SuccessPage() {
  return (
    <div className="docs-content">
      <p className="docs-page__eyebrow">Page sections</p>
      <h1 className="docs-page__title">Success stories</h1>
      <p className="docs-page__lead">
        The “casos de éxito” band shown in the Reviews area — 3 case-study cards (sample content for now). Reuses
        SectionHeader, Chip, Heading and Text.
      </p>
      <div className="section-bg--testimonials" style={{ padding: "var(--space-12) var(--space-8)", borderRadius: 16 }}>
        <SuccessStories />
      </div>
    </div>
  );
}

function CalculatorsPage() {
  return (
    <div>
      <div className="docs-content" style={{ paddingBottom: "var(--space-6)" }}>
        <p className="docs-page__eyebrow">Page sections</p>
        <h1 className="docs-page__title">Pricing calculators</h1>
        <p className="docs-page__lead">
          Three working takes on the quote calculator — all share one pricing engine (<code>pricing.ts</code> +{" "}
          <code>usePricing</code>). v1 is the exact Figma design (288:1648); v2 and v3 are compact alternatives.
        </p>
        <div
          style={{
            marginTop: "var(--space-5)",
            padding: "var(--space-5)",
            borderRadius: "var(--radius-lg)",
            background: "var(--surface-mint)",
            border: "1px solid var(--hairline)",
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: "var(--ink)" }}>
            Two ways to get a quote — the user chooses
          </p>
          <ul style={{ margin: "var(--space-3) 0 0", paddingLeft: "1.1em", color: "var(--on-mint)", lineHeight: 1.6 }}>
            <li>
              <b>Calculator</b> — the live form below (pick a layout variant). Adjust inputs, watch the price update.
            </li>
            <li>
              <b>Quiz</b> — the <i>same questions one at a time</i> (guided wizard): method → state → attendees → hours →
              extras → quote. Built on the same components (SectionHeader · Chip · Stepper · Button · quote summary) and the
              same <code>pricing.ts</code> engine, so both paths reach an identical quote.
            </li>
            <li>
              <b>Save quote</b> — a logged-in client saves the quote to their account (<code>/app</code>, Supabase{" "}
              <code>quotes</code>); a guest is sent to <code>/login</code> and the quote persists on return. Camille then
              prices / accepts the booking in <code>/admin</code>.
            </li>
          </ul>
        </div>
      </div>
      <Section3 title="v1 · Cards (exact Figma design)"><PricingCalculator /></Section3>
      <Section3 title="v2 · Compact panel"><PricingCalculatorCompact /></Section3>
      <Section3 title="v3 · Inline / embeddable"><PricingCalculatorInline /></Section3>
    </div>
  );
}
function Section3({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "var(--space-12)" }}>
      <div className="docs-content" style={{ paddingTop: 0, paddingBottom: "var(--space-3)" }}>
        <h2 className="docs-section__h" style={{ borderBottom: 0, marginBottom: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ---- generic shell for a live, full-bleed section preview ---- */
function SectionShell({ title, lead, children }: { title: string; lead: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="docs-content" style={{ paddingBottom: "var(--space-6)" }}>
        <p className="docs-page__eyebrow">Page sections</p>
        <h1 className="docs-page__title">{title}</h1>
        <p className="docs-page__lead">{lead}</p>
        <p className="docs-page__lead" style={{ marginTop: "var(--space-2)", fontSize: 14, color: "var(--muted-foreground)" }}>
          Live component — <b>resize the window</b> to see the desktop / tablet / phone layouts.
        </p>
      </div>
      <div className="docs-section-preview">{children}</div>
    </div>
  );
}

function NavbarPage() {
  return (
    <SectionShell title="Navbar" lead={<>Sticky floating bar that collapses to a hamburger + dropdown on tablet/phone (Figma Navbar 302:199 · Navbar/Mobile 308:228). The green CTA is <b>Log in</b> → /login.</>}>
      <div style={{ position: "relative", minHeight: 320, paddingBottom: 40, background: "var(--surface-cream)" }}>
        <Navbar />
      </div>
    </SectionShell>
  );
}
function StatsPage() {
  return (
    <SectionShell title="Stats strip" lead={<>Credentials band — Reggio Emilia seal + 30+ years · DECAL · M.A. Desktop = one row with dividers; tablet = four-in-a-row (Figma 464:1281); phone = 2×2 grid.</>}>
      <StatsStrip />
    </SectionShell>
  );
}
function MethodsPage() {
  return (
    <SectionShell title="Methods" lead={<>Camille's philosophy band. The eyebrow uses the accessible <code>--accent-ink</code> orange (WCAG AA on cream).</>}>
      <Methods />
    </SectionShell>
  );
}
function ProgramsPage() {
  return (
    <SectionShell title="Programs" lead={<>Leads with the highlighted <b>Annual packs</b> offer (for groups &amp; schools). Desktop/tablet = featured banner + a peek-slider of the offerings; <b>phone = a 4-slide auto-carousel</b> (Annual packs first) that advances every 5s with a dot indicator and edge fade.</>}>
      <Programs />
    </SectionShell>
  );
}
function WorkshopsPage() {
  return (
    <SectionShell title="Workshops" lead={<>Up to 7 workshops in a lateral, snap-scrolling rail with a “See all workshops” CTA and a trailing see-all card.</>}>
      <Workshops />
    </SectionShell>
  );
}
function TestimonialsPage() {
  return (
    <SectionShell title="Testimonials" lead={<>An <b>infinite, continuous marquee</b> of review cards with fade-in/out at both edges, on phone and desktop alike. It pauses on hover and honors <code>prefers-reduced-motion</code>; cards are clamped to a uniform height for a smooth loop.</>}>
      <Testimonials />
    </SectionShell>
  );
}
function FooterPage() {
  return (
    <SectionShell title="Footer" lead={<>Desktop radial band → <b>tablet/phone cream→green gradient</b> (Figma Footer variants 472:1667 / 472:1714): CTA block on top, link columns below, buttons full-width on phone.</>}>
      <Footer />
    </SectionShell>
  );
}

/* ---------------- sidebar ---------------- */
function Rail({ route }: { route: string }) {
  const Group = ({ title, items }: { title: string; items: { id: string; label: string }[] }) => (
    <div className="docs-rail__group">
      <div className="docs-rail__title">{title}</div>
      {items.map((it) => {
        const active = route === it.id;
        return (
          <button key={it.id} className={["docs-rail__link", active && "is-active"].filter(Boolean).join(" ")} onClick={() => go(it.id)}>
            <span className="docs-rail__dot" />
            {it.label}
          </button>
        );
      })}
    </div>
  );
  return (
    <nav className="docs-rail" aria-label="Documentation">
      <Group title="Get started" items={[{ id: "/", label: "Overview" }]} />
      <Group
        title="Page sections"
        items={[
          { id: "/sections/navbar", label: "Navbar" },
          { id: "/sections/hero", label: "Hero" },
          { id: "/sections/stats", label: "Stats strip" },
          { id: "/sections/methods", label: "Methods" },
          { id: "/sections/programs", label: "Programs" },
          { id: "/sections/workshops", label: "Workshops" },
          { id: "/sections/calculators", label: "Pricing calculators" },
          { id: "/sections/testimonials", label: "Testimonials" },
          { id: "/sections/success", label: "Success stories" },
          { id: "/sections/footer", label: "Footer" },
        ]}
      />
      <Group
        title="Foundations"
        items={[
          { id: "/foundations/colors", label: "Color" },
          { id: "/foundations/typography", label: "Typography" },
          { id: "/foundations/spacing", label: "Spacing & radius" },
          { id: "/foundations/backgrounds", label: "Section backgrounds" },
          { id: "/foundations/icons", label: "Iconography" },
        ]}
      />
      <Group title="Site & SEO" items={[{ id: "/site/sitemap", label: "Sitemap & SEO" }]} />
      <Group title="Basic components" items={basicEntries.map((e) => ({ id: `/components/${e.id}`, label: e.title }))} />
      <Group title="Macro components" items={macroEntries.map((e) => ({ id: `/components/${e.id}`, label: e.title }))} />
    </nav>
  );
}

/* ---------------- shell ---------------- */
export default function DocsApp() {
  const route = useHashRoute();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  let page;
  if (route === "/") page = <Home />;
  else if (route === "/foundations/colors") page = <Colors />;
  else if (route === "/foundations/typography") page = <Typography />;
  else if (route === "/foundations/spacing") page = <Spacing />;
  else if (route === "/sections/navbar") page = <NavbarPage />;
  else if (route === "/sections/hero") page = <HeroPage />;
  else if (route === "/sections/stats") page = <StatsPage />;
  else if (route === "/sections/methods") page = <MethodsPage />;
  else if (route === "/sections/programs") page = <ProgramsPage />;
  else if (route === "/sections/workshops") page = <WorkshopsPage />;
  else if (route === "/sections/testimonials") page = <TestimonialsPage />;
  else if (route === "/sections/success") page = <SuccessPage />;
  else if (route === "/sections/calculators") page = <CalculatorsPage />;
  else if (route === "/sections/footer") page = <FooterPage />;
  else if (route === "/foundations/backgrounds") page = <SectionBackgrounds />;
  else if (route === "/foundations/icons") page = <Icons />;
  else if (route === "/site/sitemap") page = <SitemapSeo />;
  else if (route.startsWith("/components/")) {
    const id = route.split("/")[2];
    const entry = entries.find((e) => e.id === id);
    page = entry ? <ComponentPage entry={entry} /> : <Home />;
  } else page = <Home />;

  return (
    <div className="docs">
      <header className="docs-bar">
        <button className="docs-bar__brand" onClick={() => go("/")}>
          <span className="docs-bar__logo">
            <img src="/brand/logo-ae.png" alt="Armstrong" />
          </span>
          Armstrong Design System
        </button>
        <span className="docs-bar__tag">v0.1</span>
        <span className="docs-bar__spacer" />
        <button className="docs-bar__btn" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
          {dark ? <Sun size={16} /> : <Moon size={16} />} {dark ? "Light" : "Dark"}
        </button>
        <a className="docs-bar__btn" href="#/" onClick={(e) => { e.preventDefault(); go("/components/button"); }}>
          <GithubLogo size={16} /> Components
        </a>
      </header>
      <div className="docs-shell">
        <Rail route={route} />
        <main className="docs-main">{page}</main>
      </div>
    </div>
  );
}
