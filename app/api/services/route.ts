import { NextResponse } from "next/server";

export const revalidate = 30;

interface ServiceCheck {
  name: string;
  status: "up" | "down";
  latencyMs: number;
}

async function pingService(
  name: string,
  url: string,
  headers?: HeadersInit
): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Date.now() - start;
    return { name, status: res.ok ? "up" : "down", latencyMs };
  } catch {
    return { name, status: "down", latencyMs: Date.now() - start };
  }
}

export async function GET() {
  const xToken = process.env.X_BEARER_TOKEN;

  const checks = await Promise.all([
    pingService("Gmail", "https://gmail.googleapis.com/$discovery/rest?version=v1"),
    pingService(
      "X API",
      "https://api.twitter.com/2/tweets/search/recent?query=test",
      xToken ? { Authorization: `Bearer ${xToken}` } : undefined
    ),
    pingService("Brave Search", "https://api.search.brave.com/"),
    // Claude Code and Memory Search are local — always UP
  ]);

  const services: ServiceCheck[] = [
    ...checks,
    { name: "Claude Code", status: "up", latencyMs: 0 },
    { name: "Memory Search", status: "up", latencyMs: 0 },
  ];

  return NextResponse.json({ services });
}
