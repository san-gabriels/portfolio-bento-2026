"use client";

import React, { ReactNode, useState, useEffect, useRef, useCallback } from "react";
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

const win95XorPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Cpath d='M0,0 H1 V1 H0 Z M1,1 H2 V2 H1 Z M2,2 H3 V3 H2 Z M3,3 H4 V4 H3 Z M0,2 H1 V3 H0 Z M1,3 H2 V4 H1 Z M2,0 H3 V1 H2 Z M3,1 H4 V2 H3 Z' fill='white'/%3E%3C/svg%3E")`;

const win95Cursors = {
  ns: `url('/cursors/win95_ns.png'), n-resize`,       
  ew: `url('/cursors/win95_ew.png'), e-resize`,       
  nwse: `url('/cursors/win95_nwse.png'), nwse-resize`, 
  nesw: `url('/cursors/win95_nesw.png'), nesw-resize`, 
};

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
  
  const [position, setPosition] = useState(initial);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [outlineRect, setOutlineRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    onMinimize(id, isMinimized);
  }, [id, isMinimized, onMinimize]);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none'; 
    } else {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    }
    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isDragging, isResizing]);

  // --- LOGICA DI TRASCINAMENTO ---
  const startDrag = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault(); 
    if (isMaximized || !windowRef.current) return;
    onFocus();

    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startPosX = position.x;
    const startPosY = position.y;

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
      setPosition({ x: outlineRef.current.x, y: outlineRef.current.y });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [isMaximized, position, onFocus]);

  // --- LOGICA DI RIDIMENSIONAMENTO MATEMATICO (Ancoraggio Fisso) ---
  const startResize = useCallback((e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault(); 
    if (isMaximized || !windowRef.current) return;
    onFocus();

    const handleEl = e.currentTarget as HTMLDivElement;
    try {
      handleEl.setPointerCapture(e.pointerId);
    } catch (err) {}

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
      
      let dxMouse = moveEvent.clientX - startPointerX;
      let dyMouse = moveEvent.clientY - startPointerY;

      const MIN_WIDTH = 250;
      const MIN_HEIGHT = 150;

      // Clamp limits to prevent logic breaking when window is too small
      if (direction.includes('e') && startW + dxMouse < MIN_WIDTH) dxMouse = MIN_WIDTH - startW;
      if (direction.includes('w') && startW - dxMouse < MIN_WIDTH) dxMouse = startW - MIN_WIDTH;
      if (direction.includes('s') && startH + dyMouse < MIN_HEIGHT) dyMouse = MIN_HEIGHT - startH;
      if (direction.includes('n') && startH - dyMouse < MIN_HEIGHT) dyMouse = startH - MIN_HEIGHT;

      // Compensazione Flexbox: Ancoriamo saldamente il lato opposto al movimento
      if (direction.includes('e')) {
        newW = startW + dxMouse;
        newX = startPosX + dxMouse / 2;
      } else if (direction.includes('w')) {
        newW = startW - dxMouse;
        newX = startPosX + dxMouse / 2;
      }

      if (direction.includes('s')) {
        newH = startH + dyMouse;
        newY = startPosY + dyMouse / 2;
      } else if (direction.includes('n')) {
        newH = startH - dyMouse;
        newY = startPosY + dyMouse / 2;
      }

      outlineRef.current = { x: newX, y: newY, w: newW, h: newH };
      setOutlineRect({ ...outlineRef.current });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      try {
        handleEl.releasePointerCapture(e.pointerId);
      } catch (err) {}
      
      setSize({ w: outlineRef.current.w, h: outlineRef.current.h });
      setPosition({ x: outlineRef.current.x, y: outlineRef.current.y });
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, [isMaximized, position, onFocus]);

  const toggleMaximize = () => setIsMaximized(!isMaximized);
  const showOutline = isDragging || isResizing;

  // FIX CRASH NEXT.JS: Il return condizionale deve trovarsi DOPO tutti gli Hooks!
  if (isMinimized) {
    return null;
  }

  return (
    <>
      {/* WIREFRAME FANTASMA XOR */}
      {showOutline && !isMaximized && (
        <div
          className="absolute z-[9999] pointer-events-none"
          style={{
            transform: `translate(${outlineRect.x}px, ${outlineRect.y}px)`,
            width: `${outlineRect.w}px`,
            height: `${outlineRect.h}px`,
            mixBlendMode: 'difference', 
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ backgroundImage: win95XorPattern }} />
          <div className="absolute bottom-0 left-0 right-0 h-[4px]" style={{ backgroundImage: win95XorPattern }} />
          <div className="absolute top-0 bottom-0 left-0 w-[4px]" style={{ backgroundImage: win95XorPattern }} />
          <div className="absolute top-0 bottom-0 right-0 w-[4px]" style={{ backgroundImage: win95XorPattern }} />
        </div>
      )}

      {/* FINESTRA VERA */}
      <motion.div
        ref={windowRef}
        onPointerDownCapture={onFocus}
        initial={initial}
        animate={isMaximized ? { x: 0, y: 0 } : { x: position.x, y: position.y }}
        transition={{ type: "tween", duration: 0 }} 

        className={`absolute flex flex-col ${className} ${
          isMaximized || size ? "!max-w-none !max-h-none" : ""
        }`}
        style={{
          touchAction: "none",
          zIndex: zIndex,
          opacity: 1, 
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
          
          {/* Header */}
          <div
            onPointerDown={startDrag}
            className={`bg-blue-800 text-white px-2 py-1 flex items-center justify-between shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] ${
              isMaximized ? "cursor-default" : "cursor-move"
            }`}
          >
            <span className="font-bold text-sm select-none pointer-events-none">{title}</span>
            <div className="flex gap-1 flex-shrink-0" onPointerDown={(e) => e.stopPropagation()}>
              <button onClick={(e) => { e.stopPropagation(); onMinimize(id, true); }} className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] pb-1">_</button>
              <button onClick={(e) => { e.stopPropagation(); toggleMaximize(); }} className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf]">□</button>
              <button className="bg-[#c0c0c0] text-black w-5 h-5 flex items-center justify-center shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] text-[12px] font-bold leading-none active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff,inset_2px_2px_#808080,inset_-2px_-2px_#dfdfdf] pt-[1px]">X</button>
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 overflow-auto mt-1 bg-[#c0c0c0] w-full relative">
            {children}
          </div>

          {/* Maniglie di Ridimensionamento SNELLITE (Larghezza 10px, non intralciano le scrollbar) */}
          {!isMaximized && (
            <>
              <div className="absolute top-0 bottom-0 left-[-4px] w-[10px] z-50" style={{ cursor: win95Cursors.ew }} onPointerDown={(e) => startResize(e, 'w')} />
              <div className="absolute top-0 bottom-0 right-[-4px] w-[10px] z-50" style={{ cursor: win95Cursors.ew }} onPointerDown={(e) => startResize(e, 'e')} />
              <div className="absolute left-0 right-0 top-[-4px] h-[10px] z-50" style={{ cursor: win95Cursors.ns }} onPointerDown={(e) => startResize(e, 'n')} />
              <div className="absolute left-0 right-0 bottom-[-4px] h-[10px] z-50" style={{ cursor: win95Cursors.ns }} onPointerDown={(e) => startResize(e, 's')} />
              
              <div className="absolute left-[-6px] top-[-6px] w-[14px] h-[14px] z-[60]" style={{ cursor: win95Cursors.nwse }} onPointerDown={(e) => startResize(e, 'nw')} />
              <div className="absolute right-[-6px] bottom-[-6px] w-[14px] h-[14px] z-[60]" style={{ cursor: win95Cursors.nwse }} onPointerDown={(e) => startResize(e, 'se')} />
              <div className="absolute right-[-6px] top-[-6px] w-[14px] h-[14px] z-[60]" style={{ cursor: win95Cursors.nesw }} onPointerDown={(e) => startResize(e, 'ne')} />
              <div className="absolute left-[-6px] bottom-[-6px] w-[14px] h-[14px] z-[60]" style={{ cursor: win95Cursors.nesw }} onPointerDown={(e) => startResize(e, 'sw')} />
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}