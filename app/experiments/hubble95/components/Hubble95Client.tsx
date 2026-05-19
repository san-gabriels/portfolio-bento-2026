"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { VT323 } from "next/font/google";
import DraggableWindow from "./DraggableWindow";
import AlertPopup from "./AlertPopup";
import Taskbar from "./Taskbar";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

type ApodData = {
  title: string;
  url: string;
  explanation: string;
  media_type: string;
};

type NeoData = {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    miss_distance: {
      kilometers: string;
    };
    relative_velocity: {
      kilometers_per_hour: string;
    };
  }[];
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
};

// Tipo per gestire lo stato di una singola finestra
type WindowState = {
  id: string;
  isMinimized: boolean;
};

export default function Hubble95Client({
  initialApodData,
  initialNeosData,
}: {
  initialApodData: ApodData | null;
  initialNeosData: NeoData[];
}) {
  // Gestione dell'elenco delle finestre e del loro stato
  const [windowsState, setWindowsState] = useState<WindowState[]>([
    { id: 'apod_window', isMinimized: false },
    { id: 'neows_window', isMinimized: false }
  ]);

  const [neos, setNeos] = useState<NeoData[]>(initialNeosData);
  const [showHazardAlert, setShowHazardAlert] = useState(false);
  const [panicoActive, setPanicoActive] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Funzione per aggiornare lo stato di minimizzazione di una finestra
  const handleMinimize = useCallback((id: string, isMinimized: boolean) => {
    setWindowsState(prev => 
      prev.map(win => win.id === id ? { ...win, isMinimized } : win)
    );
  }, []);

  // Controllo Hazard Alert all'avvio
  useEffect(() => {
    const hasHazard = initialNeosData.some(
      (neo) => neo.is_potentially_hazardous_asteroid
    );
    if (hasHazard) {
      setShowHazardAlert(true);
    }
  }, [initialNeosData]);

  // Gestione dell'animazione di panico
  useEffect(() => {
    if (panicoActive) {
      controls.start({
        x: [0, -20, 20, -20, 20, -10, 10, -10, 10, 0],
        y: [0, -20, 20, 20, -20, 10, -10, -10, 10, 0],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        },
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
      
      {/* Finestra APOD */}
      {initialApodData && (
        <DraggableWindow 
          id="apod_window" 
          parentRef={parentRef} 
          title="APOD.exe" 
          initial={{ x: -300, y: -100 }} 
          className="w-[400px]"
          isMinimized={windowsState.find(win => win.id === 'apod_window')?.isMinimized}
          onMinimize={handleMinimize}
        >
          <div className="p-2 space-y-2">
            <h2 className="font-bold text-xl leading-tight border-b border-gray-400 pb-1">{initialApodData.title}</h2>
            {initialApodData.media_type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={initialApodData.url}
                alt={initialApodData.title}
                className="w-full h-auto border-2 border-gray-500 max-h-[300px] object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full aspect-video border-2 border-gray-500 bg-black flex items-center justify-center text-white">
                Video/Other Media
              </div>
            )}
            <p className="text-sm h-[100px] overflow-y-auto pr-1">
              {initialApodData.explanation}
            </p>
          </div>
        </DraggableWindow>
      )}

      {/* Finestra NeoWs TRACKER */}
      <DraggableWindow 
        id="neows_window" 
        parentRef={parentRef} 
        title="NEOWS_TRACKER.exe" 
        initial={{ x: 200, y: 50 }} 
        className="w-[350px]"
        isMinimized={windowsState.find(win => win.id === 'neows_window')?.isMinimized}
        onMinimize={handleMinimize}
      >
        <div className="p-2">
          <h2 className="font-bold text-lg mb-2 border-b border-gray-400 pb-1">Near Earth Objects (Today)</h2>
          {neos.length > 0 ? (
            <div className="space-y-3 h-[250px] overflow-y-auto pr-1">
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

      {/* Popup di Allerta */}
      {showHazardAlert && (
        <AlertPopup
          onIgnore={() => setShowHazardAlert(false)}
          onPanic={() => {
            setPanicoActive(true);
            setShowHazardAlert(false);
          }}
          parentRef={parentRef}
        />
      )}

      {/* Taskbar: Passiamo l'elenco delle finestre minimizzate */}
      <Taskbar 
        minimizedWindows={windowsState.filter(win => win.isMinimized)} 
        onRestoreWindow={(id) => handleMinimize(id, false)} 
      />
    </motion.div>
  );
}