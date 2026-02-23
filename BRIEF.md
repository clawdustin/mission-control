# Mission Control - Build Brief

## What We're Building
"Dustin's Mission Control" — a Next.js dashboard for Spencer Healey's life/business, inspired by the attached screenshot. Dark, minimal, data-dense. Think NASA meets a founder's war room.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- lucide-react icons
- recharts for charts
- Start with static/mock data — we'll wire up live APIs later

## Layout (match the reference screenshot structure)

### Header Bar
- Left: Avatar + "DUSTIN'S MISSION CONTROL" + green status dot
- Right: Dark mode toggle, date/time (live clock)

### Left Sidebar — Focus Areas
Not "agents" but Spencer's key focus areas:
- 🏢 Healey AI (Primary — custom software studio)
- 📱 chef'd (App — social media for home cooks)
- 💪 Fitness (Spartan Race Apr 4, half marathon)
- 🎯 Content (X + YouTube, goal: 10k followers)
- 💼 Day Job (Dentsply Sirona — low priority)

### Top Navigation
- Dashboard | Pipeline | Intel | Goals

### Main Content Grid (4 panels across top):

**Panel 1 — Activity**
- "Messages today: 47"
- "Tasks completed: 3"
- "Emails sent: 1"
- Small sparkline chart

**Panel 2 — Healey AI Pipeline**  
- Leads: 3 (John Lambert CRE, + 2 others TBD)
- Status: Outreach / Qualifying / Proposal / Closed
- MRR: $0 (goal: $10,000 by Dec 2026)
- Progress bar toward goal

**Panel 3 — Services / Integrations**
- Gmail: UP
- X API: UP  
- Brave Search: UP
- Claude Code: UP
- Memory Search (Gemini): UP

**Panel 4 — Scheduled**
- Spartan Race: Apr 4, 2026
- 5yr Anniversary: May 17, 2026
- Role Rotation: Jun 2026
- Half Marathon Goal: Dec 2026

### Middle Row — Goals Tracker
Kanban-style: Backlog | In Progress | Done
Pre-populate with Spencer's known goals:
- Find 3 paying Healey AI clients
- Hit $10k/mo revenue
- Run Spartan Race (Apr 4)
- Sub-2hr half marathon
- 10k followers across platforms
- chef'd App Store approval
- Get calendar access for Dustin

### Right Sidebar — Live Feed
Activity log / recent events:
- Dustin came online (today)
- Email sent to Spencer
- Memory search configured
- Claude Code authenticated
- X API connected

## Design System
- Background: #0a0a0a
- Card background: #111111 or #141414
- Borders: #222222
- Accent green: #22c55e (status dots, UP indicators)
- Accent blue: #3b82f6 (progress bars)
- Accent purple: #a855f7 (secondary accents)
- Text primary: #f5f5f5
- Text muted: #666666
- Font: Inter or Geist

## Key UX Details
- All cards have subtle borders and hover states
- Status dots pulse (green = active/up, gray = idle, red = down)
- Live clock in header updates every second
- Responsive but optimized for 1440px desktop
- Keep it clean — data density without clutter

## File Structure
```
mission-control/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── LiveFeed.tsx
│   ├── panels/
│   │   ├── ActivityPanel.tsx
│   │   ├── PipelinePanel.tsx
│   │   ├── ServicesPanel.tsx
│   │   └── ScheduledPanel.tsx
│   └── goals/
│       └── GoalsKanban.tsx
├── lib/
│   └── mock-data.ts
└── types/
    └── index.ts
```

## Instructions
1. Create the full Next.js 15 project from scratch (npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*")
2. Install required deps: lucide-react recharts
3. Install and init shadcn: npx shadcn@latest init (use default config, zinc base color)
4. Build all components with real visual polish — not placeholder boxes
5. Make it look genuinely impressive — this is a showcase piece
6. Run `npm run build` at the end to verify no errors

When completely finished, run:
openclaw system event --text "Mission Control build complete — ready to view" --mode now
