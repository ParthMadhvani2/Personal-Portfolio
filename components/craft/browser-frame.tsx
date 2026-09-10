import Image from "next/image";
import { cn } from "../../lib/cn";
import { Squircle } from "./squircle";

type Props = {
  src: string;
  alt: string;
  /** Shown in the chrome bar. Also the accessible caption. */
  url: string;
  /** Width and height of the source, used to reserve the box. */
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

/**
 * A screenshot in a browser frame.
 *
 * Deliberately without the three coloured traffic lights. They are the part of
 * this pattern that has become decoration: they say "this is a mockup" more
 * than they say "this is a real site". A single chrome bar carrying the actual
 * URL does the useful half of the job, which is telling the reader this is a
 * live page they can go and check.
 *
 * The aspect ratio is fixed and the intrinsic size is declared, so the box is
 * reserved before the image arrives and nothing below it jumps. A screenshot
 * that shifts the page while loading undoes the point of showing it.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  width = 1600,
  height = 1000,
  priority = false,
  className,
}: Props) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <Squircle
          as="span"
          className="h-3 w-3 shrink-0 bg-line-strong"
          aria-hidden
        />
        <span className="mono truncate text-[11px] text-dim">{url}</span>
      </div>

      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1100px"
          className="object-cover object-top"
          priority={priority}
          // Below the fold on every page that uses it, so it waits its turn
          // rather than competing with the text for the first paint.
          loading={priority ? undefined : "lazy"}
        />
      </div>
    </figure>
  );
}

export default BrowserFrame;
