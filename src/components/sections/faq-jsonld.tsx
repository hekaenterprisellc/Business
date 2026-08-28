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

type JsonLd = {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
};

/**
 * Injects FAQPage JSON-LD structured data for SEO rich results.
 * Server component — renders a <script type="application/ld+json"> tag.
 */
export function FaqJsonLd() {
  const jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
