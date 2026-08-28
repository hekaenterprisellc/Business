"use client";

const ITEMS = [
  "Bakeries",
  "Salons & Spas",
  "Retail shops",
  "Restaurants",
  "Fashion brands",
  "Consultancies",
  "Fitness studios",
  "Event planners",
  "Photographers",
  "Cafés",
  "Logistics",
  "Clinics",
];

export function Marquee() {
  return (
    <section
      aria-label="Businesses we serve"
      className="marquee-pause relative overflow-hidden border-y border-border/70 bg-ink py-5"
    >
      <div className="flex w-max min-w-full animate-marquee will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <div key={`${dup}-${item}`} className="flex items-center">
                <span className="px-6 font-serif text-2xl font-medium text-cream/90 sm:text-3xl">
                  {item}
                </span>
                <span className="text-terracotta">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
