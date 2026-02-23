import { NextResponse } from "next/server";

export const revalidate = 120;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = token
    ? { Authorization: `token ${token}`, Accept: "application/vnd.github+json" }
    : { Accept: "application/vnd.github+json" };

  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch("https://api.github.com/users/clawdustin/repos?per_page=100", {
        headers,
        next: { revalidate: 120 },
      }),
      fetch("https://api.github.com/users/clawdustin/events?per_page=10", {
        headers,
        next: { revalidate: 120 },
      }),
    ]);

    if (!reposRes.ok || !eventsRes.ok) {
      return NextResponse.json(
        { error: "GitHub API error", repos: reposRes.status, events: eventsRes.status },
        { status: 500 }
      );
    }

    const repos = await reposRes.json();
    const events = await eventsRes.json();

    const pushEvent = events.find(
      (e: { type: string }) => e.type === "PushEvent"
    );

    return NextResponse.json({
      repos: repos.length,
      latestCommit: pushEvent?.created_at ?? null,
      latestRepo: pushEvent?.repo?.name ?? null,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats", detail: String(e) },
      { status: 500 }
    );
  }
}
