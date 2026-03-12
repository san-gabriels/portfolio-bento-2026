"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BentoCard } from "@/components/BentoCard";
import { TextReveal } from "@/components/TextReveal";

const techStack = [
  "/stack/google-analytics.svg",
  "/stack/google-tag-manager.svg",
  "/stack/wordpress-color.svg",
];

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState("Nolan Carter");

  return (
    <main className="relative z-0 w-full max-w-[1920px] mx-auto min-h-screen flex flex-col overflow-x-hidden bg-black pb-[31px] md:pb-[47px]">
      {/* Background Text behind Bento Cards */}
      <TextReveal text={hoveredCardName} />

      {/* Grid Container */}
      <section className="relative z-20 mx-auto w-full max-w-[1600px] flex flex-col mt-[60px] md:mt-[90px]">
        <div className="flex flex-col gap-[12px] pt-[120px] pb-[16px] px-4 min-[700px]:grid min-[700px]:grid-cols-2 min-[700px]:gap-[16px] min-[700px]:pt-[60px] min-[700px]:px-8 lg:grid-cols-4 lg:grid-rows-2 lg:pt-[100px]">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          />

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            colSpan={3}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          />

          {/* Card 3: Contact */}
          <BentoCard
            title="Contact"
            colSpan={2}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          />

          {/* Card 4: Photo */}
          <BentoCard
            title="Photo"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
            noPadding
            hideTitle
          >
            <Image
              src="/images/profile.webp"
              alt="Profile"
              fill
              className="object-cover"
            />
          </BentoCard>

          {/* Card 5: Stack & Resume */}
          <div className="md:col-span-1 flex flex-col gap-[12px] md:gap-[16px] h-[300px] md:h-auto">
            <BentoCard
              title="Stack"
              colSpan={1}
              onHover={setHoveredCardName}
              className="flex-1 min-h-[142px] flex items-center justify-center overflow-hidden"
              hideTitle
            >
              <div className="relative w-full overflow-hidden flex items-center">
                <motion.div
                  className="flex gap-8 whitespace-nowrap"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 10,
                  }}
                >
                  {/* We duplicate the array to create a seamless infinite loop */}
                  {[...techStack, ...techStack].map((src, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={src}
                        alt="Tech Logo"
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain"
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
              className="flex-1 min-h-[142px]"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
