import { defaultProjects, defaultSiteContent, defaultSiteSettings, mergeThemeSettings } from "./defaultSiteData.js";
import { isSupabaseConfigured, supabase } from "./supabaseClient.js";

const SINGLETON_ID = "default";
const MEDIA_BUCKET = "media";

function normalizeProject(project) {
  return {
    id: project.id,
    title: project.title || "",
    category: project.category || "",
    description: project.description || "",
    video_url: project.video_url || "",
    youtube_url: project.video_url || "",
    thumbnail_url: project.thumbnail_url || "",
    thumbnail: project.thumbnail_url || "",
    featured: Boolean(project.featured),
    published: Boolean(project.published),
    display_order: Number(project.display_order || 0),
    created_at: project.created_at
  };
}

export async function fetchPublicSiteBundle() {
  if (!isSupabaseConfigured) {
    return {
      projects: defaultProjects,
      content: defaultSiteContent,
      theme: mergeThemeSettings(),
      settings: defaultSiteSettings
    };
  }

  const [projectsRes, contentRes, themeRes, settingsRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase.from("site_content").select("*").eq("id", SINGLETON_ID).maybeSingle(),
    supabase.from("theme_settings").select("*").eq("id", SINGLETON_ID).maybeSingle(),
    supabase.from("site_settings").select("*").eq("id", SINGLETON_ID).maybeSingle()
  ]);

  return {
    projects: projectsRes.data?.length ? projectsRes.data.map(normalizeProject) : defaultProjects,
    content: contentRes.data ? { ...defaultSiteContent, ...contentRes.data } : defaultSiteContent,
    theme: mergeThemeSettings(themeRes.data),
    settings: settingsRes.data ? { ...defaultSiteSettings, ...settingsRes.data } : defaultSiteSettings
  };
}

export async function fetchAdminProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(normalizeProject);
}

export async function saveProject(project) {
  const payload = {
    id: project.id || undefined,
    title: project.title?.trim() || "",
    category: project.category?.trim() || "",
    description: project.description?.trim() || "",
    video_url: project.video_url?.trim() || "",
    thumbnail_url: project.thumbnail_url?.trim() || "",
    featured: Boolean(project.featured),
    published: Boolean(project.published),
    display_order: Number(project.display_order || 0)
  };

  const { data, error } = await supabase.from("projects").upsert(payload).select().single();
  if (error) throw error;
  return normalizeProject(data);
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderProjects(projects) {
  const payload = projects.map((project, index) => ({
    id: project.id,
    display_order: index + 1
  }));

  const { error } = await supabase.from("projects").upsert(payload);
  if (error) throw error;
}

export async function fetchSingleton(tableName) {
  const { data, error } = await supabase.from(tableName).select("*").eq("id", SINGLETON_ID).maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertSingleton(tableName, payload) {
  const { data, error } = await supabase
    .from(tableName)
    .upsert({ id: SINGLETON_ID, ...payload })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function listMediaAssets() {
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function uploadMediaAsset(file) {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(filePath);
  const publicUrl = publicUrlData.publicUrl;

  const { data, error } = await supabase
    .from("media_assets")
    .insert({
      name: file.name,
      file_path: filePath,
      public_url: publicUrl,
      mime_type: file.type,
      size_bytes: file.size
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMediaAsset(asset) {
  const { error: storageError } = await supabase.storage.from(MEDIA_BUCKET).remove([asset.file_path]);
  if (storageError) throw storageError;

  const { error } = await supabase.from("media_assets").delete().eq("id", asset.id);
  if (error) throw error;
}

