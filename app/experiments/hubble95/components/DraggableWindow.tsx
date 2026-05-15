"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  children: ReactNode;
  parentRef: React.RefObject<HTMLDivElement | null>;
  initial?: { x: number; y: number };
  className?: string;
}

export default function DraggableWindow({
  title,
  children,
  parentRef,
  initial = { x: 0, y: 0 },
  className = "",
}: DraggableWindowProps) {
  return (
    <motion.div
      drag
      dragConstraints={parentRef}
      dragMomentum={false}
      dragElastic={0}
      initial={initial}
      className={`absolute bg-[#c0c0c0] shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] p-1 flex flex-col z-10 ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* Window Title Bar */}
      <div className="bg-blue-800 text-white px-2 py-1 flex items-center justify-between cursor-move shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf]">
        <span className="font-bold text-sm select-none">{title}</span>
        <div className="flex gap-1">
          <button className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[10px] leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]">
            _
          </button>
          <button className="bg-[#c0c0c0] text-black w-4 h-4 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[10px] leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]">
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
    </motion.div>
  );
}
