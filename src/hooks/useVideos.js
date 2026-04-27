import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchVideos() {
      if (!isSupabaseConfigured) {
        setError("Videos unavailable.");
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("videos")
        .select("id,title,category,youtube_url,thumbnail,created_at")
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (queryError) {
        setError("Videos unavailable.");
        setVideos([]);
      } else {
        setVideos(data ?? []);
        setError("");
      }

      setLoading(false);
    }

    fetchVideos();

    return () => {
      ignore = true;
    };
  }, []);

  return { videos, loading, error };
}
