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
  /** Craft component id this piece is about, if there is one. */
  component?: string;
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "throwing-a-sheet",
    title: "Throwing a sheet",
    summary:
      "A drawer that snaps to whichever end is closer feels wrong and most people cannot say why. The fix is to animate to where the gesture was going, using the projection function from Apple's own sample code.",
    date: "2026-09",
    tags: ["motion", "gesture", "ios"],
    read: 9,
    component: "sheet",
    blocks: [
      {
        t: "p",
        s: "Drag a bottom sheet halfway down and let go. Most implementations measure how far you got, compare it to a threshold, and either finish the dismissal or spring back. It works. It also feels subtly wrong, and the reason is that distance is the wrong question.",
      },
      {
        t: "p",
        s: "A short, fast flick and a long, slow drag can end at the same point. One of them clearly meant go away and the other clearly meant let me look again. A threshold on distance cannot tell them apart, so half the time it does the opposite of what you asked.",
      },
      {
        t: "demo",
        id: "threshold",
        caption:
          "Same release point, opposite intent. Distance alone cannot separate them.",
      },
      { t: "h2", s: "Animate to where it was going" },
      {
        t: "p",
        s: "The answer is to stop asking where the finger stopped and ask where the content would come to rest if it kept decelerating. That is exactly what a scroll view computes, and Apple published the function in the Designing Fluid Interfaces sample code.",
      },
      {
        t: "code",
        file: "project.ts",
        s: "// decelerationRate ~0.998 for a normal scroll feel, 0.99 for snappier.\nexport function project(velocity: number, decelerationRate = 0.998) {\n  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);\n}",
      },
      {
        t: "p",
        s: "It is worth noticing what this is not. The physics-textbook answer for how far something travels under constant deceleration is `v squared over 2a`. That is not what ships in iOS, and using it gives noticeably different distances. The real thing is exponential decay, and it is two lines.",
      },
      {
        t: "demo",
        id: "projection",
        caption:
          "Release velocity against projected landing. Below the line it springs back, above it the sheet goes, whatever the distance was.",
      },
      {
        t: "p",
        s: "With projection, the decision is one comparison against the point the gesture was headed for, not the point it happened to stop at. A flick from near the top dismisses because it was going to end up past the bottom. A slow drag to halfway springs back because it was going to stop right there.",
      },
      { t: "h2", s: "Hand the velocity over" },
      {
        t: "p",
        s: "Deciding the destination is half of it. The other half is that the animation has to start at the speed the finger was already moving, or there is a visible seam at the moment of release: the content is travelling, then for one frame it is not, then it is again.",
      },
      {
        t: "code",
        file: "release.ts",
        s: "const dt = Math.max(1, last.t - first.t);\nconst velocity = ((last.y - first.y) / dt) * 1000; // px/s\n\nconst landing = y.current + project(velocity);\nconst dismiss =\n  velocity > CLOSE_VELOCITY ||\n  (velocity > -CLOSE_VELOCITY && landing > height * CLOSE_FRACTION);\n\n// The spring picks up exactly where the finger left off.\ny.set(dismiss ? height : 0, { velocity });",
      },
      {
        t: "p",
        s: "This is also why the motion cannot be a CSS transition. A transition starts from wherever it starts and takes the time it was told, with no knowledge of how fast anything was moving. A spring takes an initial velocity because a spring is a simulation, not a schedule.",
      },
      { t: "h2", s: "Resist, do not stop" },
      {
        t: "p",
        s: "Drag the sheet up, past its open position. There is nothing above it, so the obvious move is to clamp: refuse to go further. That reads as frozen, and a frozen interface reads as broken.",
      },
      {
        t: "p",
        s: "Real objects slow before they stop. Rubber-banding applies resistance that grows the further past the boundary you push, so the sheet keeps answering the finger while making it obvious there is nothing more here.",
      },
      {
        t: "demo",
        id: "rubberband",
        caption:
          "Six hundred pixels of drag becomes a hundred and eighty of movement, and never quite stops moving.",
      },
      { t: "h2", s: "It has to be grabbable mid-flight" },
      {
        t: "p",
        s: "Start a dismissal, then catch the sheet before it lands. It should follow your finger again from wherever it currently is on screen. This is the single detail that most separates a sheet that feels physical from one that feels like a video of a sheet.",
      },
      {
        t: "p",
        s: "Getting it right is mostly about anchoring the drag to the presentation value, the number currently painted, rather than the logical target. Grab a sheet animating to `y = 400` and if you anchor to 400 it jumps there in one frame.",
      },
      {
        t: "aside",
        s: "One trap worth naming: `setPointerCapture` throws `NotFoundError` if the pointer is no longer active, which happens with synthetic events and when the OS cancels a pointer between the event firing and the handler running. Unguarded, that exception kills the drag before it starts.",
      },
      {
        t: "demo",
        id: "sheet",
        caption:
          "Flick it. Drag it slowly to halfway and release. Pull up past the top. Grab it while it is closing.",
      },
      { t: "h2", s: "What it costs" },
      {
        t: "p",
        s: "About 180 lines, no dependencies, and a small spring you can read in one sitting. The physics is checkable: at `bounce: 0` it settles with zero overshoot, at `0.2` it overshoots by 1.1%, and it settles identically at 30fps and 60fps because the integration sub-steps.",
      },
      {
        t: "p",
        s: "None of which the user will notice, which is the point. They will notice that it feels like something they can throw.",
      },
    ],
  },
  {
    slug: "the-token-that-painted-nothing",
    title: "The token that painted nothing",
    summary:
      "My sticky nav had a translucent background for weeks. It also had no background at all. Storing colours as hex in CSS variables makes every Tailwind opacity modifier compile to invalid CSS, and nothing anywhere tells you.",
    date: "2026-09",
    tags: ["css", "tooling"],
    read: 5,
    blocks: [
      {
        t: "p",
        s: "The nav bar on this site is a translucent layer with content scrolling underneath. `bg-bg/70`, a backdrop blur, a hairline. Standard.",
      },
      {
        t: "p",
        s: "It was completely transparent, and had been for weeks. I only found it because I was measuring something else and printed the computed style.",
      },
      {
        t: "demo",
        id: "tokenbug",
        caption:
          "Both swatches ask for 90% opacity. One of them is telling the truth.",
      },
      { t: "h2", s: "What Tailwind compiles" },
      {
        t: "p",
        s: "Tailwind's opacity modifier does not multiply a colour. It injects an alpha channel into whatever the colour value is, which means the value has to be in a form that accepts one.",
      },
      {
        t: "code",
        file: "compiled.css",
        s: "/* --surface: #121216   (hex in the variable) */\n.bg-surface\\/90 { background-color: rgb(var(--surface) / .9); }\n/*  resolves to  rgb(#121216 / .9)\n    Invalid at computed-value time. The declaration is dropped.\n    Result: transparent. No warning, no error. */\n\n/* --surface: 18 18 22   (raw channels) */\n.bg-surface\\/90 { background-color: rgb(var(--surface) / .9); }\n/*  resolves to  rgb(18 18 22 / .9)  */",
      },
      {
        t: "p",
        s: "That is the whole bug. `rgb()` wants three numbers and gets a hex string. CSS discards the declaration, falls back to the initial value, and paints nothing. Every part of that chain is behaving exactly as specified.",
      },
      { t: "h2", s: "Why it survives review" },
      {
        t: "p",
        s: "A syntax error would have been caught in seconds. This is not a syntax error. The stylesheet is valid, the build passes, the class is present in the DOM, and the element is there in the inspector with the class you expect on it.",
      },
      {
        t: "p",
        s: "And the failure looks like a design decision. A nav bar with no background over a dark page looks like a nav bar someone chose not to give a background. I had looked at that header hundreds of times.",
      },
      {
        t: "aside",
        s: "The bug I could see was the command menu, which was unreadable because the panel behind it was transparent. The nav had the same bug and I had simply stopped seeing it.",
      },
      {
        t: "p",
        s: "When I grepped, eight call sites were affected: the nav, the command panel, two borders, a hover state, and three text colours. Some of those had been shipped for weeks.",
      },
      { t: "h2", s: "Store channels, not colours" },
      {
        t: "code",
        file: "tokens.css",
        s: ":root {\n  /* Not #fbfbfa. Raw channels, so an alpha can be injected. */\n  --bg: 251 251 250;\n  --surface: 255 255 255;\n  --text: 16 24 40;\n  --accent: 37 99 235;\n}",
      },
      {
        t: "code",
        file: "tailwind.config.ts",
        s: 'colors: {\n  bg: "rgb(var(--bg) / <alpha-value>)",\n  surface: "rgb(var(--surface) / <alpha-value>)",\n  fg: "rgb(var(--text) / <alpha-value>)",\n  accent: "rgb(var(--accent) / <alpha-value>)",\n}',
      },
      {
        t: "p",
        s: "The cost is that every direct use in a plain stylesheet becomes `rgb(var(--bg))` instead of `var(--bg)`, which is about ten replacements and slightly uglier. In exchange every opacity modifier in the codebase starts working, including the ones you have not written yet.",
      },
      {
        t: "demo",
        id: "tokenalpha",
        caption:
          "With channels, every alpha resolves. With hex, only the one that omits the modifier does.",
      },
      { t: "h2", s: "The general shape" },
      {
        t: "p",
        s: "The bugs that last are not the ones that break loudly. They are the ones whose failure mode is indistinguishable from an intentional choice, in a part of the interface you have looked at so often you no longer see it.",
      },
      {
        t: "p",
        s: "The only reason I found this one is that I was printing computed styles for an unrelated reason. That is not a process. The process is: when something looks slightly off and you cannot say why, read what the browser actually computed rather than what you told it.",
      },
    ],
  },
  {
    slug: "the-squircle-done-properly",
    title: "The squircle, done properly",
    summary:
      "An iOS icon is not a rounded rectangle. It is a superellipse, and almost every web implementation copies bezier constants nobody has checked. Here is the equation, and the clipping bug that made me abandon SVG.",
    date: "2026-09",
    tags: ["css", "type", "motion"],
    read: 7,
    component: "squircle",
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
