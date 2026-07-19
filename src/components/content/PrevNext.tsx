import Link from "next/link";
import type { ContentSummary } from "@/lib/types";

export function PrevNext({
  prev,
  next,
}: {
  prev?: ContentSummary;
  next?: ContentSummary;
}) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Reading order"
      className="mt-10 grid gap-3 border-t border-neutral-200 pt-6 sm:grid-cols-2 dark:border-neutral-800"
    >
      {prev ? (
        <Link
          href={prev.url}
          className="group rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            ← Previous
          </p>
          <p className="mt-1 font-medium group-hover:underline">{prev.title}</p>
        </Link>
      ) : (
        <div aria-hidden />
      )}
      {next && (
        <Link
          href={next.url}
          className="group rounded-xl border border-neutral-200 p-4 text-right transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            Next up →
          </p>
          <p className="mt-1 font-medium group-hover:underline">{next.title}</p>
        </Link>
      )}
    </nav>
  );
}
