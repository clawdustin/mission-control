import { pipelineData } from "@/lib/mock-data";
import { Users, TrendingUp } from "lucide-react";

const stageColors = {
  outreach: "bg-blue-500",
  qualifying: "bg-amber-500",
  proposal: "bg-purple-500",
  closed: "bg-green-500",
};

const stageLabels = {
  outreach: "Outreach",
  qualifying: "Qualifying",
  proposal: "Proposal",
  closed: "Closed",
};

export function PipelinePanel() {
  const progressPercent = (pipelineData.mrr / pipelineData.mrrGoal) * 100;

  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555]">
          Healey AI Pipeline
        </h3>
        <div className="flex items-center gap-1.5">
          <Users size={12} className="text-blue-400" />
          <span className="text-xs font-semibold text-[#f5f5f5]">
            {pipelineData.leads.length} leads
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {pipelineData.leads.map((lead) => (
          <div
            key={lead.name}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${stageColors[lead.status]}`}
              />
              <span className="text-xs text-[#ccc]">{lead.name}</span>
              <span className="text-[10px] text-[#555]">{lead.industry}</span>
            </div>
            <span className="text-[10px] font-medium text-[#666] uppercase tracking-wide">
              {stageLabels[lead.status]}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={12} className="text-green-400" />
            <span className="text-xs text-[#888]">MRR</span>
          </div>
          <span className="text-xs text-[#555]">
            <span className="text-sm font-semibold text-[#f5f5f5]">
              ${pipelineData.mrr.toLocaleString()}
            </span>
            {" "}
            / ${pipelineData.mrrGoal.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-1000"
            style={{ width: `${Math.max(progressPercent, 2)}%` }}
          />
        </div>
        <p className="text-[10px] text-[#444] mt-1.5">
          Goal: ${pipelineData.mrrGoal.toLocaleString()}/mo by{" "}
          {pipelineData.goalDeadline}
        </p>
      </div>
    </div>
  );
}
