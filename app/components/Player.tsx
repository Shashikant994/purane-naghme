"use client";

import { useEffect } from "react";
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { usePlayer } from "@/app/context/PlayerContext";
import Seekbar from "@/app/components/Seekbar";
import VinylDisc from "@/app/components/VinylDisc";

function ControlButton({
  label,
  onClick,
  active = false,
  disabled = false,
  children,
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer rounded-full p-2 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-35 ${
        active
          ? "text-amber-300 drop-shadow-[0_0_8px_rgba(255,200,90,0.6)]"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

/** The centerpiece: desktop floating pill (hidden sm:flex) + mobile card (sm:hidden). */
export default function Player() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    next,
    prev,
    shuffle,
    toggleShuffle,
    repeat,
    cycleRepeat,
  } = usePlayer();

  const repeatLabel =
    repeat === "one" ? "Repeat one" : repeat === "all" ? "Repeat all" : "Repeat off";

  /* TV / media-key support: Google TV remotes send MediaPlayPause,
     MediaTrackNext / MediaTrackPrevious; Space also toggles play. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const isFormEl =
        !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "BUTTON");
      if (e.key === "MediaPlayPause") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "MediaTrackNext") {
        e.preventDefault();
        next();
      } else if (e.key === "MediaTrackPrevious") {
        e.preventDefault();
        prev();
      } else if (e.code === "Space" && !isFormEl) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, next, prev]);

  return (
    <>
      {/* ── Desktop version — glassmorphic floating pill ─────────────────── */}
      <div className="safe-bottom hidden w-full items-center justify-center sm:flex">
        <div className="glass flex w-full max-w-3xl items-center gap-4 rounded-full p-3 pr-6">
          {/* Spinning vinyl */}
          <VinylDisc song={currentSong} spinning={isPlaying} />

          {/* Song metadata */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-amber-100">
              {currentSong ? currentSong.title : "Select a track"}
            </p>
            <p className="mt-0.5 truncate text-[12.5px] text-white/70">
              {currentSong
                ? `${currentSong.movie} • ${currentSong.year}`
                : "100 evergreen songs, 1950 – 2010"}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-0.5">
            <ControlButton
              label={shuffle ? "Shuffle on" : "Shuffle"}
              onClick={toggleShuffle}
              active={shuffle}
            >
              <Shuffle className="h-[17px] w-[17px]" />
            </ControlButton>
            <ControlButton label="Previous" onClick={prev} disabled={!currentSong}>
              <SkipBack className="h-5 w-5" />
            </ControlButton>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              disabled={!currentSong}
              autoFocus
              className="mx-1 cursor-pointer rounded-full bg-gradient-to-b from-amber-300 to-amber-500 p-3 text-black shadow-[0_6px_20px_-4px_rgba(255,190,80,0.65),inset_0_1px_0_rgba(255,255,255,0.6)] transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </button>
            <ControlButton label="Next" onClick={next} disabled={!currentSong}>
              <SkipForward className="h-5 w-5" />
            </ControlButton>
            <ControlButton label={repeatLabel} onClick={cycleRepeat} active={repeat !== "off"}>
              {repeat === "one" ? (
                <Repeat1 className="h-[17px] w-[17px]" />
              ) : (
                <Repeat className="h-[17px] w-[17px]" />
              )}
            </ControlButton>
          </div>

          {/* Seekbar */}
          <div className="w-52 xl:w-64">
            <Seekbar />
          </div>
        </div>
      </div>

      {/* ── Mobile version — compact vertical glass card ─────────────────── */}
      <div className="safe-bottom w-full px-3 sm:hidden">
        <div className="glass w-full rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <VinylDisc
              song={currentSong}
              spinning={isPlaying}
              size="h-14 w-14"
              spindle="h-2.5 w-2.5"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-amber-100">
                {currentSong ? currentSong.title : "Select a track"}
              </p>
              <p className="mt-0.5 truncate text-[12px] text-white/70">
                {currentSong
                  ? `${currentSong.movie} • ${currentSong.year}`
                  : "100 evergreen songs, 1950 – 2010"}
              </p>
            </div>
            <button
              type="button"
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={togglePlay}
              disabled={!currentSong}
              className="cursor-pointer rounded-full bg-gradient-to-b from-amber-300 to-amber-500 p-3 text-black shadow-[0_6px_20px_-4px_rgba(255,190,80,0.65)] transition-transform active:scale-95 disabled:opacity-40"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              )}
            </button>
          </div>

          <Seekbar className="mt-3" />

          <div className="mt-1 flex items-center justify-center gap-2">
            <ControlButton
              label={shuffle ? "Shuffle on" : "Shuffle"}
              onClick={toggleShuffle}
              active={shuffle}
            >
              <Shuffle className="h-4 w-4" />
            </ControlButton>
            <ControlButton label="Previous" onClick={prev} disabled={!currentSong}>
              <SkipBack className="h-5 w-5" />
            </ControlButton>
            <ControlButton label="Next" onClick={next} disabled={!currentSong}>
              <SkipForward className="h-5 w-5" />
            </ControlButton>
            <ControlButton
              label={repeatLabel}
              onClick={cycleRepeat}
              active={repeat !== "off"}
            >
              {repeat === "one" ? (
                <Repeat1 className="h-4 w-4" />
              ) : (
                <Repeat className="h-4 w-4" />
              )}
            </ControlButton>
          </div>
        </div>
      </div>
    </>
  );
}
