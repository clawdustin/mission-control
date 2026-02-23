import {
  FocusArea,
  ActivityStats,
  PipelineData,
  ServiceStatus,
  ScheduledEvent,
  Goal,
  FeedEvent,
} from "@/types";

export const focusAreas: FocusArea[] = [
  {
    id: "healey-ai",
    name: "Healey AI",
    emoji: "🏢",
    description: "Custom software studio",
    priority: "high",
  },
  {
    id: "chefd",
    name: "chef'd",
    emoji: "📱",
    description: "Social media for home cooks",
    priority: "high",
  },
  {
    id: "fitness",
    name: "Fitness",
    emoji: "💪",
    description: "Spartan Race Apr 4, half marathon",
    priority: "medium",
  },
  {
    id: "content",
    name: "Content",
    emoji: "🎯",
    description: "X + YouTube, goal: 10k followers",
    priority: "medium",
  },
  {
    id: "day-job",
    name: "Day Job",
    emoji: "💼",
    description: "Dentsply Sirona",
    priority: "low",
  },
];

export const activityStats: ActivityStats = {
  messagestoday: 47,
  tasksCompleted: 3,
  emailsSent: 1,
  sparklineData: [12, 19, 8, 25, 32, 18, 47, 38, 29, 44, 35, 47],
};

export const pipelineData: PipelineData = {
  leads: [
    {
      name: "John Lambert",
      industry: "CRE",
      status: "outreach",
    },
    {
      name: "Sarah Chen",
      industry: "FinTech",
      status: "qualifying",
    },
    {
      name: "Mike Torres",
      industry: "Healthcare",
      status: "outreach",
    },
  ],
  mrr: 0,
  mrrGoal: 10000,
  goalDeadline: "Dec 2026",
};

export const services: ServiceStatus[] = [
  { name: "Gmail", status: "up", icon: "mail" },
  { name: "X API", status: "up", icon: "twitter" },
  { name: "Brave Search", status: "up", icon: "search" },
  { name: "Claude Code", status: "up", icon: "terminal" },
  { name: "Memory Search", status: "up", icon: "brain" },
];

export const scheduledEvents: ScheduledEvent[] = [
  { name: "Spartan Race", date: "Apr 4, 2026", type: "fitness" },
  { name: "5yr Anniversary", date: "May 17, 2026", type: "personal" },
  { name: "Role Rotation", date: "Jun 2026", type: "career" },
  { name: "Half Marathon Goal", date: "Dec 2026", type: "goal" },
];

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Find 3 paying Healey AI clients",
    status: "in-progress",
    category: "revenue",
  },
  {
    id: "g2",
    title: "Hit $10k/mo revenue",
    status: "backlog",
    category: "revenue",
  },
  {
    id: "g3",
    title: "Run Spartan Race (Apr 4)",
    status: "in-progress",
    category: "fitness",
  },
  {
    id: "g4",
    title: "Sub-2hr half marathon",
    status: "backlog",
    category: "fitness",
  },
  {
    id: "g5",
    title: "10k followers across platforms",
    status: "in-progress",
    category: "content",
  },
  {
    id: "g6",
    title: "chef'd App Store approval",
    status: "backlog",
    category: "product",
  },
  {
    id: "g7",
    title: "Get calendar access for Dustin",
    status: "done",
    category: "ops",
  },
];

export const feedEvents: FeedEvent[] = [
  {
    id: "f1",
    message: "Dustin came online",
    timestamp: "Just now",
    type: "system",
  },
  {
    id: "f2",
    message: "Email sent to Spencer",
    timestamp: "2m ago",
    type: "email",
  },
  {
    id: "f3",
    message: "Memory search configured",
    timestamp: "15m ago",
    type: "system",
  },
  {
    id: "f4",
    message: "Claude Code authenticated",
    timestamp: "1h ago",
    type: "auth",
  },
  {
    id: "f5",
    message: "X API connected",
    timestamp: "2h ago",
    type: "connection",
  },
];
