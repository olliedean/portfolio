import PortfolioGrid from "@/components/PortfolioGrid";
import Card from "@/components/Card";
import LastfmCard from "@/components/LastfmCard";
import {
  fetchGithubPinned,
  fetchSteamSummary,
  fetchSteamRecentGames,
  fetchTraktSummary,
  fetchStatsfmRecent,
} from "@/lib/stats";
import { FaArrowLeft, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import Link from "next/dist/client/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const [lastfm, github, steam, trakt, steamRecent ] = await Promise.all([
    fetchStatsfmRecent(),
    fetchGithubPinned(),
    fetchSteamSummary(),
    fetchTraktSummary(),
    fetchSteamRecentGames()
  ]);

  return (
    <main>
      <div className="md:max-w-6xl mx-auto pt-4">
        <Link href="/" className="text-neutral-500 hover:text-white">
          <FaArrowLeft className="inline-block mr-2 text-xs" />
          go back
        </Link>
      </div>
      <PortfolioGrid autoRows>
        <Card colSpan={4} rowSpan={1} className="p-4 overflow-hidden relative hover:border-white/20 hover:bg-neutral-800">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {steamRecent.games[0]?.logoUrl && (
              <Image src={steamRecent.games[0].logoUrl} alt="last played" className="w-full h-full object-cover" width={256} height={256} />
            )}
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="leading-tight">
                <h2 className="text-white font-semibold">last played</h2>
                <a 
                  className="text-neutral-400 text-sm hover:text-white underline underline-offset-2"
                  href="https://steamcommunity.com/id/olliedeannnn" target="_blank" rel="noopener noreferrer"
                >
                  steam <FaExternalLinkAlt className="inline-block ml-1 text-xs" />
                </a>
              </div>
              <span className="text-neutral-400 text-sm">{steam.personaName ?? '—'}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {steamRecent.games[0]?.logoUrl && (
                <Image src={steamRecent.games[0].logoUrl} alt="logo" className="w-16 h-16 rounded-md border border-white/10" width={64} height={64} />
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
          <div className="leading-tight">
            <h2 className="text-white font-semibold">watching stats</h2>
            <a 
              className="text-neutral-400 text-sm hover:text-white underline underline-offset-2"
              href="https://trakt.tv/users/olliedean" target="_blank" rel="noopener noreferrer"
            >
              trakt.tv <FaExternalLinkAlt className="inline-block ml-1 text-xs" />
            </a>
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

        <Card colSpan={3} rowSpan={1} className="p-4">
          <div className="leading-tight">
            <h2 className="text-white font-semibold">top repos</h2>
            <a
              className="text-neutral-400 text-sm hover:text-white underline underline-offset-2"
              href="https://github.com/olliedean" target="_blank" rel="noopener noreferrer"
            >
              github.com <FaExternalLinkAlt className="inline-block ml-1 text-xs" />
            </a>
          </div>
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
      </PortfolioGrid>
    </main>
  );
}
