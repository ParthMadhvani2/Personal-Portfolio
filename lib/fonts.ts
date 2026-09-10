import localFont from "next/font/local";

/**
 * Self-hosted, latin subset only.
 *
 * Three registers, each with a job, which is what stops a type system reading
 * as decoration:
 *
 *   Instrument Serif  the human voice. Display headings and pull quotes.
 *   Geist             the interface. Body, UI, section titles.
 *   Geist Mono        the machine. Labels, code, counts, metadata.
 *
 * Self-hosted rather than fetched from Google: no third-party DNS lookup and
 * connection on the critical path, and the files are versioned with the site
 * instead of being a remote dependency that can change under it.
 */

export const display = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  // Matched so the fallback occupies close to the same space and the swap does
  // not shove the layout sideways.
  fallback: ["Iowan Old Style", "Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const sans = localFont({
  src: "../public/fonts/geist.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const mono = localFont({
  src: "../public/fonts/geist-mono.woff2",
  weight: "400 500",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
