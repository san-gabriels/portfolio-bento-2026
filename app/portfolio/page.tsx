"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Redesign",
    category: "Web Design",
    slug: "e-commerce-redesign",
    image: "/images/placeholder.webp",
    colSpan: 1,
  },
  {
    id: 2,
    title: "Fintech App",
    category: "Product Design",
    slug: "fintech-app",
    image: "/images/placeholder.webp",
    colSpan: 1,
  },
  {
    id: 3,
    title: "Global Brand Campaign",
    category: "Art Direction",
    slug: "global-brand-campaign",
    image: "/images/placeholder.webp",
    colSpan: 2,
  },
  {
    id: 4,
    title: "Design System",
    category: "UI/UX",
    slug: "design-system",
    image: "/images/placeholder.webp",
    colSpan: 1,
  },
  {
    id: 5,
    title: "Interactive WebGL",
    category: "Creative Development",
    slug: "interactive-webgl",
    image: "/images/placeholder.webp",
    colSpan: 1,
  },
];

const INTRO_TEXT = "Dive into a few projects that represent my most fulfilling design experiences";
const words = INTRO_TEXT.split(" ");

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
    offset: ["start 50%", "end 15%"],
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white w-full">
      <main className="flex-1 w-full max-w-[1600px] mx-auto pt-[100px] lg:pt-[120px] pb-12 px-4 min-[700px]:px-8">

        <section ref={textRef} className="w-full mb-16 md:mb-24 mt-8 md:mt-16">
          <p className="text-4xl md:text-5xl lg:text-[60px] leading-tight tracking-tight flex flex-wrap max-w-5xl font-medium">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (3 / words.length);
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
              );
            })}
          </p>
        </section>

        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`bg-white/[0.03] border border-white/5 rounded-[24px] p-2 md:p-3 group flex flex-col ${project.colSpan === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative w-full overflow-hidden rounded-[18px] ${project.colSpan === 2 ? 'aspect-video' : 'aspect-[4/3]'}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={project.colSpan === 2 ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
                  />
                </div>
                <div className="mt-4 px-2 mb-2 flex justify-between items-center text-sm">
                  <span className="text-white font-medium">{project.title}</span>
                  <span className="text-white/50">{project.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
