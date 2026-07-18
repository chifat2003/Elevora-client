"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchApplications,
  fetchSavedJobs,
  unsaveJob,
  withdrawApplication,
} from "@/app/lib/api";
import { formatDate, formatSalaryRange } from "@/app/lib/format";

export function SeekerManage({ seekerId }: { seekerId: string }) {
  const queryClient = useQueryClient();

  const { data: applications, isLoading: loadingApplications } = useQuery({
    queryKey: ["applications", seekerId],
    queryFn: () => fetchApplications(seekerId),
  });
  const { data: savedJobs, isLoading: loadingSaved } = useQuery({
    queryKey: ["saved-jobs", seekerId],
    queryFn: () => fetchSavedJobs(seekerId),
  });

  const withdrawMutation = useMutation({
    mutationFn: (id: string) => withdrawApplication(id, seekerId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications", seekerId] }),
  });
  const unsaveMutation = useMutation({
    mutationFn: (id: string) => unsaveJob(id, seekerId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["saved-jobs", seekerId] }),
  });

  return (
    <div className="mt-8 space-y-12">
      <section>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          My Applications
        </h2>
        {loadingApplications ? (
          <div className="mt-4 h-16 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        ) : !applications || applications.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            You haven&apos;t applied to any jobs yet.{" "}
            <Link href="/jobs" className="text-primary hover:underline">
              Browse jobs
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {applications.map((app) => (
              <div
                key={app._id}
                className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {app.job?.title ?? "Job no longer available"}
                  </p>
                  {app.job && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatSalaryRange(
                        app.job.salaryMin,
                        app.job.salaryMax,
                        app.job.currency
                      )}{" "}
                      · Applied {formatDate(app.appliedAt)}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 text-sm">
                  {app.job && (
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                  )}
                  <button
                    onClick={() => withdrawMutation.mutate(app._id)}
                    disabled={withdrawMutation.isPending}
                    className="text-red-600 hover:underline disabled:opacity-60"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Saved Jobs
        </h2>
        {loadingSaved ? (
          <div className="mt-4 h-16 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        ) : !savedJobs || savedJobs.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            You haven&apos;t saved any jobs yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {savedJobs.map((saved) => (
              <div
                key={saved._id}
                className="flex flex-col gap-2 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">
                    {saved.job?.title ?? "Job no longer available"}
                  </p>
                  {saved.job && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatSalaryRange(
                        saved.job.salaryMin,
                        saved.job.salaryMax,
                        saved.job.currency
                      )}{" "}
                      · Saved {formatDate(saved.savedAt)}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 text-sm">
                  {saved.job && (
                    <Link
                      href={`/jobs/${saved.jobId}`}
                      className="text-primary hover:underline"
                    >
                      View
                    </Link>
                  )}
                  <button
                    onClick={() => unsaveMutation.mutate(saved._id)}
                    disabled={unsaveMutation.isPending}
                    className="text-red-600 hover:underline disabled:opacity-60"
                  >
                    Unsave
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
