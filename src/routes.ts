/**
 * Central route map for the Armstrong site. Paths mirror src/docs/sitemap.ts.
 * Marketing pages are public + (eventually) indexable; app/admin/auth are the
 * authenticated zone (noindex). Auth is not wired yet — every route is openly
 * reachable for preview/testing.
 */
export const routes = {
  // marketing
  home: "/",
  certification: "/certification",
  programs: "/programs",
  program: (slug: string) => `/programs/${slug}`,
  about: "/about",
  reviews: "/reviews",
  speaking: "/speaking",
  contact: "/contact",
  pricing: "/pricing",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
  faq: "/faq",
  // auth + app
  login: "/login",
  app: "/app",
  account: "/app/account",
  // admin / CMS
  admin: "/admin",
  adminQuotes: "/admin/quotes",
  adminContacts: "/admin/contacts",
  adminBookings: "/admin/bookings",
  adminBooking: (id: string) => `/admin/bookings/${id}`,
  adminCatalog: "/admin/catalog",
  adminPricing: "/admin/pricing",
  adminContent: "/admin/content",
  // docs
  docs: "/docs",
} as const;

/** Primary navbar links (the 4 main SEO categories) + CTAs — per sitemap seoNotes. */
export const navLinks = [
  { label: "Programs", to: routes.programs },
  { label: "Certification", to: routes.certification },
  { label: "About Camille", to: routes.about },
  { label: "Reviews", to: routes.reviews },
];

export const programChildren = [
  { slug: "group-trainings", title: "Group trainings" },
  { slug: "self-paced-courses", title: "Self-paced courses" },
  { slug: "annual-packs", title: "Annual packs" },
  { slug: "school-licenses", title: "School licenses" },
];
