/**
 * Long-form pieces, as opposed to the three-sentence notes.
 *
 * The format exists for one reason: an article about an interaction should
 * contain the interaction. Explaining a curve in prose and linking to a demo
 * on another page asks the reader to hold the idea in their head while they
 * navigate. Putting the demo in the paragraph does not.
 */

export type Block =
  | { t: "h2"; s: string }
  | { t: "p"; s: string }
  | { t: "aside"; s: string }
  | { t: "demo"; id: string; caption?: string }
  | { t: "code"; file?: string; s: string };

export type Article = {
  slug: string;
  title: string;
  /** One line, used in listings, RSS and the OG card. */
  summary: string;
  date: string;
  tags: string[];
  /** Minutes, rounded. Honest, not padded. */
  read: number;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "the-squircle-done-properly",
    title: "The squircle, done properly",
    summary:
      "An iOS icon is not a rounded rectangle. It is a superellipse, and almost every web implementation copies bezier constants nobody has checked. Here is the equation, and the clipping bug that made me abandon SVG.",
    date: "2026-09",
    tags: ["css", "type", "motion"],
    read: 7,
    blocks: [
      {
        t: "p",
        s: "Put an iOS app icon next to a `border-radius` rectangle of the same corner size and something is off. Most people cannot name it. The rectangle looks very slightly pinched at the corners, as though the curve arrives late and leaves early.",
      },
      {
        t: "p",
        s: "It does. A rounded rectangle is a straight edge joined to a circular arc. At the join, curvature jumps from zero to a constant in one step. The eye is extremely good at reading curvature discontinuity even when it cannot articulate it. Apple's icon shape has no such join, because it is not two shapes glued together. It is one continuous curve.",
      },
      {
        t: "demo",
        id: "seam",
        caption:
          "The same corner radius, drawn both ways. The difference is small and it does not go away once you have seen it.",
      },
      { t: "h2", s: "It is a superellipse" },
      {
        t: "p",
        s: "The shape is a Lamé curve: `|x|ⁿ + |y|ⁿ = 1`. At `n = 2` you get an ellipse. As `n` grows the curve pushes out toward its bounding box and the corners tighten without ever forming a join. iOS icons sit around `n = 4.5`.",
      },
      {
        t: "demo",
        id: "exponent",
        caption:
          "Drag the exponent. Everything between a circle and a square, with continuous curvature the whole way.",
      },
      {
        t: "p",
        s: "Most web implementations of this copy a string of bezier control points from a blog post. That works, but nobody who pastes it can tell you whether it is right, and the exponent stops being a dial you can turn. Sampling the equation directly costs about fifteen lines and gives you a shape you can verify.",
      },
      {
        t: "code",
        file: "superellipse.ts",
        s: `function superellipse(n: number, steps: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    const ct = Math.cos(t);
    const st = Math.sin(t);
    pts.push([
      50 + Math.sign(ct) * Math.abs(ct) ** (2 / n) * 50,
      50 + Math.sign(st) * Math.abs(st) ** (2 / n) * 50,
    ]);
  }
  return pts;
}`,
      },
      {
        t: "p",
        s: "Every point this returns satisfies the equation to within floating-point error. I checked, because a shape you cannot check is a shape you are trusting on someone else's word.",
      },
      { t: "h2", s: "The SVG clipPath trap" },
      {
        t: "p",
        s: "My first version rendered an SVG `<clipPath>` and pointed `clip-path: url(#id)` at it. The component was self-contained: the `<defs>` lived inside the element it clipped, so there was nothing to wire up.",
      },
      {
        t: "p",
        s: "Every icon rendered blank.",
      },
      {
        t: "p",
        s: "The definition was inside the subtree being clipped, so the browser clipped away the very thing describing the clip. It is circular, and the resolution is to draw nothing. The obvious fix, hoisting the `<svg>` to a sibling, trades one bug for another: a zero-size element that a flex or grid parent still counts as a child.",
      },
      {
        t: "aside",
        s: "This is the failure mode worth remembering. It did not throw, it did not warn, and it looked exactly like a styling mistake.",
      },
      { t: "h2", s: "Use a polygon instead" },
      {
        t: "p",
        s: "`clip-path: polygon()` takes percentages, and percentages resolve against the element's own box. One string scales to any size with no measuring, no resize observer, and no `path()` carrying baked-in pixel coordinates that break the moment the box changes. No extra DOM node, no ids, nothing to collide.",
      },
      {
        t: "code",
        file: "squircle.ts",
        s: `export function squirclePolygon(n = 4.5, steps = 64) {
  return \`polygon(\${superellipse(n, steps)
    .map(([x, y]) => \`\${x.toFixed(3)}% \${y.toFixed(3)}%\`)
    .join(",")})\`;
}`,
      },
      {
        t: "p",
        s: "The obvious objection is that a polygon is straight lines, and this is a curve. So measure it. At 64 samples the chord midpoints sit about 0.04px inside the true curve at icon size, and 0.09px at 180px. That is under a device pixel even at 3× density. The curve you cannot draw and the curve you did draw are the same curve as far as any screen is concerned.",
      },
      {
        t: "demo",
        id: "accuracy",
        caption:
          "Deviation from the true curve as sample count rises. Past 64 you are paying bytes for error you cannot display.",
      },
      { t: "h2", s: "Where it earns its keep" },
      {
        t: "p",
        s: "Product icons, mostly. The shelf on my home page shows five real app icons, and one of them ships as a hard-cornered square. Clipping every tile to the same superellipse means that one does not read as the odd one out, and the whole row looks like it was drawn by one person.",
      },
      {
        t: "p",
        s: "It is a small thing. It is also the kind of small thing that, in aggregate, is the entire difference between an interface that feels considered and one that does not.",
      },
      {
        t: "demo",
        id: "shelf",
        caption: "Toggle the clip to see which tile gives it away.",
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
