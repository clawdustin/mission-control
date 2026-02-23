"use client";

import { usePoll } from "@/lib/use-poll";
import { MessageSquare, CheckCircle2, Send, AlertTriangle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { PanelSkeleton } from "@/components/ui/Skeleton";

interface XStats {
  followers: number;
  tweets: number;
  likes: number;
}

interface GitHubStats {
  repos: number;
  latestCommit: string | null;
  latestRepo: string | null;
}

const chartData = [12, 19, 8, 25, 32, 18, 47, 38, 29, 44, 35, 47].map(
  (value, index) => ({ value, index })
);

export function ActivityPanel() {
  const { data: xStats, loading: xLoading, error: xError } = usePoll<XStats>("/api/x-stats", 60000);
  const { data: ghStats, loading: ghLoading, error: ghError } = usePoll<GitHubStats>("/api/github-stats", 120000);

  if (xLoading && ghLoading) return <PanelSkeleton />;

  const hasError = xError && ghError;

  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555]">
          Activity
        </h3>
        {hasError ? (
          <AlertTriangle size={13} className="text-amber-400" />
        ) : (
          <span className="text-[10px] text-[#444] font-mono">Live</span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={13} className="text-blue-400" />
            <span className="text-xs text-[#888]">X Followers</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {xError ? "\u2014" : (xStats?.followers?.toLocaleString() ?? "...")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-green-400" />
            <span className="text-xs text-[#888]">GitHub repos</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {ghError ? "\u2014" : (ghStats?.repos ?? "...")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send size={13} className="text-purple-400" />
            <span className="text-xs text-[#888]">X Tweets</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {xError ? "\u2014" : (xStats?.tweets?.toLocaleString() ?? "...")}
          </span>
        </div>
      </div>

      <div className="h-16 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="activityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={1.5}
              fill="url(#activityGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
