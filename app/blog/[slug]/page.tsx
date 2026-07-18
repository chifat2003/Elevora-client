import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchBlogPost } from "@/app/lib/api";
import { formatDate } from "@/app/lib/format";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await fetchBlogPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-xs font-medium uppercase tracking-wide text-accent">
        {post.category}
      </span>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        {post.author} · {formatDate(post.publishedAt)}
      </p>

      <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 sm:h-80">
        <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" sizes="768px" />
      </div>

      <div className="mt-8 space-y-4 text-neutral-700 dark:text-neutral-300">
        {(post.content ?? "").split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
