"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Definiamo cosa si aspetta di ricevere questo componente
interface ProjectClientProps {
  project: any;
  prevSlug: string;
  nextSlug: string;
}

export default function ProjectClient({ project, prevSlug, nextSlug }: ProjectClientProps) {
  return (
    <main className="relative z-0 w-full max-w-[1920px] mx-auto min-h-screen flex flex-col bg-black text-white pt-[120px] md:pt-[160px] pb-[31px] md:pb-[47px]">
      
      {/* WRAPPER CENTRALE */}
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col">
        
        {/* HEADER PROGETTO */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 md:mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">{project.title}</h1>
            <p className="text-white/60 text-lg mt-2">{project.category}</p>
          </div>
          {project.websiteUrl !== "#" && (
            <a 
              href={project.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm md:text-base pb-2"
            >
              View website 
              <span className="transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          )}
        </div>

        {/* HERO IMAGE (Aumentata in altezza a 4:3 per rispettare le tue esportazioni) */}
        <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[32px] overflow-hidden mb-16 md:mb-24 border border-white/5">
          <Image src={project.heroImage} alt={`${project.title} Cover`} fill className="object-cover" priority />
        </div>

        {/* INTRO E DATI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-32">
          <div className="md:col-span-8 lg:col-span-7 text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light">
            {project.intro}
          </div>
          
          <div className="md:col-span-4 lg:col-start-10 flex flex-col gap-8 text-sm md:text-base">
            <div><p className="text-white/50 mb-1">Client:</p><p className="font-medium">{project.client}</p></div>
            <div><p className="text-white/50 mb-1">Role:</p><p className="font-medium">{project.role}</p></div>
            <div><p className="text-white/50 mb-1">Year:</p><p className="font-medium">{project.year}</p></div>
          </div>
        </div>

        {/* IMMAGINI IN SEQUENZA (Ora sono due, una sotto l'altra) */}
        <div className="flex flex-col gap-4 md:gap-8 mb-24 md:mb-40">
          <div className="relative w-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5">
            <Image src={project.seqImage1} alt="Details 1" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5">
            <Image src={project.seqImage2} alt="Details 2" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* MARQUEE SCORREVOLE */}
      <div className="w-full overflow-hidden border-y border-white/10 py-6 md:py-8 mb-24 md:mb-40 flex items-center bg-white/[0.02]">
        <motion.div
          className="flex whitespace-nowrap gap-8 text-4xl md:text-7xl font-medium tracking-tighter text-white uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>· EXPLORE THE FULL STORY</span>
          <span>· EXPLORE THE FULL STORY</span>
          <span>· EXPLORE THE FULL STORY</span>
          <span>· EXPLORE THE FULL STORY</span>
        </motion.div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col">

        {/* DESCRIZIONE DETTAGLIATA */}
        <div className="flex flex-col gap-0 border-t border-white/10 mb-24 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-white/10">
            <div className="md:col-span-4 text-white/50 text-sm md:text-base">Challenge</div>
            <div className="md:col-span-8 lg:col-span-6 text-sm md:text-base text-white/90 leading-relaxed">{project.challenge}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-white/10">
            <div className="md:col-span-4 text-white/50 text-sm md:text-base">Objective</div>
            <div className="md:col-span-8 lg:col-span-6 text-sm md:text-base text-white/90 leading-relaxed">{project.objective}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-12 border-b border-white/10">
            <div className="md:col-span-4 text-white/50 text-sm md:text-base">Results</div>
            <div className="md:col-span-8 lg:col-span-6 text-sm md:text-base text-white/90 leading-relaxed">{project.results}</div>
          </div>
        </div>

        {/* NUOVA IMMAGINE FULL WIDTH (Prima del 50/50) */}
        <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5 mb-4 md:mb-8">
          <Image src={project.preGridImage} alt="Pre-Grid Full Width" fill className="object-cover" />
        </div>

        {/* IMMAGINI DIVISE 50/50 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-24 md:mb-40">
          <div className="relative w-full aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5">
            <Image src={project.gridImageLeft} alt="Detail Left" fill className="object-cover" />
          </div>
          <div className="relative w-full aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden border border-white/5">
            <Image src={project.gridImageRight} alt="Detail Right" fill className="object-cover" />
          </div>
        </div>

        {/* NAVIGAZIONE AUTOMATICA */}
        <div className="flex justify-between items-center py-12 md:py-20 border-t border-white/10">
          <Link href={`/portfolio/${prevSlug}`} className="group flex items-center gap-4 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white transition-opacity hover:opacity-70">
            <span className="transform transition-transform duration-300 group-hover:-translate-x-2">←</span> PREV
          </Link>
          <Link href={`/portfolio/${nextSlug}`} className="group flex items-center gap-4 text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white transition-opacity hover:opacity-70">
            NEXT <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>

      </div>
    </main>
  );
}