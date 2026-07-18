"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/about", label: "About" },
];

const loggedInLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help" },
  { href: "/profile", label: "Profile" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const links = session ? loggedInLinks : loggedOutLinks;
  const role = (session?.user as { role?: string } | undefined)?.role;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold text-primary">
          Elevora
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {role === "recruiter" && (
            <li>
              <Link
                href="/items/add"
                className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
              >
                Post a Job
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link
                href="/items/manage"
                className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
              >
                {role === "recruiter" ? "Manage Jobs" : "My Applications"}
              </Link>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {isPending ? null : session ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
