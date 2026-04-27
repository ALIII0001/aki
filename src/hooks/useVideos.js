import { useEffect, useState } from "react";
import { fallbackVideos } from "../lib/fallbackVideos.js";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchVideos() {
      if (!isSupabaseConfigured) {
        setVideos(fallbackVideos);
        setError("");
        setLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("videos")
        .select("id,title,youtube_url,thumbnail,created_at")
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (queryError) {
        setError("");
        setVideos(fallbackVideos);
      } else {
        setVideos(data?.length ? data : fallbackVideos);
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
