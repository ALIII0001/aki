import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AdminInput } from "../../components/admin/AdminField.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin, isSupabaseConfigured, isDevBypass, loading } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    const { error } = await login(form.email, form.password);

    if (error) {
      addToast(error.message, "error");
      setSubmitting(false);
      return;
    }

    addToast("Welcome back");
    navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-night px-5 text-ivory">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30">
        <p className="eyebrow">Admin Login</p>
        <h1 className="mt-4 font-serif text-4xl leading-none">Ali Khan Films</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-400">
          Sign in to manage projects, media, website text, theme settings, and contact links.
        </p>

        {isDevBypass ? (
          <p className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
            Local dev bypass is active. Open `/admin/dashboard` directly.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            Connecting admin...
          </p>
        ) : null}

        {!loading && !isSupabaseConfigured ? (
          <p className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
            Admin connection is not ready. Redeploy after saving the Vercel Supabase variables.
          </p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <AdminInput
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="admin@example.com"
          />
          <AdminInput
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            placeholder="••••••••"
          />
          <button
            type="submit"
            disabled={submitting || loading || !isSupabaseConfigured}
            className="cinema-button w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
