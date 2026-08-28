"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-scroll";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Why Us", href: "#why" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8",
          scrolled
            ? "mt-2 rounded-full border border-border/70 bg-background/80 py-2.5 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(27,24,20,0.18)] sm:mt-3"
            : "mt-0 py-4 border-b border-transparent"
        )}
      >
        <Link href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-cream shadow-sm transition-transform duration-300 group-hover:-rotate-6">
            <span className="font-serif text-xl font-semibold leading-none">H</span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-terracotta" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[15px] font-medium tracking-tight text-ink">
              Heka Enterprise
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Nairobi · est. 2024
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-muted-foreground hover:text-ink"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-sand/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-terracotta transition-all duration-300",
                    isActive ? "w-1.5 opacity-100" : "w-0 opacity-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-cream transition-all duration-300 hover:bg-terracotta hover:shadow-lg hover:shadow-terracotta/25 sm:flex"
          >
            <MessageCircle className="h-4 w-4" />
            Talk to Us
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/60 text-ink backdrop-blur lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-3 top-20 rounded-3xl border border-border/70 bg-background p-3 shadow-2xl"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors",
                        isActive
                          ? "bg-sand/70 text-ink"
                          : "text-ink hover:bg-sand/60"
                      )}
                    >
                      <span className="font-serif text-xl">{link.label}</span>
                      <span
                        className={cn(
                          "font-mono text-xs",
                          isActive ? "text-terracotta" : "text-muted-foreground"
                        )}
                      >
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3.5 text-base font-medium text-cream"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to Us
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
