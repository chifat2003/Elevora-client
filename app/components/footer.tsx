import Link from "next/link";

const columns = [
  {
    title: "Platform",
    links: [
      { href: "/jobs", label: "Find Jobs" },
      { href: "/items/add", label: "Post a Job" },
      { href: "/items/manage", label: "Manage Jobs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

const socialLinks = [
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://x.com/", label: "X (Twitter)" },
  { href: "https://github.com/", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="col-span-2">
          <span className="text-lg font-bold text-primary">Elevora</span>
          <p className="mt-2 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
            Connecting job seekers and recruiters with smart search and
            AI-assisted hiring tools.
          </p>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            support@elevora.app
          </p>
          <div className="mt-3 flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary dark:text-neutral-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © {new Date().getFullYear()} Elevora. All rights reserved.
      </div>
    </footer>
  );
}
