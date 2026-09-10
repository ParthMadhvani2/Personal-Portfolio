import { cn } from "../../lib/cn";
import { Reveal } from "../craft/reveal";

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
        <Reveal as="div" className="mb-8">
          <header>
            {label ? <p className="label mb-3">{label}</p> : null}
            {title ? (
              <h2 className="display text-[clamp(1.9rem,4vw,2.6rem)] lower">
                {title}
              </h2>
            ) : null}
            {intro ? <div className="prose-body mt-3">{intro}</div> : null}
          </header>
        </Reveal>
      )}
      {/* The body follows a beat behind its heading, so the eye lands on the
          title first rather than on both at once. */}
      <Reveal index={1}>{children}</Reveal>
    </section>
  );
}
