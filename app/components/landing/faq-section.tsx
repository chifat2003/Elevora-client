"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is Elevora free to use?",
    answer:
      "Yes. Job seekers can search, apply, and save jobs at no cost, and recruiters can post and manage job listings for free.",
  },
  {
    question: "How do I post a job as a recruiter?",
    answer:
      "Register with a Recruiter account, then go to Post a Job from the navbar. Fill in the role details and submit — your posting appears immediately in the explore page and your Manage Jobs dashboard.",
  },
  {
    question: "Can I use AI to help write my job posting?",
    answer:
      "Yes. The Post a Job form includes an AI content generator — give it a role, seniority, and key skills, and it drafts a title and description you can regenerate or edit before publishing.",
  },
  {
    question: "How do I apply to a job?",
    answer:
      "Open any job's details page and click Apply. You'll need to be logged in as a job seeker; if you're not, you'll be redirected to log in first.",
  },
  {
    question: "Can I save jobs to review later?",
    answer:
      "Yes. Click Save on any job details page, and find it later under My Applications on your Manage page.",
  },
  {
    question: "What's the AI chat assistant for?",
    answer:
      "It's a persistent assistant available once you're logged in — ask it to find jobs matching your criteria, explain how a feature works, or help you navigate the platform.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Frequently Asked Questions
      </h2>

      <div className="mt-8 divide-y divide-neutral-200 dark:divide-neutral-700">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question} className="py-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {faq.question}
                </span>
                <span className="ml-4 shrink-0 text-neutral-400">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
