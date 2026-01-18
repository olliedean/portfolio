import PortfolioGrid from "@/components/PortfolioGrid";
import Card from "@/components/Card";
import LastfmCard from "@/components/LastfmCard";
import {
  fetchGithubPinned,
  fetchLastfmRecent,
  fetchSteamSummary,
  fetchSteamRecentGames,
  fetchTraktSummary,
} from "@/lib/stats";
import { FaStar } from "react-icons/fa";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const [lastfm, github, steam, trakt, steamRecent ] = await Promise.all([
    fetchLastfmRecent(),
    fetchGithubPinned(),
    fetchSteamSummary(),
    fetchTraktSummary(),
    fetchSteamRecentGames()
  ]);

  return (
    <PortfolioGrid>
      <Card colSpan={4} rowSpan={1} className="p-4 overflow-hidden relative hover:border-white/20 hover:bg-neutral-800">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {steamRecent.games[0]?.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={steamRecent.games[0].logoUrl} alt="last played" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="leading-tight">
              <h2 className="text-white font-semibold">last played</h2>
              <p className="text-neutral-400 text-sm">steam</p>
            </div>
            <span className="text-neutral-400 text-sm">{steam.personaName ?? '—'}</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            {steamRecent.games[0]?.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={steamRecent.games[0].logoUrl} alt="logo" className="w-16 h-16 rounded-md border border-white/10" />
            )}
            <div>
              <p className="text-white text-sm font-medium">{steamRecent.games[0]?.name ?? '—'}</p>
              <p className="text-neutral-400 text-xs">played {Math.round((steamRecent.games[0]?.minutes ?? 0) / 60)} hours</p>
            </div>
          </div>
          <div className="mt-3 text-neutral-400 text-xs">total this 2 weeks: {Math.round((steamRecent.totalMinutes ?? 0)/60)} hours</div>
        </div>
      </Card>

            <Card colSpan={3} rowSpan={1} className="p-4">
        <h2 className="text-white font-semibold">top repos</h2>
        <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
          {github.slice(0, 4).map((r) => (
            <li key={r.url} className="bg-neutral-800/40 border border-white/5 rounded-md p-3">
              <a href={r.url} target="_blank" className="text-white text-sm font-semibold hover:underline">
                {r.name}
              </a>
              {r.description && <p className="text-neutral-400 text-xs mt-1">{r.description}</p>}
              <p className="text-neutral-500 text-xs mt-1 flex gap-1 items-center"><FaStar className="text-yellow-300" /> {r.stars}</p>
            </li>
          ))}
        </ul>
      </Card>


      <LastfmCard tracks={lastfm} />

      <Card colSpan={3} rowSpan={1} className="p-4">
        <div className="leading-tight">
          <h2 className="text-white font-semibold">trakt</h2>
          <p className="text-neutral-400 text-sm">watching stats</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-neutral-800/40 border border-white/5 rounded-md p-3">
            <p className="text-neutral-400 text-xs">movie plays</p>
            <p className="text-white text-lg font-semibold">{trakt.playsMovies ?? 0}</p>
          </div>
          <div className="bg-neutral-800/40 border border-white/5 rounded-md p-3">
            <p className="text-neutral-400 text-xs">episode plays</p>
            <p className="text-white text-lg font-semibold">{trakt.playsEpisodes ?? 0}</p>
          </div>
        </div>
      </Card>
    </PortfolioGrid>
  );
}
