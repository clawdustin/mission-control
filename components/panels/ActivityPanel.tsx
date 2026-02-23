"use client";

import { activityStats } from "@/lib/mock-data";
import { MessageSquare, CheckCircle2, Send } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const chartData = activityStats.sparklineData.map((value, index) => ({
  value,
  index,
}));

export function ActivityPanel() {
  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555]">
          Activity
        </h3>
        <span className="text-[10px] text-[#444] font-mono">Today</span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={13} className="text-blue-400" />
            <span className="text-xs text-[#888]">Messages today</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {activityStats.messagestoday}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-green-400" />
            <span className="text-xs text-[#888]">Tasks completed</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {activityStats.tasksCompleted}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send size={13} className="text-purple-400" />
            <span className="text-xs text-[#888]">Emails sent</span>
          </div>
          <span className="text-sm font-semibold text-[#f5f5f5] tabular-nums">
            {activityStats.emailsSent}
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
