import Link from "next/link";
import type { ContentSummary } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export function ContentCard({ item }: { item: ContentSummary }) {
  return (
    <Link
      href={item.url}
      className="group flex flex-col rounded-xl border border-neutral-200 p-5 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={item.difficulty} />
        {item.questionType && (
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium capitalize text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            {item.questionType === "case-study" ? "Case study" : "Conceptual"}
          </span>
        )}
        <span className="text-xs text-neutral-400 dark:text-neutral-500">
          {item.category}
        </span>
      </div>
      <h3 className="font-semibold group-hover:underline">{item.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-neutral-500 dark:text-neutral-400">
        {item.oneLiner ?? item.summary}
      </p>
      {item.estimatedTime && (
        <p className="mt-auto pt-3 text-xs text-neutral-400 dark:text-neutral-500">
          ⏱ {item.estimatedTime}
        </p>
      )}
    </Link>
  );
}
