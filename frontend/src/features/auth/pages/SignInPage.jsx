export function SignInPage() {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl place-items-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-black">Sign in to AlumniConnect</h1>
        <form className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">
            Email
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:border-slate-700"
              name="email"
              placeholder="you@college.edu"
              type="email"
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:border-slate-700"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </label>
          <button
            className="w-full rounded-xl bg-brand-600 px-4 py-3 font-bold text-white transition hover:bg-brand-700"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          or
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>
        <button
          className="w-full rounded-xl border border-slate-300 px-4 py-3 font-bold transition hover:border-brand-500 dark:border-slate-700"
          type="button"
        >
          Continue with Google
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          UI scaffold only. Authentication will connect to the backend auth module.
        </p>
      </div>
    </section>
  );
}

