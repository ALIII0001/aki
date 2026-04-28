import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { AdminInput, AdminTextarea, AdminToggle } from "../../components/admin/AdminField.jsx";
import { useSiteData } from "../../contexts/SiteDataContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { deleteProject, fetchAdminProjects, reorderProjects, saveProject } from "../../lib/siteApi.js";

const emptyProject = {
  id: "",
  title: "",
  category: "",
  description: "",
  video_url: "",
  thumbnail_url: "",
  featured: false,
  published: true,
  display_order: 999
};

export default function AdminProjectsPage() {
  const { refresh } = useSiteData();
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState("new");
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId) || null,
    [projects, selectedId]
  );

  useEffect(() => {
    setForm(selectedProject ? selectedProject : { ...emptyProject, display_order: projects.length + 1 });
  }, [projects.length, selectedProject]);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await fetchAdminProjects();
      setProjects(data);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const saved = await saveProject(form);
      await loadProjects();
      await refresh();
      setSelectedId(saved.id);
      addToast("Project saved");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedProject) return;
    if (!window.confirm(`Delete "${selectedProject.title}"?`)) return;

    try {
      await deleteProject(selectedProject.id);
      setSelectedId("new");
      await loadProjects();
      await refresh();
      addToast("Project deleted");
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  async function moveProject(direction) {
    if (!selectedProject) return;
    const index = projects.findIndex((item) => item.id === selectedProject.id);
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || nextIndex < 0 || nextIndex >= projects.length) return;

    const reordered = [...projects];
    [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];

    try {
      await reorderProjects(reordered);
      await loadProjects();
      await refresh();
      addToast("Project order updated");
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Projects / Work</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Projects</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <AdminCard
          title="Project list"
          description="Add, edit, publish, feature, or reorder portfolio work."
          action={
            <button type="button" className="cinema-button" onClick={() => setSelectedId("new")}>
              <Plus size={16} />
              New
            </button>
          }
        >
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-zinc-500">Loading projects…</p>
            ) : projects.length ? (
              projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedId === project.id
                      ? "border-[var(--theme-accent)] bg-white/[0.06]"
                      : "border-white/10 bg-black/20 hover:border-white/20"
                  }`}
                >
                  <p className="font-medium text-zinc-100">{project.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                    {project.category || "Uncategorized"} • {project.published ? "Published" : "Draft"}
                  </p>
                </button>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No projects yet.</p>
            )}
          </div>
        </AdminCard>

        <AdminCard
          title={selectedProject ? "Edit project" : "New project"}
          description="Video links are lightweight and free-tier friendly. Keep actual videos on YouTube, Vimeo, or Instagram."
          action={
            selectedProject ? (
              <div className="flex gap-2">
                <button type="button" onClick={() => moveProject("up")} className="rounded-2xl border border-white/10 p-3">
                  <ArrowUp size={16} />
                </button>
                <button type="button" onClick={() => moveProject("down")} className="rounded-2xl border border-white/10 p-3">
                  <ArrowDown size={16} />
                </button>
                <button type="button" onClick={handleDelete} className="rounded-2xl border border-red-400/20 p-3 text-red-200">
                  <Trash2 size={16} />
                </button>
              </div>
            ) : null
          }
        >
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
            <AdminInput label="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} />
            <AdminInput label="Category" value={form.category} onChange={(e) => updateField("category", e.target.value)} />
            <AdminInput
              label="Video link"
              className="md:col-span-2"
              value={form.video_url}
              onChange={(e) => updateField("video_url", e.target.value)}
              placeholder="YouTube / Vimeo / Instagram URL"
            />
            <AdminInput
              label="Thumbnail image URL"
              className="md:col-span-2"
              value={form.thumbnail_url}
              onChange={(e) => updateField("thumbnail_url", e.target.value)}
              placeholder="Paste a Supabase Storage image URL"
            />
            <AdminTextarea
              label="Description"
              className="md:col-span-2"
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
            <AdminInput
              label="Display order"
              type="number"
              value={form.display_order}
              onChange={(e) => updateField("display_order", e.target.value)}
            />
            <div className="space-y-3">
              <AdminToggle label="Featured" checked={form.featured} onChange={(value) => updateField("featured", value)} />
              <AdminToggle label="Published" checked={form.published} onChange={(value) => updateField("published", value)} />
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={saving} className="cinema-button">
                {saving ? "Saving..." : "Save project"}
              </button>
            </div>
          </form>
        </AdminCard>
      </div>
    </div>
  );
}

