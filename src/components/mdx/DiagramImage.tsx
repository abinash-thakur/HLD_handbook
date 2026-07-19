interface DiagramImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function DiagramImage({ src, alt, caption }: DiagramImageProps) {
  if (!alt) {
    // Pages are statically generated, so this fails `next build` — a cheap
    // accessibility guardrail that keeps every diagram described in text.
    throw new Error(`DiagramImage "${src}" is missing required alt text`);
  }
  return (
    <figure className="my-6">
      {/* Plain <img>: diagram SVGs are static assets with unknown intrinsic sizes */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="mx-auto rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
