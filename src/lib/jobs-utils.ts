import type { JobStatus } from "./jobs-storage";

export const statusStyles: Record<JobStatus, { bg: string; text: string; ring: string; label: string }> = {
  Applied: {
    bg: "bg-[oklch(0.75_0.18_220/0.18)]",
    text: "text-[oklch(0.85_0.16_220)]",
    ring: "ring-[oklch(0.75_0.18_220/0.4)]",
    label: "Applied",
  },
  OA: {
    bg: "bg-[oklch(0.82_0.17_80/0.18)]",
    text: "text-[oklch(0.88_0.16_85)]",
    ring: "ring-[oklch(0.82_0.17_80/0.4)]",
    label: "OA",
  },
  Interview: {
    bg: "bg-[oklch(0.72_0.2_300/0.2)]",
    text: "text-[oklch(0.85_0.18_300)]",
    ring: "ring-[oklch(0.72_0.2_300/0.4)]",
    label: "Interview",
  },
  Offer: {
    bg: "bg-[oklch(0.75_0.19_155/0.2)]",
    text: "text-[oklch(0.85_0.18_155)]",
    ring: "ring-[oklch(0.75_0.19_155/0.45)]",
    label: "Offer",
  },
  Rejected: {
    bg: "bg-[oklch(0.68_0.24_20/0.18)]",
    text: "text-[oklch(0.82_0.2_20)]",
    ring: "ring-[oklch(0.68_0.24_20/0.4)]",
    label: "Rejected",
  },
};

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function relativeDays(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - now.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === -1) return "Yesterday";
  if (diff < 0) return `${-diff} days ago`;
  return `In ${diff} days`;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
