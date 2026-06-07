import { NavLink, Outlet, Link } from "react-router-dom";
import { routes } from "../../routes";
import "./layouts.css";

/** Client area shell (My quotes & bookings, Account). Auth not wired → preview. */
export default function AppLayout() {
  const link = ({ isActive }: { isActive: boolean }) => "shell__link" + (isActive ? " is-active" : "");
  return (
    <>
      <div className="preview-banner">Preview mode — sign-in isn't wired up yet, so this area is open for testing.</div>
      <div className="shell">
        <aside className="shell__sidebar">
          <Link to={routes.home} className="shell__brand">
            <img src="/brand/logo-ae.png" alt="" /> Armstrong
          </Link>
          <div className="shell__navlabel">My account</div>
          <NavLink to={routes.app} end className={link}>My quotes &amp; bookings</NavLink>
          <NavLink to={routes.account} className={link}>Account &amp; profile</NavLink>
          <div className="shell__navlabel">Explore</div>
          <NavLink to={routes.pricing} className={link}>Get a new quote</NavLink>
          <NavLink to={routes.program("self-paced-courses")} className={link}>Online courses</NavLink>
        </aside>
        <div className="shell__main">
          <header className="shell__topbar">
            <h1 className="shell__title">My account</h1>
            <Link to={routes.home} className="btn-ghost">Back to site</Link>
          </header>
          <div className="shell__content"><Outlet /></div>
        </div>
      </div>
    </>
  );
}
