import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";

// Mappiamo tutta la famiglia Bogita Mono con i pesi corretti
const bogitaMono = localFont({
  src: [
    {
      path: './fonts/BogitaMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-UltraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-Oblique.woff2',
      weight: '400',
      style: 'italic', // Lo mappiamo come italic così la classe 'italic' di Tailwind lo attiverà
    },
    {
      path: './fonts/BogitaMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/BogitaMono-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-custom', // Opzionale, utile per configurazioni avanzate
});

export const metadata: Metadata = {
  title: "Tuo Nome | Portfolio", // Ricordati di mettere il tuo nome qui se non l'hai già fatto!
  description: "Art Director & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bogitaMono.className} antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}