"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowUpRight,
  Clock,
  CreditCard,
  Server,
  Headphones,
  Sparkles,
} from "lucide-react";
import {
  fadeUp,
  staggerParent,
  heroStaggerParent,
  wordReveal,
  viewportOnce,
} from "@/lib/anim";
import { useCountUpInView } from "@/hooks/use-count-up";
import { HeroPreview } from "./hero-preview";

const STATS = [
  { icon: Clock, label: "Turnaround", value: "7–14 days", isNumeric: false },
  { icon: CreditCard, label: "Payments", value: "M-Pesa & Card", isNumeric: false },
  { icon: Server, label: "Hosting", value: "Handled for you", isNumeric: false },
  { icon: Headphones, label: "Support", value: "Real humans", isNumeric: false },
];

// Cinematic count-up numbers (alphaledger.ai style)
const KEY_FIGURES = [
  { value: 40, suffix: "+", label: "Businesses live" },
  { value: 14, suffix: " days", label: "Fastest launch" },
  { value: 100, suffix: "%", label: "Fixed pricing" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="grain-overlay relative overflow-x-hidden pt-28 pb-32 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* Decorative background — soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-terracotta/12 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-forest/10 blur-[100px]" />
        <div className="absolute -bottom-24 left-0 h-[24rem] w-[24rem] rounded-full bg-sand/60 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* Left — editorial copy */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Nairobi web &amp; design shop
              </span>
            </motion.div>

            {/* Cinematic word-by-word headline (alphaledger.ai style) */}
            <motion.h1
              variants={heroStaggerParent}
              initial="hidden"
              animate="show"
              className="mt-6 font-serif text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink text-balance"
            >
              <HeroWords
                line="Your hustle deserves"
              />
              <br />
              <HeroWords
                line="better than a"
                suffix=" "
              />
              <motion.span
                variants={wordReveal}
                className="relative inline-block"
              >
                <span className="italic text-terracotta">Facebook</span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-terracotta/45"
                >
                  <path
                    d="M2 14C60 4 140 4 200 9C240 12 280 14 298 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.span>
              <motion.span variants={wordReveal} className="inline-block">
                {" "}
                page.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Heka Enterprise builds websites, online stores, and brand
              identities for Nairobi businesses that are done waiting to be
              taken seriously online.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="https://wa.me/254117211390"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-cream transition-all duration-300 hover:bg-terracotta hover:shadow-xl hover:shadow-terracotta/30"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 bg-background/60 px-6 py-3.5 text-base font-medium text-ink backdrop-blur transition-all duration-300 hover:border-ink/40 hover:bg-sand/60"
              >
                See Pricing
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-terracotta" />
              Free 20-min consultation, before you spend a shilling
            </motion.p>

            {/* Key figures — count-up animation */}
            <motion.dl
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70"
            >
              {KEY_FIGURES.map((f) => (
                <CountUpStat
                  key={f.label}
                  target={f.value}
                  suffix={f.suffix}
                  label={f.label}
                />
              ))}
            </motion.dl>

            {/* Inline stats strip */}
            <motion.dl
              variants={fadeUp}
              className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-background/80 p-3 backdrop-blur transition-colors hover:bg-sand/40 sm:p-4"
                >
                  <s.icon className="h-4 w-4 text-terracotta" />
                  <dt className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
                    {s.label}
                  </dt>
                  <dd className="mt-0.5 font-serif text-sm font-medium text-ink sm:text-base">
                    {s.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right — animated browser-window preview */}
          <motion.div
            variants={fadeUp}
            className="relative mt-8 mb-12 lg:col-span-5 lg:my-0"
          >
            <HeroPreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Splits a line into words that each reveal with the cinematic stagger. */
function HeroWords({ line, suffix = "" }: { line: string; suffix?: string }) {
  const words = line.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordReveal}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : suffix}
        </motion.span>
      ))}
    </>
  );
}

/** A count-up stat cell — animates from 0 to target on scroll into view. */
function CountUpStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const [ref, display] = useCountUpInView(target, {
    duration: 1800,
    suffix,
  });
  return (
    <div className="bg-background/80 p-4 backdrop-blur transition-colors hover:bg-sand/40 sm:p-5">
      <dd
        ref={ref}
        className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl"
      >
        {display}
      </dd>
      <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </dt>
    </div>
  );
}
