"use client";

import { ListMusic } from "lucide-react";
import { SONGS } from "@/app/data/songs";
import { usePlayer } from "@/app/context/PlayerContext";
import Clock from "@/app/components/Clock";
import EraTabs from "@/app/components/EraTabs";

/** Top header — safe-area padded: clock (left) · era tabs (center) · drawer button (right). */
export default function Header() {
  const { setDrawerOpen, drawerOpen, currentSong, isPlaying } = usePlayer();

  return (
    <header className="safe-top z-20 flex w-full flex-col items-center gap-3 px-4 sm:px-6">
      <div className="flex w-full max-w-6xl items-start justify-between gap-3">
        {/* Top-left: digital clock */}
        <Clock />

        {/* Spacer keeps center truly centered on wide screens */}
        <div className="hidden flex-1 lg:block" />

        {/* Top-right: playlist drawer button */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className={`glass group flex cursor-pointer items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 transition-all duration-300 hover:border-amber-300/30 ${
            drawerOpen ? "border-amber-300/40" : ""
          }`}
        >
          <span className="relative rounded-full bg-gradient-to-b from-amber-300 to-amber-500 p-2 text-black shadow-[0_4px_14px_-2px_rgba(255,190,80,0.6)] transition-transform group-hover:scale-105">
            <ListMusic className="h-3.5 w-3.5" aria-hidden />
            {isPlaying && currentSong && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 animate-ping rounded-full bg-emerald-400" />
            )}
          </span>
          <span className="text-[13px] font-bold tracking-wide text-amber-100">
            {SONGS.length} Tracks
          </span>
        </button>
      </div>

      {/* Top-center: era filter quick tabs */}
      <div className="w-full max-w-6xl">
        <div className="flex justify-center">
          <EraTabs />
        </div>
      </div>
    </header>
  );
}
