"use client";

import { useCallback, useRef, useState } from "react";
import { usePlayer } from "@/app/context/PlayerContext";

const fmt = (sec: number) => {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

/** Interactive custom seekbar with elapsed / duration (tabular-nums). */
export default function Seekbar({ className = "" }: { className?: string }) {
  const { currentTime, duration, seek, isPlaying } = usePlayer();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);

  const pct = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return Math.min(1, Math.max(0, ratio));
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    const p = pct(e.clientX);
    setDragValue(p);
    seek(p * (duration || 0));
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const p = pct(e.clientX);
    setDragValue(p);
    seek(p * (duration || 0));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    const p = pct(e.clientX);
    setDragValue(p);
    seek(p * (duration || 0));
  };

  const display = dragging ? dragValue : duration ? currentTime / duration : 0;
  const shownTime = dragging ? dragValue * (duration || 0) : currentTime;

  return (
    <div className={`flex w-full items-center gap-2.5 ${className}`}>
      <span className="tabular w-11 shrink-0 text-[11px] font-medium text-white/60">
        {fmt(shownTime)}
      </span>

      <div
        ref={trackRef}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration || 0)}
        aria-valuenow={Math.round(shownTime)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") seek(Math.min(duration, currentTime + 5));
          if (e.key === "ArrowLeft") seek(Math.max(0, currentTime - 5));
        }}
        className="group relative h-6 flex-1 cursor-pointer touch-none select-none outline-none"
      >
        {/* track */}
        <div className="absolute top-1/2 h-[5px] w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500/90 via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(255,200,90,0.55)]"
            style={{ width: `${display * 100}%` }}
          />
        </div>
        {/* thumb */}
        <div
          className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(255,210,120,0.9)] transition-opacity ${
            dragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          } ${isPlaying ? "" : "opacity-70"}`}
          style={{ left: `${display * 100}%` }}
        />
      </div>

      <span className="tabular w-11 shrink-0 text-right text-[11px] font-medium text-white/60">
        {fmt(duration)}
      </span>
    </div>
  );
}
