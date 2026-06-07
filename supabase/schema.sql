-- ===========================================================================
-- Armstrong Educational Services — database schema + RLS + seed
-- Run in the Supabase SQL editor (or `supabase db push`).
-- Model: a custom CMS where the OWNER (Camille) edits everything from /admin,
-- the public marketing site READS catalog + pricing + copy, and visitors
-- SUBMIT quotes + contacts. Clients see only their own quotes/bookings.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------
-- updated_at auto-touch
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- ===========================================================================
-- profiles — one row per auth user, carries the role
-- ===========================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  role        text not null default 'client' check (role in ('client','owner')),
  full_name   text,
  org         text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- owner check (security definer so RLS policies can call it without recursion)
create or replace function public.is_owner()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'owner');
$$;

-- auto-create a profile when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'))
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

-- ===========================================================================
-- courses — the catalog shown in Programs / Workshops
-- ===========================================================================
create table if not exists public.courses (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  kind           text not null default 'program' check (kind in ('program','workshop')),
  category       text,                       -- group | individual | self-paced | annual-pack | school-license | ...
  title          text not null,
  subtitle       text,
  description    text,
  format         text check (format in ('in-person','online','online+in-person')),
  duration_label text,                       -- "2 hours"
  duration_hours numeric,
  decal_hours    numeric,
  bullets        text[] default '{}',
  image_url      text,
  featured       boolean not null default false,  -- the highlighted Annual packs
  active         boolean not null default true,
  sort_order     int not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create trigger courses_touch before update on public.courses
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- pricing_config — singleton: the calculator engine parameters Camille edits
-- ===========================================================================
create table if not exists public.pricing_config (
  id                int primary key default 1 check (id = 1),
  base_in_person    numeric not null default 35,
  base_online       numeric not null default 25,
  hours_multipliers jsonb   not null default '[]',   -- [{ "hours":1, "mult":1.0 }, ...]
  group_tiers       jsonb   not null default '[]',   -- [{ "min":10, "pct":5 }, ...]
  state_surcharges  jsonb   not null default '{}',   -- { "GA":0, "SC":0.05, "NC":0.05 }
  addons            jsonb   not null default '{}',   -- { "qa":150, "certificate":8 }
  min_total         numeric not null default 280,
  updated_at        timestamptz not null default now()
);
create trigger pricing_config_touch before update on public.pricing_config
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- site_content — editable marketing copy, keyed per section (JSON blobs)
-- ===========================================================================
create table if not exists public.site_content (
  key        text primary key,             -- 'hero' | 'methods' | 'programs_header' | ...
  value      jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- quotes — incoming estimates (from calculator or quiz) + the lead's contact
-- ===========================================================================
create table if not exists public.quotes (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid references auth.users on delete set null,  -- null for guests
  source              text not null default 'calculator' check (source in ('calculator','quiz')),
  -- contact
  contact_name        text,
  contact_email       text,
  contact_org         text,
  contact_phone       text,
  -- inputs
  method              text,
  state               text,
  attendees           int,
  in_person_hours     numeric,
  online_hours        numeric,
  qa                  boolean default false,
  certificate         boolean default false,
  input               jsonb,                 -- full PricingState snapshot
  -- computed snapshot
  per_head            numeric,
  total               numeric,
  -- owner workflow
  status              text not null default 'new'
                      check (status in ('new','reviewed','sent','accepted','declined')),
  owner_price_per_head numeric,              -- optional manual override
  owner_total          numeric,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create trigger quotes_touch before update on public.quotes
  for each row execute function public.touch_updated_at();
create index if not exists quotes_status_idx on public.quotes (status, created_at desc);
create index if not exists quotes_client_idx on public.quotes (client_id);

-- ===========================================================================
-- contacts — general contact-form submissions
-- ===========================================================================
create table if not exists public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  org        text,
  phone      text,
  message    text,
  status     text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger contacts_touch before update on public.contacts
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- bookings — a confirmed engagement created from a quote (Google Calendar)
-- ===========================================================================
create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  quote_id          uuid references public.quotes on delete set null,
  client_id         uuid references auth.users on delete set null,
  starts_at         timestamptz,
  ends_at           timestamptz,
  calendar_event_id text,
  meet_url          text,
  status            text not null default 'pending'
                    check (status in ('pending','confirmed','completed','cancelled')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create trigger bookings_touch before update on public.bookings
  for each row execute function public.touch_updated_at();

-- ===========================================================================
-- Row Level Security
-- ===========================================================================
alter table public.profiles       enable row level security;
alter table public.courses        enable row level security;
alter table public.pricing_config enable row level security;
alter table public.site_content   enable row level security;
alter table public.quotes         enable row level security;
alter table public.contacts       enable row level security;
alter table public.bookings       enable row level security;

-- profiles: read own or owner; update own (role change blocked at app level)
create policy profiles_select on public.profiles for select
  using (id = auth.uid() or public.is_owner());
create policy profiles_update_self on public.profiles for update
  using (id = auth.uid() or public.is_owner());

-- courses: public reads active rows; owner reads/writes everything
create policy courses_read on public.courses for select
  using (active or public.is_owner());
create policy courses_write on public.courses for all
  using (public.is_owner()) with check (public.is_owner());

-- pricing_config: public read; owner write
create policy pricing_read on public.pricing_config for select using (true);
create policy pricing_write on public.pricing_config for all
  using (public.is_owner()) with check (public.is_owner());

-- site_content: public read; owner write
create policy content_read on public.site_content for select using (true);
create policy content_write on public.site_content for all
  using (public.is_owner()) with check (public.is_owner());

-- quotes: anyone may submit; owner sees all; client sees own; owner updates
create policy quotes_insert on public.quotes for insert with check (true);
create policy quotes_select on public.quotes for select
  using (public.is_owner() or client_id = auth.uid());
create policy quotes_update on public.quotes for update
  using (public.is_owner()) with check (public.is_owner());

-- contacts: anyone may submit; owner manages
create policy contacts_insert on public.contacts for insert with check (true);
create policy contacts_manage on public.contacts for all
  using (public.is_owner()) with check (public.is_owner());

-- bookings: owner all; client reads own
create policy bookings_select on public.bookings for select
  using (public.is_owner() or client_id = auth.uid());
create policy bookings_write on public.bookings for all
  using (public.is_owner()) with check (public.is_owner());

-- ===========================================================================
-- Seed — mirrors the current hard-coded content so the site works immediately
-- ===========================================================================
insert into public.pricing_config (id, base_in_person, base_online, hours_multipliers, group_tiers, state_surcharges, addons, min_total)
values (
  1, 35, 25,
  '[{"hours":1,"mult":1.0},{"hours":2,"mult":0.95},{"hours":4,"mult":0.88},{"hours":6,"mult":0.82},{"hours":8,"mult":0.78}]',
  '[{"min":10,"pct":5},{"min":20,"pct":10},{"min":30,"pct":15},{"min":50,"pct":20}]',
  '{"GA":0,"SC":0.05,"NC":0.05}',
  '{"qa":150,"certificate":8}',
  280
) on conflict (id) do nothing;

insert into public.courses (slug, kind, category, title, description, bullets, format, duration_label, featured, sort_order) values
  ('annual-packs','program','annual-pack','Annual packs','A full year of Camille''s trainings for your whole team — specially designed for groups and schools, bundling every educator''s DECAL hours at the lowest per-teacher rate.','{Whole-team access,Lowest per-teacher rate,10+ CEU hours,Certificates,Customisable to your center}','online+in-person',null,true,0),
  ('group-trainings','program','group','Group trainings','Live, DECAL-approved sessions for your whole staff — in person or on Zoom, priced per teacher.','{Small-group ratios,DECAL-aligned curriculum,Progress documentation}','online+in-person',null,false,1),
  ('individual-trainings','program','individual','Individual trainings','One educator, one topic. Flexible live sessions to meet your annual DECAL hours.','{}','online+in-person',null,false,2),
  ('self-paced-courses','program','self-paced','Self-paced courses','Asynchronous, DECAL-approved CEU courses to take anytime, at your own pace.','{}','online',null,false,3),
  ('school-licenses','program','school-license','School licenses','Whole-school access to Camille''s trainings for a year, customised to your center''s goals.','{}','online+in-person',null,false,4)
on conflict (slug) do nothing;

insert into public.courses (slug, kind, title, description, format, duration_label, sort_order) values
  ('schemas-and-play','workshop','Schemas & Play','Read the repeated patterns in children''s play and turn them into provocations that extend learning.','in-person','2 hours',1),
  ('loose-parts','workshop','Loose Parts','Build open-ended environments with everyday materials that invite creativity and problem-solving.','in-person','2 hours',2),
  ('supportive-social-learning','workshop','Supportive Social Learning','Practical strategies for guiding conflict, collaboration and belonging in the early-years room.','in-person','3 hours',3),
  ('rethinking-infant-spaces','workshop','Rethinking Infant Spaces','Design calm, responsive infant environments rooted in respect and close observation.','in-person','1.5 hours',4),
  ('multiple-intelligences','workshop','Multiple Intelligences','Plan for the many ways children are smart — and document growth across every domain.','in-person','2 hours',5),
  ('documentation-that-speaks','workshop','Documentation that Speaks','Make children''s thinking visible with panels and portfolios families and inspectors love.','in-person','2 hours',6),
  ('emergent-curriculum','workshop','Emergent Curriculum','Plan responsively from children''s questions while still meeting your program''s standards.','in-person','2.5 hours',7)
on conflict (slug) do nothing;

insert into public.site_content (key, value) values
  ('hero', '{"eyebrow":"ARMSTRONG EDUCATIONAL SERVICES","title":"Where theory becomes everyday practice","body":"Hi, I''m Camille Hampton — a Georgia DECAL-approved trainer and early-childhood specialist with 30+ years grounded in the Reggio Emilia approach.","primaryCta":{"label":"Book a training","href":"#book"},"secondaryCta":{"label":"Log in","href":"/login"}}'),
  ('methods', '{"eyebrow":"CAMILLE''S PHILOSOPHY","title":"Play is research. Observation is love.","chips":["Reggio Emilia","Play schemas","Loose parts","Documentation","Multiple intelligences"]}'),
  ('programs_header', '{"eyebrow":"WHAT I OFFER","title":"Programs for teachers & schools","subtitle":"Workshops and training to bring theory into everyday classroom practice."}'),
  ('workshops_header', '{"eyebrow":"SIGNATURE WORKSHOPS","title":"Workshops educators love","subtitle":"Short, practical sessions teams can use Monday morning."}')
on conflict (key) do nothing;

-- ===========================================================================
-- After first signup, promote Camille to owner (run once, replace the email):
--   update public.profiles set role = 'owner'
--   where id = (select id from auth.users where email = 'camille@example.com');
-- ===========================================================================
