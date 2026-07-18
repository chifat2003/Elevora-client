"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

function Avatar({ name, image, size = 32 }: { name: string; image?: string | null; size?: number }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-primary/10"
      style={{ width: size, height: size }}
    >
      {image ? (
        <Image src={image} alt={name} fill sizes={`${size}px`} className="object-cover" unoptimized />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-semibold text-primary"
          style={{ fontSize: size * 0.45 }}
        >
          {name?.charAt(0).toUpperCase() ?? "?"}
        </div>
      )}
    </div>
  );
}

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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const links = session ? loggedInLinks : loggedOutLinks;
  const role = (session?.user as { role?: string } | undefined)?.role;
  const roleLabel = role === "recruiter" ? "Recruiter" : "Job Seeker";

  const extraLinks = session
    ? [
        ...(role === "recruiter"
          ? [{ href: "/items/add", label: "Post a Job" }]
          : []),
        {
          href: "/items/manage",
          label: role === "recruiter" ? "Manage Jobs" : "My Applications",
        },
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold text-primary" onClick={() => setMenuOpen(false)}>
          Elevora
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {[...links, ...extraLinks].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isPending ? null : session ? (
            <>
              <Link href="/profile" className="flex items-center gap-2">
                <Avatar name={session.user.name} image={session.user.image} />
                <div className="flex flex-col items-end leading-tight">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {session.user.name}
                  </span>
                  <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {roleLabel}
                  </span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-neutral-300 px-4 py-2 text-sm font-medium text-red-500 hover:bg-white dark:bg-neutral-200 dark:text-red-500"
              >
                Log out
              </button>
            </>
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

        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800 md:hidden"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-neutral-200 px-4 pb-4 dark:border-neutral-700 md:hidden">
          {session && (
            <div className="flex items-center justify-between border-b border-neutral-200 py-3 dark:border-neutral-700">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <Avatar name={session.user.name} image={session.user.image} />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {session.user.name}
                  </span>
                  <span className="mt-0.5 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {roleLabel}
                  </span>
                </div>
              </Link>
            </div>
          )}

          <ul className="flex flex-col py-2">
            {[...links, ...extraLinks].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm font-medium text-neutral-700 hover:text-primary dark:text-neutral-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 pt-2">
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
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-center text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
