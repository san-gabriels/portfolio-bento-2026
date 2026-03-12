"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1.5, 
        smoothWheel: true, 
      }}
    >
      {/* Forziamo TypeScript ad accettare i children bypassando l'errore di tipo */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {children as any}
    </ReactLenis>
  );
}