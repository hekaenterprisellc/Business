"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Smartphone,
  MessageSquare,
  TrendingUp,
  Check,
  CheckCheck,
} from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const REASONS = [
  {
    no: "01",
    icon: Wallet,
    title: "Fixed prices. No surprises.",
    desc: "You know the cost before we start, no bloated invoice halfway through the project.",
  },
  {
    no: "02",
    icon: Smartphone,
    title: "Built for how Kenyans browse",
    desc: "Fast on modest data bundles, working M-Pesa checkout, copy that speaks the way your customers actually search.",
  },
  {
    no: "03",
    icon: MessageSquare,
    title: "A WhatsApp line that answers",
    desc: "Not a ticket system that goes quiet the day the invoice clears.",
  },
  {
    no: "04",
    icon: TrendingUp,
    title: "Start small. Scale up.",
    desc: "Your site grows with your business, never a rebuild from zero.",
  },
];

const WA_CHAT = [
  {
    from: "client",
    text: "Habari! Can you change the phone number on the homepage?",
    time: "9:41",
    status: "sent" as const,
  },
  {
    from: "heka",
    text: "Karibu! Done — it's live now. Anything else? 🙌",
    time: "9:43",
    status: "read" as const,
  },
  {
    from: "client",
    text: "Asante sana, you're the real deal.",
    time: "9:44",
    status: "sent" as const,
  },
];

export function WhyUs() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-28 lg:py-32"
    >
      {/* Decorative grid glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(246,241,231,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,241,231,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-terracotta/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-forest/30 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — copy + WhatsApp proof */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-terracotta"
            >
              <span className="h-px w-8 bg-terracotta/60" />
              Why business owners pick us
            </motion.div>
            <AnimatedHeading
              id="why-heading"
              text="We show up, and we stay reachable."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            />

            {/* WhatsApp conversation proof */}
            <motion.div
              variants={fadeUp}
              className="mt-10 max-w-md overflow-hidden rounded-3xl border border-cream/12 bg-cream/[0.04] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-cream/10 bg-cream/[0.06] px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-cream">
                  <span className="font-serif text-sm font-medium">H</span>
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-medium text-cream">
                    Heka Enterprise
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-terracotta">
                    <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    online · usually replies in minutes
                  </div>
                </div>
              </div>

              {/* Chat body */}
              <div className="space-y-2.5 p-4">
                {WA_CHAT.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.15 + i * 0.25, duration: 0.4 }}
                    className={
                      "flex " +
                      (m.from === "heka" ? "justify-start" : "justify-end")
                    }
                  >
                    <div
                      className={
                        "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug " +
                        (m.from === "heka"
                          ? "rounded-tl-sm bg-forest/30 text-cream"
                          : "rounded-tr-sm bg-terracotta text-cream")
                      }
                    >
                      {m.text}
                      <span className="ml-2 inline-flex items-center gap-0.5 align-bottom">
                        <span className="font-mono text-[8px] text-cream/60">
                          {m.time}
                        </span>
                        {m.status === "read" ? (
                          <CheckCheck className="h-3 w-3 text-terracotta/90" />
                        ) : (
                          <Check className="h-3 w-3 text-cream/60" />
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input bar (decorative) */}
              <div className="flex items-center gap-2 border-t border-cream/10 bg-cream/[0.04] px-3 py-2.5">
                <div className="flex-1 rounded-full bg-cream/[0.06] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                  Type a message…
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-cream">
                  <MessageSquare className="h-4 w-4" />
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — reasons grid */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-1 gap-4 lg:col-span-5 sm:grid-cols-2 lg:gap-4"
          >
            {REASONS.map((r) => (
              <motion.div
                key={r.no}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-3xl border border-cream/12 bg-cream/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:border-terracotta/40 hover:bg-cream/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cream/15 bg-cream/5 text-terracotta transition-colors duration-300 group-hover:bg-terracotta group-hover:text-cream">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream/40">
                    / {r.no}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium leading-tight">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">
                  {r.desc}
                </p>

                {/* Decorative corner line */}
                <div
                  aria-hidden
                  className="absolute bottom-4 right-4 h-8 w-px bg-gradient-to-b from-transparent to-terracotta/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
