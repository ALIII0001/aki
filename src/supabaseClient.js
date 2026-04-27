import { createClient } from "@supabase/supabase-js";

let clientPromise;

export function getSupabaseClient() {
  clientPromise ??= loadSupabaseClient();
  return clientPromise;
}

async function loadSupabaseClient() {
  const response = await fetch("/api/config", {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("Supabase is not configured for this deployment.");
  }

  const { supabaseUrl, supabaseAnonKey } = await response.json();

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or anon key is missing.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
