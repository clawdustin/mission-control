import { feedEvents } from "@/lib/mock-data";
import {
  Radio,
  Mail,
  Link,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const typeIcons = {
  system: Cpu,
  email: Mail,
  connection: Link,
  auth: ShieldCheck,
};

const typeColors = {
  system: "text-green-500",
  email: "text-blue-400",
  connection: "text-purple-400",
  auth: "text-amber-400",
};

export function LiveFeed() {
  return (
    <aside className="w-64 border-l border-[#222] bg-[#0a0a0a] p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Radio size={14} className="text-green-500" />
        <h2 className="text-[10px] font-semibold tracking-widest uppercase text-[#555]">
          Live Feed
        </h2>
      </div>

      <div className="flex-1 space-y-1">
        {feedEvents.map((event) => {
          const Icon = typeIcons[event.type];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 px-2 py-2.5 rounded-lg hover:bg-[#111] transition-colors group"
            >
              <div
                className={`mt-0.5 ${typeColors[event.type]} opacity-60 group-hover:opacity-100 transition-opacity`}
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
        })}
      </div>
    </aside>
  );
}
