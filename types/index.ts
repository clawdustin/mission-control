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
  name: string;
  industry: string;
  status: "outreach" | "qualifying" | "proposal" | "closed";
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
  icon: string;
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
  type: "system" | "email" | "connection" | "auth";
}
