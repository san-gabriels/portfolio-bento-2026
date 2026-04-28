"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "C.NEXT Corporate Hub",
    category: "Custom Web Architecture and Development",
    slug: "cnext-hub",
    image: "https://assets.gabrielmihali.com/image103.webp", 
    colSpan: 1,
  },
  {
    id: 3,
    title: "Broadcast Architecture and Post-Event Marketing",
    category: "Technical Direction and Live Streaming Events",
    slug: "streamyard",
    image: "https://assets.gabrielmihali.com/image301.webp",
    colSpan: 1, 
  },
  {
    id: 2,
    title: "C.NEXT Digital Ecosystem",
    category: "Platform Scaling and Data Analytics",
    slug: "cnext-system",
    image: "https://assets.gabrielmihali.com/image201-head.webp",
    colSpan: 2,
  },
  {
    id: 5,
    title: "Multi-Hub CRM and DEM Automation",
    category: "System Integration and Marketing email Automation",
    slug: "multi-hub-automation",
    image: "https://assets.gabrielmihali.com/image501.webp",
    colSpan: 1,
  },
  {
    id: 4,
    title: "Custom B2B Platform",
    category: "Full-Stack WordPress Development (Staging Environment)",
    slug: "custom-b2b-platform",
    image: "https://assets.gabrielmihali.com/image401.webp",
    colSpan: 1,
  },
];

const HERO_TEXT = "Dive into a few projects that represent my most fulfilling design experiences";
const words = HERO_TEXT.split(" ");

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] mt-[0.1em] text-white">
      {children}
    </motion.span>
  );
}

export default function PortfolioPage() {
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 90%", "start 10%"],
  });

  return (
    <div className="min-h-screen bg-black text-white w-full flex flex-col pt-[120px] lg:pt-[160px] pb-24">
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 min-[700px]:px-8">
        
        <section ref={textRef} className="w-full mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl lg:text-[48px] font-medium leading-[1.1] tracking-tight flex flex-wrap">
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className={`group block bg-white/[0.03] border border-white/5 rounded-[24px] p-2 md:p-3 transition-colors hover:bg-white/[0.06] ${
                project.colSpan === 2 ? "md:col-span-2" : "col-span-1"
              }`}
            >
              <div
                className={`relative w-full overflow-hidden rounded-[18px] bg-white/5 ${
                  project.colSpan === 2 ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
                  
                  
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                />
              </div>
              <div className="mt-4 px-2 mb-2 flex justify-between items-center">
                <h2 className="text-white font-medium text-base md:text-lg">{project.title}</h2>
                <span className="text-white/50 text-sm md:text-base">{project.category}</span>
              </div>
            </Link>
          ))}
        </section>

      </main>
    </div>
  );
}