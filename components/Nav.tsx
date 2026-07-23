"use client";

import { useState } from "react";
import { useLang, useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Nav({ content }: { content: SiteContent }) {
  const { lang, setLang } = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#isler", label: t("İşlər", "Work"), sup: "[3]" },
    { href: "#xidmetler", label: t("Xidmətlər", "Service"), sup: "[4]" },
    { href: "#tecrube", label: t("Təcrübə", "Experience"), sup: null },
    { href: "#elaqe", label: t("Əlaqə", "Contact"), sup: null },
  ];

  const langToggle = (
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
  );

  const talkButton = (
    <a
      href="#elaqe"
      onClick={() => setOpen(false)}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-[22px] py-3 text-[15px] font-semibold text-paper shadow-[0_8px_20px_rgba(26,25,24,0.25)] transition-colors hover:bg-[#33312D]"
    >
      {t("Danışaq", "Let's Talk")} ↗
    </a>
  );

  return (
    <nav className="relative w-full">
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
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}{" "}
              {l.sup && <span className="align-super text-[11px] text-ink-tertiary">{l.sup}</span>}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-[14px] md:flex">
          {langToggle}
          {talkButton}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-card-border bg-white shadow-[0_6px_18px_rgba(26,25,24,0.07)] md:hidden"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mx-4 rounded-2xl border border-card-border bg-white p-6 shadow-[0_20px_45px_rgba(26,25,24,0.15)] md:hidden">
          <div className="flex flex-col gap-5 text-base font-medium">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}{" "}
                {l.sup && <span className="align-super text-[11px] text-ink-tertiary">{l.sup}</span>}
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3">
            {langToggle}
            {talkButton}
          </div>
        </div>
      )}
    </nav>
  );
}
