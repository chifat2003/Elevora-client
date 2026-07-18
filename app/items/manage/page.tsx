"use client";

import { authClient } from "@/app/lib/auth-client";
import { RecruiterManage } from "./recruiter-manage";
import { SeekerManage } from "./seeker-manage";

export default function ManageItemsPage() {
  const { data: session, isPending } = authClient.useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (isPending || !session) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        {role === "recruiter" ? "Manage Jobs" : "My Applications"}
      </h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {role === "recruiter"
          ? "View and manage the jobs you've posted."
          : "Track the jobs you've applied to and saved."}
      </p>

      {role === "recruiter" ? (
        <RecruiterManage recruiterId={session.user.id} />
      ) : (
        <SeekerManage seekerId={session.user.id} />
      )}
    </div>
  );
}
