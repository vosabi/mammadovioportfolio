"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function PhotoSpotlight({ photo }: { photo: string | null }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [errored, setErrored] = useState(false);
  const hasPhoto = !!photo && !errored;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = overlayRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const mask = `radial-gradient(circle 130px at ${x}px ${y}px, transparent 0px, transparent 55px, rgba(0,0,0,0.55) 95px, black 130px)`;
    el.style.webkitMaskImage = mask;
    el.style.maskImage = mask;
  };

  const handleLeave = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.webkitMaskImage = "none";
    el.style.maskImage = "none";
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative z-[2] -mt-24 h-[760px] w-[min(680px,58vw)]"
    >
      <div className={`relative h-full w-full overflow-hidden rounded-[18px] ${hasPhoto ? "" : "bg-card"}`}>
        {hasPhoto ? (
          <Image
            src={photo}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, 680px"
            className="object-cover object-top"
            priority
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-8 text-center text-sm text-ink-tertiary">
            Öz şəklinizi admin paneldən əlavə edin
          </div>
        )}
      </div>
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 rounded-[18px] backdrop-grayscale"
      />
    </div>
  );
}
