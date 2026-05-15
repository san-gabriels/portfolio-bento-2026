"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hubble95Experiment() {
  return (
    <div className="min-h-screen bg-black text-white w-full flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Tasto per tornare indietro e non rimanere intrappolati nell'esperimento */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/experiments"
          className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest"
        >
          &larr; Back to Lab
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-4">
          Hubble 95
        </h1>
        <p className="text-white/50 max-w-md mx-auto">
          Canvas pronto. In attesa di segnali dallo spazio profondo...
        </p>
      </motion.div>

      {/* Qui dentro poi ci piazzeremo il canvas per WebGL / Shaders */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {/* Placeholder background */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#008080] to-black"></div>
      </div>

    </div>
  );
}