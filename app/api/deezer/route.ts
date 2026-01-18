import { NextResponse } from "next/server";

function buildQuery(artist?: string, track?: string): string {
  const parts: string[] = [];
  if (artist) parts.push(`artist:"${artist.replace(/"/g, " ")}"`);
  if (track) parts.push(`track:"${track.replace(/"/g, " ")}"`);
  return parts.length ? parts.join(" ") : "";
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const artist = url.searchParams.get("artist") || undefined;
    const track = url.searchParams.get("track") || undefined;
    if (!artist && !track) {
      return NextResponse.json({ error: "missing artist or track" }, { status: 400 });
    }

    const q = buildQuery(artist, track) || `${artist ?? ""} ${track ?? ""}`.trim();
    const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=1`;

    const res = await fetch(apiUrl, { next: { revalidate: 300 } });
    if (!res.ok) {
      return NextResponse.json({ error: "deezer error" }, { status: 502 });
    }
    const data = await res.json();
    const first = Array.isArray(data?.data) ? data.data[0] : undefined;

    const previewUrl: string | undefined = first?.preview || undefined;
    const cover: string | undefined = first?.album?.cover_medium || first?.album?.cover || undefined;

    return NextResponse.json({ previewUrl, cover }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
