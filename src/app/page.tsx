import Link from "next/link";
import { conceptSummary, getAllConcepts, getAllQuestions, questionSummary } from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { SITE_NAME } from "@/lib/constants";

export default function HomePage() {
  const concepts = getAllConcepts();
  const questions = getAllQuestions();
  const startHere = [
    ...concepts.slice(0, 3).map(conceptSummary),
    ...questions
      .filter((q) => q.frontmatter.type === "case-study")
      .slice(0, 3)
      .map(questionSummary),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="py-16 text-center sm:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          High-Level Design, explained{" "}
          <span className="underline decoration-amber-400 decoration-4 underline-offset-4">
            simply
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          {SITE_NAME} teaches system design the way you wish it was taught:
          plain English, a diagram for every idea, and the exact follow-up
          questions interviewers ask.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/concepts"
            className="rounded-lg bg-neutral-900 px-5 py-2.5 font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Browse {concepts.length} concepts
          </Link>
          <Link
            href="/questions"
            className="rounded-lg border border-neutral-300 px-5 py-2.5 font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            {questions.length} interview questions
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Start here</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {startHere.map((item) => (
            <ContentCard key={item.url} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
