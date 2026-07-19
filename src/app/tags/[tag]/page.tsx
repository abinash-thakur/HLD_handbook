import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  conceptSummary,
  getAllConcepts,
  getAllQuestions,
  getAllTags,
  questionSummary,
} from "@/lib/content";
import { ContentCard } from "@/components/content/ContentCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Tagged: ${decodeURIComponent(tag)}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const items = [
    ...getAllConcepts().map(conceptSummary),
    ...getAllQuestions().map(questionSummary),
  ].filter((i) => i.tags.includes(tag));
  if (items.length === 0) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: `#${tag}` }]} />
      <h1 className="text-3xl font-bold tracking-tight">
        Tagged <span className="text-neutral-500">#{tag}</span>
      </h1>
      <p className="mt-2 mb-8 text-neutral-600 dark:text-neutral-300">
        {items.length} page{items.length === 1 ? "" : "s"} cover this topic.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ContentCard key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
}
