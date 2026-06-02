import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/core/SmoothScroll";
import GrainOverlay from "@/components/core/GrainOverlay";
import CustomCursor from "@/components/core/CustomCursor";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DUST GAME CLUB — Место, где играют всерьёз",
  description:
    "Премиальный игровой клуб с железом класса А. Турниры, комьюнити, 24/7.",
  keywords: ["игровой клуб", "киберспорт", "турниры", "DUST", "gaming"],
  openGraph: {
    title: "DUST GAME CLUB",
    description: "Место, где играют всерьёз",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-[#0A0A0A] overflow-x-hidden">
        <SmoothScroll>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
