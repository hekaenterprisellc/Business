"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, Star, MessageCircle } from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { useCountUpInView } from "@/hooks/use-count-up";
import { cn } from "@/lib/utils";

type BillingMode = "one-time" | "care";

const WA_BASE = "https://wa.me/254117211390?text=";

const PLANS = [
  {
    name: "Starter",
    tagline: "Get Online",
    oneTime: { price: "18,000", suffix: "one-time" },
    care: { price: "2,500", suffix: "/ month" },
    desc: "A clean, fast business site that makes you look established.",
    features: [
      "Up to 3 pages",
      "Mobile-friendly design",
      "Contact & WhatsApp button",
      "2 weeks of tweaks after launch",
    ],
    cta: "Start Here",
    waMessage: "Hi Heka! I'd like to start with the Starter plan (KES 18,000) to get my business online.",
    highlight: false,
  },
  {
    name: "Business",
    tagline: "Sell & Grow",
    oneTime: { price: "55,000", suffix: "one-time" },
    care: { price: "6,500", suffix: "/ month" },
    desc: "Your storefront, open 24/7 with M-Pesa and card checkout.",
    features: [
      "Up to 8 pages",
      "Online store with M-Pesa & card",
      "Product & order management",
      "1 month of support after launch",
    ],
    cta: "Choose Business",
    waMessage: "Hi Heka! I'm interested in the Business plan (KES 55,000) with M-Pesa checkout for my online store.",
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "Custom Build",
    oneTime: { price: "90,000", suffix: "from" },
    care: { price: "Custom", suffix: "/ scoped" },
    desc: "Bookings, portals, or custom tools built around your workflow.",
    features: [
      "Bookings, portals, or custom tools",
      "Built around your workflow",
      "Priority support line",
      "Ongoing care plan available",
    ],
    cta: "Talk Scope",
    waMessage: "Hi Heka! I'd like to scope a custom build (from KES 90,000). Can we set up a discovery call?",
    highlight: false,
  },
];

export function Pricing() {
  const [mode, setMode] = useState<BillingMode>("one-time");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative overflow-hidden bg-sand/40 py-20 sm:py-28 lg:py-32"
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-terracotta/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-terracotta"
          >
            <span className="h-px w-8 bg-terracotta/60" />
            Simple, fixed pricing
            <span className="h-px w-8 bg-terracotta/60" />
          </motion.div>
          <motion.h2
            id="pricing-heading"
            variants={fadeUp}
            className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl text-balance"
          >
            Pick a plan. Grow into the next one.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            No hidden fees, no bloated invoices. You know the cost before we
            start — and M-Pesa is welcome for payment.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 p-1 backdrop-blur"
            role="tablist"
            aria-label="Billing mode"
          >
            {(
              [
                { id: "one-time", label: "One-time build" },
                { id: "care", label: "+ Monthly care" },
              ] as const
            ).map((opt) => {
              const isActive = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMode(opt.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors sm:px-5 sm:text-xs",
                    isActive ? "text-cream" : "text-muted-foreground hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            Care plans cover updates, backups &amp; fixes after launch
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-center"
        >
          {PLANS.map((plan) => {
            const priceData = mode === "one-time" ? plan.oneTime : plan.care;
            const waHref =
              WA_BASE + encodeURIComponent(plan.waMessage);
            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-6 transition-all duration-500 sm:p-8",
                  plan.highlight
                    ? "border-ink bg-ink text-cream shadow-[0_30px_70px_-30px_rgba(27,24,20,0.5)] lg:-translate-y-4 lg:scale-[1.03]"
                    : "border-border/70 bg-card text-ink hover:border-ink/20 hover:shadow-[0_24px_60px_-30px_rgba(27,24,20,0.35)]"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-cream shadow-lg">
                      <Star className="h-3 w-3 fill-cream" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={cn(
                        "font-mono text-[11px] uppercase tracking-[0.18em]",
                        plan.highlight ? "text-cream/60" : "text-muted-foreground"
                      )}
                    >
                      {plan.tagline}
                    </div>
                    <h3 className="mt-1 font-serif text-2xl font-medium">
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.highlight ? "text-cream/75" : "text-muted-foreground"
                  )}
                >
                  {plan.desc}
                </p>

                {/* Animated price */}
                <div className="mt-6 flex h-[3.5rem] items-baseline gap-1.5 overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={mode + plan.name}
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -18, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-baseline gap-1.5"
                    >
                      <span
                        className={cn(
                          "font-mono text-xs uppercase tracking-[0.14em]",
                          plan.highlight ? "text-cream/60" : "text-muted-foreground"
                        )}
                      >
                        {mode === "one-time" ? "KES" : ""}
                      </span>
                      <span className="font-serif text-5xl font-medium tracking-tight">
                        {priceData.price}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-xs",
                          plan.highlight ? "text-cream/50" : "text-muted-foreground"
                        )}
                      >
                        / {priceData.suffix}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dual CTAs: WhatsApp deep-link primary + contact secondary */}
                <div className="mt-7 flex flex-col gap-2">
                  <Link
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium transition-all duration-300",
                      plan.highlight
                        ? "bg-terracotta text-cream hover:bg-cream hover:text-ink"
                        : "bg-ink text-cream hover:bg-terracotta"
                    )}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {plan.cta} on WhatsApp
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="#contact"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium transition-all duration-300",
                      plan.highlight
                        ? "border-cream/20 text-cream/80 hover:bg-cream/10"
                        : "border-border/70 text-foreground/80 hover:border-ink/30 hover:bg-sand/40"
                    )}
                  >
                    or send a message
                  </Link>
                </div>

                <div
                  className={cn(
                    "my-7 h-px",
                    plan.highlight ? "bg-cream/15" : "bg-border/70"
                  )}
                />

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.highlight
                            ? "bg-terracotta/20 text-terracotta"
                            : "bg-terracotta/10 text-terracotta"
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={plan.highlight ? "text-cream/90" : "text-foreground/90"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats band — count-up on scroll (alphaledger.ai style) */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/70 bg-border/70 md:grid-cols-4"
        >
          {[
            { target: 40, suffix: "+", label: "Nairobi businesses live" },
            { target: 14, suffix: " days", label: "Fastest turnaround" },
            { target: 100, suffix: "%", label: "Fixed pricing" },
            { target: 24, suffix: "h", label: "Support response" },
          ].map((s) => (
            <PricingStat
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingStat({
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
    <motion.div
      variants={fadeUp}
      className="bg-background/80 p-6 text-center backdrop-blur"
    >
      <div
        ref={ref}
        className="font-serif text-4xl font-medium text-ink sm:text-5xl"
      >
        {display}
      </div>
      <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}
