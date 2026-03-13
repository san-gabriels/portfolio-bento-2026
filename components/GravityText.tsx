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
    // 1. Creiamo un array con gli indici di tutte le lettere [0, 1, 2...] e lo mescoliamo
    const indices = Array.from({ length: totalLetters }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const data = new Array(totalLetters);
    let currentCumulativeDelay = 0; // Il timer globale che scorre

    // 2. Assegniamo a ciascuna lettera il suo momento esatto di caduta
    for (let i = 0; i < indices.length; i++) {
      const letterIndex = indices[i];
      
      // Calcoliamo una rotazione caotica casuale (tra 5 e 25 gradi)
      const randomRotation = (Math.random() * 20 + 5) * (i % 2 === 0 ? 1 : -1);

      // Salviamo le istruzioni esatte per QUESTA specifica lettera
      data[letterIndex] = {
        fallDelay: currentCumulativeDelay,
        rotate: randomRotation,
      };

      // IL TRUCCO È QUI: Dopo aver deciso quando cade questa lettera, 
      // aggiungiamo un tempo casuale tra 8 e 15 secondi PRIMA che tocchi alla prossima!
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

      // FASE 2: Pausa iniziale in cui il testo è perfettamente integro (1.5s come prima)
      if (isMounted) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // FASE 3: Il decadimento a lunghissimo termine
      if (isMounted) {
  await controls.start((custom) => ({
    y: [0, -10, 1000], // Ridotto leggermente a 1000 per sicurezza
    opacity: [1, 1, 0],
    rotate: custom.physics.rotate,
    transition: {
      delay: custom.physics.fallDelay, 
      duration: 3.5, 
      ease: [0.4, 0, 1, 1], 
    },
    // Questo dice al browser: "Una volta finito, fai finta che non esista più"
    transitionEnd: { display: "none" } 
  }));
}
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
                // Passiamo alla lettera sia l'ordine di entrata che la sua fisica di caduta
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