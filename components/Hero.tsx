"use client";

import { useT } from "@/lib/lang-context";
import { PhotoSpotlight } from "./PhotoSpotlight";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Hero({ content }: { content: SiteContent }) {
  const t = useT();
  const [firstName, ...rest] = content.fullName.split(" ");
  const lastName = rest.join(" ");

  return (
    <header className="animate-fade-up w-full">
    <Container className="pt-14 pb-16 sm:pt-14 sm:pb-16">
      <h1
        className="whitespace-nowrap text-center font-heading text-[clamp(40px,6.3vw,104px)] font-extrabold uppercase leading-[0.98] tracking-[0.005em]"
      >
        <span className="text-transparent" style={{ WebkitTextStroke: "2.5px #1A1918" }}>
          {firstName}
        </span>{" "}
        <span>{lastName}</span>
      </h1>

      <div className="mt-[-28px] grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <div className="z-[3] order-2 pb-9 sm:order-1">
          <h2 className="mb-3 text-3xl font-semibold">
            {t(content.hero.titleAz, content.hero.titleEn)}
          </h2>
          <p className="mb-6 max-w-[30ch] text-base leading-relaxed text-ink-secondary">
            {t(content.hero.descAz, content.hero.descEn)}
          </p>
          <a
            href="#elaqe"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-[14px] text-[15px] font-semibold text-paper shadow-[0_8px_20px_rgba(26,25,24,0.25)] transition-colors hover:bg-[#33312D]"
          >
            {t("Gəlin əməkdaşlıq edək", "Let's collaborate")} ↗
          </a>
        </div>

        <div className="order-1 flex justify-center sm:order-2">
          <PhotoSpotlight photo={content.hero.photo} />
        </div>

        <div className="z-[3] order-3 flex flex-col items-start gap-3 pb-9 sm:items-end">
          <a
            href={content.social.github}
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
          >
            GitHub
          </a>
          <a
            href={content.social.linkedin}
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${content.social.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white px-5 py-[11px] text-[15px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.07)]"
          >
            {t("E-poçt", "Email")}
          </a>
        </div>
      </div>
    </Container>
    </header>
  );
}
