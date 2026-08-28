"use client";

import Link from "next/link";
import { MessageCircle, Mail, MapPin, ArrowUpRight } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/70 bg-background">
      {/* Top CTA strip */}
      <div className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-terracotta">
              Ready when you are
            </div>
            <p className="mt-2 font-serif text-2xl font-medium text-ink sm:text-3xl text-balance">
              Built in Nairobi. Built for business.
            </p>
          </div>
          <Link
            href="https://wa.me/254117211390"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-all duration-300 hover:bg-terracotta"
          >
            <MessageCircle className="h-4 w-4" />
            Start on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="#top" className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-cream">
                <span className="font-serif text-xl font-semibold leading-none">
                  H
                </span>
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-terracotta" />
              </span>
              <span className="font-serif text-base font-medium text-ink">
                Heka Enterprise
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Websites, online stores, and brand identities for Nairobi
              businesses that are done waiting to be taken seriously online.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["M-Pesa", "Card", "7–14 days", "Real support"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border/70 bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Explore
            </div>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="link-underline text-sm text-foreground/85 hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Reach us
            </div>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://wa.me/254117211390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground/85 hover:text-ink"
                >
                  <MessageCircle className="h-4 w-4 text-terracotta" />
                  +254 117 211 390
                </a>
              </li>
              <li>
                <a
                  href="mailto:hekaenterprisellc@gmail.com"
                  className="group flex items-center gap-3 text-sm text-foreground/85 hover:text-ink"
                >
                  <Mail className="h-4 w-4 text-terracotta" />
                  hekaenterprisellc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/85">
                <MapPin className="h-4 w-4 text-terracotta" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            © {year} Heka Enterprise. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Built in Nairobi · <span className="text-terracotta">M-Pesa welcome</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
