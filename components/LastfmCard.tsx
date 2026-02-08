"use client";
import Card from "./Card";
import type { StatsFMRecentTrack } from "@/lib/stats";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaExternalLinkAlt } from "react-icons/fa";


function ArtworkButton({ src, active, onClick, className }: { src?: string; active: boolean; onClick: () => void; className?: string }) {
  if (!src) return null;
  return (
    <button aria-label={active ? "Pause preview" : "Play preview"} onClick={onClick} className={`relative group shrink-0 ${className ?? ''}`}>
      <Image src={src} alt="art" className="rounded-md border border-white/10 w-full h-full object-cover" width={80} height={80} />
      <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="inline-grid place-items-center w-7 h-7">
          {active ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
        </span>
      </span>
    </button>
  );
}

interface LastfmCardProps {
  tracks: StatsFMRecentTrack[];
}

export default function LastfmCard({ tracks }: LastfmCardProps) {
  const [featured, ...rest] = tracks;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const previewCache = useRef<Record<string, string>>({});

  const keyFor = (t: Pick<StatsFMRecentTrack, "artist" | "name">) => `${t.artist ?? ''}-${t.name ?? ''}`.toLowerCase();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  async function togglePlay(t: StatsFMRecentTrack) {
    const key = keyFor(t);
    if (playingKey === key) {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0.2;
        if (audio.paused) {
          await audio.play().catch(() => {});
        } else {
          audio.pause();
        }
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    console.log(t);
    let preview: string | undefined = previewCache.current[key];
    if (!preview) {
      preview = t.previewUrl;
      if (preview) previewCache.current[key] = preview;
    }

    if (!preview) {
      setPlayingKey(null);
      return;
    }

    const audio = new Audio(preview);
    audio.volume = 0.2;
    audioRef.current = audio;
    setPlayingKey(key);
    audio.onended = () => setPlayingKey((cur) => (cur === key ? null : cur));
    audio.onerror = () => setPlayingKey((cur) => (cur === key ? null : cur));
    await audio.play().catch(() => setPlayingKey(null));
  }
  return (
    <Card colSpan={4} rowSpan={1} className="p-4">
      <div className="flex items-start justify-between">
        <div className="leading-tight">
          <h2 className="text-white font-semibold">listening to</h2>
          <a 
            className="text-neutral-400 text-sm hover:text-white underline underline-offset-2"
            href="https://www.stats.fm/user/olliedean" target="_blank" rel="noopener noreferrer"
          >
            stats.fm <FaExternalLinkAlt className="inline-block ml-1 text-xs" />
          </a>
        </div>
      </div>

      {featured && (
        <div className="mt-3 flex items-center gap-3 bg-neutral-800/40 border border-white/5 rounded-md p-3">
          <ArtworkButton src={featured.artUrl} active={playingKey === keyFor(featured)} onClick={() => togglePlay(featured)} className="w-16 h-16" />
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{featured.name}</p>
            <p className="text-neutral-400 text-xs truncate">{featured.artist}{featured.album ? ` — ${featured.album}` : ''}</p>
          </div>
        </div>
      )}

      <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        {rest.slice(0, 4).map((t) => (
          <li key={`${t.artist}-${t.name}`} className="flex items-center justify-between bg-neutral-800/40 border border-white/5 rounded-md px-3 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <ArtworkButton src={t.artUrl} active={playingKey === keyFor(t)} onClick={() => togglePlay(t)} className="w-12 h-12" />
              <div className="flex flex-col min-w-0">
                <p className="text-white text-sm font-medium truncate leading-none">{t.name}</p>
                <p className="text-neutral-400 text-xs truncate">{t.artist}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
