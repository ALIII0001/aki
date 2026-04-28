import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function ProtectedRoute() {
  const { loading, isAuthenticated, isAdmin, isSupabaseConfigured, authError, isDevBypass } = useAuth();
  const location = useLocation();

  if (isDevBypass) {
    return <Outlet />;
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night px-6 text-center text-zinc-300">
        Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to use the admin dashboard.
      </div>
    );
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-night text-zinc-300">Loading admin...</div>;
  }

  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night px-6 text-center text-zinc-300">
        Supabase auth could not be reached.
        <br />
        <span className="mt-2 block text-sm text-zinc-500">{authError}</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night px-6 text-center text-zinc-300">
        This account can sign in, but it doesn't have admin access yet.
      </div>
    );
  }

  return <Outlet />;
}
