"use client";

import { ERAS, type EraId } from "@/app/data/songs";
import { usePlayer } from "@/app/context/PlayerContext";
import { Disc3 } from "lucide-react";

/** Era Filter Quick Tabs — All, 50s-60s, 70s, 80s, 90s, 00s */
export default function EraTabs() {
  const { eraFilter, setEraFilter } = usePlayer();

  const tabs: { id: EraId | "all"; label: string; accent?: string }[] = [
    { id: "all", label: "All" },
    ...ERAS.map((e) => ({ id: e.id as EraId, label: e.tag, accent: e.accent })),
  ];

  return (
    <nav
      aria-label="Era filter"
      className="no-scrollbar flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full p-1 sm:gap-2"
    >
      {tabs.map((tab) => {
        const active = eraFilter === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setEraFilter(tab.id)}
            aria-pressed={active}
            className={`relative shrink-0 cursor-pointer rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide transition-all duration-300 sm:px-4 sm:text-[13px] ${
              active
                ? "glass text-amber-100 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)]"
                : "text-white/60 hover:bg-white/10 hover:text-white/90"
            }`}
          >
            {tab.accent && (
              <span
                className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{
                  backgroundColor: tab.accent,
                  boxShadow: active
                    ? `0 0 8px ${tab.accent}`
                    : "none",
                  opacity: active ? 1 : 0.55,
                }}
              />
            )}
            {tab.label}
            {active && (
              <Disc3
                className="absolute -top-1 -right-1 h-3.5 w-3.5 text-amber-300/90"
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
