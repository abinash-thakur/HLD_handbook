"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "var(--font-geist-sans), sans-serif",
        });
        return mermaid.render(`m-${id}`, chart);
      })
      .then((res) => {
        if (!cancelled && res) {
          setSvg(res.svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, id]);

  if (error) {
    return (
      <pre className="my-6 overflow-x-auto rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
        Mermaid diagram failed to render:{"\n"}
        {error}
      </pre>
    );
  }

  return (
    <div
      className="mermaid-diagram my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
