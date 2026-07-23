"use client";

import { useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Work({ content }: { content: SiteContent }) {
  const t = useT();

  return (
    <section id="isler" className="w-full overflow-hidden">
    <Container className="py-16 sm:py-[90px]">
      <span className="pointer-events-none absolute top-9 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[190px] font-black uppercase leading-none text-ink/[0.035]">
        PORTFOLIO
      </span>
      <h2 className="relative mb-14 text-center font-heading text-4xl font-bold uppercase">
        /{t("SEÇİLMİŞ İŞLƏR", "SELECTED WORK")}
      </h2>

      <div className="relative grid grid-cols-1 gap-7 sm:grid-cols-2">
        {content.projects.map((p, i) => (
          <article
            key={i}
            className={`flex flex-col gap-0 rounded-2xl border border-card-border bg-card p-[14px] ${
              p.full ? "sm:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-[10px] ${
                p.full ? "h-[260px] sm:h-[400px]" : "h-[220px] sm:h-[330px]"
              } ${p.image ? "" : "flex items-center justify-center border border-dashed border-card-border bg-white/40 text-center text-sm text-ink-tertiary"}`}
            >
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={t(p.titleAz, p.titleEn)}
                  className="h-full w-full object-cover"
                />
              ) : (
                t("Şəkil admin paneldən əlavə edilə bilər", "Image can be added from admin panel")
              )}
            </div>
            <div className="flex flex-col gap-[14px] px-3 pt-[22px] pb-3">
              <h3 className="text-[23px] font-semibold">{t(p.titleAz, p.titleEn)}</h3>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-card-border bg-white px-[14px] py-[7px] text-[13px] font-medium text-ink-quaternary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Container>
    </section>
  );
}
