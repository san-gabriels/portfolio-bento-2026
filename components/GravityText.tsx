"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

export function GravityText({ text }: { text: string }) {
  const controls = useAnimation();

  const totalLetters = useMemo(() => {
    return Array.from(text).filter((char) => char !== " ").length;
  }, [text]);

  // LA SCENEGGIATURA DEL DECADIMENTO (Il motore fisico calcolato in anticipo)
  const letterPhysics = useMemo(() => {
    const indices = Array.from({ length: totalLetters }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const data = new Array(totalLetters);
    let currentCumulativeDelay = 0;

    for (let i = 0; i < indices.length; i++) {
      const letterIndex = indices[i];
      const randomRotation = (Math.random() * 20 + 5) * (i % 2 === 0 ? 1 : -1);

      data[letterIndex] = {
        fallDelay: currentCumulativeDelay,
        rotate: randomRotation,
      };

      const randomWaitTime = Math.random() * (15 - 8) + 8;
      currentCumulativeDelay += randomWaitTime;
    }

    return data;
  }, [totalLetters, text]);

  useEffect(() => {
    let isMounted = true;

    const runAnimationSequence = async () => {
      controls.set({ opacity: 0, y: 50, rotate: 0 });

      // FASE 1: Entrata ordinata (veloce, per far leggere il testo all'utente)
      if (isMounted) {
        await controls.start((custom) => ({
          opacity: 1,
          y: 0,
          transition: { delay: custom.enterIndex * 0.03, duration: 0.6, ease: "easeOut" },
        }));
      }

      /* ==========================================
         ANIMAZIONE DI CADUTA MESSA IN PAUSA 
         Per riattivarla, rimuovi questi commenti /* e * /
      =============================================
      
      // FASE 2: Pausa iniziale in cui il testo è perfettamente integro
      if (isMounted) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }

      // FASE 3: Il decadimento a lunghissimo termine
      if (isMounted) {
        await controls.start((custom) => ({
          y: [0, -10, 1000],
          opacity: [1, 1, 0],
          rotate: custom.physics.rotate,
          transition: {
            delay: custom.physics.fallDelay, 
            duration: 3.5, 
            ease: [0.4, 0, 1, 1], 
          },
          transitionEnd: { display: "none" } 
        }));
      }
      
      ============================================= */
    };

    runAnimationSequence();

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [controls, letterPhysics]);

  let charIndex = 0;

  return (
    <div className="flex flex-wrap justify-center w-full">
      {text.split(" ").map((word, wIndex) => (
        <span key={`${word}-${wIndex}`} className="inline-flex mr-[0.3em] last:mr-0">
          {Array.from(word).map((letter, lIndex) => {
            const currentIndex = charIndex++;
            return (
              <motion.span
                key={`${letter}-${lIndex}-${text}`}
                custom={{ 
                  enterIndex: currentIndex, 
                  physics: letterPhysics[currentIndex] 
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                className="inline-block origin-bottom h1-big text-white whitespace-nowrap"
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}