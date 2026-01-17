import Card from "./Card";
import type { LastfmRecentTrack } from "@/lib/stats";

interface LastfmCardProps {
  tracks: LastfmRecentTrack[];
}

export default function LastfmCard({ tracks }: LastfmCardProps) {
  const [featured, ...rest] = tracks;
  return (
    <Card colSpan={4} rowSpan={1} className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white font-semibold">listening</h2>
          <p className="text-neutral-400 text-sm">last.fm</p>
        </div>
      </div>

      {featured && (
        <div className="mt-3 flex items-center gap-3 bg-neutral-800/40 border border-white/5 rounded-md p-3">
          {featured.artUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featured.artUrl} alt="art" className="w-16 h-16 rounded-md border border-white/10" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{featured.name}</p>
            <p className="text-neutral-400 text-xs truncate">{featured.artist}{featured.album ? ` — ${featured.album}` : ''}</p>
          </div>
          {featured.url && (
            <a href={featured.url} target="_blank" className="text-neutral-400 text-xs hover:text-white">open</a>
          )}
        </div>
      )}

      <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        {rest.map((t) => (
          <li key={`${t.artist}-${t.name}`} className="flex items-center justify-between bg-neutral-800/40 border border-white/5 rounded-md px-3 py-2">
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{t.name}</p>
              <p className="text-neutral-400 text-xs truncate">{t.artist}</p>
            </div>
            {t.url && (
              <a href={t.url} target="_blank" className="text-neutral-400 text-xs hover:text-white">open</a>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
