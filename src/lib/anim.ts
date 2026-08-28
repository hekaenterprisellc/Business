import type { Variants } from "framer-motion";

/**
 * Cinematic easing inspired by alphaledger.ai — a premium decelerating curve.
 * Elements glide in and settle, never bouncy/cartoonish.
 * cubic-bezier(0.16, 1, 0.3, 1) — "expo out"
 */
export const cinematicEase = [0.16, 1, 0.3, 1] as const;

// Shared Framer Motion variants for editorial scroll reveals
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

/**
 * Stagger parent tuned for cinematic word-by-word reveals.
 * ~80ms between children gives a deliberate, readable beat.
 */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/**
 * Slower stagger for hero headlines — each word gets a longer beat
 * so the headline reads as a sequence, not a blur.
 */
export const heroStaggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

/**
 * A single word in a staggered headline reveal.
 * Slides up 40px + fades, with the cinematic ease.
 */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em" },
  show: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: cinematicEase },
  },
};

/**
 * Larger lift for big section headers — more dramatic entrance.
 */
export const fadeUpLg: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: cinematicEase },
  },
};

// Standard viewport config — reveal once when ~15% visible
export const viewportOnce = { once: true, amount: 0.15 } as const;
