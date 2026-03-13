"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Nota tecnica: In questo ambiente di anteprima, utilizziamo i tag standard <a> e <img> 
 * al posto di 'next/link' e 'next/image' per evitare errori di risoluzione dei moduli.
 * Nel tuo progetto locale potrai ripristinare i componenti di Next.js se preferisci.
 */

// --- COMPONENTE INTERNO: ScrollWord ---
// Lo integriamo qui per risolvere l'errore di importazione @/components/ScrollWord
const ScrollWord = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="relative mr-[0.25em]">
      {children}
    </motion.span>
  );
};

// Dati degli esperimenti
const EXPERIMENTS = [
  { id: 1, title: "CRT Shader", category: "WebGL", slug: "crt-shader", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Fluid Sim", category: "Physics", slug: "fluid-sim", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "ASCII Art", category: "Typography", slug: "ascii", image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Cyberpunk City", category: "3D Render", slug: "cyber-city", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200" },
  { id: 5, title: "Glitch UI", category: "React", slug: "glitch", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Generative AI", category: "Code", slug: "gen-ai", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600" },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const text = "A collection of creative coding, 3D explorations, and visual experiments.";
  const words = text.split(" ");

  // FUNZIONE DI STILE: Calcola il pattern asimmetrico (Ciclo di 6 elementi)
  const getGridItemStyle = (index: number) => {
    const pos = index % 6;
    
    // RIGA 1: Tre colonne (1/3 ciascuna)
    if (pos === 0 || pos === 1 || pos === 2) {
      return { span: "md:col-span-1", aspect: "aspect-square md:aspect-[4/5]" };
    }
    // RIGA 2: 2/3 + 1/3
    if (pos === 3) {
      return { span: "md:col-span-2", aspect: "aspect-[4/3] md:aspect-[16/9]" };
    }
    if (pos === 4) {
      return { span: "md:col-span-1", aspect: "aspect-square md:aspect-[4/5]" };
    }
    // RIGA 3: 3/3 (Full width)
    return { span: "md:col-span-3", aspect: "aspect-[4/3] md:aspect-[21/9]" };
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white w-full flex flex-col pt-[120px] lg:pt-[160px] pb-24 font-sans">
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Titolo con effetto Reveal allo scroll */}
        <section ref={textRef} className="max-w-4xl mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl lg:text-[60px] font-medium leading-[1.1] tracking-tight flex flex-wrap">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (3 / words.length);
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
              );
            })}
          </h1>
        </section>

        {/* Griglia Bento Asimmetrica a 3 colonne */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {EXPERIMENTS.map((project, index) => {
            const style = getGridItemStyle(index);

            return (
              <a
                key={project.id}
                href={`/experiments/${project.slug}`}
                className={`group block bg-white/[0.03] border border-white/5 rounded-[24px] p-2 md:p-3 transition-colors hover:bg-white/[0.06] ${style.span}`}
              >
                <div className={`relative w-full overflow-hidden rounded-[18px] bg-white/5 ${style.aspect}`}>
                  
                  {/* Mirini CAD anni '90 (Dettaglio di stile) */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 px-2 mb-2 flex justify-between items-center">
                  <h2 className="text-white font-medium text-base md:text-lg">{project.title}</h2>
                  <span className="text-white/50 text-sm md:text-base uppercase tracking-wider text-[10px]">{project.category}</span>
                </div>
              </a>
            );
          })}
        </section>

      </main>
    </div>
  );
}