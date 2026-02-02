import 'server-only';

export type LastfmRecentTrack = {
  name: string;
  artist: string;
  album?: string;
  url?: string;
  date?: number;
  artUrl?: string;
};

export type GithubRepo = {
  name: string;
  stars: number;
  url: string;
  description?: string;
};

export type SteamSummary = {
  personaName?: string;
  avatar?: string;
  recentMinutes?: number;
};

export type SteamRecentGame = {
  name: string;
  minutes: number;
  appid: number;
  logoUrl: string;
};

export type TraktSummary = {
  playsMovies?: number;
  playsEpisodes?: number;
};

function safeFetch(input: RequestInfo, init?: RequestInit & { next?: { revalidate?: number } }): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
    },
    next: { revalidate: 60 },
  });
}

export async function fetchLastfmRecent(): Promise<LastfmRecentTrack[]> {
  const apiKey = process.env.LASTFM_API_KEY;
  const user = process.env.LASTFM_USER;

  if (!apiKey || !user) return [];

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(apiKey)}&format=json&limit=5`;
  const res = await safeFetch(url);
  const data = await res.json();
  const tracks = (data?.recenttracks?.track ?? []) as unknown[];
  return tracks.map((raw) => {
    const t = raw as Record<string, unknown>;
    const artist = (t?.artist as Record<string, unknown> | undefined)?.['#text'] as string | undefined;
    const album = (t?.album as Record<string, unknown> | undefined)?.['#text'] as string | undefined;
    const dateObj = t?.date as Record<string, unknown> | undefined;
    const uts = dateObj?.uts as string | number | undefined;
    const images = t?.image as unknown[] | undefined;
    const artUrl = Array.isArray(images)
      ? (() => {
          const pick = images.find((img) => {
            const o = img as Record<string, unknown>;
            return o?.['size'] === 'extralarge';
          }) || images.find((img) => {
            const o = img as Record<string, unknown>;
            return o?.['size'] === 'large';
          });
          const text = pick ? (pick as Record<string, unknown>)['#text'] : undefined;
          return typeof text === 'string' ? text : undefined;
        })()
      : undefined;
    return {
      name: t?.name as string | undefined,
      artist,
      album,
      url: t?.url as string | undefined,
      date: typeof uts === 'string' ? Number(uts) : typeof uts === 'number' ? uts : undefined,
      artUrl: typeof artUrl === 'string' ? artUrl : undefined,
    } as LastfmRecentTrack;
  });
}

export async function fetchGithubPinned(): Promise<GithubRepo[]> {
  const username = process.env.GITHUB_USER || 'olliedean';
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = { 'Accept': 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await safeFetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
    const repos = await res.json();
    const sorted = (Array.isArray(repos) ? repos : []).sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0));
    return sorted.slice(0, 6).map((r) => ({ name: r.name, stars: r.stargazers_count ?? 0, url: r.html_url, description: r.description ?? undefined }));
  } catch {
    return [
      { name: 'portfolio', stars: 100000000, url: 'https://github.com/olliedean/portfolio' },
    ];
  }
}

export async function fetchSteamSummary(): Promise<SteamSummary> {
  const key = process.env.STEAM_API_KEY;
  const id = process.env.STEAM_ID;

  if (!key || !id) {
    return { personaName: 'Steam User', recentMinutes: 180 };
  }

  try {
    const res = await safeFetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${encodeURIComponent(key)}&steamids=${encodeURIComponent(id)}`);
    const data = await res.json();
    const player = data?.response?.players?.[0];
    return { personaName: player?.personaname, avatar: player?.avatarfull };
  } catch {
    return { personaName: 'Steam User' };
  }
}

export async function fetchSteamRecentGames(): Promise<{ totalMinutes: number; games: SteamRecentGame[] }> {
  const key = process.env.STEAM_API_KEY;
  const id = process.env.STEAM_ID;
  try {
    const res = await safeFetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${encodeURIComponent(key)}&steamid=${encodeURIComponent(id)}&count=6`);
    const data = await res.json();
    const games = (data?.response?.games ?? []) as unknown[];
    const mapped: SteamRecentGame[] = games.map((raw) => {
      const g = raw as Record<string, unknown>;
      const appid = (g.appid as number) ?? 0;
      const hash = g.img_logo_url as string | undefined;
      return {
        name: (g.name as string) ?? '—',
        minutes: (g.playtime_2weeks as number) ?? 0,
        appid,
        logoUrl: appid && hash ? `https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg` : '',
      };
    });
    const total = mapped.reduce((acc, cur) => acc + (cur.minutes ?? 0), 0);
    return { totalMinutes: total, games: mapped };
  } catch {
    return { totalMinutes: 0, games: [] };
  }
}

export async function fetchTraktSummary(): Promise<TraktSummary> {
  const clientId = process.env.TRAKT_CLIENT_ID;
  const user = process.env.TRAKT_USER;
  if (!clientId || !user) {
    return { playsMovies: 123, playsEpisodes: 456 };
  }
  try {
    const res = await safeFetch(`https://api.trakt.tv/users/${encodeURIComponent(user)}/stats`, {
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': clientId,
      },
    });
    const data = await res.json();
    return { playsMovies: data?.movies?.plays ?? 0, playsEpisodes: data?.episodes?.plays ?? 0 };
  } catch {
    return { playsMovies: 0, playsEpisodes: 0 };
  }
}
