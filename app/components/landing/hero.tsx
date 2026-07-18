"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Job } from "@/app/lib/types";

export function Hero({ featuredJobs }: { featuredJobs: Job[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (featuredJobs.length < 2) return;
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % featuredJobs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredJobs.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative flex min-h-[65vh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6">
      <Image
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/70 to-neutral-900/85" />

      <div className="relative">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Find the right job. Find the right hire.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-200">
          Elevora connects job seekers and recruiters with searchable listings,
          AI-assisted recommendations, and a smarter way to manage hiring.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search job titles, e.g. Frontend Engineer"
            aria-label="Search jobs"
            className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Search Jobs
          </button>
        </form>

        {featuredJobs.length > 0 && (
          <div className="mt-6 flex h-6 items-center gap-2 text-sm text-neutral-300">
            <span>Now hiring:</span>
            <span key={featuredJobs[titleIndex]._id} className="font-medium text-white">
              {featuredJobs[titleIndex].title}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
