import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Heka Enterprise — Websites, Stores & Branding for Nairobi Business",
  description:
    "Heka Enterprise builds fast, affordable websites, online stores, and brand identities for small businesses in Nairobi. Fixed pricing, M-Pesa checkout, real support after launch.",
  keywords: [
    "Nairobi web design",
    "Kenya website builder",
    "M-Pesa online store",
    "brand identity Nairobi",
    "small business website Kenya",
    "Heka Enterprise",
  ],
  authors: [{ name: "Heka Enterprise" }],
  openGraph: {
    title: "Heka Enterprise — Websites, Stores & Branding for Nairobi Business",
    description:
      "Fast, affordable websites, online stores, and brand identities for Nairobi businesses that are done waiting to be taken seriously online.",
    url: "https://hekaenterprisellc.netlify.app/",
    siteName: "Heka Enterprise",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heka Enterprise",
    description:
      "Websites, stores & branding for Nairobi business. Fixed pricing, M-Pesa checkout, real support after launch.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" />
      </body>
    </html>
  );
}
