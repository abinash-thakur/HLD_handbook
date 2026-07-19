import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-neutral-900 hover:underline dark:hover:text-neutral-100">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700 dark:text-neutral-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
