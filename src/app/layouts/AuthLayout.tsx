import { Outlet } from "react-router-dom";
import "./layouts.css";

/** Centered card shell for /login. Auth providers are inert for now. */
export default function AuthLayout() {
  return (
    <>
      <div className="preview-banner">Preview mode — sign-in isn't wired up yet; buttons just navigate.</div>
      <div className="auth">
        <div className="auth__card">
          <Outlet />
        </div>
      </div>
    </>
  );
}
