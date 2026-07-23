"use client";

import { useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Contact({ content }: { content: SiteContent }) {
  const t = useT();
  const initials = content.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer
      id="elaqe"
      className="w-full"
      style={{
        background:
          "radial-gradient(60% 45% at 25% 15%, #FFFFFF 0%, rgba(255,255,255,0) 60%), radial-gradient(55% 40% at 78% 40%, #F0EEEA 0%, rgba(240,238,234,0) 65%), radial-gradient(70% 55% at 50% 95%, #E8E6E1 0%, rgba(232,230,225,0) 75%), #F4F3F0",
      }}
    >
      <Container className="pt-24 pb-11 sm:pt-[120px]">
        <div className="flex flex-col items-center gap-[26px] text-center">
          {content.availableForWork && (
            <span className="inline-flex items-center gap-[9px] rounded-full border border-card-border bg-white px-[18px] py-[10px] text-sm font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]">
              <span className="h-[9px] w-[9px] rounded-full bg-accent-green" />
              {t("Yeni layihələrə açığam", "Available for New Project")}
            </span>
          )}

          <h2 className="max-w-[22ch] text-[clamp(38px,5.6vw,78px)] font-heading font-extrabold uppercase leading-[1.05]">
            {t(content.contact.headingAz, content.contact.headingEn)}
          </h2>

          <p className="max-w-[56ch] text-lg leading-relaxed text-ink-secondary">
            {t(content.contact.descAz, content.contact.descEn)}
          </p>

          <a
            href={`mailto:${content.social.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-[30px] py-4 text-base font-semibold text-paper shadow-[0_10px_26px_rgba(26,25,24,0.3)] transition-colors hover:bg-[#33312D]"
          >
            {t("Əlaqə saxla", "Contact Me")} ↗
          </a>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-4 sm:mt-[110px]">
          <span className="inline-flex items-center gap-[10px] rounded-full bg-ink py-2 pr-[18px] pl-2 text-[15px] font-semibold text-paper">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ink-quaternary text-xs font-bold text-paper">
              {initials}
            </span>
            {content.fullName}
          </span>
          <div className="flex flex-wrap gap-3">
            <a
              href={content.social.github}
              className="inline-flex items-center rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
            >
              GitHub
            </a>
            <a
              href={content.social.linkedin}
              className="inline-flex items-center rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${content.social.email}`}
              className="inline-flex items-center rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
            >
              {t("E-poçt", "Email")}
            </a>
          </div>
        </div>

        <div className="mt-9 flex justify-center text-[13px] text-ink-tertiary">
          © 2026 {content.fullName}
        </div>
      </Container>
    </footer>
  );
}
