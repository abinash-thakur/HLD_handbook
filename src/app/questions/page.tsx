import type { Metadata } from "next";
import { getAllQuestions, questionSummary } from "@/lib/content";
import { LearningPath, type PathSection } from "@/components/content/LearningPath";

export const metadata: Metadata = {
  title: "Interview Questions — Practice Path",
  description:
    "HLD interview questions in a guided order — fundamentals first, then case studies from easiest to hardest.",
};

export default function QuestionsPage() {
  const questions = getAllQuestions();
  const sections: PathSection[] = [
    {
      title: "1 · Fundamentals — Answer These First",
      description:
        "The conceptual questions interviewers use to warm up. Master these before the case studies — they reappear inside every design discussion.",
      items: questions
        .filter((q) => q.frontmatter.type === "conceptual")
        .map(questionSummary),
    },
    {
      title: "2 · Case Studies — Easiest to Hardest",
      description:
        "Full \"design X\" walkthroughs, ordered so each one adds a new idea on top of the previous: start with the URL shortener and work down.",
      items: questions
        .filter((q) => q.frontmatter.type === "case-study")
        .map(questionSummary),
    },
  ].filter((s) => s.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Interview Questions</h1>
      <p className="mt-2 mb-10 text-neutral-600 dark:text-neutral-300">
        A practice path, not a random pile: fundamentals first, then case
        studies in increasing difficulty. Each page ends with a &ldquo;Next
        up&rdquo; link so you can work straight through.
      </p>
      <LearningPath sections={sections} />
    </div>
  );
}
