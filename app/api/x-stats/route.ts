import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  const token = process.env.X_BEARER_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "X_BEARER_TOKEN not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      "https://api.twitter.com/2/users/by/username/SpencerHea70687?user.fields=public_metrics",
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `X API error: ${res.status}`, detail: text },
        { status: res.status }
      );
    }

    const json = await res.json();
    const metrics = json.data?.public_metrics;

    return NextResponse.json({
      followers: metrics?.followers_count ?? 0,
      tweets: metrics?.tweet_count ?? 0,
      likes: metrics?.like_count ?? 0,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch X stats", detail: String(e) },
      { status: 500 }
    );
  }
}
