import type { ReactNode } from "react";

type CalloutType = "info" | "tip" | "warning";

const styles: Record<CalloutType, { box: string; label: string }> = {
  info: {
    box: "border-sky-300 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40",
    label: "💡 Note",
  },
  tip: {
    box: "border-emerald-300 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/40",
    label: "✅ Interview tip",
  },
  warning: {
    box: "border-amber-300 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40",
    label: "⚠️ Watch out",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <aside className={`my-6 rounded-lg border px-4 py-3 text-sm ${s.box}`}>
      <p className="mb-1 font-semibold">{title ?? s.label}</p>
      <div className="[&>p]:m-0 [&>p+p]:mt-2">{children}</div>
    </aside>
  );
}
