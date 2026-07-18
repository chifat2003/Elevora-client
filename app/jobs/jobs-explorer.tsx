"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchJobFilters, fetchJobs } from "@/app/lib/api";
import type { JobsQuery } from "@/app/lib/types";
import { JobCard } from "@/app/components/job-card";
import { JobCardSkeleton } from "@/app/components/job-card-skeleton";

const PAGE_SIZE = 8;

export function JobsExplorer() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState<JobsQuery["sort"]>("newest");
  const [page, setPage] = useState(1);

  const { data: filters } = useQuery({
    queryKey: ["job-filters"],
    queryFn: fetchJobFilters,
  });

  const query: JobsQuery = {
    q: search || undefined,
    category: category || undefined,
    type: type || undefined,
    experienceLevel: experienceLevel || undefined,
    location: location || undefined,
    sort,
    page,
    limit: PAGE_SIZE,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", query],
    queryFn: () => fetchJobs(query),
  });

  const resetToFirstPage = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Explore Jobs
      </h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => resetToFirstPage(setSearch)(e.target.value)}
          placeholder="Search by job title…"
          className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as JobsQuery["sort"])}
          className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="newest">Newest</option>
          <option value="salary_desc">Salary: High to Low</option>
          <option value="salary_asc">Salary: Low to High</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <select
          value={category}
          onChange={(e) => resetToFirstPage(setCategory)(e.target.value)}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="">All Categories</option>
          {filters?.categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => resetToFirstPage(setType)(e.target.value)}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="">All Job Types</option>
          {filters?.types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={experienceLevel}
          onChange={(e) => resetToFirstPage(setExperienceLevel)(e.target.value)}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        >
          <option value="">All Experience Levels</option>
          {filters?.experienceLevels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={location}
          onChange={(e) => resetToFirstPage(setLocation)(e.target.value)}
          placeholder="Location…"
          className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      {isError && (
        <p className="mt-8 text-sm text-red-600">
          Couldn&apos;t load jobs right now. Please try again shortly.
        </p>
      )}

      {!isError && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))
            : data?.jobs.map((job) => <JobCard key={job._id} job={job} />)}
        </div>
      )}

      {!isLoading && !isError && data?.jobs.length === 0 && (
        <p className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
          No jobs match your filters yet. Try broadening your search.
        </p>
      )}

      {!isLoading && data && data.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-200"
          >
            Previous
          </button>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Page {data.page} of {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page >= data.totalPages}
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
