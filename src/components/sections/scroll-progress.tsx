"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll";

/**
 * Thin terracotta progress bar fixed to the very top of the viewport.
 * Sits above the navbar (z-50 navbar -> z-[60] progress bar).
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-terracotta via-clay to-terracotta shadow-[0_0_10px_rgba(200,84,30,0.5)]"
        style={{ scaleX: progress }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  );
}
