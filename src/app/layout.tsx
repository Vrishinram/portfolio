import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vrishin Ram K — Cybersecurity Analyst & Developer",
  description:
    "Portfolio of Vrishin Ram K — Cybersecurity Analyst, Blue Teaming specialist, and Full-Stack Developer from Tamil Nadu, India.",
  keywords: ["cybersecurity", "portfolio", "SOC analyst", "blue teaming", "Next.js", "Vrishin Ram K"],
  openGraph: {
    title: "Vrishin Ram K — Cybersecurity Analyst & Developer",
    description:
      "Securing digital frontiers with threat intelligence & agentic AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
