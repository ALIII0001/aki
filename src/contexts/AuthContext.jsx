import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "../lib/supabaseClient.js";

const AuthContext = createContext(null);
const isLocalDevBypass =
  import.meta.env.DEV &&
  typeof window !== "undefined" &&
  (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");

async function fetchProfile(client, userId) {
  if (!client || !userId) return null;
  const { data, error } = await client.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [client, setClient] = useState(null);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let mounted = true;
    let subscription;

    async function bootstrap() {
      let supabaseClient;

      try {
        supabaseClient = await getSupabaseClient();
        if (!mounted) return;

        if (!supabaseClient) {
          setConfigured(false);
          setLoading(false);
          return;
        }

        setClient(supabaseClient);
        setConfigured(true);

        const { data, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        if (!mounted) return;

        setSession(data.session);
        setAuthError("");

        if (data.session?.user) {
          try {
            const nextProfile = await fetchProfile(supabaseClient, data.session.user.id);
            if (mounted) setProfile(nextProfile);
          } catch {
            if (mounted) setProfile(null);
          }
        }

        const { data: listener } = supabaseClient.auth.onAuthStateChange(async (_event, nextSession) => {
          setSession(nextSession);
          setAuthError("");

          if (nextSession?.user) {
            try {
              const nextProfile = await fetchProfile(supabaseClient, nextSession.user.id);
              setProfile(nextProfile);
            } catch {
              setProfile(null);
            }
          } else {
            setProfile(null);
          }

          setLoading(false);
        });

        subscription = listener.subscription;
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

    return () => {
      mounted = false;
      subscription?.unsubscribe();
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
      isSupabaseConfigured: configured,
      async login(email, password) {
        if (!client) {
          return { error: { message: "Admin connection is still starting. Try again in a moment." } };
        }
        return client.auth.signInWithPassword({ email, password });
      },
      async logout() {
        if (!client) return { error: null };
        return client.auth.signOut();
      },
      async refreshProfile() {
        if (!session?.user) return null;
        const nextProfile = await fetchProfile(client, session.user.id);
        setProfile(nextProfile);
        return nextProfile;
      }
    }),
    [authError, client, configured, loading, profile, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
