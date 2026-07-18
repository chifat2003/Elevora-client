export const metadata = { title: "Help — Elevora" };

const faqs = [
  {
    q: "How do I apply to a job?",
    a: "Open any job's details page and click Apply. You'll need to be logged in as a job seeker to submit an application.",
  },
  {
    q: "How do I post a job as a recruiter?",
    a: "Register or log in with a recruiter account, then go to Post a Job from the navigation bar to fill in the role details.",
  },
  {
    q: "Can I edit a job after posting it?",
    a: "From Manage Jobs you can view and delete your postings. To change details, delete the listing and post an updated version.",
  },
  {
    q: "How does the AI assistant work?",
    a: "The assistant understands Elevora's pages and your account, so it can answer questions, help you search for jobs, and suggest next steps in the conversation.",
  },
  {
    q: "Is Elevora free to use?",
    a: "Yes — browsing, applying, and posting jobs are all free during this phase of the platform.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Help &amp; Support
      </h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        Answers to the questions we hear most from job seekers and recruiters.
      </p>

      <div className="mt-8 space-y-4">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-700"
          >
            <summary className="cursor-pointer text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm text-neutral-600 dark:text-neutral-400">
        Still stuck? Reach out on the{" "}
        <a href="/contact" className="text-primary hover:underline">
          Contact page
        </a>
        .
      </p>
    </div>
  );
}
