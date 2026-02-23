"use client";

import { useState } from "react";
import { focusAreas } from "@/lib/mock-data";

const priorityColors = {
  high: "border-green-500/50 bg-green-500/5",
  medium: "border-blue-500/50 bg-blue-500/5",
  low: "border-[#333] bg-transparent",
};

const priorityDots = {
  high: "bg-green-500",
  medium: "bg-blue-500",
  low: "bg-[#444]",
};

export function Sidebar() {
  const [activeArea, setActiveArea] = useState("healey-ai");

  return (
    <aside className="w-56 border-r border-[#222] bg-[#0a0a0a] p-4 flex flex-col gap-1">
      <h2 className="text-[10px] font-semibold tracking-widest uppercase text-[#555] mb-3 px-2">
        Focus Areas
      </h2>
      {focusAreas.map((area) => (
        <button
          key={area.id}
          onClick={() => setActiveArea(area.id)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 border ${
            activeArea === area.id
              ? priorityColors[area.priority as keyof typeof priorityColors]
              : "border-transparent hover:bg-[#111] hover:border-[#222]"
          }`}
        >
          <span className="text-base">{area.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#f5f5f5] truncate">
                {area.name}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-full ${priorityDots[area.priority as keyof typeof priorityDots]}`}
              />
            </div>
            <span className="text-[10px] text-[#555] truncate block">
              {area.description}
            </span>
          </div>
        </button>
      ))}
    </aside>
  );
}
