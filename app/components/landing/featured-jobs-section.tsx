import Link from "next/link";
import type { Job } from "@/app/lib/types";
import { JobCard } from "@/app/components/job-card";

export function FeaturedJobsSection({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Latest Job Listings
          </h2>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">
            Fresh openings from recruiters hiring on Elevora right now.
          </p>
        </div>
        <Link
          href="/jobs"
          className="hidden text-sm font-medium text-primary hover:text-primary-dark sm:block"
        >
          View all jobs →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
