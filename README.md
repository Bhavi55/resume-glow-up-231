# TrackWise — Job Application Tracker

A modern, professional job application tracker built with **React + TypeScript + Tailwind CSS** and glassmorphism-inspired UI.

All data lives in your browser via `localStorage` — no accounts, no backend.

## Features

- **Dashboard** with animated statistics cards (Total, Applied, Interviews, Offers, Rejected)
- **Add / Edit / Delete** applications (company, role, location, salary, status, date, link, notes)
- **Status pipeline**: Applied · OA · Interview · Offer · Rejected
- **Search** by company, role, or location
- **Filter** by status
- **Sort** by date (newest/oldest), company A–Z, status, or salary
- **Calendar view** with per-day application markers
- **Dark & Light mode** with persisted preference
- **Responsive** mobile-first layout
- **Undo delete** via toast
- **Local Storage** persistence with seeded demo data on first visit

## Tech stack

- React 19 + TypeScript
- TanStack Router / Start
- Tailwind CSS v4 (CSS-first, semantic tokens)
- shadcn/ui components
- lucide-react icons
- sonner toasts

## Project structure

```
src/
├── components/
│   ├── jobs/
│   │   ├── JobsApp.tsx       # Main container
│   │   ├── StatsCards.tsx    # Dashboard summary cards
│   │   ├── Filters.tsx       # Search / filter / sort
│   │   ├── JobList.tsx       # Application cards
│   │   ├── JobForm.tsx       # Add/edit dialog
│   │   ├── CalendarView.tsx  # Monthly calendar
│   │   ├── StatusBadge.tsx   # Colored status pill
│   │   └── ThemeToggle.tsx
│   └── ui/                    # shadcn primitives
├── hooks/
│   └── use-theme.ts
├── lib/
│   ├── jobs-storage.ts        # Types + localStorage layer
│   └── jobs-utils.ts          # Formatting, status colors
├── routes/
│   ├── __root.tsx
│   └── index.tsx
└── styles.css
```

## Getting started

```bash
bun install
bun run dev
```

Open http://localhost:8080 and start tracking your applications.
