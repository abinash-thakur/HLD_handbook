// Generates public/search-index.json from content/ frontmatter.
// Runs as the npm "prebuild"/"predev" step so the client search palette
// always has a fresh static index — no server-side search service needed.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();

function collect(dir, kind, urlPrefix) {
  const abs = path.join(root, "content", dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => matter(fs.readFileSync(path.join(abs, f), "utf8")).data)
    .filter((fm) => !fm.draft)
    .map((fm) => ({
      kind,
      slug: fm.slug,
      title: fm.title,
      category: fm.category,
      tags: fm.tags ?? [],
      difficulty: fm.difficulty,
      summary: fm.summary,
      url: `${urlPrefix}/${fm.slug}`,
    }));
}

const index = [
  ...collect("concepts", "concept", "/concepts"),
  ...collect("questions", "question", "/questions"),
];

const out = path.join(root, "public", "search-index.json");
fs.writeFileSync(out, JSON.stringify(index));
console.log(`search-index.json: ${index.length} entries`);
