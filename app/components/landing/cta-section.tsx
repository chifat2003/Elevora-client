import Link from "next/link";

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-12 text-center dark:border-neutral-700 dark:bg-neutral-900/50 sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Ready to get started?
          </h2>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Post a role in minutes, or find your next opportunity today.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Link
            href="/register"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Post a Job
          </Link>
          <Link
            href="/jobs"
            className="rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            Find a Job
          </Link>
        </div>
      </div>
    </section>
  );
}
