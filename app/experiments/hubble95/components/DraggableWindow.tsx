"use client";

import React, { ReactNode, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
  initial?: { x: number; y: number };
  className?: string;
  id?: string;
  isMinimized?: boolean;
  onMinimize?: (id: string, isMinimized: boolean) => void;
  zIndex?: number;
  onFocus?: () => void;
}

const TASKBAR_HEIGHT_PX = 40;

// Pattern a scacchiera 100% compatibile per i bordi fantasma
const checkerboardPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M0,0 H2 V2 H0 Z M2,2 H4 V4 H2 Z' fill='black'/%3E%3C/svg%3E")`;

export default function DraggableWindow({
  title,
  children,
  parentRef, // Mantenuto per compatibilità con le tue prop, anche se i constraint ora sono liberi
  initial = { x: 0, y: 0 },
  className = "",
  id = "window_default",
  isMinimized = false,
  onMinimize = () => {},
  zIndex = 10,
  onFocus = () => {},
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Posizione e dimensioni REALI della finestra
  const [position, setPosition] = useState(initial);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // Stati per gestire l'interazione del WIREFRAME
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [outlineRect, setOutlineRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  
  // Riferimento interno per tracciare le posizioni esatte del wireframe in tempo reale
  const outlineRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    onMinimize(id, isMinimized);
  }, [id, isMinimized, onMinimize]);

  if (isMinimized) return null;

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  // --- LOGICA DI TRASCINAMENTO MANUALE ---
  const startDrag = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (isMaximized || !windowRef.current) return;
    onFocus();

    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startPosX = position.x;
    const startPosY = position.y;

    // Inizializza le coordinate del wireframe fantasma
    outlineRef.current = {
      x: startPosX,
      y: startPosY,
      w: windowRef.current.offsetWidth,
      h: windowRef.current.offsetHeight,
    };
    setOutlineRect(outlineRef.current);
    setIsDragging(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      outlineRef.current.x = startPosX + (moveEvent.clientX - startPointerX);
      outlineRef.current.y = startPosY + (moveEvent.clientY - startPointerY);
      setOutlineRect({ ...outlineRef.current });
    };

    const onPointerUp = () => {
      setIsDragging(false);
      // Applica la nuova posizione alla finestra VERA
      setPosition({ x: outlineRef.current.x, y: outlineRef.current.y });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // --- LOGICA DI RIDIMENSIONAMENTO MANUALE ---
  const startResize = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized || !windowRef.current) return;
    onFocus();

    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startPosX = position.x;
    const startPosY = position.y;
    const startW = windowRef.current.offsetWidth;
    const startH = windowRef.current.offsetHeight;

    outlineRef.current = { x: startPosX, y: startPosY, w: startW, h: startH };
    setOutlineRect(outlineRef.current);
    setIsResizing(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      let newW = startW;
      let newH = startH;
      let newX = startPosX;
      let newY = startPosY;
      const dx = moveEvent.clientX - startPointerX;
      const dy = moveEvent.clientY - startPointerY;

      // Aggiorna le dimensioni in base al lato afferrato
      if (direction.includes('e')) newW = startW + dx;
      if (direction.includes('w')) { newW = startW - dx; newX = startPosX + dx; }
      if (direction.includes('s')) newH = startH + dy;
      if (direction.includes('n')) { newH = startH - dy; newY = startPosY + dy; }

      // Limiti minimi per non far collassare la finestra (aggiusta X/Y se si ridimensiona da Sinistra/Alto)
      if (newW < 250) {
        if (direction.includes('w')) newX -= (250 - newW);
        newW = 250;
      }
      if (newH < 150) {
        if (direction.includes('n')) newY -= (150 - newH);
        newH = 150;
      }

      outlineRef.current = { x: newX, y: newY, w: newW, h: newH };
      setOutlineRect({ ...outlineRef.current });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      // Applica la nuova dimensione e posizione alla finestra VERA
      setSize({ w: outlineRef.current.w, h: outlineRef.current.h });
      setPosition({ x: outlineRef.current.x, y: outlineRef.current.y });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const showOutline = isDragging || isResizing;

  return (
    <>
      {/* 1. IL WIREFRAME FANTASMA (Si muove e si ridimensiona, mentre la finestra resta ferma) */}
      {showOutline && !isMaximized && (
        <div
          className="absolute z-[9999] pointer-events-none"
          style={{
            transform: `translate(${outlineRect.x}px, ${outlineRect.y}px)`,
            width: `${outlineRect.w}px`,
            height: `${outlineRect.h}px`,
          }}
        >
          {/* 4 div solidi che formano la cornice a scacchiera spessa 3px */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundImage: checkerboardPattern }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundImage: checkerboardPattern }} />
          <div className="absolute top-0 bottom-0 left-0 w-[3px]" style={{ backgroundImage: checkerboardPattern }} />
          <div className="absolute top-0 bottom-0 right-0 w-[3px]" style={{ backgroundImage: checkerboardPattern }} />
        </div>
      )}

      {/* 2. LA FINESTRA VERA */}
      <motion.div
        ref={windowRef}
        onPointerDownCapture={onFocus}
        // Nessun drag di framer-motion! Usiamo il drag manuale creato sopra
        initial={initial}
        animate={isMaximized ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
        transition={{ type: "tween", duration: 0 }} // Snap istantaneo come Win95

        className={`absolute flex flex-col ${className} ${
          isMaximized || size ? "!max-w-none !max-h-none" : ""
        }`}
        style={{
          touchAction: "none",
          zIndex: zIndex,
          ...(isMaximized
            ? {
                top: 0,
                left: 0,
                right: 0,
                bottom: `${TASKBAR_HEIGHT_PX}px`,
                height: `calc(100vh - ${TASKBAR_HEIGHT_PX}px)`,
                width: "100vw",
                position: "fixed",
              }
            : {
                width: size ? `${size.w}px` : undefined,
                height: size ? `${size.h}px` : undefined,
              }),
        }}
      >
        <div className="bg-[#c0c0c0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] p-1 h-full flex flex-col w-full relative">
          
          {/* Window Title Bar */}
          <div
            onPointerDown={startDrag} // Usa il nostro drag manuale
            className={`bg-blue-800 text-white px-2 py-1 flex items-center justify-between shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] ${
              isMaximized ? "cursor-default" : "cursor-move"
            }`}
          >
            <span className="font-bold text-sm select-none">{title}</span>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); onMinimize(id, true); }}
                className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] pb-1"
              >
                _
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]"
              >
                □
              </button>
              <button className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] pt-[1px]">
                X
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-auto mt-1 bg-[#c0c0c0] w-full">
            {children}
          </div>

          {/* 3. Maniglie di Ridimensionamento (tutti gli 8 lati e angoli) */}
          {!isMaximized && (
            <>
              {/* Lati */}
              <div className="absolute top-0 bottom-0 left-[-4px] w-[8px] cursor-w-resize z-50" onPointerDown={(e) => startResize(e, 'w')} />
              <div className="absolute top-0 bottom-0 right-[-4px] w-[8px] cursor-e-resize z-50" onPointerDown={(e) => startResize(e, 'e')} />
              <div className="absolute left-0 right-0 top-[-4px] h-[8px] cursor-n-resize z-50" onPointerDown={(e) => startResize(e, 'n')} />
              <div className="absolute left-0 right-0 bottom-[-4px] h-[8px] cursor-s-resize z-50" onPointerDown={(e) => startResize(e, 's')} />
              
              {/* Angoli NWSE */}
              <div className="absolute left-[-6px] top-[-6px] w-[12px] h-[12px] cursor-nwse-resize z-[60]" onPointerDown={(e) => startResize(e, 'nw')} />
              <div className="absolute right-[-6px] bottom-[-6px] w-[12px] h-[12px] cursor-nwse-resize z-[60]" onPointerDown={(e) => startResize(e, 'se')} />
              
              {/* Angoli NESW */}
              <div className="absolute right-[-6px] top-[-6px] w-[12px] h-[12px] cursor-nesw-resize z-[60]" onPointerDown={(e) => startResize(e, 'ne')} />
              <div className="absolute left-[-6px] bottom-[-6px] w-[12px] h-[12px] cursor-nesw-resize z-[60]" onPointerDown={(e) => startResize(e, 'sw')} />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}