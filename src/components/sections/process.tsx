"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Phone, PenTool, Rocket, ArrowRight } from "lucide-react";
import { viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const STEPS = [
  {
    no: "01",
    icon: Phone,
    title: "Discovery Call",
    duration: "Day 1",
    desc: "20 minutes on WhatsApp or in person: what your business needs, and what it doesn't.",
    deliverables: ["Scope defined", "Quote locked", "Timeline agreed"],
    accent: "terracotta",
  },
  {
    no: "02",
    icon: PenTool,
    title: "Design & Build",
    duration: "Day 2–12",
    desc: "You see drafts early and often, so nothing about the final site is a surprise.",
    deliverables: ["Wireframes", "Visual drafts", "Working preview"],
    accent: "forest",
  },
  {
    no: "03",
    icon: Rocket,
    title: "Launch & Support",
    duration: "Day 13+",
    desc: "Your site goes live, and we stay on to handle updates as your business changes.",
    deliverables: ["Live site", "Handover", "Ongoing care"],
    accent: "clay",
  },
] as const;

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline area
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 60%"],
  });

  // Spring-smooth the progress for the line fill + node activations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Horizontal line width grows with scroll (desktop)
  const lineScaleX = useTransform(smoothProgress, [0, 1], [0, 1]);
  // Node 1 active immediately, node 2 at ~45%, node 3 at ~85%
  const node1Active = useTransform(smoothProgress, [0.0, 0.1], [1, 1]);
  const node2Active = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const node3Active = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="grain-overlay relative py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-terracotta">
              <span className="h-px w-8 bg-terracotta/60" />
              How a project runs
            </div>
            <AnimatedHeading
              id="process-heading"
              text="Three stops from idea to live site."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Watch the path draw itself as you scroll — the same way a project
            moves from first call to launch day.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative mt-16 sm:mt-20">
          {/* Desktop: horizontal animated track */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[2.75rem] hidden h-[3px] md:block"
          >
            {/* Base track */}
            <div className="absolute inset-0 rounded-full bg-border" />
            {/* Animated fill */}
            <motion.div
              style={{ scaleX: lineScaleX, transformOrigin: "0% 50%" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-terracotta via-clay to-forest shadow-[0_0_12px_rgba(200,84,30,0.45)]"
            />
          </div>

          {/* Mobile: vertical animated track */}
          <div
            aria-hidden
            className="absolute left-6 top-0 bottom-0 w-[3px] -translate-x-1/2 md:hidden"
          >
            <div className="absolute inset-0 bg-border" />
            <motion.div
              style={{ scaleY: lineScaleX, transformOrigin: "0% 0%" }}
              className="absolute inset-0 bg-gradient-to-b from-terracotta via-clay to-forest"
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => {
              const activeT =
                i === 0 ? node1Active : i === 1 ? node2Active : node3Active;
              return (
                <ProcessStep
                  key={step.no}
                  step={step}
                  index={i}
                  activeT={activeT}
                />
              );
            })}
          </div>
        </div>

        {/* Footer note with arrow flow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
          First call to live site
          <ArrowRight className="h-3.5 w-3.5 text-terracotta" />
          <span className="font-serif text-base normal-case tracking-normal text-ink">
            usually 7–14 days
          </span>
        </motion.div>
      </div>
    </section>
  );
}

type StepType = (typeof STEPS)[number];

function ProcessStep({
  step,
  index,
  activeT,
}: {
  step: StepType;
  index: number;
  activeT: ReturnType<typeof useTransform<number, number>>;
}) {
  // Derive visual states from the active transform
  const ringOpacity = activeT;
  const checkOpacity = activeT;
  const cardY = useTransform(activeT, [0, 1], [16, 0]);
  const cardOpacity = useTransform(activeT, [0, 1], [0.55, 1]);

  return (
    <motion.div
      style={{ opacity: cardOpacity, y: cardY }}
      className="relative pl-20 md:pl-0"
    >
      {/* Node */}
      <div className="absolute left-0 top-0 md:relative md:mb-7 md:flex md:justify-center">
        <div className="relative">
          {/* Pulsing ring when active */}
          <motion.div
            style={{ opacity: ringOpacity }}
            className="absolute inset-0 rounded-full"
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-terracotta/40"
            />
          </motion.div>

          {/* Node circle */}
          <motion.div
            className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background font-mono text-sm font-semibold text-ink shadow-sm transition-colors duration-500 md:h-14 md:w-14"
            whileHover={{ scale: 1.08 }}
          >
            <AnimatedNodeContent
              no={step.no}
              checkOpacity={checkOpacity}
            />
          </motion.div>

          {/* Connector dot to next node (desktop) */}
          {index < STEPS.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-terracotta/60 md:block"
            />
          )}
        </div>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-border/70 bg-card p-6 transition-all duration-500 hover:border-ink/20 hover:shadow-[0_18px_40px_-24px_rgba(27,24,20,0.35)] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
            <step.icon className="h-5 w-5" />
          </span>
          <span className="rounded-full bg-sand/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {step.duration}
          </span>
        </div>
        <h3 className="mt-4 font-serif text-2xl font-medium text-ink">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.desc}
        </p>
        <ul className="mt-4 space-y-2">
          {step.deliverables.map((d, di) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1 + di * 0.08, duration: 0.4 }}
              className="flex items-center gap-2 text-xs text-foreground/80"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 text-terracotta"
                aria-hidden
              >
                <path
                  d="M2 6l3 3 5-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {d}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/** Shows the step number, crossfading to a checkmark when the node activates. */
function AnimatedNodeContent({
  no,
  checkOpacity,
}: {
  no: string;
  checkOpacity: ReturnType<typeof useTransform<number, number>>;
}) {
  const numberOpacity = useTransform(checkOpacity, [0, 1], [1, 0]);
  return (
    <>
      <motion.span
        style={{ opacity: numberOpacity }}
        className="absolute font-mono text-sm font-semibold text-ink"
      >
        {no}
      </motion.span>
      <motion.svg
        style={{ opacity: checkOpacity }}
        viewBox="0 0 24 24"
        className="h-6 w-6 text-terracotta"
        aria-hidden
      >
        <motion.path
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.svg>
    </>
  );
}
