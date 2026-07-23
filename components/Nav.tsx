"use client";

import { useLang, useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Nav({ content }: { content: SiteContent }) {
  const { lang, setLang } = useLang();
  const t = useT();

  return (
    <nav className="w-full">
      <Container className="flex flex-wrap items-center justify-between gap-5 py-5 sm:py-[22px]">
        {content.availableForWork ? (
          <span className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-full border border-card-border bg-white px-[18px] py-[10px] text-sm font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]">
            <span className="h-[9px] w-[9px] rounded-full bg-accent-green" />
            {t("Yeni layihələrə açığam", "Available for New Project")}
          </span>
        ) : (
          <span />
        )}

        <div className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          <a href="#isler">
            {t("İşlər", "Work")}{" "}
            <span className="align-super text-[11px] text-ink-tertiary">[3]</span>
          </a>
          <a href="#xidmetler">
            {t("Xidmətlər", "Service")}{" "}
            <span className="align-super text-[11px] text-ink-tertiary">[4]</span>
          </a>
          <a href="#tecrube">{t("Təcrübə", "Experience")}</a>
          <a href="#elaqe">{t("Əlaqə", "Contact")}</a>
        </div>

        <div className="flex items-center gap-[14px]">
          <div className="flex items-center gap-[2px] rounded-full border border-card-border bg-white p-[2px] text-xs font-semibold">
            <button
              onClick={() => setLang("az")}
              className={`rounded-full px-[11px] py-[5px] text-xs font-semibold transition-colors ${
                lang === "az" ? "bg-ink text-paper" : "bg-transparent text-ink-tertiary"
              }`}
            >
              AZ
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-[11px] py-[5px] text-xs font-semibold transition-colors ${
                lang === "en" ? "bg-ink text-paper" : "bg-transparent text-ink-tertiary"
              }`}
            >
              EN
            </button>
          </div>
          <a
            href="#elaqe"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-[22px] py-3 text-[15px] font-semibold text-paper shadow-[0_8px_20px_rgba(26,25,24,0.25)] transition-colors hover:bg-[#33312D]"
          >
            {t("Danışaq", "Let's Talk")} ↗
          </a>
        </div>
      </Container>
    </nav>
  );
}
