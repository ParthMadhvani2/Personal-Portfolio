import { cn } from "../../lib/cn";

type Props = {
  children: React.ReactNode;
  /** `live` gets the pulsing ring; the rest are static dots. */
  tone?: "live" | "neutral" | "accent";
  className?: string;
};

/**
 * A small labelled status dot.
 *
 * The pulse is a pseudo-element ring rather than an animation on the dot
 * itself, so the dot stays crisp and the ring can be dropped entirely under
 * reduced motion without the dot vanishing with it. Status is never carried by
 * colour alone — the label always says what the colour means.
 */
export function StatusPill({ children, tone = "neutral", className }: Props) {
  const color =
    tone === "live" ? "bg-live" : tone === "accent" ? "bg-accent" : "bg-dim";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface",
        "py-1 pl-2.5 pr-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted",
        className,
      )}
    >
      <span className="relative grid h-1.5 w-1.5 place-items-center">
        <span className={cn("h-1.5 w-1.5 rounded-full", color)} />
        {tone === "live" ? (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-full motion-reduce:hidden",
              color,
            )}
            style={{ animation: "pulse-ring 2.4s var(--ease-out) infinite" }}
          />
        ) : null}
      </span>
      {children}
    </span>
  );
}

export default StatusPill;
