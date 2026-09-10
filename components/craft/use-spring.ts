"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SpringConfig = {
  /**
   * Overshoot, 0–1. `0` is critically damped (settles without bouncing) and is
   * the right default for almost all UI. Reach for bounce only when the gesture
   * that triggered the motion carried momentum — a flick, a throw, a drag
   * release. Overshoot on a menu that merely faded in reads as wrong.
   */
  bounce?: number;
  /**
   * How quickly the value reaches its target, in seconds. This is not a
   * duration — a spring has no fixed duration, its settle time emerges from the
   * parameters. Lower is snappier.
   */
  duration?: number;
  /** Stop threshold in value units. */
  restDelta?: number;
};

const DEFAULTS: Required<SpringConfig> = {
  bounce: 0,
  duration: 0.4,
  restDelta: 0.01,
};

/**
 * A minimal, interruptible spring driven by requestAnimationFrame.
 *
 * Two properties matter and are the whole reason not to use a CSS transition
 * for gesture-driven motion:
 *
 * 1. It always animates from the *presentation* value — the number currently on
 *    screen — so re-targeting mid-flight never produces a visible jump.
 * 2. It carries velocity through a re-target. Swapping one tween for another at
 *    a gesture reversal creates a velocity discontinuity that reads as hitting a
 *    brick wall; blending velocity is what makes a reversal feel physical.
 *
 * Returns a live ref rather than React state so the animation never costs a
 * render — read `value.current` inside your own rAF loop, or pass `onChange`.
 *
 * @example
 * const y = useSpring(0, { bounce: 0.2, duration: 0.4 });
 * y.set(240, { velocity: releaseVelocity }); // hand off the pointer's velocity
 */
export function useSpring(
  initial: number,
  config: SpringConfig = {},
  onChange?: (value: number) => void,
) {
  const { bounce, duration, restDelta } = { ...DEFAULTS, ...config };

  const value = useRef(initial);
  const velocity = useRef(0);
  const target = useRef(initial);
  const raf = useRef<number | null>(null);
  const last = useRef(0);
  const cb = useRef(onChange);
  cb.current = onChange;

  const stop = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    raf.current = null;
  }, []);

  const tick = useCallback(
    (now: number) => {
      const dt = Math.min((now - last.current) / 1000, 1 / 30); // clamp tab-switch jumps
      last.current = now;

      // Apple's designer-facing parameters mapped onto the physics.
      const dampingRatio = 1 - bounce;
      const undampedFreq = (2 * Math.PI) / duration;
      const stiffness = undampedFreq * undampedFreq;
      const damping = 2 * dampingRatio * undampedFreq;

      // Sub-step so a dropped frame can't destabilise the integration.
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        const displacement = value.current - target.current;
        const accel = -stiffness * displacement - damping * velocity.current;
        velocity.current += accel * h;
        value.current += velocity.current * h;
      }

      const settled =
        Math.abs(value.current - target.current) < restDelta &&
        Math.abs(velocity.current) < restDelta * 10;

      if (settled) {
        value.current = target.current;
        velocity.current = 0;
        cb.current?.(value.current);
        raf.current = null;
        return;
      }

      cb.current?.(value.current);
      raf.current = requestAnimationFrame(tick);
    },
    [bounce, duration, restDelta],
  );

  const start = useCallback(() => {
    if (raf.current !== null) return; // already running: it will pick up the new target
    last.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  /** Re-target. Pass `velocity` to hand off a gesture's release velocity. */
  const set = useCallback(
    (to: number, opts?: { velocity?: number }) => {
      target.current = to;
      if (opts?.velocity !== undefined) velocity.current = opts.velocity;
      start();
    },
    [start],
  );

  /** Jump without animating — for 1:1 tracking while a pointer is down. */
  const jump = useCallback(
    (to: number) => {
      stop();
      value.current = to;
      target.current = to;
      velocity.current = 0;
      cb.current?.(to);
    },
    [stop],
  );

  useEffect(() => stop, [stop]);

  return { value, velocity, set, jump, stop };
}

/**
 * Apple's momentum projection, from the Designing Fluid Interfaces sample code.
 * Given a release velocity, where would the content come to rest? Snap to the
 * target nearest *that* point rather than the nearest point to the release
 * position — this is what makes a flick feel like it throws the element.
 *
 * Note this is exponential decay, not the physics-textbook `v² / 2a`.
 */
export function project(velocity: number, decelerationRate = 0.998) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}

/**
 * Progressive resistance past a boundary. Real things slow before they stop; a
 * hard stop reads as frozen, continuous resistance reads as "responsive, but
 * there is nothing more here".
 */
export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
) {
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

/** Live `prefers-reduced-motion`, kept in sync if the user changes it. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
