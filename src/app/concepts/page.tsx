import type { Metadata } from "next";
import { conceptSummary, getAllConcepts } from "@/lib/content";
import { LearningPath, type PathSection } from "@/components/content/LearningPath";

export const metadata: Metadata = {
  title: "HLD Concepts — Learning Path",
  description:
    "Core high-level design concepts in a guided reading order — start at step 1 and read straight through.",
};

// Sections are defined by frontmatter `order` ranges so new concepts slot in
// by picking an order number; unordered content lands in the last section.
const SECTIONS: { title: string; description: string; from: number; to: number }[] = [
  {
    title: "1 · Foundations — Traffic & Scaling",
    description: "How requests reach your servers, and what to do when one server isn't enough.",
    from: 1,
    to: 4,
  },
  {
    title: "2 · Speed — Caching & Content Delivery",
    description: "Serving repeated work from fast memory, near the user.",
    from: 5,
    to: 6,
  },
  {
    title: "3 · Databases",
    description: "Choosing, speeding up, copying, and splitting your data.",
    from: 7,
    to: 10,
  },
  {
    title: "4 · Distributed Systems",
    description: "What changes when data lives on many machines that must agree.",
    from: 11,
    to: 16,
  },
  {
    title: "5 · Async & Reliability",
    description: "Decoupling work, surviving retries, and protecting your system from overload.",
    from: 17,
    to: 19,
  },
  {
    title: "6 · Architecture",
    description: "Putting it all together.",
    from: 20,
    to: Infinity,
  },
];

export default function ConceptsPage() {
  const items = getAllConcepts().map((c) => ({
    summary: conceptSummary(c),
    order: c.frontmatter.order ?? 999,
  }));

  const sections: PathSection[] = SECTIONS.map((s) => ({
    title: s.title,
    description: s.description,
    items: items
      .filter((i) => i.order >= s.from && i.order <= s.to)
      .map((i) => i.summary),
  })).filter((s) => s.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">HLD Concepts</h1>
      <p className="mt-2 mb-10 text-neutral-600 dark:text-neutral-300">
        A guided path through the building blocks of system design. Each concept
        builds on the ones before it — start at step 1 and read in order, or
        jump in wherever you need. Every page ends with a &ldquo;Next up&rdquo;
        link so you can keep reading without coming back here.
      </p>
      <LearningPath sections={sections} />
    </div>
  );
}
