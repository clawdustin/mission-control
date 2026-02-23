import { NextResponse } from "next/server";

export const revalidate = 30;

interface ConnectionCheck {
  name: string;
  type: string;
  status: "up" | "down" | "pending";
  latencyMs: number;
}

async function pingService(
  name: string,
  type: string,
  url: string,
  headers?: HeadersInit
): Promise<ConnectionCheck> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Date.now() - start;
    return { name, type, status: res.ok ? "up" : "down", latencyMs };
  } catch {
    return { name, type, status: "down", latencyMs: Date.now() - start };
  }
}

export async function GET() {
  const xToken = process.env.X_BEARER_TOKEN;
  const ghToken = process.env.GITHUB_TOKEN;

  const checks = await Promise.all([
    pingService(
      "Gmail",
      "email",
      "https://gmail.googleapis.com/$discovery/rest?version=v1"
    ),
    pingService(
      "X API",
      "social",
      "https://api.twitter.com/2/tweets/search/recent?query=test",
      xToken ? { Authorization: `Bearer ${xToken}` } : undefined
    ),
    pingService("Brave Search", "search", "https://api.search.brave.com/"),
    pingService(
      "GitHub",
      "code",
      "https://api.github.com/users/clawdustin",
      ghToken
        ? { Authorization: `token ${ghToken}`, Accept: "application/vnd.github+json" }
        : { Accept: "application/vnd.github+json" }
    ),
    pingService(
      "Tailscale",
      "network",
      "https://login.tailscale.com/api/v2"
    ),
  ]);

  const connections: ConnectionCheck[] = [
    ...checks,
    { name: "Claude Code", type: "coding agent", status: "up", latencyMs: 0 },
    { name: "Memory Search", type: "memory", status: "up", latencyMs: 0 },
    { name: "Vercel", type: "deployments", status: "pending", latencyMs: 0 },
    { name: "Supabase", type: "database", status: "pending", latencyMs: 0 },
    { name: "Google Calendar", type: "calendar", status: "pending", latencyMs: 0 },
  ];

  return NextResponse.json({ connections });
}
