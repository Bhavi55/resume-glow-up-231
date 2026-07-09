export type JobStatus = "Applied" | "OA" | "Interview" | "Offer" | "Rejected";

export const JOB_STATUSES: JobStatus[] = ["Applied", "OA", "Interview", "Offer", "Rejected"];

export type Job = {
  id: string;
  company: string;
  role: string;
  location?: string;
  salary?: string;
  status: JobStatus;
  appliedDate: string; // ISO yyyy-mm-dd
  link?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
};

const KEY = "job-tracker.jobs.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadJobs(): Job[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as Job[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveJobs(jobs: Job[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(jobs));
  } catch {
    /* ignore */
  }
}

export function newId(): string {
  if (isBrowser() && "crypto" in window && "randomUUID" in window.crypto) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function seed(): Job[] {
  const now = Date.now();
  const iso = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  };
  const jobs: Job[] = [
    {
      id: newId(),
      company: "Vercel",
      role: "Frontend Engineer",
      location: "Remote",
      salary: "$160,000",
      status: "Interview",
      appliedDate: iso(-5),
      link: "https://vercel.com/careers",
      notes: "Recruiter call went well. Tech screen scheduled.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: newId(),
      company: "Linear",
      role: "Product Engineer",
      location: "San Francisco, CA",
      salary: "$180,000",
      status: "OA",
      appliedDate: iso(-2),
      notes: "Take-home assessment due next week.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: newId(),
      company: "Stripe",
      role: "Software Engineer",
      location: "Remote",
      salary: "$190,000",
      status: "Applied",
      appliedDate: iso(-1),
      createdAt: now,
      updatedAt: now,
    },
    {
      id: newId(),
      company: "Notion",
      role: "Full Stack Engineer",
      location: "New York, NY",
      salary: "$170,000",
      status: "Offer",
      appliedDate: iso(-14),
      notes: "Offer received! Negotiating.",
      createdAt: now,
      updatedAt: now,
    },
    {
      id: newId(),
      company: "Figma",
      role: "Design Engineer",
      location: "Remote",
      salary: "$175,000",
      status: "Rejected",
      appliedDate: iso(-21),
      createdAt: now,
      updatedAt: now,
    },
  ];
  saveJobs(jobs);
  return jobs;
}
