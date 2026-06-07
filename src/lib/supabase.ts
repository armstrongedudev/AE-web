import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True only when the Supabase env vars are present (lets the UI degrade gracefully). */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — " +
      "auth, the CMS and quote-saving are disabled until you fill .env.local."
  );
}

/**
 * Browser Supabase client (anon key — safe to expose; RLS enforces access).
 * Falls back to a placeholder URL when unconfigured so imports don't crash;
 * guard real calls with `isSupabaseConfigured`.
 */
export const supabase = createClient<Database>(
  url ?? "http://localhost:54321",
  anonKey ?? "public-anon-key",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
