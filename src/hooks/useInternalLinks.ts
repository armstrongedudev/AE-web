import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Global click interception so plain `<a href="/path">` links — including the
 * ones rendered by the design-system macros (Navbar, Footer, cards) — navigate
 * client-side via the router, without coupling the component library to
 * react-router. External links, new-tab/modified clicks and in-page #anchors
 * fall through to the browser.
 */
export function useInternalLinks() {
  const navigate = useNavigate();
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || target === "_blank" || anchor.hasAttribute("download")) return;
      // only internal absolute paths; let "#", "http(s)", "mailto:", "tel:" through
      if (!href.startsWith("/") || href.startsWith("//")) return;
      e.preventDefault();
      navigate(href);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
}
