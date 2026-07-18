import { ContactForm } from "./contact-form";

export const metadata = { title: "Contact — Elevora" };

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Contact Us
      </h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        Have a question about posting a job, applying to one, or how Elevora
        works? Reach out and we&apos;ll get back to you.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Email
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            support@elevora.app
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Office
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Remote-first — support available Mon–Fri, 9am–6pm.
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
