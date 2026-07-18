export const metadata = { title: "About — Elevora" };

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        About Elevora
      </h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        Elevora is a job search and recruiting platform built to make hiring
        faster for recruiters and job hunting less overwhelming for
        candidates. Recruiters post roles with structured details — salary,
        location, experience level, and deadlines — while job seekers get
        AI-assisted recommendations and a conversational assistant that
        understands the platform.
      </p>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        We built Elevora around three ideas: listings should be easy to
        filter and compare, applying should take minutes not hours, and the
        platform itself should actively help both sides make a good match
        instead of just hosting a list of postings.
      </p>
      <h2 className="mt-10 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
        What we offer
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700 dark:text-neutral-300">
        <li>Searchable, filterable job listings across categories and locations.</li>
        <li>A dedicated dashboard for recruiters to post and manage openings.</li>
        <li>An AI assistant that helps you navigate the site and answer questions.</li>
        <li>AI-assisted job description drafting for recruiters.</li>
      </ul>
    </div>
  );
}
