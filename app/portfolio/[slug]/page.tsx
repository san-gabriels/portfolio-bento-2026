import { notFound } from "next/navigation";
import ProjectClient from "./ProjectClient";

// 1. IL NOSTRO MINI-DATABASE
const PROJECTS_DB = {
  "cnext-hub": {
    title: "C.NEXT Corporate Hub",
    category: "Custom WordPress Architecture and AI-Assisted Development",
    websiteUrl: "https://cnexthub.com",
    heroImage: "https://assets.gabrielmihali.com/image103.webp",
    seqImage1: "https://assets.gabrielmihali.com/image102.webp",
    seqImage2: "https://assets.gabrielmihali.com/image001-head.webp",
    preGridImage: "https://assets.gabrielmihali.com/image104.webp",
    gridImageLeft: "https://assets.gabrielmihali.com/image105.webp",
    gridImageRight: "https://assets.gabrielmihali.com/image106.webp",
    intro: "C.NEXT Corporate Hub is the digital cornerstone of the company. My mission was to engineer a complex, highly customized web architecture from the ground up. By blending advanced AI-assisted coding for custom plugins with a tailored, 'dummy-friendly' WordPress backend, I delivered a scalable platform that bridges high-level technical requirements with everyday operational ease.",
    client: "C.NEXT Spa",
    role: "Lead Web Architect and Developer",
    year: "2021",
    challenge: "Build a scalable corporate portal from scratch while bypassing the heavy limitations of standard page builders. The crucial technical hurdle was creating a completely foolproof, customized backend environment allowing non-technical staff to manage complex content without breaking the frontend layout.",
    objective: "Develop a robust WordPress architecture utilizing custom plugins and AI-assisted coding (LLMs) to accelerate feature deployment. Design a seamless, intuitive backend UI tailored for the marketing and editorial teams.",
    results: "Delivered a highly scalable and stable main portal. The custom 'dummy-proof' backend drastically reduced content management errors by the internal team, while AI-driven code refactoring minimized bug resolution times and accelerated the rollout of custom functionalities.",
    marqueeText: "• CUSTOM WORDPRESS ARCHITECTURE • AI-ASSISTED DEVELOPMENT • DUMMY-PROOF BACKEND • SCALABLE SOLUTIONS • LOGIC-DRIVEN FRAMEWORKS"
  },
  "cnext-system": {
    title: "C.NEXT Digital Ecosystem",
    category: "Platform Scaling and Data Analytics",
    websiteUrl: "#",
    heroImage: "https://assets.gabrielmihali.com/image201-head.webp", 
    seqImage1: "https://assets.gabrielmihali.com/image202.webp",
    seqImage2: "https://assets.gabrielmihali.com/image203.webp",
    preGridImage: "https://assets.gabrielmihali.com/image204.webp",
    gridImageLeft: "https://assets.gabrielmihali.com/image205.webp",
    gridImageRight: "https://assets.gabrielmihali.com/image206.webp",
    intro: "Scaling a successful digital architecture requires more than just cloning a website; it demands a unified strategy for performance and tracking. For the C.NEXT ecosystem, I deployed multiple subdomains focusing purely on data accuracy and extreme optimization. By implementing rigorous GA4 tracking and prioritizing Core Web Vitals, I transformed these satellite sites into highly measurable, lightning-fast marketing assets.",
    client: "C.NEXT Ivrea and C.NEXT Piceno",
    role: "Web Master and Digital Analyst",
    year: "2022 - Present",
    challenge: "Replicate the core architecture across multiple subdomains while maintaining peak technical performance. The main goal was to establish a unified, granular tracking system across the entire ecosystem to map user journeys and measure campaign effectiveness precisely.",
    objective: "Deploy new ecosystem nodes optimizing for Core Web Vitals and Technical SEO. Implement an advanced Google Analytics 4 (GA4) and Google Tag Manager setup to track cross-domain conversions and provide actionable data for the marketing department.",
    results: "Successfully launched the subdomains with top-tier PageSpeed scores. The deep data analysis and reliable conversion tracking directly guided the optimization of corporate email marketing campaigns, achieving outstanding results: a 52% Open Rate and a 3.2% Click-Through Rate (CTR).",
    marqueeText: "• ADVANCED GA4 TRACKING • CORE WEB VITALS • TECHNICAL SEO • CONVERSION RATE OPTIMIZATION • PERFORMANCE SCALING"
  },
  "streamyard": {
    title: "Technical Direction and Live Streaming Events",
    category: "Broadcast Architecture and Post-Event Marketing",
    websiteUrl: "#",
    heroImage: "https://assets.gabrielmihali.com/image301.webp",
    seqImage1: "https://assets.gabrielmihali.com/image302.webp",
    seqImage2: "https://assets.gabrielmihali.com/image303.webp",
    preGridImage: "https://assets.gabrielmihali.com/image304.webp",
    gridImageLeft: "https://assets.gabrielmihali.com/image305.webp",
    gridImageRight: "https://assets.gabrielmihali.com/image306.webp",
    intro: "Managing over 35 high-stakes live events with top-tier Italian entrepreneurs requires more than just pressing 'Go Live'. It demands flawless real-time execution, strict brand consistency, and seamless stakeholder management. By taking full ownership of the StreamYard broadcasting architecture, I bridged the gap between technical direction and digital marketing, ensuring a premium experience from the first guest invite to the final follow-up email.",
    client: "C.NEXT Spa ecosystem",
    role: "Technical Director & Streaming Architect",
    year: "2021-present",
    challenge: "Orchestrating 35+ high-profile webinars requiring flawless real-time technical execution without a dedicated broadcast team. The core challenge was managing the entire event lifecycle simultaneously: coordinating VIP guests, synchronizing private live streams with public YouTube VODs, and troubleshooting live technical issues under extreme pressure.",
    objective: "Deliver broadcast-quality live streams by heavily customizing the StreamYard studio to match the corporate brand identity. Seamlessly manage guest onboarding, real-time comment moderation, multimedia presentation flows, and post-webinar engagement through automated follow-up campaigns.",
    results: "Successfully directed over 35 zero-downtime live events, establishing a highly professional digital and authoritative presence for the Hub. The end-to-end management—from technical setup to post-event lead nurturing—resulted in a flawless VIP guest experience and maximized audience retention across both live and on-demand formats.",
    marqueeText: "• REAL-TIME BROADCASTING • VIP STAKEHOLDER MANAGEMENT • ZERO-DOWNTIME OPERATIONS • TECHNICAL DIRECTION • POST-EVENT ANALYTICS"
  },
  "internal-b2b-platform": {
    title: "Full-Stack WordPress Development (Staging Environment)",
    category: "Custom Web Architecture",
    websiteUrl: "#",
    heroImage: "https://assets.gabrielmihali.com/image401.webp",
    seqImage1: "https://assets.gabrielmihali.com/image402.webp",
    seqImage2: "https://assets.gabrielmihali.com/image403.webp",
    preGridImage: "https://assets.gabrielmihali.com/image404.webp",
    gridImageLeft: "https://assets.gabrielmihali.com/image405.webp",
    gridImageRight: "https://assets.gabrielmihali.com/image406.webp",
    intro: "Not all digital architectures reach the public domain, but the technical execution remains a testament to foundational skills. Developed entirely from a blank canvas, this unreleased corporate portal serves as a comprehensive showcase of from-scratch web development. Deployed to a fully functional staging environment, it highlights my ability to engineer a complete, custom WordPress infrastructure independently.",
    client: "ComoNExT Innovation Hub",
    role: "Lead Web Developer and Solutions Architect",
    year: "2021-2022",
    challenge: "Building a highly customized, robust web architecture from absolute scratch. The challenge was translating complex corporate requirements into a tangible, fully functional digital environment without relying on pre-existing frameworks, ensuring the platform was production-ready from a technical standpoint.",
    objective: "Deliver a complete, scalable WordPress portal to the staging phase. Focus heavily on clean backend configuration, custom front-end development, and setting up a secure, dummy-proof management environment for future stakeholders.",
    results: "Successfully engineered and delivered the fully functional platform to the staging environment. While corporate strategic shifts kept the project internal, the resulting architecture stands as a fully operational benchmark of custom development, UI execution, and structural web engineering.",
    marqueeText: "• FROM-SCRATCH DEVELOPMENT • STAGING ENVIRONMENT • CUSTOM ARCHITECTURE • FRONT-END EXECUTION • CONFIDENTIAL PROJECT"
  },
};

const PROJECT_ORDER = ["cnext-hub", "cnext-system", "streamyard", "internal-b2b-platform", "edfaost"];

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