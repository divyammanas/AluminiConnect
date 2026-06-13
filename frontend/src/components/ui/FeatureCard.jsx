export function FeatureCard({ eyebrow, title, description }) {
  return (
    <article className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </article>
  );
}

