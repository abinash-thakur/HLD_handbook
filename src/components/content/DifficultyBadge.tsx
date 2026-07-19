const styles: Record<string, string> = {
  beginner:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  intermediate:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  advanced: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
};

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        styles[difficulty] ??
        "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
      }`}
    >
      {difficulty}
    </span>
  );
}
