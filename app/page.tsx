import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <div className="min-h-screen w-full">
      <Nav content={content} />
      <Hero content={content} />
      <Services content={content} />
      <Work content={content} />
      <Experience content={content} />
      <Contact content={content} />
    </div>
  );
}
