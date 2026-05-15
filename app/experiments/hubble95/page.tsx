import React from "react";
import Hubble95Client from "./components/Hubble95Client";

export default async function Hubble95Experiment() {
  const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";

  let apodData = null;
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`, {
      next: { revalidate: 86400 }
    });

    if (res.ok) {
      apodData = await res.json();
    } else {
      console.error("Failed to fetch APOD data");
    }
  } catch (error) {
    console.error("Error fetching APOD:", error);
  }

  return <Hubble95Client initialApodData={apodData} />;
}
