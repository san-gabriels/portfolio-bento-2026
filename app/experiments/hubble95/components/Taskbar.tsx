'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Definiamo i tipi per le prop in entrata
type MinimizedWindow = {
  id: string;
};

type TaskbarProps = {
  minimizedWindows?: MinimizedWindow[];
  onRestoreWindow?: (id: string) => void;
};

export default function Taskbar({
  minimizedWindows = [],
  onRestoreWindow = () => {}
}: TaskbarProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [time, setTime] = useState<string>('');
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Gestione chiusura del menù Start cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Orologio di sistema
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 60000); // Aggiorna ogni minuto
    return () => clearInterval(interval);
  }, []);

 // Funzione helper per ottenere il nome della finestra dall'ID
  const getWindowTitle = (id: string) => {
    switch(id) {
      case 'apod_window': return 'APOD.exe';
      case 'neows_window': return 'NEOWS_TRACKER.exe';
      case 'donki_window': return 'SPACE_WX_LOG.exe';
      case 'epic_window': return 'BLUE_MARBLE.exe';
      default: return 'Program.exe';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-[40px] bg-[#c0c0c0] flex items-center px-1 z-[9999] select-none"
         style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.5)' }}>
      
     {/* Start Menu Popup - Strutturato come richiesto */}
      {isStartOpen && (
        <div ref={startMenuRef} 
             className="absolute bottom-[38px] left-1 bg-[#c0c0c0] flex flex-col z-[10000] p-1"
             style={{ 
               boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #0a0a0a, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #808080',
               minWidth: '150px'
             }}>
          
          <div className="flex flex-col text-black text-sm">
            {/* Home */}
            <Link href="/" className="px-6 py-2 hover:bg-[#000080] hover:text-white cursor-default">
              Home
            </Link>
            
            {/* Divisore orizzontale in stile Win95 */}
            <div className="h-[2px] w-[95%] mx-auto my-1" 
                 style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #ffffff' }} />
                 
            {/* Altri Link */}
            <Link href="/about" className="px-6 py-2 hover:bg-[#000080] hover:text-white cursor-default">
              About
            </Link>
            <Link href="/portfolio" className="px-6 py-2 hover:bg-[#000080] hover:text-white cursor-default">
              Portfolio
            </Link>
            <Link href="/experiments" className="px-6 py-2 hover:bg-[#000080] hover:text-white cursor-default">
              Experiments
            </Link>
          </div>
        </div>
      )}

      {/* Pulsante Start - Aggiornato con l'immagine esterna */}
      <button
        onClick={() => setIsStartOpen(!isStartOpen)}
        className={`flex items-center h-8 px-2 font-bold text-black text-sm focus:outline-none ${
          isStartOpen ? 'bg-[#dfdfdf]' : 'bg-[#c0c0c0]'
        }`}
        style={{
          boxShadow: isStartOpen
            ? 'inset 1px 1px 0 #0a0a0a, inset -1px -1px 0 #fff, inset 2px 2px 0 #808080, inset -2px -2px 0 #dfdfdf'
            : 'inset 1px 1px 0 #fff, inset -1px -1px 0 #0a0a0a, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #808080'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/windows95_start_icon.png" 
          alt="Windows Start" 
          className="mr-1 w-5 h-5 pointer-events-none image-rendering-pixelated"
        />
        <span className="font-black pt-[1px] ml-1">Start</span>
      </button>

      {/* Spazio Finestre Minimizzate */}
      <div className="flex-1 ml-2 flex gap-1 h-full items-center overflow-x-auto px-1 py-1">
        {minimizedWindows.map(win => (
          <button
            key={win.id}
            onClick={() => onRestoreWindow(win.id)}
            className="flex items-center h-full px-3 font-bold text-black text-xs min-w-[120px] max-w-[150px] focus:outline-none bg-[#c0c0c0] truncate"
            style={{
              boxShadow: 'inset 1px 1px 0 #fff, inset -1px -1px 0 #0a0a0a, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #808080'
            }}
          >
            {getWindowTitle(win.id)}
          </button>
        ))}
      </div>

      {/* System Tray (Orologio) */}
      <div className="h-7 px-3 flex items-center text-black text-xs mr-1"
           style={{ boxShadow: 'inset 1px 1px 0 #808080, inset -1px -1px 0 #fff' }}>
        {time}
      </div>
    </div>
  );
}