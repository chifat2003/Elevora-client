import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiRequestError, fetchJob, fetchRelatedJobs } from "@/app/lib/api";
import { formatDate, formatSalaryRange } from "@/app/lib/format";
import { JobCard } from "@/app/components/job-card";
import { JobActions } from "./job-actions";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let job;
  try {
    job = await fetchJob(id);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) notFound();
    throw err;
  }

  const related = await fetchRelatedJobs(id);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:w-40">
          {job.imageUrl ? (
            <Image
              src={job.imageUrl}
              alt={job.recruiterName ?? job.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
              {job.recruiterName ?? "Elevora"}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {job.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {job.recruiterName ?? "Elevora"}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <span>{formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)}</span>
            <span>{job.location}</span>
            <span>{job.type}</span>
            <span>{job.experienceLevel}</span>
          </div>

          <JobActions jobId={job._id} />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Overview
        </h2>
        <p className="mt-2 whitespace-pre-line text-neutral-700 dark:text-neutral-300">
          {job.fullDescription}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Key Information
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase text-neutral-500">Category</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {job.category}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Job Type</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {job.type}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Experience</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {job.experienceLevel}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Salary</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Location</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {job.location}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-neutral-500">Apply By</dt>
            <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-100">
              {formatDate(job.deadline)}
            </dd>
          </div>
        </dl>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Related Jobs
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <JobCard key={r._id} job={r} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link
          href="/jobs"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to all jobs
        </Link>
      </div>
    </div>
  );
}
