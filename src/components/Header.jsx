import { Instagram } from "lucide-react";

const instagramUrl = "https://www.instagram.com/";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-5 py-5 sm:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-xl">
        <a href="#" className="text-xs font-black uppercase tracking-[0.28em] text-ivory">
          AKI
        </a>
        <div className="flex items-center gap-5">
          <a href="#work" className="nav-link">Work</a>
          <a href="#contact" className="nav-link">Book</a>
          <a
            href={instagramUrl}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-gold hover:text-gold"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}
