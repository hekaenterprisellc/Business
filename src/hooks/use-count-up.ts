"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Count-up animation — animates a number from 0 (or a start value) to the
 * target when it scrolls into view. Uses requestAnimationFrame with the
 * cinematic expo-out easing to match the rest of the site's motion.
 *
 * @param target   final number
 * @param duration ms (default 1800)
 * @param start     start number (default 0)
 *
 * @example
 * const ref = useRef<HTMLSpanElement>(null);
 * const inView = useInView(ref, { once: true, amount: 0.4 });
 * const value = useCountUp(40, { duration: 1600, startWhen: inView });
 * return <span ref={ref}>{value}+</span>
 */
export function useCountUp(
  target: number,
  options?: { duration?: number; start?: number; startWhen?: boolean }
) {
  const { duration = 1800, start = 0, startWhen = true } = options ?? {};
  const [value, setValue] = useState(start);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (!startWhen) return;

    let raf: number;
    let startTime: number | null = null;

    // expo-out ease matching the site's cinematicEase
    const ease = (t: number) => 1 - Math.pow(2, -10 * t);

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = ease(progress);
      const next = start + (target - start) * eased;
      setValue(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, startWhen]);

  return value;
}

/**
 * Helper to format a count-up number with a thousands separator and optional decimals.
 */
export function formatCount(
  value: number,
  options?: { decimals?: number; prefix?: string; suffix?: string }
) {
  const { decimals = 0, prefix = "", suffix = "" } = options ?? {};
  const rounded =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("en-US");
  return `${prefix}${rounded}${suffix}`;
}

/**
 * Convenience: combine useInView + useCountUp for a single ref-based count-up.
 * Returns [ref, displayValue].
 */
export function useCountUpInView(
  target: number,
  options?: { duration?: number; decimals?: number; prefix?: string; suffix?: string }
) {
  const { duration = 1800, decimals = 0, prefix = "", suffix = "" } = options ?? {};
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const raw = useCountUp(target, { duration, startWhen: inView });
  const display = formatCount(raw, { decimals, prefix, suffix });
  return [ref, display] as const;
}
