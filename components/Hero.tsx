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
        {/* ── MOBILE / TABLET ── */}
        <div className="flex flex-col items-center text-center lg:hidden">
          <div className="relative">
            <PhotoSpotlight
              photo={content.hero.photo}
              sizeClassName="h-[380px] w-[280px] sm:h-[440px] sm:w-[340px]"
            />
            <a
              href={content.social.github}
              className="absolute top-2 -left-4 z-[3] inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-card-border bg-white px-4 py-[9px] text-[13px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.1)]"
            >
              GitHub
            </a>
            <a
              href={content.social.linkedin}
              className="absolute top-1/3 -right-4 z-[3] inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-card-border bg-white px-4 py-[9px] text-[13px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.1)]"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${content.social.email}`}
              className="absolute bottom-8 -left-4 z-[3] inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-card-border bg-white px-4 py-[9px] text-[13px] font-medium shadow-[0_6px_18px_rgba(26,25,24,0.1)]"
            >
              {t("E-poçt", "Email")}
            </a>
          </div>

          <h1 className="mt-8 font-heading text-[clamp(40px,13vw,72px)] font-extrabold uppercase leading-[0.98] tracking-[0.005em]">
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #1A1918" }}>
              {firstName}
            </span>
            <span className="block">{lastName}</span>
          </h1>

          <h2 className="mt-5 text-2xl font-semibold">{t(content.hero.titleAz, content.hero.titleEn)}</h2>
          <p className="mt-3 max-w-[36ch] text-base leading-relaxed text-ink-secondary">
            {t(content.hero.descAz, content.hero.descEn)}
          </p>
          <a
            href="#elaqe"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-[14px] text-[15px] font-semibold text-paper shadow-[0_8px_20px_rgba(26,25,24,0.25)] transition-colors hover:bg-[#33312D]"
          >
            {t("Gəlin əməkdaşlıq edək", "Let's collaborate")} ↗
          </a>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block">
          <h1 className="whitespace-nowrap text-center font-heading text-[clamp(40px,6.3vw,104px)] font-extrabold uppercase leading-[0.98] tracking-[0.005em]">
            <span className="text-transparent" style={{ WebkitTextStroke: "2.5px #1A1918" }}>
              {firstName}
            </span>{" "}
            <span>{lastName}</span>
          </h1>

          <div className="mt-[-28px] grid grid-cols-[1fr_auto_1fr] items-end gap-6">
            <div className="z-[3] pb-9">
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

            <div className="flex justify-center">
              <PhotoSpotlight photo={content.hero.photo} />
            </div>

            <div className="z-[3] flex flex-col items-end gap-3 pb-9">
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
        </div>
      </Container>
    </header>
  );
}
