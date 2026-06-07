import { useEffect } from "react";

/** Sets document.title (and optional meta description) for a page. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} · Armstrong Educational Services`;
    let metaEl: HTMLMetaElement | null = null;
    let prevDesc: string | null = null;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (!metaEl) {
        metaEl = document.createElement("meta");
        metaEl.name = "description";
        document.head.appendChild(metaEl);
      }
      prevDesc = metaEl.getAttribute("content");
      metaEl.setAttribute("content", description);
    }
    return () => {
      document.title = prev;
      if (metaEl && prevDesc !== null) metaEl.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
