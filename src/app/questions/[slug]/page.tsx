import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllQuestions, getQuestionBySlug, getRelatedContent } from "@/lib/content";
import { extractHeadings, renderMDX } from "@/lib/mdx";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { DifficultyBadge } from "@/components/content/DifficultyBadge";
import { RelatedContent } from "@/components/content/RelatedContent";
import { PrevNext } from "@/components/content/PrevNext";
import { questionSummary } from "@/lib/content";

export function generateStaticParams() {
  return getAllQuestions().map((q) => ({ slug: q.frontmatter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) return {};
  return {
    title: question.frontmatter.title,
    description: question.frontmatter.summary,
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = getQuestionBySlug(slug);
  if (!question) notFound();

  const all = getAllQuestions();
  const idx = all.findIndex((q) => q.frontmatter.slug === slug);
  const prev = idx > 0 ? questionSummary(all[idx - 1]) : undefined;
  const next = idx < all.length - 1 ? questionSummary(all[idx + 1]) : undefined;

  const { frontmatter } = question;
  const content = await renderMDX(question.body);
  const headings = extractHeadings(question.body);

  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-8 sm:px-6">
      <article className="min-w-0 max-w-3xl flex-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Interview Questions", href: "/questions" },
            { label: frontmatter.title },
          ]}
        />
        <header className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={frontmatter.difficulty} />
            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium capitalize text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {frontmatter.type === "case-study" ? "Case study" : "Conceptual"}
            </span>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              ⏱ {frontmatter.estimatedTime}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300">
            {frontmatter.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {content}
        </div>
        <RelatedContent items={getRelatedContent(frontmatter)} />
        <PrevNext prev={prev} next={next} />
      </article>
      <TableOfContents headings={headings} />
    </div>
  );
}
