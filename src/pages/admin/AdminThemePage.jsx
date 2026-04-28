import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { AdminInput, AdminSelect, AdminToggle } from "../../components/admin/AdminField.jsx";
import { useSiteData } from "../../contexts/SiteDataContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { defaultThemeSettings } from "../../lib/defaultSiteData.js";
import { fetchSingleton, upsertSingleton } from "../../lib/siteApi.js";

export default function AdminThemePage() {
  const { refresh } = useSiteData();
  const { addToast } = useToast();
  const [form, setForm] = useState(defaultThemeSettings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchSingleton("theme_settings");
      setForm({ ...defaultThemeSettings, ...(data || {}) });
    } catch (error) {
      addToast(error.message, "error");
    }
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    try {
      await upsertSingleton("theme_settings", form);
      await refresh();
      addToast("Theme saved");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Theme</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Theme settings</h1>
      </div>

      <AdminCard title="Visual controls" description="These changes apply to the public portfolio.">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
          <AdminInput label="Primary color" type="color" value={form.primary_color} onChange={(e) => updateField("primary_color", e.target.value)} />
          <AdminInput label="Accent color" type="color" value={form.accent_color} onChange={(e) => updateField("accent_color", e.target.value)} />
          <AdminSelect label="Background style" value={form.background_style} onChange={(e) => updateField("background_style", e.target.value)}>
            <option value="cinematic">Cinematic</option>
            <option value="spotlight">Spotlight</option>
            <option value="minimal">Minimal</option>
          </AdminSelect>
          <AdminSelect label="Font style" value={form.font_style} onChange={(e) => updateField("font_style", e.target.value)}>
            <option value="editorial">Editorial</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </AdminSelect>
          <AdminSelect label="Button style" value={form.button_style} onChange={(e) => updateField("button_style", e.target.value)}>
            <option value="pill">Pill</option>
            <option value="rounded">Rounded</option>
            <option value="sharp">Sharp</option>
          </AdminSelect>
          <div className="space-y-3">
            <AdminToggle label="Enable grain overlay" checked={form.grain_enabled} onChange={(value) => updateField("grain_enabled", value)} />
            <AdminToggle label="Enable animations" checked={form.animations_enabled} onChange={(value) => updateField("animations_enabled", value)} />
          </div>
          <AdminInput label="Hero image URL" className="md:col-span-2" value={form.hero_image_url} onChange={(e) => updateField("hero_image_url", e.target.value)} />
          <AdminInput label="Craft section image URL" className="md:col-span-2" value={form.craft_image_url} onChange={(e) => updateField("craft_image_url", e.target.value)} />
          <AdminInput label="Impact banner image URL" className="md:col-span-2" value={form.impact_image_url} onChange={(e) => updateField("impact_image_url", e.target.value)} />
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="cinema-button">
              {saving ? "Saving..." : "Save theme"}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}

