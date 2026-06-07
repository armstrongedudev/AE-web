/**
 * Hand-written DB types mirroring supabase/schema.sql.
 * Regenerate later with: `supabase gen types typescript --project-id <id>`.
 */

export type Role = "client" | "owner";
export type CourseKind = "program" | "workshop";
export type Format = "in-person" | "online" | "online+in-person";
export type QuoteSource = "calculator" | "quiz";
export type QuoteStatus = "new" | "reviewed" | "sent" | "accepted" | "declined";
export type ContactStatus = "new" | "read" | "replied" | "archived";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Profile {
  id: string;
  role: Role;
  full_name: string | null;
  org: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  slug: string;
  kind: CourseKind;
  category: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  format: Format | null;
  duration_label: string | null;
  duration_hours: number | null;
  decal_hours: number | null;
  bullets: string[];
  image_url: string | null;
  featured: boolean;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface HoursMultiplier { hours: number; mult: number; }
export interface GroupTier { min: number; pct: number; }

export interface PricingConfig {
  id: number;
  base_in_person: number;
  base_online: number;
  hours_multipliers: HoursMultiplier[];
  group_tiers: GroupTier[];
  state_surcharges: Record<string, number>;
  addons: Record<string, number>;
  min_total: number;
  updated_at: string;
}

export interface SiteContent {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface Quote {
  id: string;
  client_id: string | null;
  source: QuoteSource;
  contact_name: string | null;
  contact_email: string | null;
  contact_org: string | null;
  contact_phone: string | null;
  method: string | null;
  state: string | null;
  attendees: number | null;
  in_person_hours: number | null;
  online_hours: number | null;
  qa: boolean | null;
  certificate: boolean | null;
  input: Record<string, unknown> | null;
  per_head: number | null;
  total: number | null;
  status: QuoteStatus;
  owner_price_per_head: number | null;
  owner_total: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: string;
  name: string | null;
  email: string | null;
  org: string | null;
  phone: string | null;
  message: string | null;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  quote_id: string | null;
  client_id: string | null;
  starts_at: string | null;
  ends_at: string | null;
  calendar_event_id: string | null;
  meet_url: string | null;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

type Row<T> = T;
type Insert<T, Optional extends keyof T> = Omit<T, Optional> & Partial<Pick<T, Optional>>;

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Insert<Profile, "role" | "full_name" | "org" | "phone" | "created_at" | "updated_at">; Update: Partial<Profile> };
      courses: { Row: Course; Insert: Insert<Course, "id" | "created_at" | "updated_at" | "bullets" | "featured" | "active" | "sort_order">; Update: Partial<Course> };
      pricing_config: { Row: PricingConfig; Insert: Partial<PricingConfig> & { id: 1 }; Update: Partial<PricingConfig> };
      site_content: { Row: SiteContent; Insert: Insert<SiteContent, "updated_at">; Update: Partial<SiteContent> };
      quotes: { Row: Quote; Insert: Insert<Quote, "id" | "created_at" | "updated_at" | "status" | "client_id">; Update: Partial<Quote> };
      contacts: { Row: Contact; Insert: Insert<Contact, "id" | "created_at" | "updated_at" | "status">; Update: Partial<Contact> };
      bookings: { Row: Booking; Insert: Insert<Booking, "id" | "created_at" | "updated_at" | "status">; Update: Partial<Booking> };
    };
  };
}
