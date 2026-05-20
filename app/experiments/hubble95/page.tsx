import React from "react";
import Hubble95Client from "./components/Hubble95Client";

export default async function Hubble95Experiment() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const today = new Date().toISOString().split("T")[0];

  let apodData = null;
  let neosData = [];
  let donkiData = [];

  try {
    // Ottimizzazione Massima: Fetching in parallelo con Promise.all
    // e cache ISR (1h per i dati caldi, 24h per l'APOD)
    const [apodRes, neoRes, donkiRes] = await Promise.all([
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
        next: { revalidate: 86400 } // APOD cambia una volta al giorno
      }).catch(() => null), // Il catch locale previene che il crash di una API blocchi le altre
      
      fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`, {
        next: { revalidate: 3600 } // Aggiorna ogni ora
      }).catch(() => null),
      
      fetch(`https://api.nasa.gov/DONKI/notifications?type=all&api_key=${apiKey}`, {
        next: { revalidate: 3600 } // Aggiorna ogni ora
      }).catch(() => null)
    ]);

    // Parsing delle risposte solo se i fetch sono andati a buon fine
    if (apodRes?.ok) {
      apodData = await apodRes.json();
    }
    
    if (neoRes?.ok) {
      const neoJson = await neoRes.json();
      neosData = neoJson.near_earth_objects[today] || [];
    }

    if (donkiRes?.ok) {
      donkiData = await donkiRes.json();
    }
    
  } catch (error) {
    // Questo catturerà solo errori critici non gestiti dalle fetch singole
    console.error("Critical error fetching NASA APIs:", error);
  }

  return (
    <Hubble95Client 
      initialApodData={apodData} 
      initialNeosData={neosData} 
      initialDonkiData={donkiData} 
    />
  );
}