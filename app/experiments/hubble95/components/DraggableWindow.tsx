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
  zIndex?: number;
  onFocus?: () => void;
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
  zIndex = 10,
  onFocus = () => {},
}: DraggableWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const dragControls = useDragControls();

  useEffect(() => {
    onMinimize(id, isMinimized);
  }, [id, isMinimized, onMinimize]);

  if (isMinimized) {
    return null;
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      onPointerDownCapture={onFocus}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={parentRef}
      dragMomentum={false}
      dragElastic={0}
      
      // LA SOLUZIONE È QUI: Usiamo animate per forzare il posizionamento di Framer Motion
      initial={initial}
      animate={isMaximized ? { x: 0, y: 0 } : undefined}
      transition={{ type: "tween", duration: 0 }} // Nessuna animazione fluida (molto Win95)

      // E nel className gestiamo dimensioni e posizionamento CSS
      className={`absolute flex flex-col ${className} ${
        isMaximized ? "w-full h-full max-w-none max-h-none" : "" // Rimuove eventuali limiti
      }`}
      style={{
        touchAction: "none",
        zIndex: zIndex,
        ...(isMaximized
          ? {
              top: 0,
              left: 0,
              right: 0,
              bottom: `${TASKBAR_HEIGHT_PX}px`, // Lascia spazio alla taskbar
              height: `calc(100vh - ${TASKBAR_HEIGHT_PX}px)`, // Altezza esatta
              width: "100vw", // Larghezza esatta
              position: "fixed",
            }
          : {}),
      }}
    >
      <div className="bg-[#c0c0c0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] p-1 h-full flex flex-col w-full">
        
        {/* Window Title Bar */}
        <div
          onPointerDown={(e) => {
             if (!isMaximized) dragControls.start(e);
          }}
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
      </div>
    </motion.div>
  );
}