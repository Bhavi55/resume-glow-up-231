import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/jobs-storage";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/jobs-utils";
import { statusStyles } from "@/lib/jobs-utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarView({ jobs, onSelectJob }: { jobs: Job[]; onSelectJob: (job: Job) => void }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const monthLabel = cursor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

    const grid: Array<{ date: Date | null; iso: string }> = [];
    for (let i = 0; i < startWeekday; i++) grid.push({ date: null, iso: "" });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(cursor.getFullYear(), cursor.getMonth(), d);
      grid.push({ date, iso: date.toISOString().slice(0, 10) });
    }
    while (grid.length % 7 !== 0) grid.push({ date: null, iso: "" });
    return grid;
  }, [cursor]);

  const jobsByDate = useMemo(() => {
    const map = new Map<string, Job[]>();
    for (const j of jobs) {
      const arr = map.get(j.appliedDate) ?? [];
      arr.push(j);
      map.set(j.appliedDate, arr);
    }
    return map;
  }, [jobs]);

  const todayIso = new Date().toISOString().slice(0, 10);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedJobs = selected ? jobsByDate.get(selected) ?? [] : [];

  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCursor(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((c, i) => {
          if (!c.date) return <div key={i} className="aspect-square rounded-lg" />;
          const dayJobs = jobsByDate.get(c.iso) ?? [];
          const isToday = c.iso === todayIso;
          const isSelected = c.iso === selected;
          return (
            <button
              key={i}
              onClick={() => setSelected(isSelected ? null : c.iso)}
              className={`group relative aspect-square rounded-lg border p-1 text-left text-xs transition-colors ${
                isSelected ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted/50"
              } ${isToday ? "ring-1 ring-primary/50" : ""}`}
            >
              <span className={`${isToday ? "font-bold text-primary" : "text-foreground/80"}`}>
                {c.date.getDate()}
              </span>
              {dayJobs.length > 0 && (
                <div className="absolute inset-x-1 bottom-1 flex flex-wrap gap-0.5">
                  {dayJobs.slice(0, 3).map((j) => (
                    <span key={j.id} className={`h-1.5 w-1.5 rounded-full ${statusStyles[j.status].text} bg-current`} />
                  ))}
                  {dayJobs.length > 3 && <span className="text-[10px] text-muted-foreground">+{dayJobs.length - 3}</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 border-t pt-3">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{formatDate(selected)}</p>
          {selectedJobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications on this day.</p>
          ) : (
            <ul className="grid gap-2">
              {selectedJobs.map((j) => (
                <li key={j.id}>
                  <button
                    onClick={() => onSelectJob(j)}
                    className="flex w-full items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60"
                  >
                    <span>
                      <span className="font-semibold">{j.company}</span>
                      <span className="ml-2 text-muted-foreground">{j.role}</span>
                    </span>
                    <StatusBadge status={j.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
