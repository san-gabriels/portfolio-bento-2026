import React from "react";
import Hubble95Client from "./components/Hubble95Client";

export default async function Hubble95Experiment() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const today = new Date().toISOString().split("T")[0];

  let apodData = null;
  let neosData = [];
  let donkiData = [];
  let epicData = []; // Nuovo array per EPIC

  try {
    const [apodRes, neoRes, donkiRes, epicRes] = await Promise.all([
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
        next: { revalidate: 86400 }
      }).catch(() => null),
      
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`, {
        next: { revalidate: 3600 }
      }).catch(() => null),
      
      fetch(`https://api.nasa.gov/DONKI/notifications?type=all&api_key=${apiKey}`, {
        next: { revalidate: 3600 }
      }).catch(() => null),

      // Fetch EPIC (Blue Marble)
      fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`, {
        next: { revalidate: 3600 } // La NASA aggiorna le immagini circa ogni giorno
      }).catch(() => null)
    ]);

    if (apodRes?.ok) apodData = await apodRes.json();
    
    if (neoRes?.ok) {
      const neoJson = await neoRes.json();
      neosData = neoJson.near_earth_objects[today] || [];
    }

    if (donkiRes?.ok) donkiData = await donkiRes.json();
    
    // Parsing EPIC
    if (epicRes?.ok) epicData = await epicRes.json();
    
  } catch (error) {
    console.error("Critical error fetching NASA APIs:", error);
  }

  return (
    <Hubble95Client 
      initialApodData={apodData} 
      initialNeosData={neosData} 
      initialDonkiData={donkiData}
      initialEpicData={epicData} // Passiamo i dati al client
    />
  );
}