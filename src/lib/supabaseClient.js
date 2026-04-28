import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export let isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export let supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

let configPromise;

export async function getSupabaseClient() {
  if (supabase) return supabase;

  configPromise ??= fetchRuntimeConfig();
  return configPromise;
}

async function fetchRuntimeConfig() {
  try {
    const response = await fetch("/api/config", {
      headers: { Accept: "application/json" }
    });

    if (!response.ok) return null;

    const config = await response.json();
    if (!config?.supabaseUrl || !config?.supabaseAnonKey) return null;

    supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
    isSupabaseConfigured = true;
    return supabase;
  } catch {
    return null;
  }
}
