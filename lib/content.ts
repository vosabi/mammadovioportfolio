import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

export type Service = {
  titleAz: string;
  titleEn: string;
  descAz: string;
  descEn: string;
};

export type Project = {
  titleAz: string;
  titleEn: string;
  tags: string[];
  image: string | null;
  full: boolean;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  dateAz: string;
  dateEn: string;
  current: boolean;
};

export type SiteContent = {
  availableForWork: boolean;
  fullName: string;
  hero: {
    titleAz: string;
    titleEn: string;
    descAz: string;
    descEn: string;
    photo: string | null;
  };
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  services: Service[];
  projects: Project[];
  experience: ExperienceEntry[];
  contact: {
    headingAz: string;
    headingEn: string;
    descAz: string;
    descEn: string;
  };
};

export async function getContent(): Promise<SiteContent> {
  const raw = await readFile(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent): Promise<void> {
  await writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}
