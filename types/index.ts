export interface FocusArea {
  id: string;
  name: string;
  emoji: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  status: "active" | "idle" | "offline";
  level: number;
  parentId: string | null;
}

export interface XStats {
  followers: number;
  tweets: number;
  followerGoal: number;
}

export interface GitHubStats {
  repos: number;
  latestCommit: string;
  latestRepo: string;
}

export interface PipelineLead {
  id: string;
  name: string;
  company: string;
  industry: string;
  status: "outreach" | "qualifying" | "proposal" | "negotiating" | "closed-won" | "closed-lost";
  notes: string;
  url: string;
  updatedAt: string;
}

export interface PipelineData {
  leads: PipelineLead[];
  mrr: number;
  mrrGoal: number;
  goalDeadline: string;
}

export interface ServiceStatus {
  name: string;
  status: "up" | "down" | "idle";
  latencyMs?: number;
}

export interface Task {
  id: string;
  title: string;
  assignee: "dustin" | "spencer";
  status: "backlog" | "in-progress" | "review" | "done";
  category: string;
  createdAt: string;
}

export interface ContentItem {
  id: string;
  platform: "x" | "youtube" | "instagram";
  title: string;
  description?: string;
  status: "idea" | "production" | "scheduled" | "published";
  dueDate?: string;
}

export interface ContentData {
  items: ContentItem[];
  xStats: {
    username: string;
    followerGoal: number;
  };
}

export interface Goal {
  id: string;
  title: string;
  status: "backlog" | "in-progress" | "done";
  category: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "fitness" | "personal" | "career" | "business" | "ops";
}

export interface Automation {
  id: string;
  name: string;
  schedule: string;
  description: string;
  status: "active" | "paused" | "error";
  lastRun: string;
  nextRun: string;
}

export interface Connection {
  name: string;
  type: string;
  status: "up" | "down" | "pending";
  latencyMs: number;
}

export interface FeedEvent {
  id: string;
  message: string;
  timestamp: string;
  type: "system" | "email" | "connection" | "auth" | "deploy";
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  emoji: string;
  status: "active" | "idle" | "offline";
  level: number;
  parentId: string | null;
}
