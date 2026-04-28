import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);
const isLocalDevBypass =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");

async function fetchProfile(userId) {
  if (!supabase || !userId) return null;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;

    async function bootstrap() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!mounted) return;

        setSession(data.session);
        setAuthError("");

        if (data.session?.user) {
          try {
            const nextProfile = await fetchProfile(data.session.user.id);
            if (mounted) setProfile(nextProfile);
          } catch {
            if (mounted) setProfile(null);
          }
        }
      } catch (error) {
        if (!mounted) return;
        setSession(null);
        setProfile(null);
        setAuthError(error?.message || "Unable to reach Supabase auth.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    bootstrap();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setAuthError("");
      if (nextSession?.user) {
        try {
          const nextProfile = await fetchProfile(nextSession.user.id);
          setProfile(nextProfile);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      authError,
      isAuthenticated: Boolean(session) || isLocalDevBypass,
      isAdmin: Boolean(profile?.is_admin) || isLocalDevBypass,
      isDevBypass: isLocalDevBypass,
      isSupabaseConfigured,
      async login(email, password) {
        return supabase.auth.signInWithPassword({ email, password });
      },
      async logout() {
        return supabase.auth.signOut();
      },
      async refreshProfile() {
        if (!session?.user) return null;
        const nextProfile = await fetchProfile(session.user.id);
        setProfile(nextProfile);
        return nextProfile;
      }
    }),
    [authError, loading, profile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
