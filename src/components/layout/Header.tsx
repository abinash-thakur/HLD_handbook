import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchButton } from "@/components/search/SearchDialog";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="text-base font-bold tracking-tight">
          📐 {SITE_NAME}
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-neutral-600 sm:flex dark:text-neutral-300">
          <Link href="/concepts" className="hover:text-neutral-950 dark:hover:text-white">
            Concepts
          </Link>
          <Link href="/questions" className="hover:text-neutral-950 dark:hover:text-white">
            Interview Questions
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
