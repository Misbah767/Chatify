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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900`}
      >
        {/*  GLOBAL BACKGROUND DECOR */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* GRID */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

          {/* GLOW SHAPES */}
          <div className="absolute top-0 -left-4 size-96 bg-[#4a5df9] opacity-20 blur-[100px]" />
          <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
        </div>

        {/*  PROVIDERS */}
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
