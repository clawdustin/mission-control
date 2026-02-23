import { scheduledEvents } from "@/lib/mock-data";
import { Calendar, Flame, Heart, Briefcase, Target } from "lucide-react";

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
        {scheduledEvents.map((event) => {
          const Icon = typeIcons[event.type];
          return (
            <div
              key={event.name}
              className="flex items-center gap-3 py-1"
            >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
