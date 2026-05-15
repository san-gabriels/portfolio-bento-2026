"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/**
 * Nota tecnica: In questo ambiente di anteprima, utilizziamo i tag standard <a> e <img> 
 * al posto di 'next/link' e 'next/image' per evitare errori di risoluzione dei moduli.
 * Nel tuo progetto locale potrai ripristinare i componenti di Next.js se preferisci.
 */

// --- COMPONENTE INTERNO: ScrollWord ---
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
  { id: 1, title: "Hubble 95", category: "WebGL", slug: "hubble95", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Fluid Sim", category: "Physics", slug: "fluid-sim", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "ASCII Art", category: "Typography", slug: "ascii", image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Cyberpunk City", category: "3D Render", slug: "cyber-city", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200" },
  { id: 5, title: "Glitch UI", category: "React", slug: "glitch", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Retro interface", category: "UI", slug: "retro-interface", image: "https://images.unsplash.com/photo-1720962158852-e7039d31c3c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  
  // Stato per gestire l'overlay "Coming Soon"
  const [selectedProject, setSelectedProject] = useState<typeof EXPERIMENTS[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 90%", "start 10%"],
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
    <div ref={containerRef} className="min-h-screen bg-black text-white w-full flex flex-col pt-[120px] lg:pt-[160px] pb-24 font-sans relative">
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Titolo con effetto Reveal allo scroll */}
        <section ref={textRef} className="w-full mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl lg:text-[48px] font-medium leading-[1.1] tracking-tight flex flex-wrap w-full">
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
  onClick={(e) => {
    // Se NON è Hubble 95, blocca la navigazione e mostra il pop-up
    if (project.slug !== "hubble95") {
      e.preventDefault(); 
      setSelectedProject(project); 
    }
    // Se è hubble95, l'if viene ignorato e il tag <a> esegue 
    // la sua navigazione nativa verso l'href.
  }}
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

      {/* OVERLAY "COMING SOON" */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)} // Chiude cliccando fuori
          >
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-black border border-white/10 rounded-[24px] p-8 md:p-16 max-w-xl w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Previene la chiusura cliccando sul box
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="mb-6 inline-block">
                <span className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] border border-white/10 rounded-full px-4 py-1.5">
                  {selectedProject.category}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-medium tracking-tighter mb-4">
                Coming Soon
              </h3>
              
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                The <span className="text-white">"{selectedProject.title}"</span> experiment is currently compiling. I'm polishing the final details before releasing it into the wild.
              </p>

              <button 
                onClick={() => setSelectedProject(null)}
                className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}