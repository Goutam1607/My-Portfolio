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

export const metadata: Metadata = {
  ...(isTodo(profile.siteUrl) ? {} : { metadataBase: new URL(profile.siteUrl) }),
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
  },
  twitter: { card: "summary_large_image", title, description: seo.description },
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
