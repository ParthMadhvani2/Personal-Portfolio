"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { site } from "../../data/site";

/**
 * His local time, ticking once a minute rather than once a second. Nobody needs
 * the seconds, and a per-second interval is 60× the renders for a number the
 * eye reads as identical.
 */
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const read = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: site.timezone,
        }).format(new Date()),
      );
    read();
    const id = setInterval(read, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={cn("font-mono text-[11px] text-dim tnum", className)}>
      {/* Reserve the slot so the footer does not shift when the time arrives. */}
      <span className={time ? "" : "opacity-0"}>{time ?? "00:00"}</span> local
    </p>
  );
}
