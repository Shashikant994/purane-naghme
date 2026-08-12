# Purane Naghme 🎵

> *Evergreen Bollywood Melodies · 1950 – 2010*

A production-ready, single-page nostalgic Bollywood music web application — **100 iconic tracks across 5 golden eras**, streamed legally in the background via the YouTube IFrame API, with an invisible player, a spinning-vinyl UI, era filters, live search, shuffle/repeat, and a glassmorphic playlist drawer.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **100-song dataset** | 20 tracks × 5 eras (Golden 50–60s, Retro 70s, Synth/Disco 80s, Melodious 90s, Millennium 00s) |
| **Invisible audio engine** | YouTube IFrame API inside a hidden container (`opacity-0 pointer-events-none absolute -left-[9999px]`) — no video frame or branding ever visible |
| **Full transport controls** | Play / Pause / Next / Prev / Seek / Shuffle / Repeat (off · all · one), bound to `playVideo()`, `pauseVideo()`, `seekTo()`, `getCurrentTime()`, `getDuration()` |
| **Spinning vinyl** | 80px disc with era artwork, grooves, and 12px spindle — CSS `spin 8s linear infinite`, toggled `running`/`paused` by playback |
| **Custom seekbar** | Draggable + keyboard-accessible, elapsed/duration in `tabular-nums` |
| **Era filter tabs** | All · 50s-60s · 70s · 80s · 90s · 00s (quick tabs in the header) |
| **Playlist drawer** | Slide-over glass modal with live search across song title, movie, and year; animated equalizer on the active track |
| **Device-responsive backgrounds** | `scene-mobile.png` (< 640px) · `scene-tablet.png` (640–1023px) · `scene-desktop.png` (≥ 1024px) + cinematic gradient + inline SVG `feTurbulence` noise overlay (mix-blend-overlay @ 6%) |
| **Digital clock** | Live HH:MM:SS with blinking separator + date |
| **Safe-area aware** | `viewportFit: "cover"`, notch insets respected |

## 🧱 Stack

- **Framework** — Next.js 15 (App Router, root `app/`, no `src/`)
- **Language** — TypeScript (strict)
- **Styling** — Tailwind CSS v4 (`@theme` tokens in `app/globals.css`, **no** `tailwind.config.js`)
- **Dependencies** — `next`, `react`, `react-dom`, `@vercel/analytics`, `@vercel/speed-insights`, `lucide-react`
- **State** — native React Context (`app/context/PlayerContext.tsx`) — no external state management, no UI libraries, no CSS-in-JS

## 📁 Structure

```
purane-naghme/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, viewport (viewportFit: cover), Analytics/SpeedInsights
│   ├── page.tsx                # Single-page composition
│   ├── globals.css             # Tailwind v4 @theme tokens, background system, glass, vinyl, keyframes
│   ├── icon.svg                # Vinyl favicon
│   ├── data/
│   │   └── songs.ts            # Song + Era interfaces, 100 verified tracks
│   ├── context/
│   │   └── PlayerContext.tsx   # Queue, transport, filters, drawer state
│   └── components/
│       ├── YouTubeAudioEngine.tsx  # Invisible IFrame API bridge (audio only)
│       ├── Header.tsx / Clock.tsx / EraTabs.tsx
│       ├── Branding.tsx
│       ├── Player.tsx          # Desktop pill (hidden sm:flex) + mobile card (sm:hidden)
│       ├── VinylDisc.tsx / Seekbar.tsx / Equalizer.tsx
│       └── PlaylistDrawer.tsx  # Slide-over + live search
└── public/
    ├── bg/                     # scene-mobile / tablet / desktop.png
    └── covers/                 # 5 era artwork tiles for the vinyl & drawer
```

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 🔊 Audio Engine Notes

- The YouTube IFrame API script is injected once; the player is created inside a hidden, off-screen, non-interactive container.
- All UI actions map 1:1 to native API methods; progress is polled at 4 Hz only while playing.
- Track end → auto-advance (repeat-aware); shuffle avoids immediate repeats; `onError` gracefully pauses.
- Every `youtubeId` in `songs.ts` was validated via YouTube's oEmbed endpoint (embeddable + exact title match), preferring official channels (Saregama, T-Series, YRF, Tips, Sony Music, Shemaroo, Universal, Rajshri, Zee Music…).

## 📀 Dataset Notes

- The dataset follows the provided 100-song list (20 per era) exactly, including era assignments and years as given.
- Two entries in the source list were un-findable on any platform ("Kisse Kahoonga Main" / Pyaasa and "Sujan Chhoto So Bandha" / Sujata — no such recordings exist). They were replaced with iconic songs from the **same films and era**: *Jane Woh Kaise Log The* (Pyaasa, 1957) and *Kali Ghata Chhaye Mora Jiya* (Sujata, 1959).
- "Kabhi Kabhie Mere Dil Mein" appears twice (Golden + Retro eras), mirroring the source list.

## ☁️ Deployment

Deploys as-is to Vercel (`@vercel/analytics` + `@vercel/speed-insights` light up automatically). The hidden YouTube player streams directly from YouTube's own infrastructure — no server-side streaming or copyright hosting involved.

---
*Crafted with ❤️ for the golden age of Hindi cinema.*
