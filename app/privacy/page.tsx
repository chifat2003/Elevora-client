export const metadata = { title: "Privacy Policy — Elevora" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: July 2026
      </p>

      <div className="mt-8 space-y-6 text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Information we collect
          </h2>
          <p className="mt-2 text-sm">
            When you create an account, we store your name, email address,
            role (job seeker or recruiter), and authentication credentials
            through our sign-in provider. Recruiters&apos; job postings and
            seekers&apos; applications are stored to power the listing,
            search, and application features of the platform.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            How we use your information
          </h2>
          <p className="mt-2 text-sm">
            Your data is used to operate core features: matching you with
            relevant jobs, letting recruiters manage postings, and powering
            the AI assistant and content generator with the context needed to
            answer your questions or draft postings on your behalf.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Data sharing
          </h2>
          <p className="mt-2 text-sm">
            We do not sell personal data. Job postings and public profile
            information are visible to other users of the platform as part of
            normal site functionality (e.g. a recruiter&apos;s posting is
            visible to job seekers browsing listings).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Your choices
          </h2>
          <p className="mt-2 text-sm">
            You can delete job postings you own from Manage Jobs, and can
            contact support to request deletion of your account and
            associated data.
          </p>
        </section>
      </div>
    </div>
  );
}
