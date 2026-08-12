"use client";

import { PlayerProvider } from "@/app/context/PlayerContext";
import YouTubeAudioEngine from "@/app/components/YouTubeAudioEngine";
import Header from "@/app/components/Header";
import Branding from "@/app/components/Branding";
import Player from "@/app/components/Player";
import PlaylistDrawer from "@/app/components/PlaylistDrawer";

/**
 * Purane Naghme — a nostalgic Bollywood music player.
 * Single page · 100 evergreen tracks · 5 eras (1950 – 2010).
 */
export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Device-responsive cinematic background (mobile / tablet / desktop) */}
      <div className="bg-scene" aria-hidden />
      {/* feTurbulence noise grain overlay */}
      <div className="noise-overlay" aria-hidden />

      <PlayerProvider>
        {/* Invisible YouTube IFrame API audio engine */}
        <YouTubeAudioEngine />

        {/* Top header: clock · era tabs · playlist button */}
        <Header />

        {/* Centerpiece retro branding */}
        <div className="z-10 flex flex-1 flex-col items-center justify-center py-6">
          <Branding />
        </div>

        {/* Bottom music player (desktop pill + mobile card) */}
        <Player />

        {/* Slide-over playlist with live search */}
        <PlaylistDrawer />
      </PlayerProvider>
    </main>
  );
}
