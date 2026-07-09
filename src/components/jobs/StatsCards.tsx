import { Briefcase, ClipboardCheck, MessageSquare, Trophy, XCircle } from "lucide-react";
import type { Job } from "@/lib/jobs-storage";
import { JOB_STATUSES } from "@/lib/jobs-storage";

type Stat = {
  label: string;
  value: number;
  hint: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
};

export function StatsCards({ jobs }: { jobs: Job[] }) {
  const counts = JOB_STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = jobs.filter((j) => j.status === s).length;
    return acc;
  }, {});

  const total = jobs.length;
  const interviewRate = total ? Math.round(((counts.Interview + counts.Offer) / total) * 100) : 0;
  const offerRate = total ? Math.round((counts.Offer / total) * 100) : 0;

  const stats: Stat[] = [
    { label: "Total", value: total, hint: "Applications", Icon: Briefcase, color: "oklch(0.75 0.18 220)" },
    { label: "Applied", value: counts.Applied, hint: `${total ? Math.round((counts.Applied / total) * 100) : 0}% of total`, Icon: ClipboardCheck, color: "oklch(0.75 0.18 220)" },
    { label: "Interviews", value: counts.Interview, hint: `${interviewRate}% interview rate`, Icon: MessageSquare, color: "oklch(0.72 0.2 300)" },
    { label: "Offers", value: counts.Offer, hint: `${offerRate}% offer rate`, Icon: Trophy, color: "oklch(0.75 0.19 155)" },
    { label: "Rejected", value: counts.Rejected, hint: `${counts.OA} pending OA`, Icon: XCircle, color: "oklch(0.68 0.24 20)" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass group relative overflow-hidden rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
        >
          <div
            className="absolute inset-x-0 top-0 h-0.5 opacity-70"
            style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <div
              className="grid h-8 w-8 place-items-center rounded-lg"
              style={{ background: `color-mix(in oklab, ${s.color} 18%, transparent)`, color: s.color }}
            >
              <s.Icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 font-display text-3xl font-bold">{s.value}</div>
          <p className="mt-0.5 text-xs text-muted-foreground">{s.hint}</p>
        </div>
      ))}
    </div>
  );
}
