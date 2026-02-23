import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

function relativeTime(timestamp: string): string {
  const now = Date.now();
  const then = new Date(timestamp).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDay}d ago`;
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), "data", "feed.json");
    const raw = await readFile(filePath, "utf-8");
    const data = JSON.parse(raw);

    const events = data.events
      .sort(
        (a: { timestamp: string }, b: { timestamp: string }) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 20)
      .map((e: { timestamp: string; id: string; message: string; type: string }) => ({
        ...e,
        timestamp: relativeTime(e.timestamp),
      }));

    return NextResponse.json({ events });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to read feed data", detail: String(e) },
      { status: 500 }
    );
  }
}
