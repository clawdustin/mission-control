"use client";

import { Calendar, Flame, Heart, Briefcase, Target } from "lucide-react";

const events = [
  { name: "Spartan Race", date: "Apr 4, 2026", type: "fitness" as const },
  { name: "5yr Anniversary", date: "May 17, 2026", type: "personal" as const },
  { name: "Role Rotation", date: "Jun 2026", type: "career" as const },
  { name: "Half Marathon Goal", date: "Dec 2026", type: "goal" as const },
];

const typeIcons = {
  fitness: Flame,
  personal: Heart,
  career: Briefcase,
  goal: Target,
};

const typeColors = {
  fitness: "text-orange-400",
  personal: "text-pink-400",
  career: "text-blue-400",
  goal: "text-green-400",
};

function daysUntil(dateStr: string): string {
  const target = new Date(dateStr);
  if (isNaN(target.getTime())) return dateStr;
  const now = new Date();
  const diff = Math.ceil(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff < 0) return "Past";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `${diff} days`;
}

export function ScheduledPanel() {
  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555]">
          Scheduled
        </h3>
        <Calendar size={13} className="text-[#555]" />
      </div>

      <div className="space-y-3">
        {events.map((event) => {
          const Icon = typeIcons[event.type];
          const countdown = daysUntil(event.date);
          return (
            <div key={event.name} className="flex items-center gap-3 py-1">
              <div
                className={`w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center ${typeColors[event.type]}`}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#ccc] font-medium">{event.name}</p>
                <p className="text-[10px] text-[#555] font-mono">
                  {event.date}
                </p>
              </div>
              <span className="text-[10px] text-[#666] font-mono tabular-nums">
                {countdown}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
