import type { ComponentProps, ReactElement, ReactNode } from "react";
import { isValidElement } from "react";
import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { DiagramImage } from "./DiagramImage";
import { MermaidDiagram } from "./MermaidDiagram";

/**
 * Fenced code blocks arrive as <pre><code className="language-x">…</code></pre>.
 * ```mermaid blocks are routed to the client-side Mermaid renderer; everything
 * else gets the styled CodeBlock.
 */
function Pre({ children, ...rest }: ComponentProps<"pre">) {
  if (isValidElement(children)) {
    const code = children as ReactElement<{
      className?: string;
      children?: ReactNode;
    }>;
    const className = code.props.className ?? "";
    if (className.includes("language-mermaid")) {
      return <MermaidDiagram chart={String(code.props.children).trim()} />;
    }
    return <CodeBlock {...code.props} />;
  }
  return <pre {...rest}>{children}</pre>;
}

export const mdxComponents = {
  pre: Pre,
  Callout,
  DiagramImage,
};
