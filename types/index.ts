export interface FocusArea {
  id: string;
  name: string;
  emoji: string;
  description: string;
  priority: "high" | "medium" | "low";
}

export interface ActivityStats {
  messagestoday: number;
  tasksCompleted: number;
  emailsSent: number;
  sparklineData: number[];
}

export interface PipelineLead {
  id: string;
  name: string;
  company: string;
  industry: string;
  status: "outreach" | "qualifying" | "proposal" | "closed";
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

export interface ScheduledEvent {
  name: string;
  date: string;
  type: "fitness" | "personal" | "career" | "goal";
}

export interface Goal {
  id: string;
  title: string;
  status: "backlog" | "in-progress" | "done";
  category: string;
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
