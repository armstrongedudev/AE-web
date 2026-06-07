/**
 * Mock data shaped exactly like the Supabase tables (see src/lib/database.types.ts
 * and supabase/schema.sql). The UI reads everything through src/lib/content.ts,
 * which today returns this mock data and later swaps to real Supabase queries.
 * Keep these in sync with the schema seed.
 */
import type { Course, PricingConfig, Quote, Contact, Booking, Profile } from "./database.types";

const now = "2026-06-07T00:00:00Z";

export const mockCourses: Course[] = [
  { id: "c0", slug: "annual-packs", kind: "program", category: "annual-pack", title: "Annual packs", subtitle: null, description: "A full year of Camille's trainings for your whole team — specially designed for groups and schools, bundling every educator's DECAL hours at the lowest per-teacher rate.", format: "online+in-person", duration_label: null, duration_hours: null, decal_hours: null, bullets: ["Whole-team access", "Lowest per-teacher rate", "10+ CEU hours", "Certificates", "Customisable to your center"], image_url: null, featured: true, active: true, sort_order: 0, created_at: now, updated_at: now },
  { id: "c1", slug: "group-trainings", kind: "program", category: "group", title: "Group trainings", subtitle: null, description: "Live, DECAL-approved sessions for your whole staff — in person or on Zoom, priced per teacher.", format: "online+in-person", duration_label: null, duration_hours: null, decal_hours: null, bullets: ["Small-group ratios", "DECAL-aligned curriculum", "Progress documentation"], image_url: null, featured: false, active: true, sort_order: 1, created_at: now, updated_at: now },
  { id: "c2", slug: "individual-trainings", kind: "program", category: "individual", title: "Individual trainings", subtitle: null, description: "One educator, one topic. Flexible live sessions to meet your annual DECAL hours.", format: "online+in-person", duration_label: null, duration_hours: null, decal_hours: null, bullets: [], image_url: null, featured: false, active: true, sort_order: 2, created_at: now, updated_at: now },
  { id: "c3", slug: "self-paced-courses", kind: "program", category: "self-paced", title: "Self-paced courses", subtitle: null, description: "Asynchronous, DECAL-approved CEU courses to take anytime, at your own pace.", format: "online", duration_label: null, duration_hours: null, decal_hours: null, bullets: [], image_url: null, featured: false, active: true, sort_order: 3, created_at: now, updated_at: now },
  { id: "c4", slug: "school-licenses", kind: "program", category: "school-license", title: "School licenses", subtitle: null, description: "Whole-school access to Camille's trainings for a year, customised to your center's goals.", format: "online+in-person", duration_label: null, duration_hours: null, decal_hours: null, bullets: [], image_url: null, featured: false, active: true, sort_order: 4, created_at: now, updated_at: now },
  { id: "w1", slug: "schemas-and-play", kind: "workshop", category: null, title: "Schemas & Play", subtitle: null, description: "Read the repeated patterns in children's play and turn them into provocations that extend learning.", format: "in-person", duration_label: "2 hours", duration_hours: 2, decal_hours: 2, bullets: [], image_url: null, featured: false, active: true, sort_order: 1, created_at: now, updated_at: now },
  { id: "w2", slug: "loose-parts", kind: "workshop", category: null, title: "Loose Parts", subtitle: null, description: "Build open-ended environments with everyday materials that invite creativity and problem-solving.", format: "in-person", duration_label: "2 hours", duration_hours: 2, decal_hours: 2, bullets: [], image_url: null, featured: false, active: true, sort_order: 2, created_at: now, updated_at: now },
  { id: "w3", slug: "supportive-social-learning", kind: "workshop", category: null, title: "Supportive Social Learning", subtitle: null, description: "Practical strategies for guiding conflict, collaboration and belonging in the early-years room.", format: "in-person", duration_label: "3 hours", duration_hours: 3, decal_hours: 3, bullets: [], image_url: null, featured: false, active: true, sort_order: 3, created_at: now, updated_at: now },
  { id: "w4", slug: "rethinking-infant-spaces", kind: "workshop", category: null, title: "Rethinking Infant Spaces", subtitle: null, description: "Design calm, responsive infant environments rooted in respect and close observation.", format: "in-person", duration_label: "1.5 hours", duration_hours: 1.5, decal_hours: 1.5, bullets: [], image_url: null, featured: false, active: true, sort_order: 4, created_at: now, updated_at: now },
  { id: "w5", slug: "multiple-intelligences", kind: "workshop", category: null, title: "Multiple Intelligences", subtitle: null, description: "Plan for the many ways children are smart — and document growth across every domain.", format: "in-person", duration_label: "2 hours", duration_hours: 2, decal_hours: 2, bullets: [], image_url: null, featured: false, active: true, sort_order: 5, created_at: now, updated_at: now },
  { id: "w6", slug: "documentation-that-speaks", kind: "workshop", category: null, title: "Documentation that Speaks", subtitle: null, description: "Make children's thinking visible with panels and portfolios families and inspectors love.", format: "in-person", duration_label: "2 hours", duration_hours: 2, decal_hours: 2, bullets: [], image_url: null, featured: false, active: true, sort_order: 6, created_at: now, updated_at: now },
  { id: "w7", slug: "emergent-curriculum", kind: "workshop", category: null, title: "Emergent Curriculum", subtitle: null, description: "Plan responsively from children's questions while still meeting your program's standards.", format: "in-person", duration_label: "2.5 hours", duration_hours: 2.5, decal_hours: 2.5, bullets: [], image_url: null, featured: false, active: true, sort_order: 7, created_at: now, updated_at: now },
];

export const mockPricingConfig: PricingConfig = {
  id: 1,
  base_in_person: 35,
  base_online: 25,
  hours_multipliers: [
    { hours: 1, mult: 1.0 }, { hours: 2, mult: 0.95 }, { hours: 4, mult: 0.88 },
    { hours: 6, mult: 0.82 }, { hours: 8, mult: 0.78 },
  ],
  group_tiers: [
    { min: 10, pct: 5 }, { min: 20, pct: 10 }, { min: 30, pct: 15 }, { min: 50, pct: 20 },
  ],
  state_surcharges: { GA: 0, SC: 0.05, NC: 0.05 },
  addons: { qa: 150, certificate: 8 },
  min_total: 280,
  updated_at: now,
};

export const mockQuotes: Quote[] = [
  { id: "q1", client_id: null, source: "calculator", contact_name: "Maria Thompson", contact_email: "maria@brightstart.example", contact_org: "Bright Start Academy, Decatur", contact_phone: "(404) 555-0142", method: "in-person", state: "GA", attendees: 24, in_person_hours: 3, online_hours: 0, qa: true, certificate: true, input: null, per_head: 41, total: 984, status: "new", owner_price_per_head: null, owner_total: null, notes: null, created_at: "2026-06-05T14:10:00Z", updated_at: "2026-06-05T14:10:00Z" },
  { id: "q2", client_id: null, source: "quiz", contact_name: "Daniel Rivera", contact_email: "drivera@savannahkids.example", contact_org: "Savannah Kids Co-op", contact_phone: "(912) 555-0199", method: "online", state: "SC", attendees: 12, in_person_hours: 0, online_hours: 2, qa: false, certificate: false, input: null, per_head: 28, total: 336, status: "reviewed", owner_price_per_head: null, owner_total: null, notes: "Wants weekend slot.", created_at: "2026-06-04T09:30:00Z", updated_at: "2026-06-04T11:00:00Z" },
  { id: "q3", client_id: null, source: "calculator", contact_name: "Amara Knox", contact_email: "amara@maconlearning.example", contact_org: "Macon Learning Center", contact_phone: "(478) 555-0123", method: "online+in-person", state: "GA", attendees: 40, in_person_hours: 4, online_hours: 4, qa: true, certificate: true, input: null, per_head: 53, total: 2120, status: "sent", owner_price_per_head: 50, owner_total: 2000, notes: "Annual pack candidate.", created_at: "2026-06-02T16:45:00Z", updated_at: "2026-06-03T10:15:00Z" },
];

export const mockContacts: Contact[] = [
  { id: "ct1", name: "Lena Park", email: "lena@littleoaks.example", org: "Little Oaks Preschool", phone: "(404) 555-0177", message: "Interested in an annual pack for 18 teachers — what's included?", status: "new", created_at: "2026-06-06T08:20:00Z", updated_at: "2026-06-06T08:20:00Z" },
  { id: "ct2", name: "Marcus Bell", email: "marcus@firststeps.example", org: "First Steps, Savannah", phone: null, message: "Do you offer infant-room specific training on weekends?", status: "read", created_at: "2026-06-05T13:05:00Z", updated_at: "2026-06-05T15:00:00Z" },
];

export const mockBookings: Booking[] = [
  { id: "b1", quote_id: "q3", client_id: null, starts_at: "2026-07-15T14:00:00Z", ends_at: "2026-07-15T18:00:00Z", calendar_event_id: null, meet_url: null, status: "confirmed", created_at: "2026-06-03T10:20:00Z", updated_at: "2026-06-03T10:20:00Z" },
  { id: "b2", quote_id: "q2", client_id: null, starts_at: "2026-06-28T16:00:00Z", ends_at: "2026-06-28T18:00:00Z", calendar_event_id: null, meet_url: null, status: "pending", created_at: "2026-06-04T11:05:00Z", updated_at: "2026-06-04T11:05:00Z" },
];

export const mockProfile: Profile = {
  id: "u-demo", role: "client", full_name: "Demo Director", org: "Demo Preschool", phone: "(404) 555-0100", created_at: now, updated_at: now,
};
