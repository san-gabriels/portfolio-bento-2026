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
        delayChildren: 0.4,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="fixed top-[100px] md:top-[120px] left-0 w-full text-center z-[-10] pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.h1
          key={text}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h1-big text-white uppercase text-center whitespace-nowrap"
        >
          {text.split("").map((char, index) => (
            <motion.span key={`${index}-${char}`} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
