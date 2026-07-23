"use client";

import { useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { Project } from "@/lib/content";

export function ProjectDetail({ project }: { project: Project }) {
  const t = useT();
  const details = t(project.detailsAz, project.detailsEn);
  const summary = t(project.summaryAz, project.summaryEn);

  return (
    <section className="w-full">
      <Container className="py-16 sm:py-[90px]">
        <a
          href="/#isler"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-ink"
        >
          ← {t("Bütün işlər", "All work")}
        </a>

        <h1 className="mb-6 font-heading text-[clamp(32px,5vw,64px)] font-bold uppercase leading-[1.05]">
          {t(project.titleAz, project.titleEn)}
        </h1>

        <div className="mb-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-card-border bg-white px-[14px] py-[7px] text-[13px] font-medium text-ink-quaternary"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.image && (
          <div className="mb-12 h-[280px] w-full overflow-hidden rounded-2xl sm:h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={t(project.titleAz, project.titleEn)}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_1.4fr]">
          {summary && (
            <p className="text-lg leading-relaxed text-ink-secondary">{summary}</p>
          )}

          {details.length > 0 && (
            <div>
              <h2 className="mb-5 font-heading text-xl font-bold uppercase">
                {t("Nə etdik", "What we built")}
              </h2>
              <ul className="flex flex-col gap-4">
                {details.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-secondary">
                    <span className="mt-[2px] flex-shrink-0 text-ink-tertiary">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
