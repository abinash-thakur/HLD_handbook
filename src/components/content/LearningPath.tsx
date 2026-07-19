import Link from "next/link";
import type { ContentSummary } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export interface PathSection {
  title: string;
  description?: string;
  items: ContentSummary[];
}

/**
 * Sequential "read this, then this" list — items are numbered globally across
 * sections so the whole page reads as one ordered path.
 */
export function LearningPath({ sections }: { sections: PathSection[] }) {
  let step = 0;
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
          {section.description && (
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {section.description}
            </p>
          )}
          <ol className="mt-4 space-y-3 border-l-2 border-neutral-200 dark:border-neutral-800">
            {section.items.map((item) => {
              step += 1;
              return (
                <li key={item.url} className="relative pl-8">
                  <span className="absolute -left-[15px] top-4 flex h-7 w-7 items-center justify-center rounded-full border-2 border-neutral-200 bg-white text-xs font-bold text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
                    {step}
                  </span>
                  <Link
                    href={item.url}
                    className="group block rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold group-hover:underline">
                        {item.title}
                      </span>
                      <DifficultyBadge difficulty={item.difficulty} />
                      {item.estimatedTime && (
                        <span className="text-xs text-neutral-400 dark:text-neutral-500">
                          ⏱ {item.estimatedTime}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                      {item.oneLiner ?? item.summary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
