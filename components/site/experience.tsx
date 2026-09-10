import { ArrowUpRight } from "lucide-react";
import data from "../../data/experience.json";
import Section from "./section";

type Role = {
  experienceTitle: string;
  experienceDescription: string[];
  experienceOrg: { name: string; link: string; websiteDisplayName: string };
  experienceStatus: { startAt: string; endAt: string };
};

const roles: Role[] = (data as { details: Role[] }[])[0].details;

export default function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="where i've shipped"
      intro="Product studios, an early-stage startup and contract work. The through-line is scope: I keep ending up on the parts nobody else wants to own."
    >
      <ol className="relative">
        {/* The rail. A single absolutely-positioned hairline rather than a
            border per row, so it stays continuous across gaps. */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[7px] top-3 w-px bg-line sm:left-[7px]"
        />

        {roles.map((r, i) => {
          const current = r.experienceStatus.endAt.toLowerCase() === "present";
          return (
            <li
              key={`${r.experienceOrg.name}-${i}`}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden
                className={
                  current
                    ? "absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-live bg-bg"
                    : "absolute left-[3px] top-[11px] h-[9px] w-[9px] rounded-full border border-line-strong bg-bg"
                }
              >
                {current ? (
                  <span className="h-[5px] w-[5px] rounded-full bg-live" />
                ) : null}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="title text-[17px]">{r.experienceTitle}</h3>
                {r.experienceOrg.link !== "#" ? (
                  <a
                    href={r.experienceOrg.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-0.5 text-[14px] text-accent transition-opacity duration-fast ease-out hover:opacity-80"
                  >
                    {r.experienceOrg.name}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-fast ease-out group-hover:-translate-y-px group-hover:translate-x-px"
                    />
                  </a>
                ) : (
                  <span className="text-[14px] text-muted">
                    {r.experienceOrg.name}
                  </span>
                )}
                <span className="mono ml-auto text-[11px] text-dim tnum">
                  {r.experienceStatus.startAt} to {r.experienceStatus.endAt}
                </span>
              </div>

              <ul className="mt-3 space-y-2">
                {r.experienceDescription.map((d, j) => (
                  <li
                    key={j}
                    className="relative pl-4 text-[14px] leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-line-strong"
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
