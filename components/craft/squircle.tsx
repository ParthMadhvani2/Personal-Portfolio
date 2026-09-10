import { cn } from "../../lib/cn";

/**
 * Samples a superellipse, |x|ⁿ + |y|ⁿ = 1, normalised into a 0..1 box.
 *
 * An iOS icon is not a rounded rectangle. A rounded rectangle joins a straight
 * edge to a circular arc, and curvature jumps at that seam; the eye reads the
 * discontinuity as a faintly pinched corner even when it cannot name why. A
 * superellipse has continuous curvature the whole way round, which is what
 * makes the shape look poured rather than cut.
 *
 * Deriving it from the equation rather than copying the bezier constants that
 * circulate for this means the shape is checkable: every sampled point
 * satisfies the equation to within floating-point error, and `n` stays a real
 * dial instead of a magic number.
 */
function superellipse(n: number, steps: number) {
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
}

/**
 * The shape as a CSS `polygon()` in percentages.
 *
 * Percentages resolve against the element's own box, so one string scales to
 * any size with no measuring, no resize observer, and no `path()` carrying
 * baked-in pixel coordinates that break the moment the box changes.
 *
 * It deliberately does not use an SVG `<clipPath>`. Referencing one means
 * putting the definition somewhere in the DOM: inside the clipped element it
 * gets clipped away along with everything else, and outside it, it becomes a
 * stray node that a flex or grid parent counts as a child. A polygon has
 * neither problem.
 *
 * Straight chords between 64 samples sit ~0.04px inside the true curve at icon
 * size, under a device pixel even at 3× density.
 */
export function squirclePolygon(n = 4.5, steps = 64) {
  return `polygon(${superellipse(n, steps)
    .map(([x, y]) => `${x.toFixed(3)}% ${y.toFixed(3)}%`)
    .join(",")})`;
}

type Props = {
  children?: React.ReactNode;
  /**
   * Superellipse exponent. 2 is an ellipse, high values approach a square.
   * iOS icons sit around 4.5, which is the default.
   */
  n?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span" | "li" | "a";
} & React.HTMLAttributes<HTMLElement>;

/** Clips its children to a squircle. */
export function Squircle({
  children,
  n = 4.5,
  className,
  style,
  as = "div",
  ...rest
}: Props) {
  const As = as as React.ElementType;
  return (
    <As
      className={cn("relative", className)}
      style={{ ...style, clipPath: squirclePolygon(n) }}
      {...rest}
    >
      {children}
    </As>
  );
}

export default Squircle;
