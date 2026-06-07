import { NavLink, Outlet, Link } from "react-router-dom";
import { routes } from "../../routes";
import "./layouts.css";

/** Owner CMS shell (Camille). Auth not wired → preview, open for testing. */
export default function AdminLayout() {
  const link = ({ isActive }: { isActive: boolean }) => "shell__link" + (isActive ? " is-active" : "");
  return (
    <>
      <div className="preview-banner">Preview mode — the CMS isn't connected to the database yet; edits won't persist.</div>
      <div className="shell">
        <aside className="shell__sidebar">
          <Link to={routes.home} className="shell__brand">
            <img src="/brand/logo-ae.png" alt="" /> Armstrong CMS
          </Link>
          <div className="shell__navlabel">Overview</div>
          <NavLink to={routes.admin} end className={link}>Dashboard</NavLink>
          <div className="shell__navlabel">Inbox</div>
          <NavLink to={routes.adminQuotes} className={link}>Quotes</NavLink>
          <NavLink to={routes.adminContacts} className={link}>Contacts</NavLink>
          <NavLink to={routes.adminBookings} className={link}>Bookings</NavLink>
          <div className="shell__navlabel">Manage</div>
          <NavLink to={routes.adminCatalog} className={link}>Course catalog</NavLink>
          <NavLink to={routes.adminPricing} className={link}>Pricing</NavLink>
          <NavLink to={routes.adminContent} className={link}>Site content</NavLink>
        </aside>
        <div className="shell__main">
          <header className="shell__topbar">
            <h1 className="shell__title">Armstrong CMS</h1>
            <Link to={routes.home} className="btn-ghost">View site</Link>
          </header>
          <div className="shell__content"><Outlet /></div>
        </div>
      </div>
    </>
  );
}
