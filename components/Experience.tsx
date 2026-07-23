"use client";

import { useRef, useState } from "react";
import { useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

const STYLE_PALETTE = [
  { rotate: -6, from: "#c96442", to: "#8B887F" },
  { rotate: 5, from: "#2FBF5F", to: "#1C1B19" },
  { rotate: -4, from: "#8B887F", to: "#383631" },
  { rotate: 6, from: "#c96442", to: "#2FBF5F" },
];

export function Experience({ content }: { content: SiteContent }) {
  const t = useT();
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const activeStyle = hovered !== null ? STYLE_PALETTE[hovered % STYLE_PALETTE.length] : null;

  return (
    <section id="tecrube" className="w-full overflow-hidden bg-dark text-paper">
      <Container className="py-16 sm:py-[90px]">
        <span className="pointer-events-none absolute top-9 left-9 select-none whitespace-nowrap font-heading text-[190px] font-black uppercase leading-none text-paper/[0.04]">
          EXPERIENCE
        </span>
        <h2 className="relative mb-10 font-heading text-4xl font-bold uppercase">
          /{t("TƏCRÜBƏ", "EXPERIENCE")}
        </h2>

        <div ref={listRef} onMouseMove={handleMove} className="relative">
          {content.experience.map((entry, i) => {
            const filled = entry.company.trim().length > 0;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`flex cursor-default items-center justify-between gap-8 border-t border-dark-border px-3 py-[34px] transition-colors ${
                  i === content.experience.length - 1 ? "border-b" : ""
                } ${hovered === i ? "bg-paper/[0.04]" : ""}`}
              >
                <div className="flex flex-col gap-2">
                  <span
                    className={`text-[22px] font-semibold ${filled ? "" : "text-ink-secondary"}`}
                  >
                    {filled ? entry.company : t("Şirkət adı (bura yazın)", "Company name (edit me)")}
                  </span>
                  <span
                    className={`text-[17px] ${filled ? "text-dark-secondary" : "text-ink-quaternary"}`}
                  >
                    {filled ? entry.role : t("Vəzifəniz", "Your role")}
                  </span>
                </div>
                <span
                  className={`whitespace-nowrap text-lg ${filled ? "text-dark-secondary" : "text-ink-quaternary"}`}
                >
                  {filled ? t(entry.dateAz, entry.dateEn) : t("Tarix aralığı", "Date range")}
                </span>
              </div>
            );
          })}

          <div
            className="pointer-events-none absolute top-0 left-0 z-10 h-[130px] w-[170px] overflow-hidden rounded-xl bg-white p-[6px] shadow-[0_20px_45px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-200 ease-out"
            style={{
              transform: `translate(${pos.x - 85}px, ${pos.y - 150}px) rotate(${activeStyle?.rotate ?? 0}deg) scale(${activeStyle ? 1 : 0.85})`,
              opacity: activeStyle ? 1 : 0,
              background: activeStyle
                ? `linear-gradient(135deg, ${activeStyle.from}, ${activeStyle.to})`
                : undefined,
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-lg text-center text-[11px] font-medium text-white/85">
              {t("Layihə önizləməsi", "Project preview")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
