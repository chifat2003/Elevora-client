import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/app/lib/types";
import { formatDate } from "@/app/lib/format";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="relative h-36 w-full bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {post.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
          {post.excerpt}
        </p>
        <div className="mt-3 text-xs text-neutral-400">
          {post.author} · {formatDate(post.publishedAt)}
        </div>
      </div>
    </Link>
  );
}
