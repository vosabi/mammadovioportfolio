"use client";

import { useState } from "react";
import { useT } from "@/lib/lang-context";
import { Container } from "./Container";
import type { SiteContent } from "@/lib/content";

export function Services({ content }: { content: SiteContent }) {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="xidmetler" className="w-full overflow-hidden">
    <Container className="py-16 sm:py-[90px]">
      <span className="pointer-events-none absolute top-6 left-9 select-none whitespace-nowrap font-heading text-[200px] font-black uppercase leading-none text-ink/[0.035]">
        SERVICE
      </span>
      <h2 className="relative mb-12 font-heading text-4xl font-bold uppercase">
        /{t("XİDMƏTLƏR", "SERVICE")}
      </h2>

      <div className="relative flex flex-col">
        {content.services.map((svc, i) => {
          const isOpen = open === i;
          const text = t(svc.titleAz, svc.titleEn);
          const desc = t(svc.descAz, svc.descEn);
          return (
            <div key={i}>
              {isOpen ? (
                <div
                  onClick={() => setOpen(null)}
                  className="my-2 flex cursor-pointer items-center justify-between gap-8 rounded-[18px] bg-dark p-8 text-paper sm:p-11"
                >
                  <div>
                    <h3 className="mb-3 font-heading text-[clamp(28px,3.4vw,46px)] font-bold uppercase">
                      {text}
                    </h3>
                    <p className="max-w-[52ch] text-base leading-relaxed text-ink-tertiary">
                      {desc}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-2xl">✕</span>
                </div>
              ) : (
                <div
                  onClick={() => setOpen(i)}
                  className="flex cursor-pointer items-center justify-between gap-8 border-t border-divider px-2 py-[34px] transition-colors hover:bg-card"
                >
                  <h3 className="font-heading text-[clamp(28px,3.4vw,46px)] font-bold uppercase">
                    {text}
                  </h3>
                  <span className="flex-shrink-0 text-[28px]">↗</span>
                </div>
              )}
            </div>
          );
        })}
        <div className="border-t border-divider" />
      </div>
    </Container>
    </section>
  );
}
