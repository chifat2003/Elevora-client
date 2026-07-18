import Image from "next/image";
import Link from "next/link";
import type { Job } from "@/app/lib/types";
import { formatDate, formatSalaryRange } from "@/app/lib/format";

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="relative h-36 w-full bg-neutral-100 dark:bg-neutral-800">
        {job.imageUrl ? (
          <Image
            src={job.imageUrl}
            alt={job.recruiterName ?? job.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
            {job.recruiterName ?? "Elevora"}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {job.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {job.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)}</span>
          <span>·</span>
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.type}</span>
        </div>
        <div className="mt-1 text-xs text-neutral-400">
          Posted {formatDate(job.createdAt)}
        </div>

        <Link
          href={`/jobs/${job._id}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
