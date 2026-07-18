const seekerSteps = [
  { title: "Search & Filter", body: "Browse listings by category, location, salary, and experience level." },
  { title: "Apply in Minutes", body: "Submit your application directly from the job details page." },
  { title: "Track Everything", body: "Follow your applications and saved jobs from one dashboard." },
];

const recruiterSteps = [
  { title: "Post a Role", body: "Fill in the details, or let the AI generator draft it for you." },
  { title: "Review Applicants", body: "See every application against your posting in one place." },
  { title: "Manage & Close", body: "Update or remove postings as roles get filled." },
];

function StepList({ label, steps }: { label: string; steps: { title: string; body: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
        {label}
      </h3>
      <ol className="mt-4 space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">{step.title}</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        How It Works
      </h2>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        Whether you&apos;re hiring or job hunting, Elevora keeps the process simple.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <StepList label="For Job Seekers" steps={seekerSteps} />
        <StepList label="For Recruiters" steps={recruiterSteps} />
      </div>
    </section>
  );
}
