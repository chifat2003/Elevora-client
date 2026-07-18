"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJobApplicants } from "@/app/lib/api";
import { formatDate } from "@/app/lib/format";

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-primary/10 text-primary",
  accepted: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export function ApplicantsList({
  jobId,
  recruiterId,
}: {
  jobId: string;
  recruiterId: string;
}) {
  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants", jobId],
    queryFn: () => fetchJobApplicants(jobId, recruiterId),
  });

  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (!applicants || applicants.length === 0) {
    return (
      <p className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
        No applications yet for this job.
      </p>
    );
  }

  return (
    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
      {applicants.map((applicant) => (
        <div
          key={applicant._id}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div>
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {applicant.seekerName ?? "Anonymous applicant"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Applied {formatDate(applicant.appliedAt)}
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
              STATUS_STYLES[applicant.status] ??
              "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
            }`}
          >
            {applicant.status}
          </span>
        </div>
      ))}
    </div>
  );
}
