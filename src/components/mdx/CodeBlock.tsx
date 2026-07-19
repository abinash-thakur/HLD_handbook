import type { HTMLAttributes } from "react";

export function CodeBlock(props: HTMLAttributes<HTMLElement>) {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
      <code {...props} />
    </pre>
  );
}
