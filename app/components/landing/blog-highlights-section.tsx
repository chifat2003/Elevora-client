import Link from "next/link";
import type { BlogPost } from "@/app/lib/types";
import { BlogCard } from "@/app/components/blog-card";

export function BlogHighlightsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-16 dark:bg-neutral-900/50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              From the Blog
            </h2>
            <p className="mt-1 text-neutral-600 dark:text-neutral-400">
              Career advice and hiring tips from the Elevora team.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-primary hover:text-primary-dark sm:block"
          >
            Read the blog →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
