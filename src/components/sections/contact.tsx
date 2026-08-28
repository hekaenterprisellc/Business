"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import { fadeUp, staggerParent, viewportOnce } from "@/lib/anim";
import { AnimatedHeading } from "./animated-heading";

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+254 117 211 390",
    href: "https://wa.me/254117211390",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hekaenterprisellc@gmail.com",
    href: "mailto:hekaenterprisellc@gmail.com",
  },
  {
    icon: MapPin,
    label: "Based in",
    value: "Nairobi, Kenya",
    href: "https://maps.google.com/?q=Nairobi,Kenya",
  },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      business: data.get("business"),
      need: data.get("need"),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not send your message.");
      }
      setDone(true);
      form.reset();
      toast.success("Message sent!", {
        description: "We'll reply within a day — usually a lot faster.",
      });
    } catch (err) {
      toast.error("Couldn't send", {
        description:
          err instanceof Error
            ? err.message
            : "Please try WhatsApp instead.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="grain-overlay relative overflow-hidden bg-ink py-20 text-cream sm:py-28 lg:py-32"
    >
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-20 h-[36rem] w-[36rem] rounded-full bg-terracotta/25 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-forest/30 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — pitch + contact methods */}
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
              Let&apos;s get you online
            </motion.div>
            <AnimatedHeading
              id="contact-heading"
              text="Let's get you online, properly."
              trigger="scroll"
              as="h2"
              className="mt-4 font-serif text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
            />
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-base leading-relaxed text-cream/65 sm:text-lg"
            >
              Send us a message and we&apos;ll reply within a day, usually a
              lot faster. Or reach us directly on the channels below.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 space-y-3"
            >
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-cream/12 bg-cream/[0.03] p-4 transition-all duration-300 hover:border-terracotta/40 hover:bg-cream/[0.06]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/5 text-terracotta transition-colors duration-300 group-hover:bg-terracotta group-hover:text-cream">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45">
                      {c.label}
                    </span>
                    <span className="font-serif text-lg font-medium text-cream">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-cream/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl border border-cream/12 bg-cream/[0.04] p-6 backdrop-blur-sm sm:p-8 lg:p-10">
              {done ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/15 text-terracotta">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-medium">
                    Message received.
                  </h3>
                  <p className="mt-3 max-w-sm text-cream/65">
                    Thanks for reaching out. We&apos;ll reply on WhatsApp or
                    email within a day — usually a lot faster.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-6 rounded-full border border-cream/20 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      name="name"
                      placeholder="Wanjiru Kamau"
                      required
                    />
                    <Field
                      label="Business name"
                      name="business"
                      placeholder="Optional"
                    />
                  </div>
                  <Field
                    label="Your email"
                    name="email"
                    type="email"
                    placeholder="you@business.co.ke"
                    required
                  />
                  <div>
                    <label
                      htmlFor="need"
                      className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55"
                    >
                      What do you need?
                    </label>
                    <textarea
                      id="need"
                      name="need"
                      required
                      rows={4}
                      placeholder="Tell us about your business and what you're hoping to build..."
                      className="w-full resize-none rounded-2xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/45 transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-4 text-base font-medium text-cream transition-all duration-300 hover:bg-cream hover:text-ink disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/40">
                    By sending, you agree we may contact you about your
                    enquiry. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55"
      >
        {label}
        {required && <span className="ml-1 text-terracotta">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/45 transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
    </div>
  );
}
