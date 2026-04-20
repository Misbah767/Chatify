import React from "react";
import Providers from "../../Providers/Provider/Provider";
import Toast from "@/Components/ui/Toast/Toast";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sacramento Font (Headings)
export const sacramentoFontLink = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap"
      rel="stylesheet"
    />
  </>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{sacramentoFontLink}</head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f172a] text-white`}
      >
        {/* PROVIDERS */}
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
