import { useSiteData } from "../contexts/SiteDataContext.jsx";

export default function Footer() {
  const { content, settings } = useSiteData();

  return (
    <footer className="border-t border-white/10 px-5 py-8 text-sm text-zinc-500 sm:px-8">
      <div className="section-shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{content.footer_text}</p>
        <div className="flex flex-wrap gap-4">
          {settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : null}
          {settings.location ? <span>{settings.location}</span> : null}
        </div>
      </div>
    </footer>
  );
}

