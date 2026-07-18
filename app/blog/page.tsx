import { fetchBlogPosts } from "@/app/lib/api";
import { BlogCard } from "@/app/components/blog-card";

export const metadata = { title: "Blog — Elevora" };

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        The Elevora Blog
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-400">
        Career advice for job seekers and hiring playbooks for recruiters,
        written by the Elevora team.
      </p>

      {posts.length === 0 ? (
        <p className="mt-12 text-neutral-500 dark:text-neutral-400">
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
