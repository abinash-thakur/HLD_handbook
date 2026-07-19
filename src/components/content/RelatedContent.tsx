import Link from "next/link";
import type { ContentSummary } from "@/lib/types";

export function RelatedContent({ items }: { items: ContentSummary[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <h2 className="mb-4 text-lg font-semibold">Related reading</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className="group rounded-lg border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
              {item.kind === "concept" ? "Concept" : "Interview question"}
            </p>
            <p className="font-medium group-hover:underline">{item.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
              {item.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
