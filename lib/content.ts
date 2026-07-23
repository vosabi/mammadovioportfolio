import { existsSync } from "node:fs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

// Hostinger's Git-based deploy replaces the whole app directory on every
// redeploy, so anything written under the repo (like the bundled ./data
// seed) would be wiped. On that specific host we persist reads/writes
// outside the deployed tree instead; locally we just use ./data.
const HOSTINGER_HOME = "/home/u115691847";
const PERSIST_ROOT =
  process.env.CONTENT_DIR ||
  (existsSync(HOSTINGER_HOME) ? path.join(HOSTINGER_HOME, "portfolio-data") : path.join(process.cwd(), "data"));

const CONTENT_PATH = path.join(PERSIST_ROOT, "content.json");
const SEED_PATH = path.join(process.cwd(), "data", "content.json");

export const UPLOADS_DIR = path.join(PERSIST_ROOT, "uploads");

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
  try {
    const raw = await readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(raw) as SiteContent;
  } catch {
    // First run against a fresh persistent dir: seed it from the repo's
    // bundled default so the site isn't blank before any admin edit.
    const seedRaw = await readFile(SEED_PATH, "utf-8");
    await mkdir(PERSIST_ROOT, { recursive: true });
    await writeFile(CONTENT_PATH, seedRaw, "utf-8");
    return JSON.parse(seedRaw) as SiteContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await mkdir(PERSIST_ROOT, { recursive: true });
  await writeFile(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
}
