import Link from "next/link";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Engineering: "Backend, frontend, and full-stack roles",
  Design: "Product, UX, and visual design roles",
  Marketing: "Growth, content, and brand roles",
  Sales: "Account executive and business development roles",
  Data: "Analytics, data science, and ML roles",
  Product: "Product management and strategy roles",
  "Customer Support": "Support and customer success roles",
};

export function CategoriesSection({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-900/50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Browse by Category
        </h2>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Jump straight into the roles you care about.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/jobs?category=${encodeURIComponent(category)}`}
              className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-primary hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {category}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {CATEGORY_DESCRIPTIONS[category] ?? "Open roles on Elevora"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
