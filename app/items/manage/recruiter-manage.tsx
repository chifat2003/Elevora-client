"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob, fetchJobs } from "@/app/lib/api";
import { formatDate, formatSalaryRange } from "@/app/lib/format";
import { ApplicantsList } from "./applicants-list";

export function RecruiterManage({ recruiterId }: { recruiterId: string }) {
  const queryClient = useQueryClient();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["jobs", { recruiterId }],
    queryFn: () => fetchJobs({ recruiterId, limit: 24, sort: "newest" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (jobId: string) => deleteJob(jobId, recruiterId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["jobs", { recruiterId }] }),
  });

  if (isLoading) {
    return (
      <div className="mt-8 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (!data || data.jobs.length === 0) {
    return (
      <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
        You haven&apos;t posted any jobs yet.{" "}
        <Link href="/items/add" className="text-primary hover:underline">
          Post your first job
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Salary</th>
            <th className="px-4 py-3">Posted</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.jobs.map((job) => {
            const isExpanded = expandedJobId === job._id;
            return (
              <Fragment key={job._id}>
                <tr className="border-b border-neutral-100 last:border-0 dark:border-neutral-800">
                  <td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                    {job.title}
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                    {formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)}
                  </td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          setExpandedJobId(isExpanded ? null : job._id)
                        }
                        className="text-primary hover:underline"
                      >
                        {isExpanded ? "Hide Applicants" : "View Applicants"}
                      </button>
                      <Link
                        href={`/jobs/${job._id}`}
                        className="text-primary hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${job.title}"? This can't be undone.`)) {
                            deleteMutation.mutate(job._id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:underline disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="border-b border-neutral-100 bg-neutral-50 last:border-0 dark:border-neutral-800 dark:bg-neutral-800/40">
                    <td colSpan={4} className="p-0">
                      <ApplicantsList jobId={job._id} recruiterId={recruiterId} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
