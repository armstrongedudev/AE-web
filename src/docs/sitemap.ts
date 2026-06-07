/**
 * Armstrong Educational Services — canonical sitemap + per-page SEO/GEO/a11y data.
 *
 * Single source of truth for the Figma diagram builder and the docs writer.
 *
 * Grounded in:
 *  - Armstrong-SEO-Master-Plan.docx  (§4 keyword clusters w/ real volumes, §5 site architecture, §9 GEO)
 *  - Armstrong-SEO-Copy-and-Schema.md (headings, meta, JSON-LD blocks)
 *  - Armstrong-Client-Profile.docx   (positioning, ICP, service lines, proof)
 *  - Armstrong-Pricing-Strategy.docx (calculator spec, group/decay pricing)
 *  - Armstrong-Home-Structure-Audit.md (built section order + nav/footer)
 *
 * Search volumes are US monthly estimates pulled from SEO Master Plan §4 where present;
 * derived estimates are marked "(est.)". KD = ranking difficulty (1–100) noted inline.
 *
 * Trainer: Anna Camille Hampton ("Camille") — Georgia DECAL-approved trainer,
 * M.A. Educational Psychology (CU Denver), Reggio Emilia (Boulder Journey School),
 * 30+ years. Market: metro Atlanta + the Carolinas in person, online nationally.
 */

export interface SitemapPage {
  path: string; // e.g. "/", "/programs", "/programs/certification"
  title: string; // page name
  parent?: string; // parent path for hierarchy ("/" top level)
  purpose: string; // 1 sentence
  content: string[]; // key sections / info on the page
  primaryKeyword: string;
  searchVolume: string; // monthly est. e.g. "~1.3k/mo" — from SEO plan if present, else reasoned + "(est.)"
  keywords: string[]; // supporting keywords (volumes inline where known)
  seo: string; // title-tag / meta / schema recommendation (names JSON-LD type)
  a11y: string; // page-specific accessibility note
  /** Which zone: public marketing site, the authed client app, the owner/admin app, or the auth bridge. @default "marketing" */
  area?: "marketing" | "app" | "admin" | "auth";
  /** Appears in the primary navbar. */
  nav?: boolean;
  /** A primary SEO category (top of the IA, strongest commercial/authority intent). */
  seoPrimary?: boolean;
  /** Indexable by search engines. Marketing pages = true; app/admin/auth = false (noindex, behind login). @default true */
  index?: boolean;
}

export const sitemap: SitemapPage[] = [
  // ─────────────────────────────────────────────────────────── HOME
  {
    path: "/",
    title: "Home",
    purpose:
      "Convert the high-intent local searcher into a booking or discovery call by leading with Camille's credential stack and a 60-second pricing calculator.",
    content: [
      "Hero: 'Early childhood consulting & DECAL-approved training in Atlanta' + dual CTA (Book a free 30-min discovery call / Build your training quote)",
      "Affiliations strip: DECAL/Bright from the Start, Boulder Journey School, CU Denver, GAEYC, NAREA, Turning Sun Schools",
      "Stats strip: 30+ years · DECAL-approved trainer · M.A. Ed Psych · ages 2–6 · 3 conferences",
      "Programs overview: Group trainings · Self-paced courses · Annual packs · School licenses",
      "For individual educators mini-band (self-paced DECAL hours, contact-free, from $14/hr)",
      "Signature workshops grid (5 cards: play schemas, loose parts, infant environments, multiple intelligences, constructivist teaching)",
      "How I work / Our approach (wireless mic, chunked content, venue checklist, theory→practice)",
      "Pricing calculator 'Get your quote' + trust band (next-tier preview, savings vs. 1:1)",
      "How group pricing works (3-step group-formation explainer)",
      "Testimonials (real participant quotes, Review schema)",
      "FAQ accordion (DECAL hours, group pricing, 3-hour pricing, travel, online vs in-person)",
      "Discovery-call + lead-magnet closing band",
    ],
    primaryKeyword: "early childhood consultant Atlanta",
    searchVolume: "~150/mo (KD 28)",
    keywords: [
      "DECAL approved trainer Atlanta (~100/mo, KD 18)",
      "early childhood consultant Georgia (~200/mo, KD 32)",
      "preschool consultant near me (~800/mo, KD 42)",
      "Reggio Emilia consultant Atlanta (~30/mo, KD 12)",
      "Armstrong Educational Services (branded, <10/mo)",
    ],
    seo: "Title: 'DECAL Approved Trainer Atlanta | Armstrong Educational' (~57 ch). Meta 152 ch w/ name + Reggio + 'book a free discovery call'. JSON-LD: ProfessionalService (+ EducationalOrganization) and Person (Camille) graph by @id, plus FAQPage and Review/AggregateRating embedded. OG image 1200×630.",
    a11y: "One H1 only ('Early childhood consulting and DECAL-approved training in Atlanta'); logical H2→H3 below it. Skip link to #main; nav landmark labeled. Affiliation logos need descriptive alt or empty alt if decorative; stat numbers must not convey meaning by color alone. CTAs as native <a>/<button> with 44px targets.",
  },

  // ─────────────────────────────────────────────────── CERTIFICATION (nav)
  {
    path: "/certification",
    title: "Certification — DECAL / Bright from the Start",
    parent: "/",
    purpose:
      "Capture the highest-intent, lowest-competition transactional query and explain Georgia's 10-hour annual requirement and how Camille's CEUs satisfy it.",
    content: [
      "Answer-first explainer: Georgia educators need 10 DECAL-approved clock hours per calendar year",
      "What 'DECAL-approved' / 'Bright from the Start (BFTS)' means; CEU certificate handling (+$5/head opt-in)",
      "How Camille's trainings & self-paced courses count toward annual hours",
      "DECAL season callout (Jul–Sept renewal surge) + 'get ahead' CTA",
      "Standards alignment table: GELDS, Georgia Pre-K, Quality Rated, NAEYC DAP, CDA pathway",
      "Link to /pricing (calculator) and /programs/self-paced-courses (online, self-enroll)",
    ],
    primaryKeyword: "Bright from the Start trainer Georgia",
    searchVolume: "~90/mo (KD 22)",
    keywords: [
      "BFTS approved training Atlanta (~70/mo, KD 20)",
      "10 hour child care training Georgia (~500/mo, KD 32)",
      "childcare training Georgia (~600/mo, KD 38)",
      "how to become a DECAL approved trainer in Georgia (~200/mo, KD 22)",
      "how many training hours do I need Georgia child care (~150/mo, KD 20)",
    ],
    seo: "Title: 'DECAL-Approved Training in Georgia (Bright from the Start) | Armstrong'. JSON-LD: FAQPage (the 10-hour rule, certificate, online vs in-person) + Course list reference. Internal links to each workshop. Strong GEO target — answer-first TL;DR for AI citation.",
    a11y: "Standards-alignment data presented as a real <table> with <th> scope, not a styled grid. Headings describe the requirement plainly (Understandable 3.x). Any 'deadline' urgency badge must pair color with text/icon.",
  },

  // ───────────────────────────────────────────────────── PROGRAMS (nav hub)
  {
    path: "/programs",
    title: "Programs",
    parent: "/",
    purpose:
      "Service hub that routes school directors and individual educators to the right offering (group trainings, self-paced courses, annual packs, school licenses).",
    content: [
      "Four service lines: live trainings, self-paced courses, annual packs, school licenses",
      "How I work with schools and educators (PD trainings, 1:1 & team coaching, consultation, classroom design)",
      "Signature workshops grid",
      "Format/length matrix: 1h–8h, in-person vs live-online vs self-paced",
      "CTA to pricing calculator + discovery call",
    ],
    primaryKeyword: "preschool teacher training Atlanta",
    searchVolume: "~130/mo (KD 26)",
    keywords: [
      "professional development preschool teachers GA (~90/mo, KD 25)",
      "daycare staff training Georgia (~120/mo, KD 30)",
      "professional development for preschool teachers (~2.5k/mo, KD 52)",
      "early childhood classroom consulting (~200/mo, KD 32)",
      "pedagogical consultation early childhood (~150/mo, KD 28)",
    ],
    seo: "Title: 'Preschool Teacher Training & ECE Consulting Atlanta | Armstrong'. JSON-LD: ItemList of Course/Service offerings + BreadcrumbList. FAQPage for service-level objections. Links down to each workshop and to /pricing.",
    a11y: "Card grid uses semantic list markup; each card's primary action is a single descriptive link ('Group trainings — learn more', not 'learn more'). Consistent nav placement across the hub and children (3.2.3).",
  },
  {
    path: "/programs/group-trainings",
    title: "Group trainings (live, in-person / online)",
    parent: "/programs",
    purpose:
      "Sell the flagship live DECAL training to directors with group-based pricing and add-ons.",
    content: [
      "Flagship live PD: 1h / 1.5h / 2h / 3h / 4h / 6h / 8h sessions",
      "Group pricing curve (more attendees → lower per-head) + decay curve for longer sessions",
      "Add-ons: Q&A block (+$8/+$15), DECAL CEU certificate (+$5)",
      "$280 session minimum; travel fee $150 metro / $300 out-of-metro",
      "Delivery: at the school, partner venue, or Zoom",
    ],
    primaryKeyword: "professional development preschool teachers GA",
    searchVolume: "~90/mo (KD 25)",
    keywords: [
      "daycare staff training Georgia (~120/mo, KD 30)",
      "preschool teacher training Atlanta (~130/mo, KD 26)",
      "professional learning community early childhood (~200/mo, KD 35)",
      "early childhood program improvement (~150/mo, KD 38)",
    ],
    seo: "Title: 'Group DECAL Trainings for Preschools | Armstrong Educational Services'. JSON-LD: Course with Offer (priceSpecification, group pricing in description) + CourseInstance (Onsite & Online). Link to calculator with prefilled format.",
    a11y: "Pricing tiers in an accessible <table> with row/column headers. Add-on toggles are native checkboxes/radios with associated <label> and aria-describedby for the per-head price impact.",
  },
  {
    path: "/programs/self-paced-courses",
    title: "Self-paced courses (online)",
    parent: "/programs",
    purpose:
      "The online format of Camille's programs — the same trainings, self-paced. This IS the 'Online courses' nav-CTA target: a contact-free path for individual educators to buy DECAL CEU hours online (passive revenue).",
    content: [
      "Catalog of 10 recorded 1-hour CEU courses (Reggio, schemas, loose parts, infant spaces, MI, constructivism, reflective practice, documentation, social learning, becoming a DECAL trainer)",
      "Pricing: $19 single / $32 two-hour / $59 4-pack / $129 10-pack (annual DECAL) / $149 All-Access",
      "Free preview lesson per course (email capture)",
      "DECAL CEU certificate included; counts toward GA 10-hour requirement",
    ],
    primaryKeyword: "DECAL approved online training",
    searchVolume: "~250/mo (est.)",
    keywords: [
      "10 hour child care training Georgia (~500/mo, KD 32)",
      "childcare training Georgia (~600/mo, KD 38)",
      "preschool teacher CEU online (~300/mo, est.)",
      "loose parts course DECAL (long-tail, <50/mo)",
    ],
    seo: "Title: 'Self-Paced DECAL CEU Courses for Early Childhood Educators | Armstrong'. JSON-LD: ItemList of Course, each with Offer (price, priceCurrency) + educationalCredentialAwarded 'DECAL CEU clock hours'. Self-enroll, no contact form. GEO: data table of price-per-CEU-hour.",
    a11y: "Course cards are a semantic list; price + CEU credit announced in text. Free-preview video needs captions track (1.2.2) and a transcript. Buy buttons keyboard-operable, 44px.",
  },
  {
    path: "/programs/annual-packs",
    title: "Annual training packs",
    parent: "/programs",
    purpose:
      "Bundle a full year of DECAL hours for individual educators at a discount to lock in the annual-renewal buyer.",
    content: [
      "10-course bundle = full DECAL year ($129, ~$12.90/hr, −32%)",
      "Armstrong All-Access annual subscription ($149/yr, unlimited)",
      "DECAL-season pre-purchase offer (May–June, 20% off the 10-pack)",
      "Comparison vs. generic CCEI ($99) — brand/quality premium justified",
    ],
    primaryKeyword: "annual DECAL training pack Georgia",
    searchVolume: "~80/mo (est.)",
    keywords: [
      "10 hour child care training Georgia (~500/mo, KD 32)",
      "DECAL training calendar Georgia (est.)",
      "annual child care training hours Georgia (est.)",
    ],
    seo: "Title: 'Annual DECAL Training Packs — Full Year of CEU Hours | Armstrong'. JSON-LD: Product/Offer bundle (or Course aggregate) with price + priceValidUntil for seasonal promos. FAQPage on what's included and renewal timing.",
    a11y: "Bundle comparison as accessible table; discount badges pair color with text ('−32%'). Subscription terms in plain language (Understandable). No timer-only urgency without a control.",
  },
  {
    path: "/programs/school-licenses",
    title: "School licenses",
    parent: "/programs",
    purpose:
      "Land recurring B2B revenue by selling whole-staff annual licenses with a director dashboard.",
    content: [
      "Center license tiers: 10–25 staff ($899/yr ~$45/teacher), 26–50 staff ($1,499/yr ~$30/teacher), 51+ custom",
      "Optional in-person 1–2h add-on tier ($999 / $1,699)",
      "Director dashboard, mixed in-person + online hours",
      "'Bring your center' bonus (director earns coaching hours)",
      "CTA: request a custom quote / book strategy call",
    ],
    primaryKeyword: "ECE consultant for directors",
    searchVolume: "~50/mo (KD 20)",
    keywords: [
      "daycare staff training Georgia (~120/mo, KD 30)",
      "professional development budget child care center (~50/mo, KD 18)",
      "early childhood coaching services (~900/mo, KD 45)",
      "professional learning community early childhood (~200/mo, KD 35)",
    ],
    seo: "Title: 'Whole-Staff DECAL Training — School Licenses | Armstrong Educational'. JSON-LD: Service/Offer with priceSpecification per tier + Organization (areaServed). B2B FAQPage (net-30, dashboard, mix of formats). Internal link to /for-directors.",
    a11y: "Tier table with proper headers; per-teacher math stated in text, not inferred from layout. 'Request a quote' form has labeled fields, redundant-entry avoidance (3.3.7), and accessible error handling.",
  },

  // ────────────────────────────────────────────── ABOUT CAMILLE (nav)
  {
    path: "/about",
    title: "About Camille",
    parent: "/",
    purpose:
      "Build E-E-A-T and entity authority around Anna Camille Hampton so both buyers and AI engines trust and cite her.",
    content: [
      "Full 250-word bio + Camille's personal voice ('play is research', 'observation is love')",
      "Credential stack: DECAL approval, M.A. Ed Psych (CU Denver), B.A. Psychology (MSU Denver), Boulder Journey School (Reggio)",
      "Methodology stack: Reggio Emilia, constructivism (Piaget), social constructivism (Vygotsky), schema theory (Athey), MI (Gardner), loose parts (Nicholson), emergent curriculum, documentation, reflective practice",
      "30-year career arc: teacher → director → coach → consultant",
      "Boulder-to-Atlanta positioning; Turning Sun Schools alignment",
      "Photo + consistent entity definition repeated for GEO",
    ],
    primaryKeyword: "Anna Camille Hampton",
    searchVolume: "branded, <10/mo",
    keywords: [
      "Camille Hampton early childhood (branded, <10/mo)",
      "early childhood consultant Atlanta (~150/mo, KD 28)",
      "Reggio Emilia consultant Atlanta (~30/mo, KD 12)",
      "Boulder Journey School alumni consultant (branded, <10/mo)",
    ],
    seo: "Title: 'About Anna Camille Hampton — DECAL Trainer & ECE Consultant | Armstrong'. JSON-LD: Person (alumniOf, hasCredential EducationalOccupationalCredential, knowsAbout, sameAs LinkedIn + GaPDS). Visible author bio + update date for E-E-A-T. Keep the entity sentence verbatim with hero/footer/Person schema.",
    a11y: "Portrait has descriptive alt ('Anna Camille Hampton, early childhood consultant'). Reading order matches visual order; bio uses real headings, not bold paragraphs. lang='en' on document; any non-English term wrapped with lang attr.",
  },

  // ─────────────────────────────────────────────────── REVIEWS (nav)
  {
    path: "/reviews",
    title: "Reviews",
    parent: "/",
    purpose:
      "Surface participant testimonials AND in-depth success stories (case studies) as Review-schema social proof to remove the slow B2B buyer's risk.",
    content: [
      "Real participant quotes (with permission, name/role/center where given)",
      "Success stories — 3 case studies (context → challenge → Camille's approach → result/metric), shown via the SuccessStories section",
      "AggregateRating summary (honest count, 5.0 from documented surveys)",
      "How Camille responds to constructive feedback (mic, pacing, venue checklist) — trust signal",
      "Link to Google Business Profile reviews",
    ],
    primaryKeyword: "early childhood consultant Atlanta reviews",
    searchVolume: "~40/mo (est.)",
    keywords: [
      "DECAL trainer reviews Atlanta (est.)",
      "Camille Hampton review (branded, <10/mo)",
      "preschool training testimonials Georgia (est.)",
    ],
    seo: "Title: 'Reviews — What Educators Say About Camille | Armstrong Educational'. JSON-LD: Review[] + AggregateRating on the ProfessionalService @id; reviewCount must match visible reviews and use real authors where possible (Google policy). GEO: quotation addition boosts AI citation.",
    a11y: "Each testimonial is a <blockquote> with <cite> for attribution. Star ratings exposed as text ('5 out of 5'), not icon-only. Carousel (if used) has pause control and is keyboard-navigable with no traps.",
  },

  // ───────────────────────────────────── COMPANY: SPEAKING + CONTACT (footer)
  {
    path: "/speaking",
    title: "Speaking",
    parent: "/",
    purpose:
      "Turn each past/future conference appearance into a permanent SEO + backlink asset and book keynote engagements.",
    content: [
      "Conference history: Jean Piaget Society Symposium, GAEYC annual, Child & Family Development Conference",
      "Per-talk: title · event · year · summary · slides (PDF) · video",
      "Topics available for keynotes/workshops",
      "Speaker booking CTA",
    ],
    primaryKeyword: "early childhood keynote speaker Atlanta",
    searchVolume: "~70/mo (est.)",
    keywords: [
      "early childhood conference speaker Georgia (est.)",
      "Reggio Emilia speaker (est.)",
      "Jean Piaget Society speaker (long-tail, <20/mo)",
    ],
    seo: "Title: 'Speaking & Keynotes — Anna Camille Hampton | Armstrong Educational'. JSON-LD: Person + Event (for past/upcoming talks) + CreativeWork for slide decks. Host slide PDFs (Perplexity prioritizes PDFs for citation).",
    a11y: "Linked PDFs flagged with format + (file size) in link text. Embedded talk videos need captions/transcripts. Talk list as semantic list with descriptive links (no bare 'video'/'slides').",
  },
  {
    path: "/contact",
    title: "Contact Camille",
    parent: "/",
    purpose:
      "Capture leads not ready to self-quote via a short form + discovery-call booking.",
    content: [
      "Short contact form (name + email + topic, <30s)",
      "Free 30-min discovery-call booking (Calendly/Acuity)",
      "Service area + availability (M–F ET; metro Atlanta + Carolinas in person, online nationally)",
      "Email, LinkedIn (/in/acamillehampton), GaPDS trainer registry link",
    ],
    primaryKeyword: "contact early childhood consultant Atlanta",
    searchVolume: "~30/mo (est.)",
    keywords: [
      "book DECAL training Atlanta (est.)",
      "early childhood consultant Atlanta (~150/mo, KD 28)",
      "discovery call early childhood coaching (est.)",
    ],
    seo: "Title: 'Contact Camille — Book a Discovery Call | Armstrong Educational'. JSON-LD: ContactPage + reference to ProfessionalService (telephone, email, areaServed). Keep NAP identical to GBP and footer for local SEO.",
    a11y: "Critical form a11y: every input has a programmatic <label>; required fields marked in text + aria-required; errors via role='alert' with focus moved to first error (3.3.1/3.3.3); booking widget keyboard-reachable. Help block in consistent location across pages (3.2.6).",
  },

  // ──────────────────────────── PRICING (calculator)
  // NOTE: "Online courses" is NOT a separate page — online training is just the
  // online format of the same programs, so it lives at /programs/self-paced-courses.
  {
    path: "/pricing",
    title: "Pricing",
    parent: "/",
    purpose:
      "Let a director get a per-head + total quote in ~60 seconds — via an interactive calculator OR a guided quiz (user's choice) — then save it (if logged in) or request a date.",
    content: [
      "Two ways to quote — a TOGGLE lets the user pick: ① Calculator (the live form, 3 layout variants) · ② Quiz (the same questions one-at-a-time, guided/wizard) — both feed the SAME pricing engine and reach the same quote",
      "Inputs (both paths): method (in-person/online/online+in-person) · state (GA/SC/NC) · attendees · in-person & online hours · extras (Q&A, printed certificates)",
      "Live outputs: per-head, total, group savings %, deterministic client-side formula",
      "Save your quote: a logged-in client can save the quote to their account (/app); a guest is prompted to log in (/login) then the quote persists to Supabase",
      "Shareable state via URL params; format-aware CTA (Contact & book / Save quote)",
    ],
    primaryKeyword: "preschool teacher training cost Atlanta",
    searchVolume: "~90/mo (est.)",
    keywords: [
      "preschool training cost Atlanta (est.)",
      "DECAL approved trainer Atlanta (~100/mo, KD 18)",
      "group preschool teacher training quote (est.)",
    ],
    seo: "Title: 'Pricing — Build Your Training & See the Price | Armstrong Educational Services'. JSON-LD: Service + Offer/priceSpecification reflecting the $35 anchor & group tiers. URL-param state = shareable; keep canonical to /pricing (params non-canonical).",
    a11y: "Highest-stakes a11y page: all controls native + labeled; slider has text input alternative and no drag-only interaction (2.5.7); live price uses aria-live='polite'; warning uses role='alert'; focus not obscured by sticky price rail (2.4.11); 44px targets; respects prefers-reduced-motion on count-up animations.",
  },

  // ──────────────────────── BLOG · FAQ
  {
    path: "/blog",
    title: "Blog",
    parent: "/",
    purpose:
      "Topical-authority hub publishing weekly articles across methodology and pain-point clusters, each funneling to a lead magnet or service.",
    content: [
      "Article index (Reggio, schemas, loose parts, MI, constructivism, documentation, reflective practice, director/B2B, local-Atlanta)",
      "Pillar pages: Reggio in the U.S. classroom; Play schemas; Loose parts; Emergent vs themed; Becoming a DECAL trainer",
      "Per-article: author bio + date, Article + FAQ schema, 2–3 internal service links, lead-magnet CTA",
      "Category/tag navigation",
    ],
    primaryKeyword: "Reggio Emilia approach",
    searchVolume: "~12k/mo (KD 62)",
    keywords: [
      "emergent curriculum preschool (~1.5k/mo, KD 45)",
      "Reggio Emilia in the classroom (~2.4k/mo, KD 48)",
      "constructivist teaching examples (~600/mo, KD 42)",
      "preschool teacher burnout (~900/mo, KD 40)",
      "what is constructivism in early childhood (~700/mo, KD 40)",
      "hundred languages of children (~450/mo, KD 35)",
    ],
    seo: "Title pattern per post: '{Topic}: {benefit} | Armstrong Educational'. JSON-LD: Blog/CollectionPage on hub; Article + BreadcrumbList + (where relevant) FAQPage/HowTo per post; visible author = Person @id. sitemap-news.xml for weekly cadence.",
    a11y: "Article cards as semantic list with descriptive links (post title, not 'read more'). Each article: single H1, logical heading outline, sufficient text contrast on cream cards (verify 4.5:1). Pagination keyboard-operable.",
  },
  {
    path: "/faq",
    title: "FAQ",
    parent: "/",
    purpose:
      "Answer recurring buyer objections in one place to shorten the B2B decision and earn FAQ-rich-result + AI-citation visibility.",
    content: [
      "How many DECAL hours per year? (10)",
      "Is Camille DECAL-approved? (yes, BFTS + M.A. + 30 yrs)",
      "Online vs in-person — which counts for DECAL?",
      "How does group pricing work / why isn't 3h = 3× 1h?",
      "Travel fee, $280 minimum, net-30 invoicing for schools",
      "Service area",
    ],
    primaryKeyword: "DECAL training Georgia FAQ",
    searchVolume: "~40/mo (est.)",
    keywords: [
      "how many training hours do I need Georgia child care (~150/mo, KD 20)",
      "does online training count for DECAL Georgia (est.)",
      "preschool training cost Georgia (est.)",
    ],
    seo: "Title: 'Frequently Asked Questions | Armstrong Educational Services'. JSON-LD: FAQPage (mirrors visible accordion 1:1). Answer-first, fact-dense answers = top GEO tactic (+~40% AI visibility). Also embed key FAQs on Home & service pages.",
    a11y: "Accordion uses button triggers with aria-expanded + aria-controls; panels keyboard-reachable; questions are headings so screen-reader users can jump between them. No content hidden from AT when collapsed beyond the standard pattern.",
  },

  // ════════════════════════════ AUTHENTICATED APP (Supabase) — noindex ════════
  {
    path: "/login",
    title: "Log in",
    parent: "/",
    area: "auth",
    index: false,
    purpose:
      "Auth bridge reached from the navbar 'Log in' button: sign in (Google · Apple · Microsoft · email+password), then choose where to go.",
    content: [
      "Sign-in providers: Google, Apple, Microsoft (OAuth) + email & password — Supabase Auth",
      "Sign up / log in / magic link / reset password",
      "After auth → two-path chooser: ① 'My quotes & account at Armstrong Education' (→ /app)  ② 'Online trainings platform' (→ self-paced courses / ProSolutions)",
      "Role-aware: owner (Camille) is routed to /admin",
    ],
    primaryKeyword: "—",
    searchVolume: "n/a (authenticated)",
    keywords: [],
    seo: "NOINDEX (noindex,nofollow). No schema. Not in sitemap.xml. Supabase Auth UI; OAuth redirect URLs allow-listed; CSRF/secure cookies.",
    a11y: "All provider buttons labelled with the provider name (not icon-only); email/password form has labels, aria-describedby errors, role='alert'; visible focus; the two-path chooser is a labelled list of links/buttons, keyboard-navigable.",
  },
  {
    path: "/app",
    title: "Client area — My quotes & bookings",
    parent: "/login",
    area: "app",
    index: false,
    purpose:
      "A signed-in client's dashboard: see the prices Camille has set for each of their bookings, accept or decline quotes, and track status.",
    content: [
      "Quotes list: each booking with Camille's set price (per-head + total), status (Pending → Quoted → Accepted → Scheduled → Paid)",
      "Accept / decline a quote; request changes",
      "Upcoming & past trainings; invoices / receipts",
      "Reads only the signed-in client's rows (Supabase Row-Level Security)",
    ],
    primaryKeyword: "—",
    searchVolume: "n/a (authenticated)",
    keywords: [],
    seo: "NOINDEX. Behind auth. No schema/sitemap.",
    a11y: "Dashboard tables have headers + scope; status as text + color; Accept/Decline are real buttons with confirmation; live updates announced via aria-live.",
  },
  {
    path: "/app/account",
    title: "Client account & profile",
    parent: "/app",
    area: "app",
    index: false,
    purpose: "Manage the client's profile, organisation/center details, linked sign-in providers and notifications.",
    content: ["Profile + center/org details (used to pre-fill quotes)", "Linked providers (Google/Apple/Microsoft/email)", "Notification & invoice preferences", "Sign out / delete account"],
    primaryKeyword: "—",
    searchVolume: "n/a (authenticated)",
    keywords: [],
    seo: "NOINDEX. Behind auth.",
    a11y: "Standard form a11y: labels, aria-required, inline errors with focus management, redundant-entry avoidance (3.3.7).",
  },
  {
    path: "/admin",
    title: "Owner (Camille) — dashboard",
    parent: "/login",
    area: "admin",
    index: false,
    purpose:
      "Camille's owner console: review incoming booking requests, set a price per client/booking, and accept — the data each client then sees in /app.",
    content: [
      "Bookings pipeline (Requested → Quoted → Accepted → Scheduled → Paid)",
      "Set/edit price per booking (per-head + total), notes, dates; send quote to the client",
      "Accept / confirm a booking; mark paid",
      "Clients directory; quote templates from the pricing calculator",
      "Owner-only access (Supabase role = owner; RLS bypass via policy)",
    ],
    primaryKeyword: "—",
    searchVolume: "n/a (authenticated)",
    keywords: [],
    seo: "NOINDEX. Owner-only, behind auth + role check.",
    a11y: "Data tables with headers; price inputs labelled with currency + per-head impact; destructive/confirm actions guarded; keyboard-operable throughout.",
  },
  {
    path: "/admin/bookings/:id",
    title: "Owner — booking & pricing",
    parent: "/admin",
    area: "admin",
    index: false,
    purpose: "Detail view where Camille builds the quote for one booking (using the pricing model) and sends/accepts it.",
    content: ["Booking details + client + attendees/format/hours", "Pricing builder (reuses the calculator's group/decay model) → per-head + total", "Send quote · accept · schedule · invoice", "Audit trail of status changes"],
    primaryKeyword: "—",
    searchVolume: "n/a (authenticated)",
    keywords: [],
    seo: "NOINDEX. Owner-only.",
    a11y: "Pricing builder mirrors the public calculator's a11y (non-drag slider alt, aria-live total); status changes announced.",
  },
];

export const seoNotes = {
  brand: {
    name: "Armstrong Educational Services",
    person: "Anna Camille Hampton (Camille)",
    entityDefinition:
      "Anna Camille Hampton (Camille) — Georgia DECAL-approved trainer, M.A. Educational Psychology (CU Denver), 30+ years, Reggio Emilia practitioner (Boulder Journey School), Atlanta, GA. Repeat this exact entity sentence in hero, About, footer, Person schema, and LinkedIn so engines resolve one consistent entity.",
    market:
      "Metro Atlanta (Fulton, DeKalb, Cobb, Gwinnett + Decatur, Roswell, Sandy Springs, Marietta, Alpharetta) and the Carolinas in person; live-online and self-paced nationally. NAP must be identical across site, GBP, GaPDS, GAEYC/NAREA/NAEYC directories, and LinkedIn.",
  },

  titlePattern:
    "'{Primary keyword / page} | Armstrong Educational' — primary keyword first, brand last, ≤60 chars. Home leads with 'DECAL Approved Trainer Atlanta'. Sentence case in on-page H1s (brand voice), Title-ish only in <title> tags.",

  metaDescription:
    "150–160 chars, includes primary keyword + a credential signal + a verb CTA (book / enroll / download). Example home: 'Anna Camille Hampton — Georgia DECAL-approved trainer & early childhood consultant in Atlanta. 30+ years, Reggio-grounded. Book a free discovery call.'",

  headings:
    "Exactly one H1 per page (keyword-aligned, sentence case). Logical H2→H3 hierarchy; each FAQ question rendered as an H3 so it doubles as SEO structure and screen-reader jump target.",

  schemaTypes: {
    sitewide: [
      "ProfessionalService + EducationalOrganization (Home + global footer; @id '#business')",
      "Person (Camille; @id '#camille', linked via founder/provider/instructor)",
      "BreadcrumbList (all non-home pages)",
    ],
    perPage: {
      home: "ProfessionalService + Person + FAQPage + Review/AggregateRating",
      certification: "FAQPage + Course references",
      programsAndChildren: "Course / Service + Offer (priceSpecification) + CourseInstance (Onsite/Online) + ItemList on hubs",
      courses: "ItemList of Course, each with Offer + educationalCredentialAwarded 'DECAL CEU clock hours'",
      about: "Person (alumniOf, hasCredential EducationalOccupationalCredential, knowsAbout, sameAs)",
      reviews: "Review[] + AggregateRating (must match visible reviews; real authors per Google policy)",
      speaking: "Person + Event + CreativeWork (slide decks)",
      contact: "ContactPage + ProfessionalService reference",
      blog: "Article + FAQPage + Blog/CollectionPage (hub)",
      faq: "FAQPage (1:1 with visible accordion)",
      book: "Service + Offer reflecting $35 anchor and group tiers",
      events: "Event when a live training is scheduled",
    },
    note: "Use a single linked @graph (ProfessionalService '#business' + Person '#camille') so engines build one consistent knowledge graph. Validate with Google Rich Results Test + Schema.org validator. Review markup must correspond to reviews visible on the same page.",
  },

  geo: {
    summary:
      "AI engines cite sources, not rank pages. Niche 'early childhood education Georgia' is unsaturated — first-mover citation advantage. Princeton GEO methods most relevant here: Cite Sources, Statistics Addition, Quotation Addition, Authoritative Tone, Easy-to-understand. Avoid keyword stuffing (−10%).",
    tactics: [
      "Answer-first: open every section/FAQ with the direct answer in one sentence; add a 60–100 word TL;DR to pillar pages (LLMs lift verbatim).",
      "Fact density: numbers and dates everywhere — '30+ years', '10 DECAL clock hours/year', 'ages 2–6', '$35/teacher'.",
      "Named entities: Boulder Journey School, CU Denver, DECAL/Bright from the Start, GAEYC, NAREA — raise citation confidence.",
      "FAQPage JSON-LD on every service + pillar page (highest-impact GEO schema).",
      "Bing indexing is a ChatGPT-search prerequisite — verify in Bing Webmaster Tools, not only Google Search Console.",
      "Claude search reads Brave; ensure Brave indexing. Perplexity prioritizes PDFs — host slide decks and lead-magnet PDFs.",
      "Root /llms.txt summarizing business, services, location, specialties, credentials, key pages.",
      "Off-site entity signals: consistent NAP + substantive Reddit (r/ECEProfessionals, r/Atlanta) / Quora answers under her real name; Wikidata Person entry.",
    ],
  },

  robotsAndCrawl:
    "Allow Googlebot, Bingbot, PerplexityBot, ChatGPT-User, GPTBot, ClaudeBot, anthropic-ai in robots.txt. Do not block /blog, /programs, /pricing. Force HTTPS; 301 www↔apex consistently.",

  sitemapXml:
    "Dynamic sitemap.xml at root listing all pages above; add sitemap-news.xml for the weekly blog cadence. Submit to both Google Search Console and Bing Webmaster Tools. Self-referencing canonical on every page; /pricing URL params are non-canonical (canonical to /pricing). 'Online courses' is not its own URL — it resolves to /programs/self-paced-courses.",

  technical:
    "Core Web Vitals targets: LCP <1.8s, INP <100ms, CLS <0.05, TTFB <400ms. Mobile-first (80% of ECE searches are mobile): 16px min type, 44×44 tap targets, short forms. Semantic HTML5 landmarks (header/nav/main/article/aside/footer); kebab-case URLs, no extensions/params; alt text on all images; internal linking — each article links 2–3 services + 2 related articles.",

  accessibility:
    "Target WCAG 2.2 AA sitewide. Sitewide essentials: skip link to #main; one H1/logical heading order per page; native interactive elements with visible :focus-visible (≥3:1); 24px (pref. 44px) targets; color never the sole signal; prefers-reduced-motion honored; lang='en'; consistent nav + help placement (3.2.3/3.2.6). Highest-risk surfaces: the /pricing calculator (slider needs non-drag alternative 2.5.7, live price via aria-live, warning via role='alert', focus not obscured by sticky price rail 2.4.11) and the /contact + license quote forms (labels, aria-required, role='alert' errors with focus management, redundant-entry avoidance 3.3.7). Media (course previews, talk videos) need captions + transcripts. Verify cream/forest-green text combos meet 4.5:1.",

  hierarchyNote:
    "Reconciles the SEO Master Plan §5.1 architecture with the built nav/footer. Top-level nav: Certification, Programs, About Camille, Reviews. CTAs: Log in (→ /login, the filled green CTA — the two-path bridge to online courses OR my account & quotes), Contact Camille. (The old 'Online courses' nav CTA is gone — self-paced courses are reached from inside /login and from Programs.) Footer columns — Programs: Group trainings, Self-paced courses, Annual packs, School licenses · Company: About Camille, Reviews, Speaking, Contact · More: Blog, FAQ. Programs children live under /programs/*; Blog at /blog & FAQ at /faq are top-level for shareable URLs. (Resources section removed; courses merged into Programs as the online format.)",

  // ── Navigation & SEO priority ──────────────────────────────────────────────
  navbar: {
    links: ["Programs", "Certification", "About Camille", "Reviews"],
    ctas: ["Log in (→ /login)", "Contact Camille"],
    note: "Primary navbar = the 4 main SEO category links + the CTAs. 'Log in' is the filled green CTA → /login, the authenticated app bridge (choose: online trainings platform OR my account & calculated quotes). Self-paced courses are no longer a top-level nav CTA — reachable from /login and from Programs. Keep nav to ≤5 links for clarity + crawl focus.",
  },
  seoCategories:
    "Main SEO categories (top of the IA, in the navbar / strongest commercial + authority intent, all indexable): Programs (commercial hub — 'preschool teacher training Atlanta'), Certification (DECAL intent), Pricing (transactional), Reviews (trust/Review schema), About Camille (E-E-A-T/entity), Blog (topical authority — 'Reggio Emilia approach' 12k/mo). Everything else (Speaking, Contact, FAQ, Programs children) is secondary/support. The whole authenticated app (/login, /app*, /admin*) is NOINDEX and never in the nav for SEO — only the 'Log in' CTA.",

  // ── Accounts, roles & data (Supabase) — for the FINAL build ────────────────
  accounts:
    "Backend = Supabase (Postgres + Auth + Row-Level Security). AUTH providers: Google, Apple, Microsoft (OAuth) + email & password. ROLES: (1) client — a school director/owner/educator; (2) owner — Camille. FLOW: navbar 'Log in' → /login (sign in) → a two-path chooser: ① 'My quotes & account at Armstrong Education' → /app (client dashboard) · ② 'Online trainings platform' → /programs/self-paced-courses (ProSolutions / self-enroll CEUs). QUOTE EXPERIENCE: /pricing offers TWO interchangeable paths — an interactive Calculator OR a guided Quiz (user picks via a toggle) — both built on the SAME `pricing.ts` engine + `usePricing` state, reaching the same quote (per-head + total). SAVE QUOTE: a logged-in client can save a quote to their account (Supabase `quotes` row → visible in /app); a guest who hits 'Save' is sent to /login and the quote is persisted on return. PER-CLIENT PRICING: Camille (in /admin) reviews each booking request, sets a price per booking (per-head + total, using the pricing-calculator model) and sends/accepts the quote; the client sees ONLY their own bookings & prices in /app and can accept/decline. DATA MODEL (initial): profiles(id, role, org/center), bookings(id, client_id, format, hours, attendees, status), quotes(booking_id, per_head, total, status), invoices. RLS: clients read/write only rows where client_id = auth.uid(); owner role bypasses via policy. The app pages are noindex (X-Robots-Tag + robots.txt), separate from the public marketing/SEO site.",
};
