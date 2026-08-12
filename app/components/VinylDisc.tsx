"use client";

import { eraOf, type Song } from "@/app/data/songs";

/**
 * Spinning vinyl record:
 * - 80px circular artwork with continuous CSS rotation (spin 8s linear infinite)
 * - rotation toggled between `running` and `paused` by playback state
 * - centered 12px spindle hole (bg-black/70 ring-2 ring-white/40)
 */
export default function VinylDisc({
  song,
  spinning,
  size = "w-20 h-20",
  spindle = "h-3 w-3",
}: {
  song: Song | null;
  spinning: boolean;
  size?: string;
  spindle?: string;
}) {
  const cover = song ? eraOf(song.eraId).coverUrl : "/covers/golden.png";

  return (
    <div
      className={`vinyl-disc relative shrink-0 overflow-hidden rounded-full shadow-[0_10px_28px_-6px_rgba(0,0,0,0.85)] ring-1 ring-white/25 ${
        spinning ? "is-spinning" : ""
      } ${size}`}
      aria-hidden
    >
      {/* artwork */}
      <img
        src={cover}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* groove shading */}
      <div className="vinyl-grooves absolute inset-0" />
      {/* glossy sheen */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.22),transparent_55%)]" />
      {/* spindle hole */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40 ${spindle}`}
      />
    </div>
  );
}
