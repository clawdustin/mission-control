"use client";

import { usePoll } from "@/lib/use-poll";
import { Agent } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { AlertTriangle, Plus } from "lucide-react";

const statusColors = {
  active: "bg-green-500",
  idle: "bg-amber-500",
  offline: "bg-[#555]",
};

function AgentNode({ agent }: { agent: Agent }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors min-w-[200px]">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-2xl">
            {agent.emoji}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-semibold text-[#f5f5f5]">
                {agent.name}
              </span>
              <span className="relative flex h-2 w-2">
                {agent.status === "active" && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${statusColors[agent.status]}`}
                />
              </span>
            </div>
            <p className="text-[10px] text-[#666] uppercase tracking-wider font-semibold mt-0.5">
              {agent.role}
            </p>
            <p className="text-[10px] text-[#444] mt-1">{agent.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrgChart() {
  const { data, loading, error } = usePoll<{ agents: Agent[] }>("/api/org", 60000);

  if (loading) {
    return (
      <div className="rounded-xl border border-[#222] bg-[#111] p-5">
        <Skeleton className="h-3 w-24 mb-6" />
        <div className="flex justify-center">
          <Skeleton className="h-32 w-52" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-xl border border-[#222] bg-[#111] p-5">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle size={13} />
          <span className="text-xs">Org chart unavailable</span>
        </div>
      </div>
    );
  }

  const roots = data.agents.filter((a) => a.parentId === null);
  const children = data.agents.filter((a) => a.parentId !== null);

  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555] mb-6">
        Org Chart
      </h3>

      <div className="flex flex-col items-center gap-6">
        {/* Root agents */}
        <div className="flex gap-6 justify-center">
          {roots.map((agent) => (
            <AgentNode key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Connector line */}
        {children.length > 0 ? (
          <>
            <div className="w-px h-6 bg-[#333]" />
            <div className="flex gap-6 justify-center flex-wrap">
              {children.map((agent) => (
                <AgentNode key={agent.id} agent={agent} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-px h-6 bg-[#333]" />
            <div className="flex flex-col items-center gap-3 py-4 px-8 rounded-xl border border-dashed border-[#333] bg-[#0d0d0d]">
              <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <Plus size={16} className="text-[#444]" />
              </div>
              <div className="text-center">
                <p className="text-xs text-[#555]">No sub-agents yet</p>
                <p className="text-[10px] text-[#333] mt-1">
                  Add agents to data/agents.json
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
