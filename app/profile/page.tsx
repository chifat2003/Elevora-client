"use client";

import { authClient } from "@/app/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <div className="h-6 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 text-neutral-700 dark:text-neutral-300">
        You need to be logged in to view this page.
      </div>
    );
  }

  const role = (session.user as { role?: string }).role ?? "seeker";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        My Profile
      </h1>

      <div className="mt-8 rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
        <dl className="space-y-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Name
            </dt>
            <dd className="mt-1 text-neutral-900 dark:text-neutral-100">
              {session.user.name}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Email
            </dt>
            <dd className="mt-1 text-neutral-900 dark:text-neutral-100">
              {session.user.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Role
            </dt>
            <dd className="mt-1">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
                {role === "recruiter" ? "Recruiter" : "Job Seeker"}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
