import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { conceptFrontmatterSchema, questionFrontmatterSchema } from "./schema";
import type { Concept, ContentSummary, Question } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONCEPTS_DIR = path.join(CONTENT_DIR, "concepts");
const QUESTIONS_DIR = path.join(CONTENT_DIR, "questions");

function mdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function loadConcept(file: string): Concept {
  const raw = fs.readFileSync(path.join(CONCEPTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = conceptFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/concepts/${file}:\n${parsed.error.message}`,
    );
  }
  if (parsed.data.slug !== file.replace(/\.mdx$/, "")) {
    throw new Error(
      `Slug "${parsed.data.slug}" does not match filename content/concepts/${file}`,
    );
  }
  return { frontmatter: parsed.data, body: content };
}

function loadQuestion(file: string): Question {
  const raw = fs.readFileSync(path.join(QUESTIONS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const parsed = questionFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/questions/${file}:\n${parsed.error.message}`,
    );
  }
  if (parsed.data.slug !== file.replace(/\.mdx$/, "")) {
    throw new Error(
      `Slug "${parsed.data.slug}" does not match filename content/questions/${file}`,
    );
  }
  return { frontmatter: parsed.data, body: content };
}

let conceptsCache: Concept[] | null = null;
let questionsCache: Question[] | null = null;

export function getAllConcepts(): Concept[] {
  if (!conceptsCache) {
    conceptsCache = mdxFiles(CONCEPTS_DIR)
      .map(loadConcept)
      .filter((c) => !c.frontmatter.draft)
      .sort(
        (a, b) =>
          (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999) ||
          a.frontmatter.title.localeCompare(b.frontmatter.title),
      );
    validateCrossLinks();
  }
  return conceptsCache;
}

export function getAllQuestions(): Question[] {
  if (!questionsCache) {
    questionsCache = mdxFiles(QUESTIONS_DIR)
      .map(loadQuestion)
      .filter((q) => !q.frontmatter.draft)
      .sort(
        (a, b) =>
          (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999) ||
          a.frontmatter.title.localeCompare(b.frontmatter.title),
      );
    validateCrossLinks();
  }
  return questionsCache;
}

/** Fails the build when a relatedConcepts/relatedQuestions slug points nowhere. */
function validateCrossLinks() {
  if (!conceptsCache || !questionsCache) return; // run once both are loaded
  const conceptSlugs = new Set(conceptsCache.map((c) => c.frontmatter.slug));
  const questionSlugs = new Set(questionsCache.map((q) => q.frontmatter.slug));
  const all = [
    ...conceptsCache.map((c) => c.frontmatter),
    ...questionsCache.map((q) => q.frontmatter),
  ];
  for (const fm of all) {
    for (const slug of fm.relatedConcepts) {
      if (!conceptSlugs.has(slug)) {
        throw new Error(
          `"${fm.slug}" references unknown concept "${slug}" in relatedConcepts`,
        );
      }
    }
    for (const slug of fm.relatedQuestions) {
      if (!questionSlugs.has(slug)) {
        throw new Error(
          `"${fm.slug}" references unknown question "${slug}" in relatedQuestions`,
        );
      }
    }
  }
}

export function getConceptBySlug(slug: string): Concept | undefined {
  return getAllConcepts().find((c) => c.frontmatter.slug === slug);
}

export function getQuestionBySlug(slug: string): Question | undefined {
  return getAllQuestions().find((q) => q.frontmatter.slug === slug);
}

export function conceptSummary(c: Concept): ContentSummary {
  const fm = c.frontmatter;
  return {
    kind: "concept",
    slug: fm.slug,
    title: fm.title,
    category: fm.category,
    tags: fm.tags,
    difficulty: fm.difficulty,
    summary: fm.summary,
    url: `/concepts/${fm.slug}`,
    oneLiner: fm.oneLiner,
  };
}

export function questionSummary(q: Question): ContentSummary {
  const fm = q.frontmatter;
  return {
    kind: "question",
    slug: fm.slug,
    title: fm.title,
    category: fm.category,
    tags: fm.tags,
    difficulty: fm.difficulty,
    summary: fm.summary,
    url: `/questions/${fm.slug}`,
    questionType: fm.type,
    estimatedTime: fm.estimatedTime,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const c of getAllConcepts()) c.frontmatter.tags.forEach((t) => tags.add(t));
  for (const q of getAllQuestions()) q.frontmatter.tags.forEach((t) => tags.add(t));
  return [...tags].sort();
}

export function getRelatedContent(fm: {
  relatedConcepts: string[];
  relatedQuestions: string[];
}): ContentSummary[] {
  const concepts = fm.relatedConcepts
    .map(getConceptBySlug)
    .filter((c): c is Concept => Boolean(c))
    .map(conceptSummary);
  const questions = fm.relatedQuestions
    .map(getQuestionBySlug)
    .filter((q): q is Question => Boolean(q))
    .map(questionSummary);
  return [...concepts, ...questions];
}
