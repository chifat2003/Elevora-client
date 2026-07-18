"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/app/lib/auth-client";
import {
  applyToJob,
  fetchApplications,
  fetchSavedJobs,
  saveJob,
  unsaveJob,
  withdrawApplication,
} from "@/app/lib/api";

export function JobActions({ jobId }: { jobId: string }) {
  const { data: session, isPending } = authClient.useSession();
  const queryClient = useQueryClient();
  const role = (session?.user as { role?: string } | undefined)?.role;
  const seekerId = session?.user.id;

  const { data: applications } = useQuery({
    queryKey: ["applications", seekerId],
    queryFn: () => fetchApplications(seekerId!),
    enabled: !!seekerId && role !== "recruiter",
  });
  const { data: savedJobs } = useQuery({
    queryKey: ["saved-jobs", seekerId],
    queryFn: () => fetchSavedJobs(seekerId!),
    enabled: !!seekerId && role !== "recruiter",
  });

  const existingApplication = applications?.find((a) => a.jobId === jobId);
  const existingSavedJob = savedJobs?.find((s) => s.jobId === jobId);

  const applyMutation = useMutation({
    mutationFn: () => applyToJob(jobId, seekerId!, session!.user.name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications", seekerId] }),
  });
  const withdrawMutation = useMutation({
    mutationFn: () => withdrawApplication(existingApplication!._id, seekerId!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications", seekerId] }),
  });
  const saveMutation = useMutation({
    mutationFn: () => saveJob(jobId, seekerId!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["saved-jobs", seekerId] }),
  });
  const unsaveMutation = useMutation({
    mutationFn: () => unsaveJob(existingSavedJob!._id, seekerId!),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["saved-jobs", seekerId] }),
  });

  if (isPending) return null;

  if (!session) {
    return (
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/login?redirectTo=/jobs/${jobId}`}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Log in to Apply
        </Link>
      </div>
    );
  }

  if (role === "recruiter") return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {existingApplication ? (
        <button
          onClick={() => withdrawMutation.mutate()}
          disabled={withdrawMutation.isPending}
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          {withdrawMutation.isPending ? "Withdrawing…" : "Withdraw Application"}
        </button>
      ) : (
        <button
          onClick={() => applyMutation.mutate()}
          disabled={applyMutation.isPending}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {applyMutation.isPending ? "Applying…" : "Apply Now"}
        </button>
      )}

      {existingSavedJob ? (
        <button
          onClick={() => unsaveMutation.mutate()}
          disabled={unsaveMutation.isPending}
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Unsave
        </button>
      ) : (
        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Save Job
        </button>
      )}
    </div>
  );
}
