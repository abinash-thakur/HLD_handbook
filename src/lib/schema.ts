import { z } from "zod";
import {
  CATEGORIES,
  DIAGRAM_TYPES,
  DIFFICULTIES,
  QUESTION_TYPES,
} from "./constants";

const baseFrontmatter = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be kebab-case"),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string().min(1)).min(1),
  difficulty: z.enum(DIFFICULTIES),
  summary: z.string().min(1),
  diagramType: z.enum(DIAGRAM_TYPES).default("none"),
  relatedConcepts: z.array(z.string()).default([]),
  relatedQuestions: z.array(z.string()).default([]),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  draft: z.boolean().default(false),
});

export const conceptFrontmatterSchema = baseFrontmatter.extend({
  oneLiner: z.string().min(1),
  order: z.number().int().optional(),
});

export const questionFrontmatterSchema = baseFrontmatter.extend({
  type: z.enum(QUESTION_TYPES),
  estimatedTime: z.string().min(1),
  order: z.number().int().optional(),
});

export type ConceptFrontmatter = z.infer<typeof conceptFrontmatterSchema>;
export type QuestionFrontmatter = z.infer<typeof questionFrontmatterSchema>;
