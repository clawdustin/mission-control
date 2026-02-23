import { goals } from "@/lib/mock-data";
import { Circle, Clock, CheckCircle2 } from "lucide-react";

const columns = [
  {
    key: "backlog" as const,
    label: "Backlog",
    icon: Circle,
    color: "text-[#555]",
    borderColor: "border-[#333]/50",
  },
  {
    key: "in-progress" as const,
    label: "In Progress",
    icon: Clock,
    color: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    key: "done" as const,
    label: "Done",
    icon: CheckCircle2,
    color: "text-green-400",
    borderColor: "border-green-500/20",
  },
];

const categoryColors: Record<string, string> = {
  revenue: "bg-green-500/10 text-green-400",
  fitness: "bg-orange-500/10 text-orange-400",
  content: "bg-purple-500/10 text-purple-400",
  product: "bg-blue-500/10 text-blue-400",
  ops: "bg-amber-500/10 text-amber-400",
};

export function GoalsKanban() {
  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555] mb-4">
        Goals Tracker
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => {
          const Icon = col.icon;
          const colGoals = goals.filter((g) => g.status === col.key);
          return (
            <div key={col.key}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={13} className={col.color} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-[#666]">
                  {col.label}
                </span>
                <span className="text-[10px] text-[#444] ml-auto tabular-nums">
                  {colGoals.length}
                </span>
              </div>
              <div className="space-y-2">
                {colGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-3 rounded-lg bg-[#0d0d0d] border ${col.borderColor} hover:bg-[#141414] transition-colors`}
                  >
                    <p className="text-xs text-[#ccc] leading-relaxed mb-2">
                      {goal.title}
                    </p>
                    <span
                      className={`text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded ${categoryColors[goal.category] || "bg-[#222] text-[#666]"}`}
                    >
                      {goal.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
