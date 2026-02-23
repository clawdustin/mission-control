# Mission Control v3 — Full Redesign

## What Spencer wants (his exact words):
- Healey AI pipeline
- Content pipeline  
- Dustin's status
- Activity kanban (assign to Dustin or Spencer, track both)
- Calendar
- Scheduled automations (cron jobs)
- Org chart (keep)
- Connections view
- Settings
- NO fake data, NO fake charts, NO decorations
- Icons (lucide-react) instead of emojis everywhere
- Clean, functional, data-dense

## Remove entirely:
- Focus areas sidebar
- Any sparkline/chart that uses hardcoded data
- Any mock numbers
- All emojis in UI (replace with lucide icons)

---

## Navigation (top nav tabs):
Dashboard | Pipeline | Content | Kanban | Calendar | Automations | Org | Connections | Settings

---

## Page Layouts

### Dashboard (default view)
3-column grid of real status cards only:

**Card 1 — Dustin's Status**
- Current status: "Active" / "Idle" / "Working"
- Last action: e.g. "Deployed Mission Control v3"
- Uptime since: "Online since Feb 23, 2026 9:18 AM"
- Tools connected: count of active connections
- No fake numbers

**Card 2 — Healey AI Pipeline**  
- Lead count, MRR ($0), goal ($10k/mo by Dec 2026)
- Progress bar (real %, not fake)
- List of active leads with status badges
- Data from: data/pipeline.json

**Card 3 — Services Health**
- Real HTTP pings to each service
- Show name, status (UP/DOWN), latency in ms
- Poll every 30s
- Gmail, X API, Brave Search, Claude Code, Memory Search, GitHub, Tailscale

**Card 4 — Upcoming (Calendar preview)**
- Next 3 upcoming events from data/calendar.json
- Days until each event
- No decoration

### Pipeline tab
Full CRM view:
- Table of leads: Name, Company, Industry, Status, Last Updated, Notes
- Status pipeline: Outreach → Qualifying → Proposal → Negotiating → Closed Won / Closed Lost
- MRR tracker with real progress bar
- Data from data/pipeline.json (I maintain this)

### Content tab
Content pipeline:
- Platforms: X (Twitter), YouTube, Instagram
- Columns: Ideas | In Production | Scheduled | Published
- Each card: platform icon, title/description, due date
- X stats panel: real follower count, tweet count (from X API)
- Data from data/content.json (I maintain this)

Create data/content.json:
```json
{
  "items": [],
  "xStats": {
    "username": "SpencerHea70687",
    "followerGoal": 10000
  }
}
```

### Kanban tab
Task board with two assignees:

**Columns**: Backlog | In Progress | Review | Done

**Each task card shows**:
- Title
- Assignee badge: "Dustin" (blue) or "Spencer" (green)
- Category tag
- Created date

**Data from**: data/tasks.json (I maintain, can be updated via push)
Create data/tasks.json:
```json
{
  "tasks": [
    {
      "id": "t1",
      "title": "Follow up with John Lambert",
      "assignee": "spencer",
      "status": "in-progress",
      "category": "healey-ai",
      "createdAt": "2026-02-23"
    },
    {
      "id": "t2", 
      "title": "Set up Supabase for kanban",
      "assignee": "dustin",
      "status": "backlog",
      "category": "ops",
      "createdAt": "2026-02-23"
    },
    {
      "id": "t3",
      "title": "Build Lambert CRE prototype site",
      "assignee": "dustin",
      "status": "backlog",
      "category": "healey-ai",
      "createdAt": "2026-02-23"
    },
    {
      "id": "t4",
      "title": "Post first X thread about Renewal Lab",
      "assignee": "spencer",
      "status": "backlog",
      "category": "content",
      "createdAt": "2026-02-23"
    }
  ]
}
```

### Calendar tab
- Month/list view toggle
- Events from data/calendar.json
- Also shows: cron job next-run times
- Color coded: fitness (orange), business (blue), personal (pink), ops (gray)

Create data/calendar.json:
```json
{
  "events": [
    { "id": "e1", "title": "Spartan Race", "date": "2026-04-04", "type": "fitness" },
    { "id": "e2", "title": "5yr Anniversary (Ryan)", "date": "2026-05-17", "type": "personal" },
    { "id": "e3", "title": "Role Rotation", "date": "2026-06-01", "type": "career" },
    { "id": "e4", "title": "Half Marathon Goal Deadline", "date": "2026-12-31", "type": "fitness" }
  ]
}
```

### Automations tab
Shows Dustin's scheduled tasks:
- Read from data/automations.json
- Columns: Name, Schedule (cron expression + human readable), Last Run, Next Run, Status
- Status: Active / Paused / Error

Create data/automations.json:
```json
{
  "automations": [
    {
      "id": "a1",
      "name": "Heartbeat check",
      "schedule": "0 * * * *",
      "description": "Hourly check for emails, calendar, notifications",
      "status": "active",
      "lastRun": "2026-02-23T13:00:00Z",
      "nextRun": "2026-02-23T14:00:00Z"
    }
  ]
}
```

### Org tab (keep existing OrgChart component, clean up icons)
- Remove emojis, use lucide User/Bot icons
- Keep tree structure
- Dustin at top, empty placeholder below

### Connections tab
All integrations in one view:
- Name, Type, Status (real ping), Last Used, Actions
- Gmail (email)
- X API (social)
- Brave Search (search)
- Claude Code (coding agent)
- Memory Search / Gemini (memory)
- GitHub (code)
- Tailscale (network)
- Vercel (deployments - note: currently deleted)
- Supabase (database - pending)
- Google Calendar (pending)
- Brave Search (active)

Each row: icon, name, status dot (green/red/yellow), latency, "Configure" button placeholder

### Settings tab
Simple settings page:
- Dashboard name: "Dustin's Mission Control"
- Owner: Spencer Healey
- Dustin's info: name, role, version
- Links: GitHub repo, Tailscale admin
- "Coming soon" placeholder for actual config options

---

## Design Rules
- Background: #0a0a0a
- Cards: #111 with #222 border
- NO emojis anywhere — use lucide-react icons
- Muted text: #555-#666
- Active/UP: green (#22c55e)
- Error/DOWN: red (#ef4444)
- Pending: amber (#f59e0b)
- Accent blue: #3b82f6
- Font: Geist/Inter
- No decorative elements that don't carry data
- Tables > charts for data that doesn't need visualization
- Loading skeletons for async data

---

## API Routes (keep existing, add new):
- GET /api/x-stats — real X data (existing)
- GET /api/github-stats — real GitHub data (existing)
- GET /api/services — real health pings (existing, expand to include GitHub + Tailscale)
- GET /api/pipeline — reads data/pipeline.json (existing)
- GET /api/goals — reads data/goals.json (existing, rename to /api/tasks)
- GET /api/feed — reads data/feed.json (existing)
- GET /api/org — reads data/agents.json (existing)
- GET /api/content — reads data/content.json (new)
- GET /api/calendar — reads data/calendar.json (new)
- GET /api/automations — reads data/automations.json (new)
- GET /api/connections — runs health checks on all services (new)

---

## Instructions
1. Keep all existing API routes and data infrastructure
2. Full layout redesign — new top nav with all tabs
3. Each tab is its own component/view
4. Create all missing data files
5. Replace every emoji with a lucide icon
6. Remove focus areas sidebar entirely
7. Remove all mock/hardcoded numbers
8. Run `npm run build` — must compile clean
9. DO NOT break existing API routes

When completely finished, run:
openclaw system event --text "Mission Control v3 complete — full redesign live" --mode now
