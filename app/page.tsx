"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "@/components/BentoCard";

export default function Home() {
  const [hoveredText, setHoveredText] = useState("Roshan");

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black selection:bg-white/20">
      {/* Dynamic Background Text */}
      <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full z-0 pointer-events-none flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={hoveredText}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-[15vw] md:text-[12vw] lg:text-[10rem] xl:text-[12rem] leading-none tracking-tighter font-bold text-white/[0.03] text-center uppercase"
          >
            {hoveredText}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Grid Layout over the background */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[35vh] pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            className="md:col-span-1 lg:col-span-1"
            onMouseEnter={() => setHoveredText("About")}
            onMouseLeave={() => setHoveredText("Roshan")}
          >
            <div className="flex items-center justify-center w-full h-full text-white/50 text-sm">
              [About Content]
            </div>
          </BentoCard>

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            className="md:col-span-1 lg:col-span-3"
            onMouseEnter={() => setHoveredText("Portfolio")}
            onMouseLeave={() => setHoveredText("Roshan")}
          >
            <div className="flex items-center justify-center w-full h-full text-white/50 text-sm">
              [Portfolio Content]
            </div>
          </BentoCard>

          {/* Card 3: Contact */}
          <BentoCard
            title="Contact"
            className="md:col-span-2 lg:col-span-2"
            onMouseEnter={() => setHoveredText("Contact")}
            onMouseLeave={() => setHoveredText("Roshan")}
          >
            <div className="flex items-center justify-center w-full h-full text-white/50 text-sm">
              [Contact Content]
            </div>
          </BentoCard>

          {/* Card 4: Photo (Solid Background / Image placeholder) */}
          <BentoCard
            title="Photo"
            className="md:col-span-1 lg:col-span-1 bg-[#222222] border-transparent"
            onMouseEnter={() => setHoveredText("Photo")}
            onMouseLeave={() => setHoveredText("Roshan")}
          >
            <div className="absolute inset-0 bg-neutral-800 -z-10" />
            <div className="flex items-center justify-center w-full h-full text-white/50 text-sm">
              [Image]
            </div>
          </BentoCard>

          {/* Card 5: Stack & Resume */}
          <div className="md:col-span-1 lg:col-span-1 flex flex-col gap-4 md:gap-6 h-full">
            <BentoCard
              title="Stack"
              className="flex-1 min-h-0"
              onMouseEnter={() => setHoveredText("Stack")}
              onMouseLeave={() => setHoveredText("Roshan")}
            />
            <BentoCard
              title="Resume"
              className="flex-1 min-h-0"
              onMouseEnter={() => setHoveredText("Resume")}
              onMouseLeave={() => setHoveredText("Roshan")}
            />
          </div>

        </div>
      </section>
    </main>
  );
}
