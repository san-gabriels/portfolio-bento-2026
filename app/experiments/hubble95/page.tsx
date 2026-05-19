import React from "react";
import Hubble95Client from "./components/Hubble95Client";

export default async function Hubble95Experiment() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";

  let apodData = null;
  let neosData = [];
  let donkiData = []; // Nuovo array per i dati DONKI

  try {
    // 1. Fetch APOD
    const apodRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
      next: { revalidate: 86400 }
    });
    if (apodRes.ok) {
      apodData = await apodRes.json();
    }

    // 2. Fetch NeoWs
    const today = new Date().toISOString().split("T")[0];
    const neoRes = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (neoRes.ok) {
      const neoJson = await neoRes.json();
      neosData = neoJson.near_earth_objects[today] || [];
    }

    // 3. Fetch DONKI Notifications (Ultime notifiche meteo spaziale)
    const donkiRes = await fetch(
      `https://api.nasa.gov/DONKI/notifications?type=all&api_key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (donkiRes.ok) {
      donkiData = await donkiRes.json();
    }
  } catch (error) {
    console.error("Error fetching from NASA APIs:", error);
  }

  return <Hubble95Client 
    initialApodData={apodData} 
    initialNeosData={neosData} 
    initialDonkiData={donkiData} 
  />;
}