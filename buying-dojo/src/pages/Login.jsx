import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import FloatingField from "../components/FloatingField";
import { useAuth } from "../hooks/useAuth";
import "../components/FormFields.css";
import "./Login.css";

function getAuthErrorMessage(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email or password is incorrect.";
    case "auth/email-already-in-use":
      return "An account already exists for this email.";
    case "auth/weak-password":
      return "Use a password with at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in Firebase.";
    default:
      return error?.message || "Authentication failed. Try again.";
  }
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, configured, signInWithEmail, signUpWithEmail, signInWithGoogle } =
    useAuth();
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from?.pathname || "/";

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!configured) {
      setError("Add Firebase environment variables to enable the demo login.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        await signUpWithEmail(form.email.trim(), form.password);
      } else {
        await signInWithEmail(form.email.trim(), form.password);
      }

      navigate(redirectPath, { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    if (!configured) {
      setError("Add Firebase environment variables to enable the demo login.");
      return;
    }

    setLoading(true);

    try {
      await signInWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page page-shell">
      <div className="auth-card surface-card">
        <p className="auth-eyebrow">Demo access</p>
        <h1 className="form-title">
          {mode === "signup" ? "Create your account" : "Sign in to Buying Dojo"}
        </h1>
        <p className="form-subtitle">
          Use Firebase Authentication with email and password or Google for this demo.
        </p>

        {!configured && (
          <p className="form-note">
            Firebase is not configured yet. Add the `VITE_FIREBASE_*` values from your
            Firebase project to a local `.env` file, then restart the dev server.
          </p>
        )}

        <form className="form-stack" onSubmit={handleSubmit}>
          <FloatingField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />

          <FloatingField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          {error && <p className="form-error">{error}</p>}

          <button className="form-submit-btn" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <div className="form-divider">or</div>

        <button
          type="button"
          className="form-secondary-btn auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="form-toggle">
          {mode === "signup" ? "Already have an account?" : "Need a demo account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode((current) => (current === "signup" ? "signin" : "signup"));
              setError("");
            }}
          >
            {mode === "signup" ? "Sign in" : "Create one"}
          </button>
        </p>

        <p className="auth-return">
          <Link to="/">Back to recommendations</Link>
        </p>
      </div>
    </section>
  );
}
