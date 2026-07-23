import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { ProjectDetail } from "@/components/ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const project = content.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen w-full">
      <Nav content={content} />
      <ProjectDetail project={project} />
      <Contact content={content} />
    </div>
  );
}
