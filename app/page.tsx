"use client";

import { useState } from "react";
import { BentoCard } from "@/components/BentoCard";
import { TextReveal } from "@/components/TextReveal";

export default function Home() {
  const [hoveredCardName, setHoveredCardName] = useState("Nolan Carter");

  return (
    <main className="relative z-0 min-h-screen bg-black overflow-hidden w-full max-w-[1920px] mx-auto h-[100vh]">
      {/* Background Text behind Bento Cards */}
      <TextReveal text={hoveredCardName} />

      {/* Grid Container */}
      <section className="relative z-20 mx-auto w-full max-w-[1600px]">
        <div className="flex flex-col gap-[12px] pt-[120px] pb-[16px] px-4 min-[700px]:grid min-[700px]:grid-cols-2 min-[700px]:gap-[16px] min-[700px]:pt-[60px] min-[700px]:px-8 lg:grid-cols-4 lg:pt-[100px]">

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
