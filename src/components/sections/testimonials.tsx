"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const TESTIMONIALS = [
  {
    quote:
      "I used to lose customers because people couldn't find us on Google. Heka fixed that in under two weeks.",
    name: "Wanjiru K.",
    role: "Bakery owner, Nairobi",
    initials: "WK",
    color: "bg-terracotta text-cream",
  },
  {
    quote:
      "The M-Pesa checkout just worked from day one. Orders started coming in before I'd even told all my customers.",
    name: "David M.",
    role: "Retail shop owner",
    initials: "DM",
    color: "bg-forest text-cream",
  },
  {
    quote:
      "No jargon, no disappearing act. When I needed a small change after launch, they answered on WhatsApp the same day.",
    name: "Amina N.",
    role: "Salon owner",
    initials: "AN",
    color: "bg-clay text-ink",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-terracotta"
            >
              <span className="h-px w-8 bg-terracotta/60" />
              What clients say
            </motion.div>
            <AnimatedHeading
              id="testimonials-heading"
              text="Real businesses. Real feedback."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-terracotta text-terracotta"
                />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              4.9/5 avg · 40+ reviews
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeUp}
              className={
                "group relative flex flex-col rounded-3xl border border-border/70 bg-card p-6 transition-all duration-500 hover:border-ink/20 hover:shadow-[0_24px_60px_-30px_rgba(27,24,20,0.4)] sm:p-8 " +
                (i === 1 ? "md:translate-y-6" : "")
              }
            >
              <Quote
                className="h-8 w-8 text-terracotta/30"
                aria-hidden
              />
              <div className="mt-3 flex">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-terracotta text-terracotta"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-serif text-xl font-medium leading-snug text-ink sm:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/70 pt-5">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${t.color} font-medium`}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
