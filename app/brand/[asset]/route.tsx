import { ImageResponse } from "next/og";
import { faces } from "../../../lib/og";
import fs from "node:fs";
import path from "node:path";

/**
 * Social banners, generated rather than exported from a design tool, so they
 * cannot drift from the site's tokens and can be regenerated after any change.
 *
 * The layout is built around the fact that both LinkedIn and X drop the avatar
 * over the lower-left corner: nothing meaningful goes there.
 */

export const dynamic = "force-static";

const SPECS = {
  // LinkedIn crops to roughly 1584×396 on desktop and squeezes the sides on
  // mobile, so the message stays well inside the middle.
  "linkedin.png": { w: 1584, h: 396, avatar: 300 },
  "x.png": { w: 1500, h: 500, avatar: 260 },
} as const;

export function generateStaticParams() {
  return Object.keys(SPECS).map((asset) => ({ asset }));
}

/** The mark's own curve: an underdamped spring coming to rest. */
function springPath(
  w: number,
  h: number,
  amp: number,
  cycles = 1.9,
  zeta = 0.19,
) {
  const omega = 1.55;
  const T = (cycles * 2 * Math.PI) / omega;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const u = i / 120;
    const t = u * T;
    const y =
      h / 2 -
      amp *
        Math.exp(-zeta * omega * t) *
        Math.cos(omega * Math.sqrt(1 - zeta * zeta) * t);
    pts.push(`${(u * w).toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

function dataUri(svg: string) {
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function iconDataUri(file: string) {
  const p = path.join(process.cwd(), "public", "brand", "icons", file);
  const buf = fs.readFileSync(p);
  const mime = file.endsWith(".svg") ? "image/svg+xml" : "image/png";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export async function GET(
  _req: Request,
  { params }: { params: { asset: string } },
) {
  const spec = SPECS[params.asset as keyof typeof SPECS];
  if (!spec) return new Response("Not found", { status: 404 });

  const { w, h, avatar } = spec;
  const loaded = await faces();
  const hasFont = loaded.length === 2;
  // The text occupies the band between the avatar and the first icon, so the
  // two can never collide however the headline wraps.
  const textW = 0.63 * w - avatar - h * 0.28;
  const curve = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <polyline points="${springPath(w, h, h * 0.17)}" fill="none" stroke="#333947" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`;

  const icons = [
    "embers.png",
    "hoodcleaningreport.png",
    "snapcount.png",
    "outboundqa.svg",
  ].map(iconDataUri);

  // Sit the icons on the curve itself, spread across the right two-thirds.
  const amp = h * 0.17;
  const omega = 1.55;
  const zeta = 0.19;
  const T = (1.9 * 2 * Math.PI) / omega;
  const at = (u: number) => {
    const t = u * T;
    return (
      h / 2 -
      amp *
        Math.exp(-zeta * omega * t) *
        Math.cos(omega * Math.sqrt(1 - zeta * zeta) * t)
    );
  };
  const tile = Math.round(h * 0.17);

  return new ImageResponse(
    <div
      style={{
        width: w,
        height: h,
        display: "flex",
        background: "#08080a",
        position: "relative",
        fontFamily: hasFont ? "Manrope" : "sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUri(curve)}
        width={w}
        height={h}
        style={{ position: "absolute", left: 0, top: 0 }}
        alt=""
      />

      {icons.map((src, i) => {
        const u = 0.62 + i * 0.093;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            width={tile}
            height={tile}
            alt=""
            style={{
              position: "absolute",
              left: u * w - tile / 2,
              top: at(u) - tile / 2,
              borderRadius: tile * 0.26,
            }}
          />
        );
      })}

      <div
        style={{
          position: "absolute",
          left: avatar,
          top: h * 0.24,
          width: textW,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            width: textW,
            fontSize: h * 0.1,
            fontWeight: 800,
            color: "#f5f5f7",
            letterSpacing: -1.6,
            lineHeight: 1.12,
          }}
        >
          From messy problem to working product.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: h * 0.075,
            fontSize: h * 0.05,
            fontWeight: 400,
            color: "#8a8a94",
          }}
        >
          Design engineer · four products shipped
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: h * 0.09,
          bottom: h * 0.09,
          display: "flex",
          fontSize: h * 0.042,
          color: "#5c5c66",
          letterSpacing: 2,
        }}
      >
        PARTHMADHVANI2.VERCEL.APP
      </div>
    </div>,
    {
      width: w,
      height: h,
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
