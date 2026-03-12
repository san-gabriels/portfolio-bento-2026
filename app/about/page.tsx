"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const EXPERIENCE_DATA = [
  {
    year: "2023 - Present",
    role: "Senior Art Director",
    company: "Creative Studio",
    description: "Leading digital experiences, defining visual languages and pushing the boundaries of interactive web design for global brands.",
  },
  {
    year: "2020 - 2023",
    role: "Lead Designer",
    company: "Digital Agency",
    description: "Spearheaded user interface design, prototyping, and cross-functional team collaboration to deliver award-winning products.",
  },
  {
    year: "2018 - 2020",
    role: "Framer Developer",
    company: "Tech Startup",
    description: "Developed high-performance animations and interaction systems, bridging the gap between static design and fully interactive code.",
  },
];

const PARAGRAPH = "I am a multidisciplinary designer and creative developer focused on crafting immersive digital experiences. I believe in the power of motion, typography, and precise grid systems to tell compelling stories. With a background in both art direction and technical implementation, I bridge the gap between imagination and reality, building products that are as functional as they are beautiful.";

const words = PARAGRAPH.split(" ");

// Il trucco dei Pro: Usare l'opacità su due livelli sovrapposti invece di animare il colore
// Il trucco dei Pro: Usare l'opacità su due livelli sovrapposti invece di animare il colore
function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // 0.2 simula il grigio scuro, 1 è il bianco puro
  const opacity = useTransform(progress, range, [0.2, 1]); 
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] mt-[0.1em] text-white">
      {children}
    </motion.span>
  );
}

export default function AboutPage() {
  const textRef = useRef<HTMLDivElement>(null);
  
  // Offset calibrato: inizia quando la parte alta del testo è all'85% dello schermo (in basso)
  // Finisce quando la parte bassa del testo è al 50% dello schermo (al centro)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 50%", "end 15%"],
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white w-full">
      {/* Nota: Abbiamo rimosso <Navbar /> da qui perché è già nel layout globale */}

      {/* Main container allineato esattamente come la Bento Grid (max-w-[1600px]) */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto pt-[100px] lg:pt-[120px] pb-12 px-4 min-[700px]:px-8">
        
        {/* SECTION 1: Wall of Text */}
        <section ref={textRef} className="w-full mb-32 md:mb-48">
          <p className="text-2xl md:text-4xl lg:text-[48px] font-medium leading-tight tracking-tight flex flex-wrap max-w-6xl">
            {words.map((word, i) => {
              const start = i / words.length;
              // Allunga leggermente l'end per rendere la transizione più morbida
              const end = start + (3 / words.length);
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
              );
            })}
          </p>
        </section>

        {/* SECTION 2: Portrait Image */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32 md:mb-48">
          <div className="hidden md:block"></div> {/* Spazio vuoto a sinistra */}
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-[24px]">
            <Image
              src="/images/profile.webp"
              alt="Gabriel Mihali Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* SECTION 3: Experience */}
        <section className="w-full mb-16 md:mb-24">
          <div className="flex flex-col border-t border-white/10">
            {EXPERIENCE_DATA.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr] gap-4 md:gap-8 py-8 md:py-12 border-b border-white/10"
              >
                <div className="text-white/60 text-sm md:text-base font-medium">
                  {item.year}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-xl md:text-2xl">{item.role}</span>
                  <span className="text-white/60 text-sm md:text-base mt-1">{item.company}</span>
                </div>
                <div className="text-white/60 leading-relaxed text-sm md:text-base md:pr-12">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SECTION 4: Infinite Marquee (Fuori dal max-w per toccare i bordi dello schermo) */}
      <section className="w-full overflow-hidden mb-32 md:mb-48">
        <div className="relative flex whitespace-nowrap">
          <motion.div
            className="flex text-[10vw] uppercase font-bold tracking-tighter"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 80 }} // Velocità rallentata (40s)
          >
            {/* Array moltiplicato per 4 per assicurare lo scorrimento continuo su schermi ultra-wide */}
            {[...Array(4)].map((_, i) => (
              <span key={i} className="pr-8">DESIGN • ART DIRECTION • FRAMER DEVELOPMENT • </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Giant CTA Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 min-[700px]:px-8 pb-12 flex flex-col gap-12">
        <div className="flex flex-col">
          <span className="text-white/60 text-sm font-medium uppercase tracking-widest mb-4">
            Let&apos;s work together
          </span>
          <a
            href="mailto:contact@gabrielmihali.com"
            className="text-3xl md:text-5xl lg:text-[60px] font-bold tracking-tighter leading-none hover:text-white/60 transition-colors"
          >
            contact@gabrielmihali.com
          </a>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 border-t border-white/10 mt-12 md:mt-24">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} ... All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
}