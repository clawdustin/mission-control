"use client";

import { usePoll } from "@/lib/use-poll";
import { FeedEvent } from "@/types";
import { Radio, Mail, Link, ShieldCheck, Cpu, Rocket } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

const typeIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  system: Cpu,
  email: Mail,
  connection: Link,
  auth: ShieldCheck,
  deploy: Rocket,
};

const typeColors: Record<string, string> = {
  system: "text-green-500",
  email: "text-blue-400",
  connection: "text-purple-400",
  auth: "text-amber-400",
  deploy: "text-cyan-400",
};

export function LiveFeed() {
  const { data, loading } = usePoll<{ events: FeedEvent[] }>("/api/feed", 30000);

  return (
    <aside className="w-64 border-l border-[#222] bg-[#0a0a0a] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Radio size={14} className="text-green-500" />
        <h2 className="text-[10px] font-semibold tracking-widest uppercase text-[#555]">
          Live Feed
        </h2>
      </div>

      <div className="flex-1 space-y-1">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-3 px-2 py-2.5">
                <Skeleton className="w-4 h-4 rounded mt-0.5" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          (data?.events ?? []).map((event) => {
            const Icon = typeIcons[event.type] || Cpu;
            const color = typeColors[event.type] || "text-green-500";
            return (
              <div
                key={event.id}
                className="flex items-start gap-3 px-2 py-2.5 rounded-lg hover:bg-[#111] transition-colors group"
              >
                <div
                  className={`mt-0.5 ${color} opacity-60 group-hover:opacity-100 transition-opacity`}
                >
                  <Icon size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#ccc] leading-relaxed">
                    {event.message}
                  </p>
                  <p className="text-[10px] text-[#444] mt-0.5">
                    {event.timestamp}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
