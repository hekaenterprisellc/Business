"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const FAQS = [
  {
    q: "How long does a website take to build?",
    a: "Most business sites go live in 7–14 days from our discovery call, depending on how much content you already have ready.",
  },
  {
    q: "Do I need to know anything technical?",
    a: "No. We handle hosting, setup, and every technical piece. You just tell us what you need and review the drafts.",
  },
  {
    q: "Can I make changes after launch?",
    a: "Yes. Every plan includes a support window, and ongoing care plans are available if you want us on standby longer term.",
  },
  {
    q: "Do you accept M-Pesa?",
    a: "Yes, M-Pesa and card payments come standard on our Online Store and Custom Build plans. For project invoices, M-Pesa is welcome too.",
  },
  {
    q: "What if I already have a domain?",
    a: "No problem, we can build on your existing domain, or help you register a new one if you don't have one yet.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — manifesto quote */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-5"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-terracotta"
            >
              <span className="h-px w-8 bg-terracotta/60" />
              Why Heka exists
            </motion.div>

            <motion.blockquote
              variants={fadeUp}
              className="mt-6 font-serif text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl text-balance"
            >
              <span className="text-terracotta">“</span>
              Small businesses in Nairobi get quoted city prices for a site
              nobody explains to them. We build it properly, and we pick up
              the phone after.
              <span className="text-terracotta">”</span>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream">
                <span className="font-serif text-lg">H</span>
              </span>
              <div>
                <div className="font-medium text-ink">Heka Enterprise</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Founded in Nairobi
                </div>
              </div>
            </motion.div>

            {/* Mini fact strip */}
            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70"
            >
              {[
                { v: "2024", l: "Founded" },
                { v: "Nairobi", l: "Based in" },
                { v: "EN / SW", l: "Languages" },
              ].map((f) => (
                <div key={f.l} className="bg-background/80 p-3 text-center">
                  <div className="font-serif text-base font-medium text-ink">
                    {f.v}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {f.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — FAQ accordion */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="h-px w-8 bg-border" />
              Common questions
            </motion.div>
            <AnimatedHeading
              id="faq-heading"
              text="Before you reach out."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl"
            />

            <motion.div variants={fadeUp} className="mt-8">
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="space-y-3"
              >
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="rounded-2xl border border-border/70 bg-card px-5 transition-colors data-[state=open]:border-ink/20 data-[state=open]:bg-card"
                  >
                    <AccordionTrigger className="py-5 text-left font-serif text-lg font-medium text-ink hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
