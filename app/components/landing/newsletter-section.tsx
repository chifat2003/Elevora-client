"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/app/lib/api";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Stay in the loop
      </h2>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Get new job categories, hiring tips, and product updates in your inbox.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-accent">You&apos;re subscribed. Thanks for joining!</p>
      )}
      {status === "error" && error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </section>
  );
}
