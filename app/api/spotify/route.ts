import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return res.json();
}

export async function GET() {
  let { access_token } = await getAccessToken();

  async function fetchCurrentlyPlaying(token: string) {
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
  }

  // 1. Try with current token
  let currentRes = await fetchCurrentlyPlaying(access_token);

  // 2. If expired → refresh and retry
  if (currentRes.status === 401) {
    const newToken = await getAccessToken();
    access_token = newToken.access_token;

    currentRes = await fetchCurrentlyPlaying(access_token);
  }

  // 3. Handle currently playing
  if (currentRes.status === 200) {
    const currentData = await currentRes.json();

    if (currentData?.item) {
      const track = currentData.item;

      return NextResponse.json({
        isPlaying: true,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        albumImage: track.album.images[0].url,
        songUrl: track.external_urls.spotify,
      });
    }
  }

  // 4. Fallback → last played
  const recentRes = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 30 },
    }
  );

  const recentData = await recentRes.json();

  if (!recentData.items?.length) {
    return NextResponse.json({ isPlaying: false });
  }

  const track = recentData.items[0].track;

  return NextResponse.json({
    isPlaying: false,
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    albumImage: track.album.images[0].url,
    songUrl: track.external_urls.spotify,
  });
}