import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

// 1. IL NOSTRO MINI-DATABASE
const PROJECTS_DB = {
  "gamma": {
    title: "Gamma",
    category: "UX/UI Design",
    websiteUrl: "https://google.com",
    heroImage: "/images/frame.webp", 
    seqImage1: "/images/edfaost.webp",
    seqImage2: "/images/stream-ai.webp",
    preGridImage: "/images/travel-easy.webp",
    gridImageLeft: "/images/stream-ai.webp",
    gridImageRight: "/images/travel-easy.webp",
    intro: "Gamma is an AI-powered platform that helps users create professional presentations, documents, and web pages effortlessly. As the product designer leading the website redesign, my goal was to enhance usability, improve conversion rates, and better communicate Gamma's unique value proposition.",
    client: "David B.",
    role: "UX Designer",
    year: "2022",
    challenge: "The project faced multiple hurdles that impacted user engagement and conversions. First, the website had a high bounce rate, with many visitors leaving without exploring key features or signing up. Second, the messaging failed to immediately convey Gamma's AI-powered advantages.",
    objective: "The primary objective was to create a website that clearly communicated Gamma's value, improved user engagement, and increased conversions.",
    results: "The redesign delivered strong outcomes, validating the strategic improvements. Sign-up conversions increased by 30%, thanks to clearer value propositions and strategically placed CTAs."
  },
  "travel-easy": {
    title: "Travel Easy",
    category: "App Design",
    websiteUrl: "#",
    heroImage: "/images/travel-easy.webp",
    seqImage1: "/images/frame.webp",
    seqImage2: "/images/stream-ai.webp",
    preGridImage: "/images/travel-easy.webp",
    gridImageLeft: "/images/edfaost.webp",
    gridImageRight: "/images/stream-ai.webp",
    intro: "Testo introduttivo per Travel Easy...",
    client: "Travel Co.",
    role: "Product Designer",
    year: "2023",
    challenge: "Sfida del progetto Travel Easy...",
    objective: "Obiettivo...",
    results: "Risultati..."
  },
};

const PROJECT_ORDER = ["travel-easy", "gamma", "stream-ai", "frame", "edfaost"];

// 2. LA MAGIA: Genera le pagine in modo statico al momento del build (SSG)
export function generateStaticParams() {
  return PROJECT_ORDER.map((slug) => ({
    slug: slug,
  }));
}

// 3. LA PAGINA SERVER: Prende i dati e li passa al componente visivo
// Aggiunto "async" e "Promise" per Next.js 15+
export default async function ProjectDetailServer({ params }: { params: Promise<{ slug: string }> }) {
  // Aggiunto "await" per aspettare che lo slug sia pronto
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const project = PROJECTS_DB[slug as keyof typeof PROJECTS_DB];

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-32">
        <h1 className="text-4xl font-medium mb-4">Work in progress</h1>
        <p className="text-white/60 mb-8">This project case study is coming soon.</p>
        <a href="/portfolio" className="text-white/80 hover:text-white underline">← Back to Portfolio</a>
      </div>
    );
  }

  const currentIndex = PROJECT_ORDER.indexOf(slug);
  const prevSlug = currentIndex > 0 ? PROJECT_ORDER[currentIndex - 1] : PROJECT_ORDER[PROJECT_ORDER.length - 1];
  const nextSlug = currentIndex < PROJECT_ORDER.length - 1 ? PROJECT_ORDER[currentIndex + 1] : PROJECT_ORDER[0];

  return <ProjectClient project={project} prevSlug={prevSlug} nextSlug={nextSlug} />;
}