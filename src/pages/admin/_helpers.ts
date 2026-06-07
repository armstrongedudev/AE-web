/** Small presentation helpers shared by the CMS pages. UI-only, no data calls. */
import type { QuoteStatus, ContactStatus, BookingStatus } from "@/lib/database.types";

export function formatUSD(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

/** Maps any of the entity statuses to a .badge--{...} modifier from layouts.css. */
export function badgeClass(status: QuoteStatus | ContactStatus | BookingStatus): string {
  const map: Record<string, string> = {
    // quote
    new: "new",
    reviewed: "reviewed",
    sent: "sent",
    accepted: "confirmed",
    declined: "declined",
    // contact
    read: "read",
    replied: "reviewed",
    archived: "cancelled",
    // booking
    pending: "pending",
    confirmed: "confirmed",
    completed: "sent",
    cancelled: "cancelled",
  };
  return `badge badge--${map[status] ?? "pending"}`;
}

export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
