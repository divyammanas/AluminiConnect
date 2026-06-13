import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../../../components/ui/FeatureCard';

const features = [
  {
    eyebrow: 'Discover',
    title: 'Find the right alumni',
    description:
      'Search by college, company, role, skills, location, industry, and graduation year.'
  },
  {
    eyebrow: 'Ask well',
    title: 'Structured referral requests',
    description:
      'Share a complete profile, resume, projects, and motivation before a conversation opens.'
  },
  {
    eyebrow: 'Grow',
    title: 'Mentorship that fits',
    description:
      'Book free or paid sessions for resume reviews, mock interviews, and career guidance.'
  }
];

export function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden px-5 py-20 sm:py-28">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-96 max-w-4xl rounded-full bg-brand-100/80 blur-3xl dark:bg-brand-900/20" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-700 dark:text-brand-500">
            Your network should help you move forward
          </p>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-7xl">
            Turn alumni connections into meaningful career momentum.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Meet alumni, request thoughtful guidance, discover opportunities,
            and build professional relationships without spam.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              className="rounded-full bg-brand-600 px-6 py-3 font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
              to="/sign-in"
            >
              Create your profile
            </Link>
            <Link
              className="rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-ink transition hover:border-brand-500"
              to="/dashboard"
            >
              View dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-5 pb-20 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </section>
    </>
  );
}

