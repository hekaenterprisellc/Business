"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  ShoppingBag,
  Palette,
  LifeBuoy,
  ArrowUpRight,
} from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const SERVICES = [
  {
    no: "01",
    icon: Globe,
    title: "Business Websites",
    desc: "A site that works as hard as you do: fast, clear, and built to turn visitors into customers, not just look nice.",
    image: "/heka/brand-mockup.png",
    tags: ["Landing pages", "SEO-ready", "Mobile-first"],
    accent: "bg-terracotta text-cream",
  },
  {
    no: "02",
    icon: ShoppingBag,
    title: "Online Stores",
    desc: "Sell every hour of the day. M-Pesa and card checkout built in, so the sale happens whether or not you're standing in the shop.",
    image: "/heka/store-mockup.png",
    tags: ["M-Pesa", "Card checkout", "Order mgmt"],
    accent: "bg-forest text-cream",
    span: true,
  },
  {
    no: "03",
    icon: Palette,
    title: "Branding & Design",
    desc: "Logo, colours, and a visual identity strong enough to carry your name across your site, your signage, and every receipt you print.",
    image: "/heka/hero-texture.png",
    tags: ["Logo", "Colour systems", "Identity kit"],
    accent: "bg-clay text-ink",
  },
  {
    no: "04",
    icon: LifeBuoy,
    title: "Care & Support",
    desc: "We don't disappear after launch. Updates, backups, and fixes: handled, so a broken page never costs you a customer.",
    image: "/heka/brand-mockup.png",
    tags: ["Backups", "Updates", "Fixes"],
    accent: "bg-ink text-cream",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="grain-overlay relative py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
              What we build
            </motion.div>
            <AnimatedHeading
              id="services-heading"
              text="Four ways we get your business online."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base leading-relaxed text-muted-foreground"
          >
            From a single landing page to a full online store with M-Pesa
            checkout — pick what fits, grow into the rest.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.no}
              variants={fadeUp}
              className={
                "group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-5 transition-all duration-500 hover:border-ink/20 hover:shadow-[0_24px_60px_-30px_rgba(27,24,20,0.4)] sm:p-6 " +
                (s.span ? "md:col-span-2" : "")
              }
            >
              <div className="flex h-full flex-col">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.accent}`}
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {s.no} — Service
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-5 sm:items-center">
                  {/* Copy */}
                  <div className={s.span ? "sm:col-span-3" : "sm:col-span-5"}>
                    <h3 className="font-serif text-2xl font-medium leading-tight text-ink sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  {s.span && (
                    <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-border/60 sm:col-span-2">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 to-transparent" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-terracotta/0 blur-3xl transition-all duration-700 group-hover:bg-terracotta/15"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
