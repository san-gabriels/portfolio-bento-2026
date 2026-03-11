"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
}

const EachCharacter = ({
  char,
  start,
  end,
  progress,
}: {
  char: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) => {
  const opacityProgress = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span style={{ opacity: opacityProgress }}>{char}</motion.span>
  );
};

const EachWord = ({
  word,
  progress,
  starting,
  ending,
}: {
  word: string;
  progress: MotionValue<number>;
  starting: number;
  ending: number;
}) => {
  const characters = word.split("");
  const wordLength = word.length;
  const amount = ending - starting;
  const step = amount / wordLength;
  return (
    <motion.span style={{ whiteSpace: "pre" }}>
      {characters.map((char, idx) => {
        const charStart = starting + step * idx;
        const charEnd = starting + step * (idx + 1);
        return (
          <EachCharacter
            key={idx}
            char={char}
            start={charStart}
            end={charEnd}
            progress={progress}
          />
        );
      })}
      &nbsp;
    </motion.span>
  );
};

export function TextReveal({ text, className }: TextRevealProps) {
  const lines = text.split("\n");
  const words = text.split(/\s+/);
  const totalWords = words.length;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.31", "end 0.3"],
  });

  let wordIndex = 0;

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        whiteSpace: "pre-wrap",
        lineHeight: 1.2,
      }}
      className={cn(className)}
    >
      {lines.map((line, lineIndex) => {
        const lineWords = line.split(" ");
        return (
          <div key={lineIndex} style={{ display: "flex", flexWrap: "wrap" }}>
            {lineWords.map((word, idx) => {
              const safeTotal = totalWords + 1;
              const starting = wordIndex / safeTotal;
              const ending = (wordIndex + 1) / safeTotal;
              wordIndex++;
              return (
                <EachWord
                  key={`${lineIndex}-${idx}`}
                  word={word}
                  progress={scrollYProgress}
                  starting={starting}
                  ending={ending}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
