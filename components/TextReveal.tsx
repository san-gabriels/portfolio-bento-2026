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
        delayChildren: 0.2,
        staggerChildren: 0.025,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const letterVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      y: "-110%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const titleCaseText = text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div className="fixed top-[60px] md:top-[80px] left-0 w-full flex justify-center z-10 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.h1
          key={titleCaseText}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h1-big text-white text-center whitespace-nowrap relative overflow-hidden"
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
