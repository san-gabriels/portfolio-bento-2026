import React from "react";
import Hubble95Client from "./components/Hubble95Client";

export default async function Hubble95Experiment() {
  // Usa la variabile lato server. Niente NEXT_PUBLIC.
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";

  let apodData = null;
  let neosData = [];

  try {
    // 1. Fetch APOD
    const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
      next: { revalidate: 86400 } // Cache di 24 ore
    });
    if (apodRes.ok) {
      apodData = await apodRes.json();
    }

    // 2. Fetch NeoWs (Asteroidi di oggi)
    const today = new Date().toISOString().split("T")[0];
    const neoRes = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache di 1 ora (gli asteroidi si aggiornano più spesso)
    );
    
    if (neoRes.ok) {
      const neoJson = await neoRes.json();
      neosData = neoJson.near_earth_objects[today] || [];
    }
  } catch (error) {
    console.error("Error fetching from NASA APIs:", error);
  }

  // Passa tutto al client come props
  return <Hubble95Client initialApodData={apodData} initialNeosData={neosData} />;
}