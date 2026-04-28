import { Link } from "react-router-dom";
import AdminCard from "../../components/admin/AdminCard.jsx";
import { useSiteData } from "../../contexts/SiteDataContext.jsx";

export default function AdminDashboardPage() {
  const { projects, content, settings, theme } = useSiteData();

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Featured", value: projects.filter((project) => project.featured).length },
    { label: "Published", value: projects.filter((project) => project.published).length },
    { label: "Animations", value: theme.animations_enabled ? "On" : "Off" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Overview</p>
        <h1 className="mt-3 font-serif text-5xl leading-none">Dashboard</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
          Manage the public portfolio without editing code. Content updates here flow into the live site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <AdminCard key={item.label}>
            <p className="text-sm text-zinc-400">{item.label}</p>
            <p className="mt-3 font-serif text-4xl leading-none">{item.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AdminCard
          title="Live content snapshot"
          description="Quick view of the current hero, CTA, and social settings."
        >
          <div className="space-y-4 text-sm text-zinc-300">
            <div>
              <p className="text-zinc-500">Hero title</p>
              <p className="mt-1">{content.hero_title}</p>
            </div>
            <div>
              <p className="text-zinc-500">Final CTA</p>
              <p className="mt-1">{content.final_cta_heading}</p>
            </div>
            <div>
              <p className="text-zinc-500">Instagram</p>
              <p className="mt-1 break-all">{settings.instagram_url || "Not set"}</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Quick links" description="Jump into the most common editing tasks.">
          <div className="grid gap-3">
            {[
              ["/admin/projects", "Update featured work"],
              ["/admin/media", "Upload a new hero or thumbnail"],
              ["/admin/content", "Refresh website text"],
              ["/admin/theme", "Change colors, fonts, and animation"],
              ["/admin/settings", "Update booking and contact links"]
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

