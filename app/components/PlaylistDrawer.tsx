"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Music2, Search, X } from "lucide-react";
import { eraOf, SONGS } from "@/app/data/songs";
import { usePlayer } from "@/app/context/PlayerContext";
import Equalizer from "@/app/components/Equalizer";

/** Slide-over glassmorphic playlist with live search (title / movie / year). */
export default function PlaylistDrawer() {
  const {
    drawerOpen,
    setDrawerOpen,
    searchQuery,
    setSearchQuery,
    queue,
    currentSong,
    isPlaying,
    playSongAt,
  } = usePlayer();

  const [closing, setClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => queue, [queue]);

  /* Autofocus the search box when opened */
  useEffect(() => {
    if (drawerOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [drawerOpen]);

  /* Escape key closes the drawer */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawerOpen]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setDrawerOpen(false);
    }, 260);
  };

  const handlePick = (queueIndex: number) => {
    playSongAt(queueIndex);
    if (typeof window !== "undefined" && window.innerWidth < 640) close();
  };

  const activeId = currentSong?.id ?? null;

  return (
    <div
      className={`fixed inset-0 z-50 ${drawerOpen || closing ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Playlist"
        className={`glass absolute top-0 right-0 flex h-full w-full max-w-md flex-col rounded-l-3xl !bg-black/45 ${
          closing ? "animate-slide-out" : "animate-slide-in"
        } ${drawerOpen ? "" : "hidden"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-[max(env(safe-area-inset-top),1.1rem)] pb-3">
          <div>
            <h2 className="font-brand text-2xl text-amber-100">Purane Naghme</h2>
            <p className="mt-0.5 text-[11px] font-medium tracking-[0.18em] text-white/55 uppercase">
              Playlist · {SONGS.length} Tracks
            </p>
          </div>
          <button
            type="button"
            aria-label="Close playlist"
            onClick={close}
            className="cursor-pointer rounded-full bg-white/10 p-2.5 text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Live search */}
        <div className="px-5 pb-3">
          <div className="glass flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-amber-300/80" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search song, movie or year…"
              className="w-full bg-transparent text-[13.5px] text-white placeholder:text-white/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchQuery("")}
                className="cursor-pointer text-white/50 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="mt-2 px-1 text-[11px] font-medium tracking-wide text-white/45 uppercase">
            {results.length} of {SONGS.length} tracks
            {searchQuery && ` matching “${searchQuery}”`}
          </p>
        </div>

        {/* Track list */}
        <div
          ref={listRef}
          className="no-scrollbar flex-1 overflow-y-auto px-3 pb-[max(env(safe-area-inset-bottom),1rem)]"
        >
          {results.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-white/40">
              <Music2 className="h-8 w-8" aria-hidden />
              <p className="text-sm">No tracks match your search.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((song, i) => {
                const isActive = song.id === activeId;
                const era = eraOf(song.eraId);
                return (
                  <li key={`${song.id}-${i}`}>
                    <button
                      type="button"
                      onClick={() => handlePick(i)}
                      className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ${
                        isActive
                          ? "bg-amber-400/15 ring-1 ring-amber-300/30"
                          : "hover:bg-white/8"
                      }`}
                    >
                      {/* Era accent + mini cover tile */}
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/15">
                        <img
                          src={era.coverUrl}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                        <span
                          className="absolute inset-x-0 bottom-0 h-0.5"
                          style={{ backgroundColor: era.accent }}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-[13.5px] font-semibold ${
                            isActive ? "text-amber-200" : "text-white/90"
                          }`}
                        >
                          {song.title}
                        </span>
                        <span className="block truncate text-[11.5px] text-white/50">
                          {song.movie} • {song.year} · {era.eraName}
                        </span>
                      </span>

                      {isActive && isPlaying ? (
                        <Equalizer playing className="text-amber-300" />
                      ) : (
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${
                            isActive ? "bg-amber-300" : "bg-white/20 group-hover:bg-white/40"
                          }`}
                          style={isActive ? { backgroundColor: era.accent } : undefined}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
