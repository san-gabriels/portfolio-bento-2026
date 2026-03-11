"use client";

import { useState } from "react";
import { BentoCard } from "@/components/BentoCard";
import { TextReveal } from "@/components/TextReveal";

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState("Nolan Carter");

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-end p-4 md:p-8 overflow-hidden">
      {/* Background Text behind Bento Cards */}
      <TextReveal text={hoveredCardName} />

      {/* Grid Container */}
      <section className="relative z-10 mx-auto w-full max-w-[1600px] px-4 md:px-8 pt-8 pb-20 mt-[200px] md:mt-0">
        <div className="flex flex-col gap-[12px] md:grid md:grid-cols-4 md:gap-[16px] md:auto-rows-[300px]">

          {/* Card 1: About */}
          <BentoCard
            title="About"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <p className="body-base text-white/60">[About Content]</p>
          </BentoCard>

          {/* Card 2: Portfolio */}
          <BentoCard
            title="Portfolio"
            colSpan={3}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <p className="body-base text-white/60">[Portfolio Content]</p>
          </BentoCard>

          {/* Card 3: Contact */}
          <BentoCard
            title="Contact"
            colSpan={2}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <p className="body-base text-white/60">[Contact Content]</p>
          </BentoCard>

          {/* Card 4: Photo */}
          <BentoCard
            title="Photo"
            colSpan={1}
            onHover={setHoveredCardName}
            className="h-[300px] md:h-auto"
          >
            <p className="body-base text-white/60">[Image]</p>
          </BentoCard>

          {/* Card 5: Stack & Resume */}
          <div className="md:col-span-1 flex flex-col gap-[12px] md:gap-[16px] h-[300px] md:h-auto">
            <BentoCard
              title="Stack"
              colSpan={1}
              onHover={setHoveredCardName}
              className="flex-1 min-h-[142px]"
            />
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
