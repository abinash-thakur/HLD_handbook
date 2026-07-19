import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx/mdx-components";
import type { TocHeading } from "./types";

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });
  return content;
}

/** GitHub-style slugger matching rehype-slug's ids closely enough for our headings. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extract h2/h3 headings from raw MDX for the table of contents. */
export function extractHeadings(source: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let inCodeFence = false;
  for (const line of source.split("\n")) {
    if (/^```/.test(line.trim())) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^(##{1,2})\s+(.+)$/.exec(line);
    if (match) {
      const text = match[2].replace(/[*_`]/g, "").trim();
      headings.push({
        depth: match[1].length as 2 | 3,
        text,
        id: slugify(text),
      });
    }
  }
  return headings;
}
