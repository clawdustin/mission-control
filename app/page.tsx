"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LiveFeed } from "@/components/layout/LiveFeed";
import { ActivityPanel } from "@/components/panels/ActivityPanel";
import { PipelinePanel } from "@/components/panels/PipelinePanel";
import { ServicesPanel } from "@/components/panels/ServicesPanel";
import { ScheduledPanel } from "@/components/panels/ScheduledPanel";
import { GoalsKanban } from "@/components/goals/GoalsKanban";
import { LayoutDashboard, GitBranch, Radar, Target } from "lucide-react";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "pipeline", label: "Pipeline", icon: GitBranch },
  { key: "intel", label: "Intel", icon: Radar },
  { key: "goals", label: "Goals", icon: Target },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <nav className="flex items-center gap-1 px-6 py-2 border-b border-[#222] bg-[#0a0a0a]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    activeNav === item.key
                      ? "bg-[#141414] text-[#f5f5f5] border border-[#222]"
                      : "text-[#555] hover:text-[#999] hover:bg-[#111]"
                  }`}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 4-Panel Grid */}
            <div className="grid grid-cols-4 gap-4">
              <ActivityPanel />
              <PipelinePanel />
              <ServicesPanel />
              <ScheduledPanel />
            </div>

            {/* Goals Kanban */}
            <GoalsKanban />
          </div>
        </main>

        <LiveFeed />
      </div>
    </div>
  );
}
