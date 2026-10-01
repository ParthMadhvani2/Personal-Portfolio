import { Inter, Literata } from "next/font/google";
import localFont from "next/font/local";

/**
 * Four families, each with one job, which is what stops a type system reading
 * as decoration:
 *
 *   Inter       headings. H1, section H2s and titles, set tight at 550-600.
 *   Geist       the interface. Body, buttons, nav, demo UI.
 *   Geist Mono  the machine. Code, URLs, labels, counts, metadata.
 *   Literata    figures and the editorial aside. The three signal numbers
 *               and pull quotes, nowhere else.
 *
 * All four are self-hosted. Inter and Literata come through next/font/google,
 * which downloads them at build time and serves them from this domain, so a
 * visitor's browser never makes a request to Google; Geist and Geist Mono are
 * versioned in /public/fonts.
 */

export const display = Inter({
  subsets: ["latin"],
  // Variable axis, so the 550 the section headings use is a real weight and
  // not a synthesised one.
  weight: "variable",
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const figure = Literata({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-figure",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
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
