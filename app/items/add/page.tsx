"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/app/lib/auth-client";
import { createJob } from "@/app/lib/api";
import { JOB_CATEGORIES, JOB_TYPES, EXPERIENCE_LEVELS } from "@/app/lib/job-options";

export default function AddJobPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState(JOB_TYPES[0]);
  const [category, setCategory] = useState(JOB_CATEGORIES[0]);
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[0]);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [deadline, setDeadline] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && session && role !== "recruiter") {
      router.replace("/jobs");
    }
  }, [isPending, session, role, router]);

  const mutation = useMutation({
    mutationFn: () =>
      createJob({
        title,
        shortDescription,
        fullDescription,
        location,
        type,
        category,
        experienceLevel,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        currency: "USD",
        deadline: new Date(deadline).toISOString(),
        imageUrl: imageUrl || null,
        recruiterId: session!.user.id,
        recruiterName: session!.user.name,
      }),
    onSuccess: () => {
      router.push("/items/manage");
    },
    onError: (err: Error) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !title.trim() ||
      !shortDescription.trim() ||
      !fullDescription.trim() ||
      !location.trim() ||
      !deadline
    ) {
      setError("Please fill in every required field.");
      return;
    }
    const min = Number(salaryMin);
    const max = Number(salaryMax);
    if (!salaryMin || !salaryMax || Number.isNaN(min) || Number.isNaN(max)) {
      setError("Please enter a valid salary range.");
      return;
    }
    if (min > max) {
      setError("Minimum salary can't be greater than maximum salary.");
      return;
    }

    mutation.mutate();
  };

  if (isPending || !session || role !== "recruiter") {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Post a Job
      </h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Fill in the details below to publish a new job listing.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Job Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Short Description
          </label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
            maxLength={140}
            placeholder="One or two lines summarizing the role"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Full Description
          </label>
          <textarea
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
            required
            rows={6}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {JOB_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Job Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {JOB_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            >
              {EXPERIENCE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="e.g. Remote, or San Francisco, CA"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Minimum Salary (USD)
            </label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              required
              min={0}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Maximum Salary (USD)
            </label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              required
              min={0}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Application Deadline
          </label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Company Logo URL (optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://…"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {mutation.isPending ? "Publishing…" : "Publish Job"}
        </button>
      </form>
    </div>
  );
}
