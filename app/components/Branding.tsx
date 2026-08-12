"use client";

import { Disc3 } from "lucide-react";

/** Centerpiece retro branding — "Purane Naghme" */
export default function Branding() {
  return (
    <div className="animate-fade-up pointer-events-none flex flex-col items-center px-4 text-center">
      <div className="mb-3 flex items-center gap-2 text-amber-300/80 sm:mb-4">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-300/60 sm:w-14" />
        <Disc3 className="h-4 w-4" aria-hidden />
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-300/60 sm:w-14" />
      </div>

      <h1
        className="title-glow font-brand text-[44px] leading-[1.05] text-transparent sm:text-6xl md:text-7xl lg:text-[84px]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #fff3d6 0%, #ffd27a 45%, #e89b3c 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Purane Naghme
      </h1>

      <p className="mt-2 max-w-md text-[12px] font-medium tracking-[0.28em] text-white/65 uppercase sm:mt-3 sm:text-[13px]">
        Evergreen Bollywood Melodies · 1950 – 2010
      </p>

      <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-white/40 sm:text-xs">
        One hundred iconic tracks · five golden eras · one nostalgic journey
      </p>
    </div>
  );
}
