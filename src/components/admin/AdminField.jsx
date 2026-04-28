export function AdminInput({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ivory outline-none transition focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[color:var(--theme-accent)]/20"
      />
    </label>
  );
}

export function AdminTextarea({ label, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <textarea
        {...props}
        className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ivory outline-none transition focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[color:var(--theme-accent)]/20"
      />
    </label>
  );
}

export function AdminSelect({ label, className = "", children, ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-zinc-300">{label}</span>
      <select
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-ivory outline-none transition focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[color:var(--theme-accent)]/20"
      >
        {children}
      </select>
    </label>
  );
}

export function AdminToggle({ label, checked, onChange, description }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        {description ? <p className="text-xs text-zinc-500">{description}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-[var(--theme-accent)]" : "bg-zinc-700"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </label>
  );
}

