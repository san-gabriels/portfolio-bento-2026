"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { motion, useDragControls } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
  initial?: { x: number; y: number };
  className?: string;
  id?: string;
  isMinimized?: boolean;
  onMinimize?: (id: string, isMinimized: boolean) => void;
}

const TASKBAR_HEIGHT_PX = 40;

export default function DraggableWindow({
  title,
  children,
  parentRef,
  initial = { x: 0, y: 0 },
  className = "",
  id = "window_default",
  isMinimized = false,
  onMinimize = () => {},
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState(initial);
  const [savedPosition, setSavedPosition] = useState(initial);

  const dragControls = useDragControls();

  // Comunica la minimizzazione iniziale al parent, se necessario
  useEffect(() => {
    onMinimize(id, isMinimized);
  }, [id, isMinimized, onMinimize]);

  // Se minimizzato, restituiamo null per nascondere la finestra dal DOM
  if (isMinimized) {
    return null;
  }

  const toggleMaximize = () => {
    if (!isMaximized) {
      setSavedPosition(position);
    } else {
      setPosition(savedPosition);
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false} // IMPORTANTE: Disabilita il drag sull'intero div
      dragConstraints={parentRef}
      dragMomentum={false}
      dragElastic={0}
      initial={isMaximized ? { x: 0, y: 0 } : initial}
      animate={isMaximized ? { x: 0, y: 0 } : undefined}
      // Stili dinamici se massimizzata
      className={`absolute flex flex-col z-10 ${className}`}
      style={{
        touchAction: "none",
        ...(isMaximized
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: `${TASKBAR_HEIGHT_PX}px`,
              position: "fixed",
            }
          : {}),
      }}
    >
      <div className="bg-[#c0c0c0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] p-1 h-full flex flex-col">
        
        {/* Window Title Bar */}
        <div
          // Avvia il drag solo premendo sulla barra del titolo
          onPointerDown={(e) => {
             if (!isMaximized) dragControls.start(e);
          }}
          className={`bg-blue-800 text-white px-2 py-1 flex items-center justify-between shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] ${
            isMaximized ? "cursor-default" : "cursor-move"
          }`}
        >
          <span className="font-bold text-sm select-none">{title}</span>
          <div className="flex gap-1">
            <button
              onClick={() => onMinimize(id, true)}
              className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[10px] leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]"
            >
              _
            </button>
            <button
              onClick={toggleMaximize}
              className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[10px] leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]"
            >
              □
            </button>
            <button className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[10px] leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]">
              x
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-hidden mt-1 bg-[#c0c0c0]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}