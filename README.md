# ResumeIQ — AI Resume Analyzer

A modern, glassmorphism-styled resume analyzer built with **React + TypeScript + Tailwind CSS** on TanStack Start. Upload a PDF or DOCX resume and instantly get an ATS compatibility score, detected skills, missing keywords, strengths, weaknesses, and personalized improvement suggestions — all processed **locally in your browser**.

![ResumeIQ](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 🎨 **Modern glassmorphism UI** with animated gradient backgrounds
- 🌙 **Dark mode** (default) with light-mode toggle
- 📄 **PDF & DOCX** parsing (via `pdfjs-dist` and `mammoth`) — 100% client-side
- 📊 **ATS compatibility score** (0–100) with animated radial gauge
- 🧠 **Skill detection** across 60+ programming, cloud, and soft skills
- 🔑 **Missing keyword** analysis with recommended terms
- 💪 **Strengths & weaknesses** breakdown
- 💡 **Actionable improvement** suggestions
- 📈 **Dashboard** with summary cards (skills, sections, action verbs, metrics)
- 📱 **Fully responsive** design
- ⏳ **Loading animation** with shimmer + pulse rings
- 🔒 **Privacy-first** — files never leave your browser

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Sticky glass navbar with theme toggle
│   ├── Hero.tsx                # Landing hero with feature cards
│   ├── HowItWorks.tsx          # 3-step explainer
│   ├── UploadZone.tsx          # Drag-and-drop upload
│   ├── LoadingAnimation.tsx    # Animated loading state
│   ├── AnalyzerSection.tsx     # Orchestrates upload → analyze → results
│   ├── Dashboard.tsx           # Full results dashboard
│   ├── ScoreCard.tsx           # Radial ATS score gauge
│   ├── SummaryCard.tsx         # Reusable metric card
│   ├── SkillsPanel.tsx         # Detected skills chips
│   ├── KeywordsPanel.tsx       # Missing keywords list
│   ├── StrengthsWeaknesses.tsx # Two-column analysis
│   ├── ImprovementsPanel.tsx   # Numbered suggestions
│   └── Footer.tsx
├── lib/
│   ├── resume-extractor.ts     # PDF/DOCX text extraction
│   └── resume-analyzer.ts      # Heuristic scoring engine
├── routes/
│   ├── __root.tsx              # Root layout, fonts, theme
│   └── index.tsx               # Landing page
├── types/
│   └── shims.d.ts              # Module declarations
└── styles.css                  # Design tokens + glass utilities
```

## 🎨 Design System

All colors, gradients, shadows, and animations are defined as semantic tokens in `src/styles.css`:

- **Colors**: OKLCH cosmic palette (violet → blue → cyan)
- **Utilities**: `.glass`, `.glass-strong`, `.text-gradient`, `.bg-hero-gradient`, `.glow`
- **Animations**: `float-slow`, `shimmer`, `pulse-ring`, `spin-slow`

## 🚀 Getting Started

```bash
bun install
bun run dev
```

Open the preview URL to see the app.

## 🧠 How the Analyzer Works

The analyzer is a deterministic, client-side heuristic engine that scores resumes across multiple dimensions:

| Signal              | Weight | What it measures                              |
|---------------------|--------|-----------------------------------------------|
| Detected skills     | 30     | Matches against 60+ known skills              |
| Section coverage    | 20     | Contact / Summary / Experience / Education / Skills / Projects |
| Contact info        | 12     | Email, phone, LinkedIn presence               |
| Quantifiable results| 10     | Presence of numbers, %, $                     |
| Action verbs        | 15     | Count of impact verbs (led, built, shipped…) |
| Length              | 8      | Ideal 250–900 words                           |
| Keyword coverage    | 5      | Matches recommended soft-skill keywords       |

## 🛠️ Tech Stack

- **Framework**: TanStack Start v1 + React 19
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first config)
- **Icons**: lucide-react
- **Toasts**: sonner
- **Parsing**: pdfjs-dist, mammoth

## 📄 License

MIT
