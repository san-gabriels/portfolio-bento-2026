"use client";

import React from "react";
import DraggableWindow from "./DraggableWindow";
import { XCircle } from "lucide-react";

interface AlertPopupProps {
  onIgnore: () => void;
  onPanic: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
}

export default function AlertPopup({ onIgnore, onPanic, parentRef }: AlertPopupProps) {
  return (
    <DraggableWindow
      parentRef={parentRef}
      title="CRITICAL_ALERT.exe"
      initial={{ x: 0, y: 0 }}
      className="w-[300px] z-50"
    >
      <div className="p-4 flex flex-col items-center">
        <div className="flex items-start gap-4 w-full mb-6">
          <XCircle className="text-red-600 w-8 h-8 flex-shrink-0" />
          <p className="text-sm">
            WARNING: Un asteroide potenzialmente pericoloso è stato rilevato nei pressi della Terra oggi.
          </p>
        </div>
        <div className="flex gap-2 w-full justify-center">
          <button
            onClick={onIgnore}
            className="bg-[#c0c0c0] px-2 py-1 text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] text-sm"
          >
            Ignora e continua a vivere
          </button>
          <button
            onClick={onPanic}
            className="bg-[#c0c0c0] px-4 py-1 text-black shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] text-sm font-bold border-2 border-black"
          >
            Panico
          </button>
        </div>
      </div>
    </DraggableWindow>
  );
}
