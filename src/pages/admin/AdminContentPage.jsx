import { useEffect, useState } from "react";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { AdminInput, AdminTextarea } from "../../components/admin/AdminField.jsx";
import { useSiteData } from "../../contexts/SiteDataContext.jsx";
import { useToast } from "../../contexts/ToastContext.jsx";
import { defaultSiteContent } from "../../lib/defaultSiteData.js";
import { fetchSingleton, upsertSingleton } from "../../lib/siteApi.js";

export default function AdminContentPage() {
  const { refresh } = useSiteData();
  const { addToast } = useToast();
  const [form, setForm] = useState(defaultSiteContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await fetchSingleton("site_content");
      setForm({ ...defaultSiteContent, ...(data || {}) });
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
      await upsertSingleton("site_content", form);
      await refresh();
      addToast("Website text saved");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Website Text</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Content</h1>
      </div>

      <AdminCard title="Editable website copy" description="Everything here replaces hardcoded public text.">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSave}>
          <AdminInput label="Brand name" value={form.brand_name} onChange={(e) => updateField("brand_name", e.target.value)} />
          <AdminInput label="Hero title" value={form.hero_title} onChange={(e) => updateField("hero_title", e.target.value)} />
          <AdminTextarea label="Hero subtitle" className="md:col-span-2" value={form.hero_subtitle} onChange={(e) => updateField("hero_subtitle", e.target.value)} />
          <AdminInput label="Primary CTA" value={form.hero_primary_button} onChange={(e) => updateField("hero_primary_button", e.target.value)} />
          <AdminInput label="Secondary CTA" value={form.hero_secondary_button} onChange={(e) => updateField("hero_secondary_button", e.target.value)} />
          <AdminInput label="Intro heading" value={form.intro_heading} onChange={(e) => updateField("intro_heading", e.target.value)} />
          <AdminTextarea label="Intro text" value={form.intro_text} onChange={(e) => updateField("intro_text", e.target.value)} />
          <AdminInput label="Impact heading" value={form.impact_heading} onChange={(e) => updateField("impact_heading", e.target.value)} />
          <AdminTextarea label="Impact text" value={form.impact_text} onChange={(e) => updateField("impact_text", e.target.value)} />
          {[1, 2, 3, 4, 5].map((index) => (
            <AdminInput
              key={`capability_${index}`}
              label={`Capability ${index}`}
              value={form[`capability_${index}`]}
              onChange={(e) => updateField(`capability_${index}`, e.target.value)}
            />
          ))}
          <AdminInput label="Process heading" className="md:col-span-2" value={form.process_heading} onChange={(e) => updateField("process_heading", e.target.value)} />
          {[1, 2, 3].map((index) => (
            <div key={`step_${index}`} className="grid gap-4 md:col-span-2 md:grid-cols-2">
              <AdminInput
                label={`Step ${index} title`}
                value={form[`process_step_${index}_title`]}
                onChange={(e) => updateField(`process_step_${index}_title`, e.target.value)}
              />
              <AdminInput
                label={`Step ${index} text`}
                value={form[`process_step_${index}_text`]}
                onChange={(e) => updateField(`process_step_${index}_text`, e.target.value)}
              />
            </div>
          ))}
          <AdminInput label="Work heading" value={form.work_heading} onChange={(e) => updateField("work_heading", e.target.value)} />
          <AdminInput label="Work subtext" value={form.work_subtext} onChange={(e) => updateField("work_subtext", e.target.value)} />
          <AdminInput label="Services detail heading" value={form.services_detail_heading} onChange={(e) => updateField("services_detail_heading", e.target.value)} />
          <AdminInput label="Services detail intro" value={form.services_detail_intro} onChange={(e) => updateField("services_detail_intro", e.target.value)} />
          {[1, 2, 3, 4].map((index) => (
            <div key={`service_${index}`} className="grid gap-4 md:col-span-2 md:grid-cols-2">
              <AdminInput
                label={`Service ${index} title`}
                value={form[`service_${index}_title`]}
                onChange={(e) => updateField(`service_${index}_title`, e.target.value)}
              />
              <AdminInput
                label={`Service ${index} text`}
                value={form[`service_${index}_text`]}
                onChange={(e) => updateField(`service_${index}_text`, e.target.value)}
              />
            </div>
          ))}
          <AdminInput label="Statement text" className="md:col-span-2" value={form.statement_text} onChange={(e) => updateField("statement_text", e.target.value)} />
          <AdminInput label="Studio note heading" value={form.studio_note_heading} onChange={(e) => updateField("studio_note_heading", e.target.value)} />
          <AdminInput label="Studio note text" value={form.studio_note_text} onChange={(e) => updateField("studio_note_text", e.target.value)} />
          <AdminInput label="Final CTA heading" value={form.final_cta_heading} onChange={(e) => updateField("final_cta_heading", e.target.value)} />
          <AdminTextarea label="Final CTA text" value={form.final_cta_text} onChange={(e) => updateField("final_cta_text", e.target.value)} />
          <AdminInput label="Footer text" className="md:col-span-2" value={form.footer_text} onChange={(e) => updateField("footer_text", e.target.value)} />
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="cinema-button">
              {saving ? "Saving..." : "Save website text"}
            </button>
          </div>
        </form>
      </AdminCard>
    </div>
  );
}

