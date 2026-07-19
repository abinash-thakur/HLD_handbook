import type { ConceptFrontmatter, QuestionFrontmatter } from "./schema";

export interface Concept {
  frontmatter: ConceptFrontmatter;
  /** Raw MDX body (without frontmatter). */
  body: string;
}

export interface Question {
  frontmatter: QuestionFrontmatter;
  body: string;
}

export type ContentKind = "concept" | "question";

/** Lightweight shape used by cards, related-content blocks, and search. */
export interface ContentSummary {
  kind: ContentKind;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  difficulty: string;
  summary: string;
  url: string;
  /** Only set for questions. */
  questionType?: "conceptual" | "case-study";
  estimatedTime?: string;
  oneLiner?: string;
}

export interface TocHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}
