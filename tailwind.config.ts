import type { Config } from "tailwindcss";

/**
 * Every colour here resolves to a CSS variable defined in globals.css, so a
 * single token swap re-themes the whole site and both themes stay in sync.
 * No raw hex is allowed in a component.
 */
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-subtle": "rgb(var(--bg-subtle) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
        line: "rgb(var(--border) / <alpha-value>)",
        "line-strong": "rgb(var(--border-strong) / <alpha-value>)",
        fg: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        dim: "rgb(var(--text-dim) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "var(--accent-soft)",
        "accent-fg": "rgb(var(--accent-fg) / <alpha-value>)",
        live: "rgb(var(--live) / <alpha-value>)",
        well: "rgb(var(--well) / <alpha-value>)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
        drawer: "var(--ease-drawer)",
      },
      transitionDuration: {
        fast: "120ms",
        DEFAULT: "180ms",
        slow: "260ms",
      },
      fontFamily: {
        sans: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      maxWidth: {
        content: "1120px",
        prose: "68ch",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
export default config;
