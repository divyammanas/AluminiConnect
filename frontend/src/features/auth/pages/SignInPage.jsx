import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../services/firebase';
import { api } from '../../../services/api';

export function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      
      // Send token to backend
      await api.post('/auth/firebase', { idToken });
      
      // Successfully authenticated! Redirect to dashboard.
      navigate('/dashboard');
    } catch (err) {
      console.error('Firebase/Google sign-in error:', err);
      setError(err.response?.data?.error?.message || err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl place-items-center px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft dark:bg-slate-900">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
          Welcome back
        </p>
        <h1 className="mt-3 text-3xl font-black">Sign in to AlumniConnect</h1>
        
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm font-semibold">
            Email
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 opacity-60 cursor-not-allowed"
              name="email"
              placeholder="you@college.edu"
              type="email"
              disabled
            />
          </label>
          <label className="block text-sm font-semibold">
            Password
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:border-slate-700 opacity-60 cursor-not-allowed"
              name="password"
              placeholder="Enter your password"
              type="password"
              disabled
            />
          </label>
          <button
            className="w-full rounded-xl bg-slate-200 px-4 py-3 font-bold text-slate-500 cursor-not-allowed dark:bg-slate-800 dark:text-slate-400"
            type="submit"
            disabled
          >
            Sign in (Use Google for Dev)
          </button>
        </form>
        
        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-400">
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          or
          <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>
        
        <button
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          {loading ? 'Connecting with Google...' : 'Continue with Google'}
        </button>
        
        <p className="mt-5 text-center text-xs text-slate-400">
          Secured by Firebase & AlumniConnect Auth Service
        </p>
      </div>
    </section>
  );
}
