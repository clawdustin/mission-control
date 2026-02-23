# Mission Control v2 — Real Data + Org Chart

## Overview
Replace all mock data with real live data. Add org chart panel. Maintain the same dark design.

## Architecture

### Data Strategy

**Live API data (server-side API routes, cached with revalidation):**
- X stats (follower count, tweet count, like count) — X API bearer token
- GitHub stats (commit count, repos, latest push) — GitHub API
- Services health (actual HTTP pings) — check each endpoint

**Managed data files (Dustin maintains these, auto-deploys on push):**
- `data/pipeline.json` — Healey AI CRM
- `data/goals.json` — Goals kanban
- `data/feed.json` — Live activity feed
- `data/agents.json` — Org chart agents

---

## 1. Data Files to Create

### `data/pipeline.json`
```json
{
  "leads": [
    {
      "id": "l1",
      "name": "John Lambert",
      "company": "Lambert CRE",
      "industry": "Commercial Real Estate",
      "status": "qualifying",
      "notes": "Owner of Lambert CRE Charlotte. Met via roommate's dad. Said he'd love to discuss.",
      "url": "lambert-cre.com",
      "updatedAt": "2026-02-23"
    }
  ],
  "mrr": 0,
  "mrrGoal": 10000,
  "goalDeadline": "Dec 2026"
}
```

### `data/goals.json`
```json
{
  "goals": [
    { "id": "g1", "title": "Find 3 paying Healey AI clients", "status": "in-progress", "category": "revenue" },
    { "id": "g2", "title": "Hit $10k/mo revenue", "status": "backlog", "category": "revenue" },
    { "id": "g3", "title": "Run Spartan Race (Apr 4)", "status": "in-progress", "category": "fitness" },
    { "id": "g4", "title": "Sub-2hr half marathon", "status": "backlog", "category": "fitness" },
    { "id": "g5", "title": "10k followers across platforms", "status": "in-progress", "category": "content" },
    { "id": "g6", "title": "chef'd App Store approval", "status": "backlog", "category": "product" },
    { "id": "g7", "title": "Calendar access for Dustin", "status": "done", "category": "ops" }
  ]
}
```

### `data/feed.json`
```json
{
  "events": [
    { "id": "f1", "message": "Mission Control v2 deployed", "timestamp": "2026-02-23T17:36:00Z", "type": "deploy" },
    { "id": "f2", "message": "Claude Code authenticated", "timestamp": "2026-02-23T15:47:00Z", "type": "auth" },
    { "id": "f3", "message": "Gemini memory search online", "timestamp": "2026-02-23T16:41:00Z", "type": "system" },
    { "id": "f4", "message": "Email sent to Spencer", "timestamp": "2026-02-23T15:28:00Z", "type": "email" },
    { "id": "f5", "message": "Dustin came online", "timestamp": "2026-02-23T14:18:00Z", "type": "system" }
  ]
}
```

### `data/agents.json`
```json
{
  "agents": [
    {
      "id": "dustin",
      "name": "Dustin",
      "role": "Chief of Staff",
      "description": "Superintelligent executive assistant",
      "emoji": "🧠",
      "status": "active",
      "level": 0,
      "parentId": null
    }
  ]
}
```

---

## 2. API Routes to Build

### `app/api/x-stats/route.ts`
```typescript
// GET https://api.twitter.com/2/users/by/username/SpencerHea70687?user.fields=public_metrics
// Bearer token from env: X_BEARER_TOKEN
// Return: { followers: number, tweets: number, likes: number }
// Cache: revalidate every 60 seconds
```

### `app/api/github-stats/route.ts`
```typescript
// GET https://api.github.com/users/clawdustin/repos
// GET https://api.github.com/users/clawdustin/events
// Auth: GITHUB_TOKEN env var
// Return: { repos: number, latestCommit: string, latestRepo: string }
// Cache: revalidate every 120 seconds
```

### `app/api/services/route.ts`
```typescript
// Ping each service and return real status:
// Gmail: fetch https://gmail.googleapis.com (check if reachable)
// X API: fetch https://api.twitter.com/2/tweets/search/recent?query=test with bearer token
// Brave Search: fetch brave search API with the key
// Claude Code: check if `claude auth status` returns loggedIn:true (exec a shell command)
// Memory Search: always UP (local, always running)
// Return: { services: Array<{name, status: 'up'|'down', latencyMs}> }
// Cache: revalidate every 30 seconds
```

### `app/api/pipeline/route.ts`
```typescript
// Read from data/pipeline.json
// Return the pipeline data
```

### `app/api/goals/route.ts`
```typescript
// Read from data/goals.json
// Return goals array
```

### `app/api/feed/route.ts`
```typescript
// Read from data/feed.json
// Sort by timestamp desc, return latest 20
// Format timestamps as relative ("2h ago", "just now")
```

### `app/api/org/route.ts`
```typescript
// Read from data/agents.json
// Return agents tree
```

---

## 3. Components to Update/Build

### Update all panels to fetch from API routes:
- `ActivityPanel.tsx` — fetch /api/x-stats and /api/github-stats for real numbers. Keep sparkline but use real daily message count if available.
- `PipelinePanel.tsx` — fetch /api/pipeline
- `ServicesPanel.tsx` — fetch /api/services with real latency badges
- `ScheduledPanel.tsx` — calculate real countdowns ("40 days away") from hardcoded dates
- `GoalsKanban.tsx` — fetch /api/goals
- `LiveFeed.tsx` — fetch /api/feed, poll every 30s for new events

### New: `components/org/OrgChart.tsx`
Build an org chart panel that:
- Reads from /api/org
- Shows Dustin at the top with emoji avatar (🧠), role, "active" green dot
- Shows "No sub-agents yet" placeholder below in a tree structure
- Tree lines connecting nodes (use SVG or CSS borders)
- Each agent node: emoji, name, role, status dot
- Add this as a new tab in the nav: "Org" alongside Dashboard/Pipeline/Intel/Goals
- Or add as a panel in the main dashboard

---

## 4. Environment Variables Needed

Add these to `.env.local` AND to Vercel project settings:

```
X_BEARER_TOKEN=X_BEARER_TOKEN_REDACTED
GITHUB_TOKEN=GITHUB_TOKEN_REDACTED
```

---

## 5. Client-Side Polling

For panels that need to feel "live":
- ServicesPanel: poll /api/services every 30 seconds
- LiveFeed: poll /api/feed every 30 seconds
- ActivityPanel (X stats): poll every 60 seconds

Use a simple `useEffect` + `setInterval` pattern with `useState` for data.

---

## 6. Loading States

Each panel should have a skeleton loading state (pulse animation) while fetching. Don't show empty panels — show shimmer/skeleton cards that match the panel layout.

---

## 7. Error Handling

If an API fails, show the panel in a degraded state with a warning icon, don't crash the whole page.

---

## Instructions
1. Create all data files in `data/` directory
2. Build all API routes in `app/api/`
3. Update all existing components to fetch from API routes
4. Add `OrgChart.tsx` component
5. Add "Org" to navigation
6. Create `.env.local` with the env vars
7. Run `npm run build` to verify no TypeScript errors
8. Do NOT delete the existing design — keep all styling, just replace data sources

When completely finished, run:
openclaw system event --text "Mission Control v2 complete — real data + org chart" --mode now
EOF
echo "Brief written"