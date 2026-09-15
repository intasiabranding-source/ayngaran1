import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Caveat, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FBF8F3",
};

export const metadata: Metadata = {
  title: "A Love Story — Happy Birthday My Love",
  description: "A cinematic interactive love letter and celebration of us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${caveat.variable} ${inter.variable}`}
    >
      <body className="bg-[#FBF8F3] text-[#2B1B17] antialiased selection:bg-[#F3A79A]/30 selection:text-[#2B1B17]">
        {children}
      </body>
    </html>
  );
}
