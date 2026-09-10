import { cn } from "../../lib/cn";

type Props = {
  id?: string;
  /** Small monospace eyebrow. */
  label?: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Consistent vertical rhythm and heading structure for every page section. */
export default function Section({
  id,
  label,
  title,
  intro,
  children,
  className,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20",
        className,
      )}
    >
      {(label || title || intro) && (
        <header className="mb-8">
          {label ? <p className="label mb-3">{label}</p> : null}
          {title ? (
            <h2 className="title text-2xl sm:text-[28px] lower">{title}</h2>
          ) : null}
          {intro ? <div className="prose-body mt-3">{intro}</div> : null}
        </header>
      )}
      {children}
    </section>
  );
}
