"use client";

import { GravityText } from "@/components/GravityText";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/BentoCard";

const techStack = [
  "/stack/google-analytics.svg",
  "/stack/google-tag-manager.svg",
  "/stack/wordpress-color.svg",
];

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState(" Mihali");

  return (
    <main className="relative z-0 w-full max-w-[1920px] mx-auto min-h-screen flex flex-col overflow-x-hidden bg-black pb-[31px] md:pb-[47px]">
      
      {/* BACKGROUND TEXT CON GRAVITÀ LUNARE */}
      <div className="absolute top-[130px] md:top-[120px] left-0 w-full h-screen z-0 pointer-events-none select-none overflow-hidden">
        <GravityText key={hoveredCardName} text={hoveredCardName} />
      </div>

      {/* Grid Container */}
      <section className="relative z-20 mx-auto w-full max-w-[1600px] flex flex-col mt-[180px] md:mt-[240px] lg:mt-[220px]">
        
        {/* LA GRIGLIA: 2 colonne(mobile) -> 4 colonne(tablet) -> 4 colonne(desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[16px] pb-[16px] px-4 md:px-8 lg:grid-rows-2">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            colSpan={1}
            onHover={setHoveredCardName}
            href="/about"
            // Mobile: 2 col | Tablet: 2 col | Desktop: 1 col
            className="col-span-2 md:col-span-2 lg:col-span-1 h-[160px] md:h-[240px] lg:h-auto"
          />

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            colSpan={3}
            onHover={setHoveredCardName}
            href="/portfolio"
            // Mobile: 2 col | Tablet: 2 col | Desktop: 3 col
            className="col-span-2 md:col-span-2 lg:col-span-3 h-[160px] md:h-[240px] lg:h-auto"
          />

          {/* Card 3: experiments */}
          <BentoCard
            title="experiments"
            colSpan={2}
            onHover={setHoveredCardName}
            href="/experiments"
            // Mobile: 1 col | Tablet: 3 col (Largo) | Desktop: 2 col
            className="col-span-1 md:col-span-3 lg:col-span-2 h-[180px] md:h-[320px] lg:h-auto"
          />

          {/* Card 4: Photo */}
          <BentoCard
            title="Hi!"
            colSpan={1}
            onHover={setHoveredCardName}
            noPadding
            hideTitle
            // Mobile: 1 col | Tablet: 1 col (Quadrato) | Desktop: 1 col
            className="col-span-1 md:col-span-1 lg:col-span-1 h-[180px] md:h-[320px] lg:h-auto"
          >
            <Image
              src="/images/profile.webp"
              alt="Profile"
              fill
              className="object-cover"
            />
          </BentoCard>

          {/* Card 5: Stack & Resume (IL WRAPPER) */}
          {/* Mobile: 2 col | Tablet: 4 col (Fondo riga) | Desktop: 1 col. Sottomodello a Griglia su piccoli schermi! */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 grid grid-cols-2 lg:flex lg:flex-col gap-[12px] md:gap-[16px] h-[180px] md:h-[200px] lg:h-auto">
            
            <BentoCard
              title="Stack"
              colSpan={1}
              onHover={setHoveredCardName}
              hideTitle
              noPadding
              // h-full/w-full garantisce la simmetria millimetrica nella grid
              className="w-full h-full lg:flex-1 lg:min-h-[142px] flex items-center justify-center overflow-hidden"
            >
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
                  maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)'
                }}
              >
                <motion.div
                  className="flex gap-[20px] whitespace-nowrap pr-[20px]"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20, 
                  }}
                >
                  {[...techStack, ...techStack, ...techStack, ...techStack].map((src, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 flex items-center justify-center bg-neutral-800/60 w-[80px] h-[80px] rounded-[24px]"
                    >
                      <Image
                        src={src}
                        alt="Tech Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </BentoCard>

            <BentoCard
              title="Resume"
              colSpan={1}
              onHover={setHoveredCardName}
              // Simmetria al 50% garantita
              className="w-full h-full lg:flex-1 lg:min-h-[142px]"
            />
          </div>

        </div>
      </section>
    </main>
  );
}