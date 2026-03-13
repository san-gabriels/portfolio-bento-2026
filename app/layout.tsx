import type { Metadata } from "next";
// 1. IMPORTA IL MOTORE PER I FONT LOCALI
import localFont from "next/font/local"; 
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";

// 2. CARICA IL TUO FILE FONT
const mioFont = localFont({
  src: "./fonts/DepartureMono-Regular.woff2", // <-- Inserisci il nome esatto del tuo file
  variable: "--font-custom", // (Opzionale) utile se usi Tailwind
});

export const metadata: Metadata = {
  title: "Gabriel Mihali | Portfolio",
  description: "Art Director & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. APPLICA IL FONT AL BODY */}
      <body
        className={`${mioFont.className} antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}