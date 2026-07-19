# Adding Content

All content is MDX in `content/`. Adding a page = adding one file — routes, sidebar,
filters, tags, search, and related-content links all update automatically at build time.

## Quick start

1. Copy a template from `content/_templates/` into `content/concepts/` or `content/questions/`.
2. Rename the file to your slug (kebab-case). **The filename must equal the `slug` field** — the build fails otherwise.
3. Fill in the frontmatter and body, set `draft: false`.
4. `npm run dev` and check your page at `/concepts/<slug>` or `/questions/<slug>`.

## Frontmatter rules (enforced by `src/lib/schema.ts` at build time)

- `category` must be one of the values in `src/lib/constants.ts` (add new ones there first).
- `difficulty`: `beginner` | `intermediate` | `advanced`.
- Questions also need `type` (`conceptual` | `case-study`) and `estimatedTime`.
- `relatedConcepts` / `relatedQuestions` must reference **existing slugs** — a typo fails
  `npm run build` on purpose. These power the "Related reading" cards; don't hand-link
  related pages in the body.
- `lastUpdated`: `YYYY-MM-DD`.

## Page structure

Keep the section headings from the templates (Analogy / How It Works / Deep Dive… for
concepts; Problem Statement / Clarifying Questions / Requirements / High-Level Design…
for questions). The right-rail table of contents is generated from `##`/`###` headings.

Style: simple English first — every concept opens with a plain-language analogy before
any jargon. Every page should have at least one diagram.

## Diagrams

**Mermaid (default):** write a fenced code block with the `mermaid` language tag; it
renders client-side and adapts to dark mode automatically.

**Hand-drawn (Excalidraw etc.):** export as SVG to
`public/diagrams/{concepts|questions}/<slug>/<name>.svg` and embed with:

```mdx
<DiagramImage
  src="/diagrams/concepts/my-slug/overview.svg"
  alt="Required — describe what the diagram shows"
  caption="Optional caption"
/>
```

Missing `alt` text fails the production build (accessibility guardrail). Keep the
editable `.excalidraw` source in `content/diagram-sources/` (not shipped).

**Callouts:** `<Callout type="info|tip|warning" title="Optional">…</Callout>`.

## Search

`public/search-index.json` is regenerated from frontmatter on every `npm run dev` /
`npm run build` (see `scripts/build-search-index.mjs`) — nothing to do manually.
