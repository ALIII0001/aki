export default function AdminCard({ title, description, action, children, className = "" }) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 ${className}`}>
      {(title || description || action) ? (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            {title ? <h2 className="text-lg font-semibold text-ivory">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

