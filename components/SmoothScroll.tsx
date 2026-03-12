"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // La morbidezza. Più è basso, più scivola.
        duration: 1.5, 
        smoothWheel: true, 
      }}
    >
      {children}
    </ReactLenis>
  );
}