// Questo è l'unico lasciapassare che Cloudflare vuole
export const runtime = 'edge';

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