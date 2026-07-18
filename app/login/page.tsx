"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { DEMO_ACCOUNTS } from "@/app/lib/demo-accounts";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (loginEmail: string, loginPassword: string) => {
    setError(null);
    if (!loginEmail || !loginPassword) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    const { error: signInError } = await authClient.signIn.email({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const handleDemoLogin = (role: "seeker" | "recruiter") => {
    const account = DEMO_ACCOUNTS[role];
    setEmail(account.email);
    setPassword(account.password);
    login(account.email, account.password);
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirectTo });
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        Log in to Elevora
      </h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        New here?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Create an account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => handleDemoLogin("seeker")}
          disabled={loading}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Demo: Job Seeker
        </button>
        <button
          onClick={() => handleDemoLogin("recruiter")}
          disabled={loading}
          className="rounded-lg border border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Demo: Recruiter
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
        <span className="text-xs text-neutral-500">or</span>
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
      </div>

      <button
        onClick={handleGoogleLogin}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        Continue with Google
      </button>
    </div>
  );
}
