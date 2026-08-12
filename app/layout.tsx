import type { Metadata, Viewport } from "next";
import { Yatra_One, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const yatra = Yatra_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yatra",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purane Naghme — Evergreen Bollywood Melodies (1950–2010)",
  description:
    "A nostalgic single-page Bollywood music player streaming 100 iconic tracks across five golden eras — from Awaara Hoon to Tere Mast Mast Do Nain.",
  applicationName: "Purane Naghme",
  keywords: [
    "bollywood",
    "music",
    "retro",
    "evergreen songs",
    "purane naghme",
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
  ],
  openGraph: {
    title: "Purane Naghme — Evergreen Bollywood Melodies",
    description:
      "100 iconic Bollywood tracks from 1950 to 2010, streaming in one nostalgic player.",
    type: "website",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#120a02",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${yatra.variable} ${manrope.variable}`}>
      <body className="font-ui bg-[#120a02] text-cream antialiased selection:bg-amber-400/40 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
