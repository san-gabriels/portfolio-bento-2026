"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Navbar } from "@/components/Navbar";

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

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const color = useTransform(progress, range, ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 1)"]);
  return (
    <motion.span style={{ color }} className="inline-block mr-[0.4em] mt-[0.2em]">
      {children}
    </motion.span>
  );
}

export default function AboutPage() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "start 20%"],
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white max-w-[1920px] mx-auto w-full">
      <Navbar />

      <main className="flex-1 pt-[120px] lg:pt-[160px] pb-24 px-4 min-[700px]:px-8 w-full">
        <section ref={textRef} className="max-w-6xl mx-auto mb-32 md:mb-48">
          <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-snug flex flex-wrap">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
              );
            })}
          </p>
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32 md:mb-48">
          <div className="hidden md:block"></div>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/profile.webp"
              alt="Profile Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-32 md:mb-48">
          <div className="flex flex-col">
            {EXPERIENCE_DATA.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr] gap-4 md:gap-8 py-8 border-b border-white/10"
              >
                <div className="text-white/60 text-sm md:text-base font-medium">
                  {item.year}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-lg md:text-xl">{item.role}</span>
                  <span className="text-white/60 text-sm md:text-base mt-1">{item.company}</span>
                </div>
                <div className="text-white/60 leading-relaxed text-sm md:text-base">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="w-full overflow-hidden mb-24 md:mb-32">
        <div className="relative flex whitespace-nowrap">
          <motion.div
            className="flex text-[10vw] uppercase font-bold tracking-tighter"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          >
            <span className="pr-8">DESIGN • ART DIRECTION • FRAMER DEVELOPMENT • </span>
            <span className="pr-8">DESIGN • ART DIRECTION • FRAMER DEVELOPMENT • </span>
            <span className="pr-8">DESIGN • ART DIRECTION • FRAMER DEVELOPMENT • </span>
            <span className="pr-8">DESIGN • ART DIRECTION • FRAMER DEVELOPMENT • </span>
          </motion.div>
        </div>
      </section>

      <footer className="w-full max-w-6xl mx-auto px-4 min-[700px]:px-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <a
          href="mailto:hello@example.com"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          hello@example.com
        </a>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Dribbble</a>
        </div>
      </footer>
    </div>
  );
}
