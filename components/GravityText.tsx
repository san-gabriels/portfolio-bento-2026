"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

export function GravityText({ text }: { text: string }) {
  const controls = useAnimation();

  // 1. Contiamo le lettere effettive (ignorando gli spazi vuoti)
  const totalLetters = useMemo(() => {
    return Array.from(text).filter((char) => char !== " ").length;
  }, [text]);

  // 2. Creiamo un ordine di caduta totalmente casuale (es. la 5° lettera cade per prima, la 1° cade per terza, ecc.)
  const shuffledOrders = useMemo(() => {
    const arr = Array.from({ length: totalLetters }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [totalLetters, text]);

  useEffect(() => {
    let isMounted = true;

    const runAnimationSequence = async () => {
      controls.set({ opacity: 0, y: 50, rotate: 0 });

      // FASE 1: Entrata ordinata (da sinistra a destra)
      if (isMounted) {
        await controls.start((custom) => ({
          opacity: 1,
          y: 0,
          // Usa l'indice di entrata per apparire in ordine
          transition: { delay: custom.enterIndex * 0.03, duration: 0.6, ease: "easeOut" },
        }));
      }

      // FASE 2: Pausa fissa di 0.5 secondi
      if (isMounted) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // FASE 3: Gravità Lunare (Ordine Casuale e molto più lenta)
      if (isMounted) {
        await controls.start((custom) => ({
          y: [0, -10, 1500],
          opacity: [1, 1, 0.8, 0],
          // Anche la rotazione è casuale e caotica
          rotate: custom.fallOrder % 2 === 0 ? 10 + custom.fallOrder : -10 - custom.fallOrder,
          transition: {
            // IL SEGRETO È QUI: Ritardo basato sull'ordine casuale. 
            // Moltiplicato per 0.2 (molto più lento di prima, così si staccano una ad una)
            delay: custom.fallOrder * 0.2, 
            duration: 3.5, 
            ease: [0.4, 0, 1, 1], // Fisica "vuoto spaziale"
          },
        }));
      }
    };

    runAnimationSequence();

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [controls, text, shuffledOrders]);

  let globalEnterIndex = 0;
  let globalFallIndex = 0;

  return (
    <div className="flex flex-wrap justify-center w-full">
      {text.split(" ").map((word, wIndex) => (
        <span key={`${word}-${wIndex}`} className="inline-flex mr-[0.3em] last:mr-0">
          {Array.from(word).map((letter, lIndex) => {
            const enterIndex = globalEnterIndex++;
            const fallOrder = shuffledOrders[globalFallIndex++];

            return (
              <motion.span
                key={`${letter}-${lIndex}-${text}`}
                // Passiamo ad ogni lettera due "biglietti": uno per l'entrata e uno per la caduta
                custom={{ enterIndex, fallOrder }}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                // NIENTE PIÙ CAPSLOCK: Rimosso 'capitalize' o 'uppercase'. Usa solo il tuo h1-big e il bianco.
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