import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Mrs_Saint_Delafield } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { isTodo, profile, seo } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Handwritten signature on the back of the ID card (not needed on first paint)
const signature = Mrs_Saint_Delafield({
  variable: "--font-mrs-saint-delafield",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

const title = `${profile.name} | ${profile.role}`;

/**
 * The site's public address, used to build absolute links for share previews.
 * Order: `siteUrl` in portfolio.ts → SITE_URL env var → Render's own URL.
 * (On Vercel nothing is needed; Next.js detects the address automatically.)
 */
const siteUrl = !isTodo(profile.siteUrl)
  ? profile.siteUrl
  : process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title,
    description: seo.description,
    siteName: profile.name,
    locale: "en_IN",
    // Generated at build time by app/og.png/route.tsx
    images: [{ url: "/og.png", width: 1200, height: 630, type: "image/png", alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: seo.description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} ${signature.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
