import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { AdminInput } from "../../components/admin/AdminField.jsx";
import { useSiteData } from "../../contexts/SiteDataContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { defaultSiteSettings } from "../../lib/defaultSiteData.js";
import { fetchSingleton, upsertSingleton } from "../../lib/siteApi.js";

export default function AdminSettingsPage() {
  const { refresh } = useSiteData();
  const { addToast } = useToast();
  const [form, setForm] = useState(defaultSiteSettings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchSingleton("site_settings");
      setForm({ ...defaultSiteSettings, ...(data || {}) });
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
      await upsertSingleton("site_settings", form);
      await refresh();
      addToast("Settings saved");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Settings</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Contact & social</h1>
      </div>

      <AdminCard title="Public contact links" description="Buttons on the public site update automatically from these values.">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
          <AdminInput label="WhatsApp number" value={form.whatsapp_number} onChange={(e) => updateField("whatsapp_number", e.target.value)} />
          <AdminInput label="Instagram URL" value={form.instagram_url} onChange={(e) => updateField("instagram_url", e.target.value)} />
          <AdminInput label="YouTube URL" value={form.youtube_url} onChange={(e) => updateField("youtube_url", e.target.value)} />
          <AdminInput label="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          <AdminInput label="Location" value={form.location} onChange={(e) => updateField("location", e.target.value)} />
          <AdminInput label="Booking button link" value={form.booking_link} onChange={(e) => updateField("booking_link", e.target.value)} />
          <AdminInput label="Booking button text" value={form.booking_button_text} onChange={(e) => updateField("booking_button_text", e.target.value)} />
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="cinema-button">
              {saving ? "Saving..." : "Save settings"}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}

