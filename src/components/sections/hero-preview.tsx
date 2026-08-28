"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import {
  Star,
  MessageCircle,
  ShoppingCart,
  ArrowUpRight,
  Globe,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero preview carousel — a browser-window mockup that cycles through
 * real branding preview images (website → M-Pesa store → brand identity).
 *
 * Built on embla-carousel-react (industry-standard, touch-swipeable,
 * fully responsive) for robust, jank-free slide transitions.
 */

type Slide = {
  id: string;
  badge: string;
  title: string;
  sub: string;
  cta: string;
  icon: typeof MessageCircle;
  image: string;
  accent: string;
  overlay: string;
};

const SLIDES: Slide[] = [
  {
    id: "site",
    badge: "Business website",
    title: "Sweet Crumbs Bakery",
    sub: "Open today · Kileleshwa",
    cta: "Order on WhatsApp",
    icon: Globe,
    image: "/heka/preview-website.png",
    accent: "bg-terracotta text-cream",
    overlay: "from-ink/60 via-ink/15 to-transparent",
  },
  {
    id: "store",
    badge: "Online store",
    title: "M-Pesa checkout",
    sub: "Till confirmed · KES 1,250",
    cta: "Pay with M-Pesa",
    icon: ShoppingCart,
    image: "/heka/preview-mpesa.png",
    accent: "bg-forest text-cream",
    overlay: "from-ink/60 via-ink/15 to-transparent",
  },
  {
    id: "brand",
    badge: "Brand identity",
    title: "Mara Atelier",
    sub: "Logo · palette · signage",
    cta: "See the brand kit",
    icon: Palette,
    image: "/heka/preview-brand.png",
    accent: "bg-clay text-ink",
    overlay: "from-ink/55 via-ink/10 to-transparent",
  },
];

export function HeroPreview() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 28, // ms per slide — smooth but snappy
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  // Sync selected index on scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Defer initial sync so we don't call setState synchronously during the effect.
    const id = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      cancelAnimationFrame(id);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-advance every 4.5s. Pause on hover/touch. Robust: re-checks emblaApi
  // inside the interval so a late init doesn't break it.
  useEffect(() => {
    if (!emblaApi) return;
    const root = emblaApi.rootNode();
    let paused = false;
    const timer = setInterval(() => {
      if (paused || !emblaApi) return;
      emblaApi.scrollNext();
    }, 4500);
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("touchstart", onEnter, { passive: true });
    root.addEventListener("touchend", onLeave, { passive: true });
    return () => {
      clearInterval(timer);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("touchstart", onEnter);
      root.removeEventListener("touchend", onLeave);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Browser chrome window */}
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-[0_40px_80px_-32px_rgba(27,24,20,0.45)] sm:rounded-[1.6rem]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border/70 bg-sand/40 px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-terracotta/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-clay/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-forest/60" />
          <div className="mx-auto flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 sm:px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
              heka.preview.ke
            </span>
          </div>
          {/* Progress dots in title bar — always visible, never covered */}
          <div className="flex items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${s.badge}`}
                aria-current={i === selected ? "true" : undefined}
                onClick={() => emblaApi?.scrollTo(i)}
                className="group p-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === selected
                      ? "w-4 bg-terracotta"
                      : "w-1.5 bg-ink/20 group-hover:bg-ink/40"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Embla viewport — fixed aspect so it never overflows */}
        <div
          ref={emblaRef}
          className="overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Heka Enterprise work previews"
        >
          <div className="flex" style={{ touchAction: "pan-y" }}>
            {SLIDES.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                selected={selected === i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating price badge — flush with top-right corner of window */}
      <div className="absolute right-2 top-2 z-30 flex flex-col items-center rounded-xl border border-border/70 bg-terracotta px-2.5 py-1.5 text-cream shadow-lg sm:right-3 sm:top-3 sm:px-3 sm:py-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] opacity-85 sm:text-[9px]">
          From
        </span>
        <span className="font-serif text-base font-semibold leading-none sm:text-xl">
          KES 18k
        </span>
      </div>

      {/* Floating testimonial chip — full-width, flush with window edges */}
      <div className="absolute -bottom-7 left-0 right-0 z-20 rounded-2xl border border-border/70 bg-card p-3 shadow-[0_20px_40px_-20px_rgba(27,24,20,0.45)] sm:p-3.5">
        <p className="font-serif text-xs leading-snug text-ink sm:text-sm">
          “No jargon, no disappearing act. They answered on WhatsApp the same
          day.”
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-[9px] font-medium text-cream sm:h-7 sm:w-7 sm:text-[10px]">
            AN
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px]">
            Amina N. · Salon owner
          </span>
        </div>
      </div>
    </div>
  );
}

function SlideCard({
  slide,
  index,
  selected,
}: {
  slide: Slide;
  index: number;
  selected: boolean;
}) {
  return (
    <div
      className="relative min-w-0 shrink-0 grow-0 basis-full"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${SLIDES.length}: ${slide.badge}`}
      aria-hidden={!selected}
    >
      {/* Fixed aspect ratio keeps height stable across slides + breakpoints */}
      <div className="relative aspect-[4/3] sm:aspect-[5/4]">
        <Image
          src={slide.image}
          alt={`${slide.badge} preview — ${slide.title}`}
          fill
          priority={index === 0}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 42vw"
          className="object-cover"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            slide.overlay
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

        {/* Top row: badge + rating */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] shadow-sm sm:px-2.5",
              slide.accent
            )}
          >
            <slide.icon className="h-3 w-3" />
            {slide.badge}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-cream/30 bg-ink/40 px-2 py-1 backdrop-blur-md">
            <Star className="h-3 w-3 fill-terracotta text-terracotta" />
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream">
              4.9
            </span>
          </span>
        </div>

        {/* Headline + sub */}
        <div className="absolute inset-x-0 bottom-14 px-3 sm:bottom-20 sm:px-5">
          <h3 className="font-serif text-xl font-medium leading-tight text-cream drop-shadow-sm sm:text-3xl">
            {slide.title}
          </h3>
          <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cream/75 sm:text-[10px]">
            {slide.sub}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
          <div className="flex items-center justify-between rounded-2xl border border-cream/15 bg-background/90 p-2.5 backdrop-blur-md sm:p-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9",
                  slide.accent
                )}
              >
                <slide.icon className="h-4 w-4" />
              </span>
              <span className="font-serif text-xs font-medium text-ink sm:text-sm">
                {slide.cta}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-ink" />
          </div>
        </div>
      </div>
    </div>
  );
}
