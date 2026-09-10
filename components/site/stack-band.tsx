import Link from "next/link";
import * as Si from "react-icons/si";
import { Marquee } from "../craft/marquee";
import { Tooltip, TooltipProvider } from "../craft/tooltip";
import Section from "./section";

type Tech = {
  name: string;
  note: string;
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

/** Only things running in production in one of the products. */
const stack: Tech[] = [
  { name: "React 19", note: "Every web surface", Icon: Si.SiReact },
  { name: "TypeScript", note: "Everything, strict", Icon: Si.SiTypescript },
  { name: "TanStack Start", note: "SSR at the edge", Icon: Si.SiReactquery },
  { name: "Next.js", note: "Marketing sites, this one", Icon: Si.SiNextdotjs },
  { name: "Tailwind", note: "v4, token-driven", Icon: Si.SiTailwindcss },
  { name: "Django", note: "Django 5 + DRF", Icon: Si.SiDjango },
  { name: "Python", note: "Backend, classification", Icon: Si.SiPython },
  { name: "Celery", note: "Scheduled + queued work", Icon: Si.SiCelery },
  {
    name: "PostgreSQL",
    note: "Soft deletes, real indexes",
    Icon: Si.SiPostgresql,
  },
  { name: "Redis", note: "Broker and cache", Icon: Si.SiRedis },
  { name: "Expo", note: "SDK 53, new architecture", Icon: Si.SiExpo },
  { name: "Cloudflare", note: "Workers and R2", Icon: Si.SiCloudflare },
  { name: "OpenAI", note: "Structured outputs", Icon: Si.SiOpenai },
  { name: "Docker", note: "Multi-service compose", Icon: Si.SiDocker },
];

export default function StackBand() {
  return (
    <Section
      label="Stack"
      title="what's actually running"
      intro={
        <>
          Grouped by depth rather than breadth. Anything I&apos;ve only tinkered
          with is left off on purpose. The{" "}
          <Link
            href="/tech-i-know"
            className="text-fg underline decoration-line underline-offset-4 transition-colors duration-fast ease-out hover:decoration-accent"
          >
            full list is here
          </Link>
          .
        </>
      }
    >
      <TooltipProvider>
        <Marquee speed={52} className="py-1">
          {stack.map(({ name, note, Icon }) => (
            <Tooltip key={name} label={name} description={note} side="bottom">
              <span
                className="flex h-11 items-center gap-2.5 rounded-md border border-line bg-surface px-3.5 text-[13px] text-muted transition-[background-color,color,transform] duration-fast ease-out hover:bg-surface-hover hover:text-fg"
                aria-label={`${name}: ${note}`}
              >
                <Icon size={16} aria-hidden />
                {name}
              </span>
            </Tooltip>
          ))}
        </Marquee>
      </TooltipProvider>
    </Section>
  );
}
