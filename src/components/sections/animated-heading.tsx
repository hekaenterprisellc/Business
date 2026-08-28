"use client";

import { motion } from "framer-motion";
import { heroStaggerParent, wordReveal, viewportOnce } from "@/lib/anim";
import { cn } from "@/lib/utils";

/**
 * AnimatedHeading — splits a string into words and reveals each with a
 * cinematic stagger (alphaledger.ai style).
 *
 * Pass `trigger="scroll"` to fire on scroll-into-view, or
 * `trigger="mount"` to fire immediately on mount (for the hero).
 */
export function AnimatedHeading({
  text,
  className,
  trigger = "scroll",
  as: Tag = "h2",
  emphasize,
  id,
}: {
  text: string;
  className?: string;
  trigger?: "scroll" | "mount";
  as?: "h1" | "h2" | "h3";
  /** Words to render in terracotta italic (e.g. "Facebook"). */
  emphasize?: string[];
  id?: string;
}) {
  const words = text.split(" ");
  const emphasizeSet = new Set(emphasize?.map((w) => w.toLowerCase()) ?? []);

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      id={id}
      variants={heroStaggerParent}
      initial="hidden"
      {...(trigger === "scroll"
        ? { whileInView: "show", viewport: viewportOnce }
        : { animate: "show" })}
      className={cn("text-balance", className)}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isEmphasized = emphasizeSet.has(
          word.toLowerCase().replace(/[.,!?;:]/g, "")
        );
        return (
          <span key={`${word}-${i}`} className="inline-block">
            <motion.span
              variants={wordReveal}
              className={cn(
                "inline-block",
                isEmphasized && "italic text-terracotta"
              )}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </MotionTag>
  );
}
