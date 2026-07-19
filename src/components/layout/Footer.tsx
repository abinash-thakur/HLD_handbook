import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      {SITE_NAME} — High-Level Design, explained simply.
    </footer>
  );
}
