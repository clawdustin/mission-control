import { services } from "@/lib/mock-data";
import {
  Mail,
  Twitter,
  Search,
  Terminal,
  Brain,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  mail: Mail,
  twitter: Twitter,
  search: Search,
  terminal: Terminal,
  brain: Brain,
};

const statusStyles = {
  up: {
    dot: "bg-green-500",
    label: "text-green-400",
    text: "UP",
  },
  down: {
    dot: "bg-red-500",
    label: "text-red-400",
    text: "DOWN",
  },
  idle: {
    dot: "bg-[#555]",
    label: "text-[#555]",
    text: "IDLE",
  },
};

export function ServicesPanel() {
  return (
    <div className="rounded-xl border border-[#222] bg-[#111] p-5 hover:border-[#333] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold tracking-wider uppercase text-[#555]">
          Services
        </h3>
        <span className="text-[10px] text-green-400 font-mono">
          All systems operational
        </span>
      </div>

      <div className="space-y-2.5">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          const style = statusStyles[service.status];
          return (
            <div
              key={service.name}
              className="flex items-center justify-between py-1"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={13} className="text-[#555]" />
                <span className="text-xs text-[#ccc]">{service.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  {service.status === "up" && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}
                  />
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-wider ${style.label}`}
                >
                  {style.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
