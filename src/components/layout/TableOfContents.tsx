import type { TocHeading } from "@/lib/types";

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto text-sm xl:block"
    >
      <p className="mb-3 font-semibold text-neutral-900 dark:text-neutral-100">
        On this page
      </p>
      <ul className="space-y-2 border-l border-neutral-200 dark:border-neutral-800">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-7" : "pl-4"}>
            <a
              href={`#${h.id}`}
              className="block text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
