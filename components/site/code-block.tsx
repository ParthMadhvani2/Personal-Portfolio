import { CopyButton } from "../craft/copy-button";

type Props = { filename: string; code: string };

/**
 * Source, shown plain. No highlighter: a portfolio that ships a 40kB tokenizer
 * to colour ten snippets has answered the wrong question. Good monospace
 * typography and a contained horizontal scroll do the job.
 */
export default function CodeBlock({ filename, code }: Props) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-bg-subtle">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="mono truncate text-[12px] text-dim">{filename}</span>
        <CopyButton value={code} label="copy" />
      </figcaption>
      {/* Wide code scrolls inside its own container; the page body never does. */}
      <div className="max-h-[420px] overflow-auto">
        <pre className="mono p-4 text-[12px] leading-[1.65] text-muted">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
