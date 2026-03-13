// 1. Questa riga è il "lasciapassare" ufficiale per Cloudflare
export const runtime = 'edge';

export function generateStaticParams() {
  return [
    { slug: 'travel-easy' },
    { slug: 'gamma' },
    { slug: 'stream-ai' },
    { slug: 'frame' },
    { slug: 'edfaost' },
  ];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 font-bold">
      <div className="text-center">
        <p className="text-white/50 text-sm uppercase tracking-widest mb-4 font-normal">Preview del progetto</p>
        <h1 className="text-5xl md:text-7xl lg:text-[100px] tracking-tighter capitalize">
          {resolvedParams.slug.replace('-', ' ')}
        </h1>
      </div>
    </div>
  );
}