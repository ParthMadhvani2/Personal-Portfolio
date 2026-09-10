import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export type Face = { weight: 400 | 800; data: ArrayBuffer };

let fontCache: Promise<Face[]> | null = null;

/**
 * Loads real Manrope faces for the card. Without them ImageResponse cannot
 * synthesise weight, and every title renders at regular — the wrong impression
 * for a card about interface craft. Both weights are loaded, or the whole card
 * ends up bold including its body copy.
 *
 * Fetched once per build and cached. If the network is unavailable the card
 * falls back to the default face rather than failing the build.
 */
export async function faces(): Promise<Face[]> {
  if (!fontCache) {
    fontCache = (async () => {
      const load = async (weight: 400 | 800): Promise<Face | null> => {
        try {
          // An old user-agent makes the CSS API return TTF rather than WOFF2,
          // which is the only format ImageResponse accepts.
          const css = await fetch(
            `https://fonts.googleapis.com/css2?family=Manrope:wght@${weight}`,
            { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
          ).then((r) => r.text());
          const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
          if (!url) return null;
          return {
            weight,
            data: await fetch(url).then((r) => r.arrayBuffer()),
          };
        } catch {
          return null;
        }
      };
      const loaded = await Promise.all([load(400), load(800)]);
      return loaded.filter((f): f is Face => f !== null);
    })();
  }
  return fontCache;
}

type Args = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Small monospace chips along the bottom. */
  tags?: string[];
};

/**
 * One renderer for every route's social card, so a new page cannot ship with a
 * missing or mismatched preview. Generated at build time into static PNGs.
 *
 * Deliberately dark and typographic: the card is read at thumbnail size in a
 * feed, so it carries three things — who, what, and one line of why.
 */
export async function ogImage({ eyebrow, title, subtitle, tags = [] }: Args) {
  const loaded = await faces();
  const hasFont = loaded.length === 2;
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#08080a",
        padding: "64px 72px",
        fontFamily: hasFont ? "Manrope" : "sans-serif",
        fontWeight: 400,
      }}
    >
      {/* accent hairline along the top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "#3b82f6",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: "#f5f5f7",
            color: "#08080a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          pm
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 19,
            fontWeight: 500,
            color: "#8a8a94",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 26 ? 74 : 92,
            fontWeight: 800,
            color: "#f5f5f7",
            letterSpacing: -3,
            lineHeight: 1.02,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
            lineHeight: 1.35,
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {tags.slice(0, 5).map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: "1px solid #232329",
                background: "#121216",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 19,
                color: "#8a8a94",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#8a8a94" }}>
          Parth Madhvani
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: hasFont
        ? loaded.map((f) => ({
            name: "Manrope",
            data: f.data,
            weight: f.weight,
            style: "normal" as const,
          }))
        : undefined,
    },
  );
}
