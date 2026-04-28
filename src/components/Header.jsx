import { Instagram } from "lucide-react";
import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function Header() {
  const { content, settings } = useSiteData();

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-5 py-5 sm:px-8">
      <nav className="section-shell flex items-center justify-between rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl">
        <a href="#" className="text-xs font-black uppercase tracking-[0.32em] text-ivory">
          {(content.brand_name || "Ali Khan Films").toUpperCase()}
        </a>
        <div className="flex items-center gap-5">
          <a href="#work" className="nav-link">Work</a>
          <a href="#services" className="nav-link">Capabilities</a>
          <a href="#contact" className="nav-link">Project</a>
          {settings.instagram_url ? (
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-gold hover:text-gold"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
