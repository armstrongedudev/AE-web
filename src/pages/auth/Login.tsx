import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogo,
  WindowsLogo,
  AppleLogo,
  Envelope,
  ArrowRight,
  GraduationCap,
  Receipt,
} from "@phosphor-icons/react";
import { Heading, Text } from "@/components/basic";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { routes } from "@/routes";
import "./Login.css";

/**
 * /login — the two-path sign-in bridge (UI shell; auth is NOT wired).
 * Renders the CONTENTS of the centered card provided by AuthLayout.
 * OAuth buttons + the email/password form are inert: on submit we simply
 * navigate to /app. Below the form, the two-path chooser routes the user to
 * either their account (/app) or the self-paced online trainings platform.
 */
export default function Login() {
  useDocumentTitle("Log in");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO(api): supabase.auth.signInWithPassword({ email, password })
    navigate(routes.app);
  }

  function handleOAuth(_provider: "google" | "microsoft" | "apple") {
    // TODO(api): supabase.auth.signInWithOAuth({ provider })
    navigate(routes.app);
  }

  return (
    <div className="login">
      <div className="login__brand">
        <img src="/brand/logo-ae.png" alt="" className="login__mark" />
        <span className="login__wordmark">Armstrong Educational Services</span>
      </div>

      <Heading level={2} className="login__title">
        Welcome back
      </Heading>
      <Text tone="muted" className="login__sub">
        Sign in to manage your quotes and bookings, or jump to the online
        trainings platform.
      </Text>

      {/* OAuth providers — inert for now */}
      <div className="login__oauth" role="group" aria-label="Sign in with a provider">
        <button
          type="button"
          className="btn-ghost login__oauth-btn"
          onClick={() => handleOAuth("google")}
        >
          <GoogleLogo size={20} weight="bold" aria-hidden="true" />
          Continue with Google
        </button>
        <button
          type="button"
          className="btn-ghost login__oauth-btn"
          onClick={() => handleOAuth("microsoft")}
        >
          <WindowsLogo size={20} weight="fill" aria-hidden="true" />
          Continue with Microsoft
        </button>
        <button
          type="button"
          className="btn-ghost login__oauth-btn"
          onClick={() => handleOAuth("apple")}
        >
          <AppleLogo size={20} weight="fill" aria-hidden="true" />
          Continue with Apple
        </button>
      </div>

      <div className="login__divider" role="separator" aria-label="or sign in with email">
        <span>or</span>
      </div>

      {/* Email + password — inert; submit just navigates to /app */}
      <form className="login__form" onSubmit={handleSignIn} noValidate>
        <div className="field">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourcenter.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login__formrow">
          <a href={routes.login} className="login__link">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="btn-primary" style={{ width: "100%" }}>
          <Envelope size={18} aria-hidden="true" />
          Sign in
        </button>
      </form>

      <Text size="sm" tone="muted" className="login__signup">
        New here? <a href={routes.login} className="login__link">Create an account</a>
      </Text>

      {/* Two-path chooser */}
      <div className="login__paths">
        <div className="login__paths-label" id="login-paths-label">
          Where would you like to go?
        </div>
        <ul className="login__paths-list" aria-labelledby="login-paths-label">
          <li>
            <a href={routes.app} className="login__path">
              <span className="login__path-icon" aria-hidden="true">
                <Receipt size={22} />
              </span>
              <span className="login__path-body">
                <span className="login__path-title">My quotes &amp; account</span>
                <span className="login__path-desc">
                  See the prices Camille has set, accept or decline quotes, and
                  track your bookings.
                </span>
              </span>
              <ArrowRight size={18} aria-hidden="true" className="login__path-arrow" />
            </a>
          </li>
          <li>
            <a href={routes.program("self-paced-courses")} className="login__path">
              <span className="login__path-icon" aria-hidden="true">
                <GraduationCap size={22} />
              </span>
              <span className="login__path-body">
                <span className="login__path-title">Online trainings platform</span>
                <span className="login__path-desc">
                  Self-paced, DECAL-approved CEU courses you can take anytime.
                </span>
              </span>
              <ArrowRight size={18} aria-hidden="true" className="login__path-arrow" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
