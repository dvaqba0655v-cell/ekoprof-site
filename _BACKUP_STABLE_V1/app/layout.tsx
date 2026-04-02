import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import Image from "next/image";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Очистка вентиляции от жира в Самаре — Цены, Акты для МЧС и Роспотребнадзора | ВентГарант+",
  description: "Профессиональная очистка систем вентиляции от жировых отложений по ГОСТ в Самаре. Дезинфекция воздуховодов, очистка зонтов в ресторанах, проверка пожарной безопасности. Смывы на ОМЧ, акты ВДПО. Выезд 24/7.",
  keywords: [
    "очистка вентиляции Самара",
    "очистка систем вентиляции от жировых отложений",
    "дезинфекция воздуховодов",
    "проверка пожарной безопасности",
    "очистка зонтов в ресторанах",
    "очистка вытяжки от жира",
    "смывы на ОМЧ",
    "акт для Роспотребнадзора",
    "акт ВДПО",
    "очистка вентиляции по ГОСТ",
    "очистка воздуховодов Самара",
    "чистка вытяжки ресторан",
    "очистка вентиляции кафе",
    "очистка вентиляции завод",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-zinc-950 flex flex-col`}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingChatWidget />
        </SmoothScroll>
      </body>
    </html>
  );
}
