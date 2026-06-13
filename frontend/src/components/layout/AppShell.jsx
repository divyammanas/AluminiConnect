import { NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-brand-100 text-brand-900'
      : 'text-slate-600 hover:bg-white hover:text-ink'
  }`;

export function AppShell() {
  return (
    <div className="min-h-screen bg-canvas text-ink dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-canvas/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <NavLink className="text-xl font-black tracking-tight" to="/">
            Alumni<span className="text-brand-600">Connect</span>
          </NavLink>
          <div className="flex items-center gap-1">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink className={linkClass} to="/sign-in">
              Sign in
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

