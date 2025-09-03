import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lezzet Durağı - Geleneksel Türk Mutfağı",
  description: "İstanbul'un kalbinde geleneksel Türk mutfağının en lezzetli yemeklerini modern bir atmosferde sunuyoruz. Kahvaltı, öğle yemekleri, tatlılar ve içecekler.",
  keywords: "restoran, türk mutfağı, istanbul, kahvaltı, öğle yemeği, tatlı, içecek, rezervasyon",
  authors: [{ name: "Lezzet Durağı" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
