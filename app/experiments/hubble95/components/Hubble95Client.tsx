"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { VT323 } from "next/font/google";
import DraggableWindow from "./DraggableWindow";
import AlertPopup from "./AlertPopup";
import Taskbar from "./Taskbar";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

// Types
type ApodData = { title: string; url: string; explanation: string; media_type: string; };
type NeoData = { id: string; name: string; is_potentially_hazardous_asteroid: boolean; close_approach_data: { close_approach_date: string; miss_distance: { kilometers: string; }; relative_velocity: { kilometers_per_hour: string; }; }[]; estimated_diameter: { kilometers: { estimated_diameter_min: number; estimated_diameter_max: number; }; }; };
type DonkiData = { messageType: string; messageID: string; messageIssueTime: string; messageBody: string; };
type EpicData = { 
  identifier: string; 
  caption: string; 
  image: string; 
  date: string; 
  centroid_coordinates: { lat: number; lon: number; };
  dscovr_j2000_position: { x: number; y: number; z: number; };
  sun_j2000_position: { x: number; y: number; z: number; };
  attitude_quaternions: { q0: number; q1: number; q2: number; q3: number; };
};
type WindowState = { id: string; isMinimized: boolean; };

const formatLogText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function Hubble95Client({
  initialApodData,
  initialNeosData,
  initialDonkiData = [],
  initialEpicData = [],
}: {
  initialApodData: ApodData | null;
  initialNeosData: NeoData[];
  initialDonkiData?: DonkiData[];
  initialEpicData?: EpicData[];
}) {
  const [windowsState, setWindowsState] = useState<WindowState[]>([
    { id: 'epic_window', isMinimized: false },
    { id: 'apod_window', isMinimized: false },
    { id: 'neows_window', isMinimized: false },
    { id: 'donki_window', isMinimized: false }
  ]);

  const [windowOrder, setWindowOrder] = useState<string[]>(['epic_window', 'apod_window', 'neows_window', 'donki_window']);
  
  const [isMounted, setIsMounted] = useState(false);
  const [initialPos, setInitialPos] = useState({
    epic: { x: 0, y: 0 },
    apod: { x: 0, y: 0 },
    neows: { x: 0, y: 0 },
    donki: { x: 0, y: 0 }
  });

  const [neos, setNeos] = useState<NeoData[]>(initialNeosData);
  const [donkiLogs, setDonkiLogs] = useState<DonkiData[]>(initialDonkiData);
  const [epicLogs, setEpicLogs] = useState<EpicData[]>(initialEpicData);
  
  const [currentEpicIndex, setCurrentEpicIndex] = useState(0);

  const [showHazardAlert, setShowHazardAlert] = useState(false);
  const [panicoActive, setPanicoActive] = useState(false);

  const parentRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    
    const width = window.innerWidth;
    const isMobile = width < 768;

    if (isMobile) {
      setInitialPos({
        epic:  { x: 0, y: 20 },
        apod:  { x: 0, y: 740 },
        neows: { x: 0, y: 1310 },
        donki: { x: 0, y: 1780 }
      });
      if (parentRef.current) {
        parentRef.current.style.overflowY = "auto";
        parentRef.current.style.display = "block";
      }
    } else {
      setInitialPos({
        epic:  { x: -410, y: -160 },
        apod:  { x: 0,    y: -160 },
        neows: { x: 410,  y: -160 },
        donki: { x: 0,    y: 240 }
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

  const getEpicUrl = (item: EpicData) => {
    const dateStr = item.date.split(' ')[0];
    const [year, month, day] = dateStr.split('-');
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/jpg/${item.image}.jpg`;
  };

  const calcDistance = (pos: {x: number, y: number, z: number}) => {
    return Math.sqrt(pos.x**2 + pos.y**2 + pos.z**2).toLocaleString('en-US', {maximumFractionDigits: 0});
  };

  const getOrbitalPosition = (currentIndex: number, totalImages: number) => {
    if (totalImages === 0) return { x: 50, y: 50 };
    const angle = (currentIndex / totalImages) * (Math.PI * 2) - (Math.PI / 2);
    const rx = 48;
    const ry = 20;
    return {
      x: 50 + rx * Math.cos(angle),
      y: 50 + ry * Math.sin(angle)
    };
  };

  const handleNextEpic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentEpicIndex((prev) => (prev + 1) % epicLogs.length);
  };

  const handlePrevEpic = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentEpicIndex((prev) => (prev - 1 + epicLogs.length) % epicLogs.length);
  };

  return (
    <motion.div
      animate={controls}
      className={`min-h-screen bg-[#008080] w-full flex flex-col items-center justify-center relative overflow-hidden pb-[40px] ${vt323.className} text-black selection:bg-blue-800 selection:text-white`}
      ref={parentRef}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAAAEAAAAAAAAAAAAAAgAAAAIAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAGAAAADAAAAAwAAAAYAAABGAAAAbAAAAHwAAAB/gAAAfwAAAH4AAAB8AAAAeAAAAHAAAABgAAAAQAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////5////8P////D////h///94f///MP///xD///8B////AB///wA///8Af///AP///wH///8D////B////w////8f////P////3////8=') 0 0, default !important; }
      `}} />

      {isMounted && (
        <>
          {/* 1. Finestra EPIC BLUE MARBLE */}
          <DraggableWindow 
            id="epic_window" 
            parentRef={parentRef} 
            title="BLUE_MARBLE.exe" 
            initial={initialPos.epic} 
            className="w-[95%] md:w-[400px] h-[700px]" 
            isMinimized={windowsState.find(win => win.id === 'epic_window')?.isMinimized} 
            onMinimize={handleMinimize} 
            zIndex={windowOrder.indexOf('epic_window') + 10} 
            onFocus={() => bringToFront('epic_window')}
          >
            <div className="p-1 flex flex-col h-full bg-[#c0c0c0] overflow-y-auto">
              {epicLogs.length > 0 ? (
                <div className="flex flex-col gap-2 p-1">
                  <div className="relative aspect-square h-64 max-h-64 w-full bg-black flex items-center justify-center border-2 border-gray-500 shadow-[inset_2px_2px_#0a0a0a,inset_-2px_-2px_#ffffff]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img key={epicLogs[currentEpicIndex].identifier} src={getEpicUrl(epicLogs[currentEpicIndex])} alt="Earth" className="w-full h-full object-contain" draggable={false} />
                  </div>
                  <div className="flex justify-between items-center py-2 bg-gray-300 p-2 border-t border-gray-500 relative z-[10]">
                    <button onClick={handlePrevEpic} className="bg-[#c0c0c0] px-4 py-1 text-black font-bold text-xs shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff]">PREV</button>
                    <div className="font-mono text-xs text-center leading-none">
                      <div className="text-blue-900 font-bold mb-1">RECORD {currentEpicIndex + 1} OF {epicLogs.length}</div>
                      <div className="text-[10px] text-gray-600 uppercase">{epicLogs[currentEpicIndex].date}</div>
                    </div>
                    <button onClick={handleNextEpic} className="bg-[#c0c0c0] px-4 py-1 text-black font-bold text-xs shadow-[inset_-1px_-1px_#0a0a0a,inset_1px_1px_#ffffff,inset_-2px_-2px_#808080,inset_2px_2px_#dfdfdf] active:shadow-[inset_1px_1px_#0a0a0a,inset_-1px_-1px_#ffffff]">NEXT</button>
                  </div>
                  <div className="bg-[#dfdfdf] p-2 flex flex-col gap-2 shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a] relative z-[20]">
                    <h3 className="text-xs text-center font-bold font-mono tracking-widest text-blue-950 uppercase border-b border-gray-400 pb-1 mb-1">Global Perspective Grid</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-[#c0c0c0] p-1 shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a]">
                        <div className="flex justify-between items-center border-b border-gray-400 mb-2 pb-1 bg-gray-300 px-1">
                          <span className="font-bold text-xs uppercase">Image Information</span>
                          <span className="text-[10px] text-green-700">Ver: 04</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 font-mono text-[11px] leading-tight">
                          <div className="flex justify-between"><span>Identifier:</span><span className="text-blue-800">{epicLogs[currentEpicIndex].identifier}</span></div>
                          <div className="flex justify-between"><span>Distance to Earth:</span><span>{calcDistance(epicLogs[currentEpicIndex].dscovr_j2000_position)} km</span></div>
                          <div className="flex justify-between"><span>Distance to Sun:</span><span>{calcDistance(epicLogs[currentEpicIndex].sun_j2000_position)} km</span></div>
                          <div className="flex justify-between"><span>Centroid Coords:</span><span className="bg-yellow-100 px-1">{epicLogs[currentEpicIndex].centroid_coordinates.lat.toFixed(2)}°, {epicLogs[currentEpicIndex].centroid_coordinates.lon.toFixed(2)}°</span></div>
                        </div>
                      </div>
                      <div className="bg-[#c0c0c0] p-1 shadow-[inset_-1px_-1px_#ffffff,inset_1px_1px_#0a0a0a]">
                        <div className="flex justify-between items-center border-b border-gray-400 mb-1 bg-gray-300 px-1">
                          <span className="font-bold text-xs uppercase">Attitude Quaternions</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 font-mono text-[10px] text-center">
                          <div className="border border-gray-400 bg-white p-1">Q0: {epicLogs[currentEpicIndex].attitude_quaternions.q0.toFixed(3)}</div>
                          <div className="border border-gray-400 bg-white p-1">Q1: {epicLogs[currentEpicIndex].attitude_quaternions.q1.toFixed(3)}</div>
                          <div className="border border-gray-400 bg-white p-1">Q2: {epicLogs[currentEpicIndex].attitude_quaternions.q2.toFixed(3)}</div>
                          <div className="border border-gray-400 bg-white p-1">Q3: {epicLogs[currentEpicIndex].attitude_quaternions.q3.toFixed(3)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black p-2 flex flex-col items-center shadow-[inset_2px_2px_#0a0a0a,inset_-2px_-2px_#ffffff]">
                      <div className="w-40 h-40 relative overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none">
                          <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
                          <ellipse cx="50" cy="50" rx="35" ry="12" strokeWidth="0.2" />
                          <ellipse cx="50" cy="50" rx="35" ry="24" strokeWidth="0.2" />
                          <ellipse cx="50" cy="50" rx="12" ry="35" strokeWidth="0.2" />
                          <ellipse cx="50" cy="50" rx="24" ry="35" strokeWidth="0.2" />
                          <ellipse cx="50" cy="50" rx="48" ry="20" strokeWidth="0.5" strokeDasharray="2 2" className="stroke-red-900" />
                          <motion.circle 
                            initial={false}
                            animate={{ 
                              cx: getOrbitalPosition(currentEpicIndex, epicLogs.length).x, 
                              cy: getOrbitalPosition(currentEpicIndex, epicLogs.length).y 
                            }}
                            transition={{ type: "spring", stiffness: 80, damping: 12 }} 
                            r="2" 
                            className="fill-red-500 stroke-none" 
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ) : <div className="p-10 text-center animate-pulse font-mono">ESTABLISHING CONNECTION TO DSCOVR...</div>}
            </div>
          </DraggableWindow>

          {/* 2. Finestra APOD */}
          {initialApodData && (
            <DraggableWindow id="apod_window" parentRef={parentRef} title="APOD.exe" initial={initialPos.apod} className="w-[95%] md:w-[400px] h-[550px]" isMinimized={windowsState.find(win => win.id === 'apod_window')?.isMinimized} onMinimize={handleMinimize} zIndex={windowOrder.indexOf('apod_window') + 10} onFocus={() => bringToFront('apod_window')}>
              <div className="p-2 flex flex-col h-full gap-2 overflow-hidden">
                <h2 className="font-bold text-xl leading-tight border-b border-gray-400 pb-1 flex-shrink-0">{initialApodData.title}</h2>
                {initialApodData.media_type === "image" ? (
                  <div className="relative w-full border-2 border-gray-500 bg-black" style={{ flexBasis: '65%', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={initialApodData.url} alt={initialApodData.title} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                  </div>
                ) : (
                  <div className="relative w-full border-2 border-gray-500 bg-black flex items-center justify-center text-white" style={{ flexBasis: '60%', flexShrink: 0 }}>Video/Other Media</div>
                )}
                <div className="overflow-y-auto pr-2" style={{ flexBasis: '40%', flexGrow: 1 }}><p className="text-sm">{initialApodData.explanation}</p></div>
              </div>
            </DraggableWindow>
          )}

          {/* 3. Finestra NeoWs */}
          <DraggableWindow id="neows_window" parentRef={parentRef} title="NEOWS_TRACKER.exe" initial={initialPos.neows} className="w-[95%] md:w-[400px] h-[450px]" isMinimized={windowsState.find(win => win.id === 'neows_window')?.isMinimized} onMinimize={handleMinimize} zIndex={windowOrder.indexOf('neows_window') + 10} onFocus={() => bringToFront('neows_window')}>
            <div className="p-2 flex flex-col h-full overflow-hidden">
              <h2 className="font-bold text-lg mb-2 border-b border-gray-400 pb-1 flex-shrink-0">Near Earth Objects (Today)</h2>
              {neos.length > 0 ? (
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {neos.map((neo) => (
                    <div key={neo.id} className="border border-gray-400 p-1 text-sm bg-white">
                      <div className="flex justify-between items-center mb-1 bg-blue-800 text-white px-1"><span className="font-bold truncate" title={neo.name}>{neo.name}</span>{neo.is_potentially_hazardous_asteroid && <span className="text-red-400 font-bold animate-pulse">! HAZARD !</span>}</div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <div><span className="text-gray-500">Dist: </span>{neo.close_approach_data[0] ? Number(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString('en-US', {maximumFractionDigits: 0}) + ' km' : 'N/A'}</div>
                        <div><span className="text-gray-500">Vel: </span>{neo.close_approach_data[0] ? Number(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString('en-US', {maximumFractionDigits: 0}) + ' km/h' : 'N/A'}</div>
                        <div className="col-span-2"><span className="text-gray-500">Size: </span>{neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(3)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)} km</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p>No objects detected today.</p>}
            </div>
          </DraggableWindow>

          {/* 4. Finestra DONKI */}
          <DraggableWindow id="donki_window" parentRef={parentRef} title="SPACE_WX_LOG.exe" initial={initialPos.donki} className="w-[95%] md:w-[820px] h-[350px]" isMinimized={windowsState.find(win => win.id === 'donki_window')?.isMinimized} onMinimize={handleMinimize} zIndex={windowOrder.indexOf('donki_window') + 10} onFocus={() => bringToFront('donki_window')}>
            <div className="p-2 flex flex-col h-full overflow-hidden bg-black text-[#00ff00]">
              <h2 className="font-bold text-lg mb-2 border-b border-[#00ff00] pb-1 flex-shrink-0">System Log: Space Weather</h2>
              {donkiLogs.length > 0 ? (
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 font-mono text-xs">
                  {donkiLogs.map((log) => (
                    <div key={log.messageID} className="border border-[#00aa00] p-2">
                      <div className="flex justify-between items-start mb-2 border-b border-dashed border-[#00aa00] pb-1"><span className="font-bold text-white bg-[#00aa00] px-1">{log.messageType}</span><span className="text-[#00aa00]">{log.messageIssueTime}</span></div>
                      <pre className="whitespace-pre-wrap font-inherit text-[#00cc00]">{formatLogText(log.messageBody)}</pre>
                    </div>
                  ))}
                </div>
              ) : <p className="animate-pulse pt-2">Awaiting telemetry...</p>}
            </div>
          </DraggableWindow>
        </>
      )}

      {showHazardAlert && <AlertPopup onIgnore={() => setShowHazardAlert(false)} onPanic={() => { setPanicoActive(true); setShowHazardAlert(false); }} parentRef={parentRef} />}
      <Taskbar minimizedWindows={windowsState.filter(win => win.isMinimized)} onRestoreWindow={(id) => { handleMinimize(id, false); bringToFront(id); }} />
    </motion.div>
  );
}