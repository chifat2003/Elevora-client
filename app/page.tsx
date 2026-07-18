import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
        Find the right job. Find the right hire.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
        Elevora connects job seekers and recruiters with searchable listings,
        AI-assisted recommendations, and a smarter way to manage hiring.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/jobs"
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Browse Jobs
        </Link>
        <Link
          href="/register"
          className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Get Started
        </Link>
      </div>
      <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
        The full landing page (featured listings, categories, stats, and more) lands in Milestone 4.
      </p>
    </div>
  );
}
