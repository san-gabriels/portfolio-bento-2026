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
  "/stack/photoshop-original.svg",
  "/stack/illustrator-original.svg",
  "/stack/githubcodespaces.svg",
  "/stack/premierepro.svg",

];

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState("Mihali");

  return (
    <main className="relative z-0 w-full max-w-[1920px] mx-auto min-h-screen flex flex-col overflow-x-hidden bg-black pb-[31px] md:pb-[47px]">
      
      {/* BACKGROUND TEXT CON GRAVITÀ LUNARE */}
      <div className="absolute top-[110px] md:top-[130px] left-0 w-full h-screen z-0 pointer-events-none select-none overflow-hidden">
        <GravityText key={hoveredCardName} text={hoveredCardName} />
      </div>

      {/* Grid Container */}
      <section className="relative z-20 mx-auto w-full max-w-[1600px] flex flex-col mt-[140px] md:mt-[240px] lg:mt-[220px] lg:flex-1">
        
        {/* LA MAGIA: grid-cols-[7fr_3fr] per il 70/30 su mobile. Su md torna a 4 colonne regolari. */}
        <div className="grid grid-cols-[7fr_3fr] md:grid-cols-4 gap-[12px] md:gap-[16px] pb-[16px] px-4 md:px-8 lg:grid-rows-2 lg:h-[calc(100vh-300px)] min-h-[600px]">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            colSpan={1}
            onHover={setHoveredCardName}
            href="/about"
            className="col-span-2 md:col-span-2 lg:col-span-1 h-[160px] md:h-[240px] lg:h-full"
          />

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            colSpan={3}
            onHover={setHoveredCardName}
            href="/portfolio"
            className="col-span-2 md:col-span-2 lg:col-span-3 h-[160px] md:h-[240px] lg:h-full"
          />

          {/* Card 3: experiments */}
          <BentoCard
            title="experiments"
            colSpan={2}
            onHover={setHoveredCardName}
            href="/experiments"
            className="col-span-1 md:col-span-3 lg:col-span-2 h-[180px] md:h-[320px] lg:h-full"
          />

          {/* Card 4: Photo */}
          <BentoCard
            title="Hi!"
            colSpan={1}
            onHover={setHoveredCardName}
            noPadding
            hideTitle
            className="col-span-1 md:col-span-1 lg:col-span-1 h-[180px] md:h-[320px] lg:h-full"
          >
            <Image
              src="/images/profile.webp"
              alt="Profile"
              fill
              className="object-cover"
            />
          </BentoCard>

          {/* Card 5: Stack & Resume (IL WRAPPER) */}
          {/* Rimosso lg:flex e lg:flex-col. Mantenuto GRID per governare lo spazio rigidly. */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-[12px] md:gap-[16px] h-[126px] md:h-[200px] lg:h-full">
            
            {/* STACK: Non ha più bisogno di h-full perché la grid decide. */}
            <BentoCard
              title="Stack"
              colSpan={1}
              onHover={setHoveredCardName}
              hideTitle
              noPadding
              className="w-full flex items-center justify-center overflow-hidden"
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
                  className="flex gap-[12px] md:gap-[20px] whitespace-nowrap pr-[12px] md:pr-[20px]"
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
                      className="flex-shrink-0 flex items-center justify-center bg-neutral-800/60 w-[56px] h-[56px] md:w-[80px] md:h-[80px] rounded-[16px] md:rounded-[24px]"
                    >
                      <Image
                        src={src}
                        alt="Tech Logo"
                        width={40}
                        height={40}
                        className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] object-contain"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </BentoCard>

            {/* RESUME: Rimosso h-full. Aggiunto !p-[16px] su mobile per non far impazzire l'altezza */}
            <BentoCard
              title="Get in touch"
              colSpan={1}
              onHover={setHoveredCardName}
              href="/about#contact"
              className="w-full !p-[16px] md:!p-[24px] lg:!p-[32px] flex flex-col justify-end"
            />
          </div>

        </div>
      </section>
    </main>
  );
}