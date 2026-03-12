export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
        Project: {resolvedParams.slug}
      </h1>
    </div>
  );
}
