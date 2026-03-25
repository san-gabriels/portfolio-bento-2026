import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

// 1. IL NOSTRO MINI-DATABASE
const PROJECTS_DB = {
  "cnext-system": {
    title: "C.NEXT Digital Ecosystem",
    category: "Platform Scaling and Data Analytics",
    websiteUrl: "#",
    heroImage: "https://assets.gabrielmihali.com/image201-head.webp", 
    seqImage1: "https://assets.gabrielmihali.com/image202.webp",
    seqImage2: "https://assets.gabrielmihali.com/image203.webp",
    preGridImage: "https://assets.gabrielmihali.com/image204.webp",
    gridImageLeft: "/images/stream-ai.webp",
    gridImageRight: "/images/travel-easy.webp",
    intro: "Scaling a successful digital architecture requires more than just cloning a website; it demands a unified strategy for performance and tracking. For the C.NEXT ecosystem, I deployed multiple subdomains focusing purely on data accuracy and extreme optimization. By implementing rigorous GA4 tracking and prioritizing Core Web Vitals, I transformed these satellite sites into highly measurable, lightning-fast marketing assets.",
    client: "C.NEXT Ivrea and C.NEXT Piceno",
    role: "Web Master and Digital Analyst",
    year: "2022 - Present",
    challenge: "Replicate the core architecture across multiple subdomains while maintaining peak technical performance. The main goal was to establish a unified, granular tracking system across the entire ecosystem to map user journeys and measure campaign effectiveness precisely.",
    objective: "Deploy new ecosystem nodes optimizing for Core Web Vitals and Technical SEO. Implement an advanced Google Analytics 4 (GA4) and Google Tag Manager setup to track cross-domain conversions and provide actionable data for the marketing department.",
    results: "Successfully launched the subdomains with top-tier PageSpeed scores. The deep data analysis and reliable conversion tracking directly guided the optimization of corporate email marketing campaigns, achieving outstanding results: a 52% Open Rate and a 3.2% Click-Through Rate (CTR)."
  },
  "cnext-hub": {
    title: "C.NEXT Corporate Hub",
    category: "Custom WordPress Architecture and AI-Assisted Development",
    websiteUrl: "#",
    heroImage: "https://assets.gabrielmihali.com/image001-head.webp",
    seqImage1: "https://assets.gabrielmihali.com/image102.webp",
    seqImage2: "https://assets.gabrielmihali.com/image103.webp",
    preGridImage: "https://assets.gabrielmihali.com/image104.webp",
    gridImageLeft: "https://assets.gabrielmihali.com/image105.webp",
    gridImageRight: "https://assets.gabrielmihali.com/image106.webp",
    intro: "C.NEXT Corporate Hub is the digital cornerstone of the company. My mission was to engineer a complex, highly customized web architecture from the ground up. By blending advanced AI-assisted coding for custom plugins with a tailored, 'dummy-friendly' WordPress backend, I delivered a scalable platform that bridges high-level technical requirements with everyday operational ease.",
    client: "C.NEXT Spa",
    role: "Lead Web Architect and Developer",
    year: "2021",
    challenge: "Build a scalable corporate portal from scratch while bypassing the heavy limitations of standard page builders. The crucial technical hurdle was creating a completely foolproof, customized backend environment allowing non-technical staff to manage complex content without breaking the frontend layout.",
    objective: "Develop a robust WordPress architecture utilizing custom plugins and AI-assisted coding (LLMs) to accelerate feature deployment. Design a seamless, intuitive backend UI tailored for the marketing and editorial teams.",
    results: "Delivered a highly scalable and stable main portal. The custom 'dummy-proof' backend drastically reduced content management errors by the internal team, while AI-driven code refactoring minimized bug resolution times and accelerated the rollout of custom functionalities."
  },
};

const PROJECT_ORDER = ["cnext-hub", "cnext-system", "stream-ai", "frame", "edfaost"];

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