const metrics = [
  ['Upcoming sessions', '2'],
  ['Referral requests', '4'],
  ['Applications', '7'],
  ['Resume score', '72%']
];

export function DashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
        Student workspace
      </p>
      <h1 className="mt-3 text-4xl font-black">Good morning, future builder.</h1>
      <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
        This starter dashboard reserves space for the core student workflows.
      </p>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            key={label}
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-black">{value}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl bg-ink p-7 text-white dark:bg-slate-900">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-500">
            Next best action
          </p>
          <h2 className="mt-3 text-2xl font-black">Complete your project portfolio</h2>
          <p className="mt-3 max-w-xl text-slate-300">
            Strong project evidence improves mentor responses and referral quality.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Profile strength
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-[68%] rounded-full bg-brand-500" />
          </div>
          <p className="mt-3 text-sm text-slate-500">68% complete</p>
        </article>
      </div>
    </section>
  );
}

