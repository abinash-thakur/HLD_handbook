"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import Fuse from "fuse.js";
import type { ContentSummary } from "@/lib/types";

let indexPromise: Promise<ContentSummary[]> | null = null;
function loadIndex(): Promise<ContentSummary[]> {
  indexPromise ??= fetch("/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  return indexPromise;
}

export function SearchButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 items-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm text-neutral-500 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
      >
        <span aria-hidden>🔍</span>
        <span className="hidden sm:inline">Search…</span>
        <kbd className="hidden rounded border border-neutral-300 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 sm:inline dark:border-neutral-700">
          Ctrl K
        </kbd>
      </button>
      {open && <SearchPalette onClose={() => setOpen(false)} />}
    </>
  );
}

function SearchPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [items, setItems] = useState<ContentSummary[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadIndex().then(setItems);
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 3 },
          { name: "tags", weight: 2 },
          { name: "category", weight: 1.5 },
          { name: "summary", weight: 1 },
        ],
        threshold: 0.35,
      }),
    [items],
  );

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : items.slice(0, 8);

  const go = useCallback(
    (url: string) => {
      onClose();
      router.push(url);
    },
    [onClose, router],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh]"
      onClick={onClose}
    >
      <Command
        label="Search concepts and questions"
        shouldFilter={false}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-900"
      >
        <Command.Input
          autoFocus
          value={query}
          onValueChange={setQuery}
          placeholder="Search concepts and interview questions…"
          className="w-full border-b border-neutral-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-neutral-400 dark:border-neutral-700"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-neutral-500">
            No results found.
          </Command.Empty>
          {results.map((item) => (
            <Command.Item
              key={item.url}
              value={item.url}
              onSelect={() => go(item.url)}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800"
            >
              <span className="mr-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
                {item.kind === "concept" ? "Concept" : "Question"}
              </span>
              <span className="font-medium">{item.title}</span>
              <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400">
                {item.summary}
              </p>
            </Command.Item>
          ))}
        </Command.List>
      </Command>
    </div>
  );
}
