"use client";

import { useState } from "react";
import { BentoCard } from "@/components/BentoCard";
import { TextReveal } from "@/components/TextReveal";

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState("Nolan Carter");

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-black p-4 md:p-8">
      {/* Background Text behind Bento Cards */}
      <TextReveal text={hoveredCardName} />

      {/* Grid Container */}
      <section className="relative z-10 mx-auto w-full max-w-[1440px] pt-8 pb-20">
        <div className="flex flex-col gap-[12px] md:grid md:grid-cols-4 md:gap-[16px] md:auto-rows-[300px]">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <div className="p-8 h-full flex flex-col justify-end">
              <h2 className="h2-title text-white/90">About</h2>
              <p className="body-base text-white/60 mt-2">[About Content]</p>
            </div>
          </BentoCard>

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            colSpan={3}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <div className="p-8 h-full flex flex-col justify-end">
              <h2 className="h2-title text-white/90">Portfolio</h2>
              <p className="body-base text-white/60 mt-2">[Portfolio Content]</p>
            </div>
          </BentoCard>

          {/* Card 3: Contact */}
          <BentoCard
            title="Contact"
            colSpan={2}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <div className="p-8 h-full flex flex-col justify-end">
              <h2 className="h2-title text-white/90">Contact</h2>
              <p className="body-base text-white/60 mt-2">[Contact Content]</p>
            </div>
          </BentoCard>

          {/* Card 4: Photo */}
          <BentoCard
            title="Photo"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <div className="p-8 h-full flex flex-col justify-end">
              <h2 className="h2-title text-white/90">Photo</h2>
              <p className="body-base text-white/60 mt-2">[Image]</p>
            </div>
          </BentoCard>

          {/* Card 5: Stack & Resume */}
          <div className="md:col-span-1 flex flex-col gap-[12px] md:gap-[16px] h-[300px] md:h-auto">
            <BentoCard
              title="Stack"
              colSpan={1}
              onHover={setHoveredCardName}
              className="flex-1 min-h-[142px]"
            >
              <div className="p-6 h-full flex flex-col justify-end">
                <p className="body-base text-white/90">Stack</p>
              </div>
            </BentoCard>
            <BentoCard
              title="Resume"
              colSpan={1}
              onHover={setHoveredCardName}
              className="flex-1 min-h-[142px]"
            >
              <div className="p-6 h-full flex flex-col justify-end">
                <p className="body-base text-white/90">Resume</p>
              </div>
            </BentoCard>
          </div>

        </div>
      </section>
    </main>
  );
}
