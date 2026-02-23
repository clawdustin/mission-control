"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-[#222] bg-[#0a0a0a]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
          D
        </div>
        <h1 className="text-sm font-semibold tracking-widest uppercase text-[#f5f5f5]">
          Dustin&apos;s Mission Control
        </h1>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors text-[#666]  hover:text-[#f5f5f5]"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <div className="text-right">
          <div className="text-xs text-[#666] font-mono">{date}</div>
          <div className="text-sm text-[#f5f5f5] font-mono tabular-nums">
            {time}
          </div>
        </div>
      </div>
    </header>
  );
}
