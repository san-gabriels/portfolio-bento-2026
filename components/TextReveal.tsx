"use client";

import { motion, AnimatePresence } from "framer-motion";

interface TextRevealProps {
  text: string;
}

export function TextReveal({ text }: TextRevealProps) {
  // Stagger parameters for initial load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.025,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      y: "-110%",
      opacity: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const titleCaseText = text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="fixed top-[60px] md:top-[80px] left-0 w-full flex justify-center z-10 pointer-events-none">
      <AnimatePresence>
        <motion.h1
          key={titleCaseText}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          // ECCO LA MODIFICA CHIAVE: absolute left-0 w-full invece di relative
          className="h1-big text-white text-center whitespace-nowrap absolute left-0 w-full overflow-hidden"
        >
          {titleCaseText.split("").map((char, index) => (
            <motion.span
              key={`${index}-${char}`}
              className="relative overflow-hidden inline-flex"
            >
              <motion.span
                variants={letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
