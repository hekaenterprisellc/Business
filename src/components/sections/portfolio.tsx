"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Quote } from "lucide-react";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";
import { cn } from "@/lib/utils";

type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  service: "Website" | "Online Store" | "Branding";
  image: string;
  summary: string;
  quote: string;
  quoteBy: string;
  metrics: { label: string; value: string }[];
  year: string;
  accent: string;
};

const CASES: CaseStudy[] = [
  {
    id: "bakery",
    client: "Sweet Crumbs Bakery",
    industry: "Food & Bakery",
    service: "Website",
    image: "/heka/case-bakery.png",
    summary:
      "A 3-page site that turned walk-in traffic into online orders — with a WhatsApp button that actually gets answered.",
    quote:
      "I used to lose customers because people couldn't find us on Google. Heka fixed that in under two weeks.",
    quoteBy: "Wanjiru K. — Owner",
    metrics: [
      { label: "Online orders / wk", value: "+38" },
      { label: "Google calls", value: "2.5×" },
      { label: "Time to live", value: "11 days" },
    ],
    year: "2024",
    accent: "bg-terracotta text-cream",
  },
  {
    id: "fashion",
    client: "Mara Atelier",
    industry: "Fashion & Retail",
    service: "Branding",
    image: "/heka/case-fashion.png",
    summary:
      "A full identity kit — logo, palette, signage, and receipt template — that made a home tailor look like a flagship.",
    quote:
      "Customers walk in and assume we've been around for years. The brand carries itself now.",
    quoteBy: "David M. — Founder",
    metrics: [
      { label: "Brand recall", value: "+62%" },
      { label: "Repeat visits", value: "1.8×" },
      { label: "Avg. order value", value: "+24%" },
    ],
    year: "2024",
    accent: "bg-forest text-cream",
  },
  {
    id: "salon",
    client: "Amara Beauty Lounge",
    industry: "Beauty & Wellness",
    service: "Online Store",
    image: "/heka/case-salon.png",
    summary:
      "A booking site with M-Pesa deposits — customers self-book, the chair stays full, and no-shows dropped sharply.",
    quote:
      "The M-Pesa checkout just worked from day one. Orders started coming in before I'd even told all my customers.",
    quoteBy: "Amina N. — Owner",
    metrics: [
      { label: "Bookings / wk", value: "+47" },
      { label: "No-show rate", value: "−31%" },
      { label: "M-Pesa deposits", value: "100%" },
    ],
    year: "2025",
    accent: "bg-clay text-ink",
  },
];

export function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="grain-overlay relative py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
              Selected work
            </motion.div>
            <AnimatedHeading
              id="work-heading"
              text="Nairobi businesses, built properly."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            />
          </div>
          <motion.p
            variants={fadeUp}
            className="max-w-sm text-base leading-relaxed text-muted-foreground"
          >
            A few of the shops, salons, and brands we&apos;ve helped get online
            across the city. Scroll to walk through each one.
          </motion.p>
        </motion.div>

        {/* Vertical case-study sequence */}
        <div className="mt-16 space-y-20 sm:space-y-28">
          {CASES.map((c, i) => (
            <CaseRow key={c.id} study={c} index={i} />
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border/70 bg-sand/30 p-8 text-center sm:p-12"
        >
          <p className="font-serif text-2xl font-medium text-ink sm:text-3xl text-balance">
            Your business could be next in the line-up.
          </p>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-all duration-300 hover:bg-terracotta"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CaseRow({ study, index }: { study: CaseStudy; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 80%", "end 20%"],
  });

  // Parallax: image drifts subtly opposite to text
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [24, -24] : [-24, 24]
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 1.02]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className={
          "relative lg:col-span-7 " +
          (reversed ? "lg:order-2 lg:col-start-6" : "")
        }
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_30px_70px_-30px_rgba(27,24,20,0.5)]">
          <Image
            src={study.image}
            alt={`${study.client} — ${study.service} case study`}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
          {/* Service badge */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] shadow-lg",
                study.accent
              )}
            >
              <ExternalLink className="h-3 w-3" />
              {study.service}
            </span>
            <span className="rounded-full border border-cream/30 bg-ink/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream backdrop-blur-md">
              {study.industry}
            </span>
          </div>
          {/* Client name overlay */}
          <div className="absolute inset-x-4 bottom-4">
            <div className="font-serif text-2xl font-medium text-cream sm:text-3xl">
              {study.client}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70">
              {study.year} · Nairobi
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details */}
      <motion.div
        style={{ y: textY }}
        className={
          "flex flex-col justify-center lg:col-span-5 " +
          (reversed ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "")
        }
      >
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="font-serif text-2xl font-medium text-terracotta">
            0{index + 1}
          </span>
          <span className="h-px w-6 bg-border" />
          {study.service}
        </div>

        <h3 className="mt-3 font-serif text-2xl font-medium leading-snug text-ink sm:text-3xl text-balance">
          {study.summary}
        </h3>

        {/* Quote */}
        <figure className="mt-6 rounded-2xl border border-border/70 bg-card p-5">
          <Quote className="h-5 w-5 text-terracotta/50" aria-hidden />
          <blockquote className="mt-2 font-serif text-base font-medium leading-snug text-ink">
            “{study.quote}”
          </blockquote>
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {study.quoteBy}
          </figcaption>
        </figure>

        {/* Metrics */}
        <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-background/80 p-4 text-center backdrop-blur"
            >
              <div className="font-serif text-2xl font-medium text-ink">
                {m.value}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
