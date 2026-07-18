import Image from "next/image";
import type { Testimonial } from "@/app/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
        What People Are Saying
      </h2>
      <p className="mt-1 text-neutral-600 dark:text-neutral-400">
        Real feedback from seekers and recruiters using Elevora.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 6).map((t) => (
          <div
            key={t._id}
            className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
          >
            <p className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{t.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
