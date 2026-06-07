/**
 * DATA SEAM — the single place the UI reads content/data from.
 *
 * Today every function returns mock data (src/lib/mockData.ts). In the API phase
 * ONLY this file changes: each function becomes a Supabase query via
 * src/lib/supabase.ts (guard with isSupabaseConfigured). Pages/components must
 * import from here — never from mockData.ts directly.
 */
import type { Course, PricingConfig, Quote, Contact, Booking, Profile } from "./database.types";
import {
  mockCourses,
  mockPricingConfig,
  mockQuotes,
  mockContacts,
  mockBookings,
  mockProfile,
} from "./mockData";

// ---- catalog ----
export function getCourses(): Course[] {
  // TODO(api): supabase.from("courses").select().eq("active", true).order("sort_order")
  return mockCourses.filter((c) => c.active).sort((a, b) => a.sort_order - b.sort_order);
}
export function getPrograms(): Course[] {
  return getCourses().filter((c) => c.kind === "program");
}
export function getWorkshops(): Course[] {
  return getCourses().filter((c) => c.kind === "workshop");
}
export function getCourse(slug: string): Course | undefined {
  // TODO(api): supabase.from("courses").select().eq("slug", slug).single()
  return mockCourses.find((c) => c.slug === slug);
}

// ---- pricing config ----
export function getPricingConfig(): PricingConfig {
  // TODO(api): supabase.from("pricing_config").select().eq("id", 1).single()
  return mockPricingConfig;
}

// ---- quotes / contacts / bookings (CMS + client area) ----
export function listQuotes(): Quote[] {
  // TODO(api): supabase.from("quotes").select().order("created_at", { ascending: false })
  return [...mockQuotes].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}
export function listContacts(): Contact[] {
  // TODO(api): supabase.from("contacts").select().order("created_at", { ascending: false })
  return [...mockContacts].sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
}
export function listBookings(): Booking[] {
  // TODO(api): supabase.from("bookings").select().order("starts_at")
  return [...mockBookings];
}
export function getProfile(): Profile {
  // TODO(api): supabase.auth.getUser() + profiles row
  return mockProfile;
}

// ---- writes (no-ops until the API phase) ----
export async function saveQuote(_quote: Partial<Quote>): Promise<{ ok: boolean }> {
  // TODO(api): insert into quotes (+ send Resend email)
  return { ok: true };
}
export async function submitContact(_contact: Partial<Contact>): Promise<{ ok: boolean }> {
  // TODO(api): insert into contacts (+ notify owner)
  return { ok: true };
}
