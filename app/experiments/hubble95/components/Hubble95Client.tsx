"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { VT323 } from "next/font/google";
import DraggableWindow from "./DraggableWindow";
import AlertPopup from "./AlertPopup";
import Taskbar from "./Taskbar";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

type ApodData = { title: string; url: string; explanation: string; media_type: string; };
type NeoData = { id: string; name: string; is_potentially_hazardous_asteroid: boolean; close_approach_data: { close_approach_date: string; miss_distance: { kilometers: string; }; relative_velocity: { kilometers_per_hour: string; }; }[]; estimated_diameter: { kilometers: { estimated_diameter_min: number; estimated_diameter_max: number; }; }; };

type WindowState = { id: string; isMinimized: boolean; };

export default function Hubble95Client({
  initialApodData,
  initialNeosData,
}: {
  initialApodData: ApodData | null;
  initialNeosData: NeoData[];
}) {
  const [windowsState, setWindowsState] = useState<WindowState[]>([
    { id: 'apod_window', isMinimized: false },
    { id: 'neows_window', isMinimized: false }
  ]);

  const [windowOrder, setWindowOrder] = useState<string[]>(['neows_window', 'apod_window']);
  
  const [isMounted, setIsMounted] = useState(false);
  const [initialPos, setInitialPos] = useState({
    apod: { x: -10, y: -20 },
    neows: { x: 10, y: 20 }
  });

  const [neos, setNeos] = useState<NeoData[]>(initialNeosData);
  const [showHazardAlert, setShowHazardAlert] = useState(false);
  const [panicoActive, setPanicoActive] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    if (window.innerWidth >= 768) {
      setInitialPos({
        apod: { x: -300, y: -100 },
        neows: { x: 200, y: 50 }
      });
    }
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindowOrder(prev => {
      if (prev[prev.length - 1] === id) return prev;
      return [...prev.filter(winId => winId !== id), id];
    });
  }, []);

  const handleMinimize = useCallback((id: string, isMinimized: boolean) => {
    setWindowsState(prev => 
      prev.map(win => win.id === id ? { ...win, isMinimized } : win)
    );
  }, []);

  useEffect(() => {
    const hasHazard = initialNeosData.some((neo) => neo.is_potentially_hazardous_asteroid);
    if (hasHazard) setShowHazardAlert(true);
  }, [initialNeosData]);

  useEffect(() => {
    if (panicoActive) {
      controls.start({
        x: [0, -20, 20, -20, 20, -10, 10, -10, 10, 0],
        y: [0, -20, 20, 20, -20, 10, -10, -10, 10, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatType: "loop", ease: "linear" },
      });
    } else {
      controls.stop();
      controls.set({ x: 0, y: 0 });
    }
  }, [panicoActive, controls]);

  return (
    <motion.div
      animate={controls}
      className={`min-h-screen bg-[#008080] w-full flex flex-col items-center justify-center relative overflow-hidden pb-[40px] ${vt323.className} text-black selection:bg-blue-800 selection:text-white`}
      ref={parentRef}
    >
      
      {isMounted && (
        <>
          {/* Finestra APOD */}
          {initialApodData && (
            <DraggableWindow 
              id="apod_window" 
              parentRef={parentRef} 
              title="APOD.exe" 
              initial={initialPos.apod} 
              // Aggiunta altezza di base (h-[550px]) per evitare collassi
              className="w-[90%] max-w-[450px] h-[550px]" 
              isMinimized={windowsState.find(win => win.id === 'apod_window')?.isMinimized}
              onMinimize={handleMinimize}
              zIndex={windowOrder.indexOf('apod_window') + 10}
              onFocus={() => bringToFront('apod_window')}
            >
              {/* Contenitore Flexbox che sfrutta tutta l'altezza */}
              <div className="p-2 flex flex-col h-full gap-2 overflow-hidden">
                <h2 className="font-bold text-xl leading-tight border-b border-gray-400 pb-1 flex-shrink-0">
                  {initialApodData.title}
                </h2>
                
                {/* Immagine: Forza l'altezza al 60% e previene che venga schiacciata dal testo */}
                {initialApodData.media_type === "image" ? (
                  <div className="relative w-full border-2 border-gray-500 bg-black"
                       style={{ flexBasis: '65%', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={initialApodData.url}
                      alt={initialApodData.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                ) : (
                  <div className="relative w-full border-2 border-gray-500 bg-black flex items-center justify-center text-white"
                       style={{ flexBasis: '60%', flexShrink: 0 }}>
                    Video/Other Media
                  </div>
                )}
                
                {/* Testo: Prende il restante 40% (o meno) con scrollbar */}
                <div className="overflow-y-auto pr-2"
                     style={{ flexBasis: '40%', flexGrow: 1 }}>
                  <p className="text-sm">
                    {initialApodData.explanation}
                  </p>
                </div>
              </div>
            </DraggableWindow>
          )}

          {/* Finestra NeoWs TRACKER */}
          <DraggableWindow 
            id="neows_window" 
            parentRef={parentRef} 
            title="NEOWS_TRACKER.exe" 
            initial={initialPos.neows} 
            // Aggiunta altezza di base (h-[450px]) 
            className="w-[90%] max-w-[380px] h-[450px]" 
            isMinimized={windowsState.find(win => win.id === 'neows_window')?.isMinimized}
            onMinimize={handleMinimize}
            zIndex={windowOrder.indexOf('neows_window') + 10}
            onFocus={() => bringToFront('neows_window')}
          >
            {/* Contenitore Flexbox */}
            <div className="p-2 flex flex-col h-full overflow-hidden">
              <h2 className="font-bold text-lg mb-2 border-b border-gray-400 pb-1 flex-shrink-0">
                Near Earth Objects (Today)
              </h2>
              
              {neos.length > 0 ? (
                // Lista adattiva: riempie tutta l'altezza disponibile rimuovendo h-[250px]
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {neos.map((neo) => (
                    <div key={neo.id} className="border border-gray-400 p-1 text-sm bg-white">
                      <div className="flex justify-between items-center mb-1 bg-blue-800 text-white px-1">
                        <span className="font-bold truncate" title={neo.name}>{neo.name}</span>
                        {neo.is_potentially_hazardous_asteroid && (
                          <span className="text-red-400 font-bold animate-pulse">! HAZARD !</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div>
                          <span className="text-gray-500">Dist: </span>
                          {neo.close_approach_data[0] ? Number(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString('en-US', {maximumFractionDigits: 0}) + ' km' : 'N/A'}
                        </div>
                        <div>
                          <span className="text-gray-500">Vel: </span>
                          {neo.close_approach_data[0] ? Number(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString('en-US', {maximumFractionDigits: 0}) + ' km/h' : 'N/A'}
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Size: </span>
                          {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No objects detected today.</p>
              )}
            </div>
          </DraggableWindow>
        </>
      )}

      {showHazardAlert && (
        <AlertPopup
          onIgnore={() => setShowHazardAlert(false)}
          onPanic={() => { setPanicoActive(true); setShowHazardAlert(false); }}
          parentRef={parentRef}
        />
      )}

      <Taskbar 
        minimizedWindows={windowsState.filter(win => win.isMinimized)} 
        onRestoreWindow={(id) => {
          handleMinimize(id, false);
          bringToFront(id);
        }} 
      />
    </motion.div>
  );
}