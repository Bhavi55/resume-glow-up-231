import { ExternalLink, MapPin, Pencil, Trash2, Briefcase } from "lucide-react";
import type { Job } from "@/lib/jobs-storage";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import { formatDate, relativeDays } from "@/lib/jobs-utils";

type Props = {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
};

export function JobList({ jobs, onEdit, onDelete }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="glass grid place-items-center rounded-2xl p-12 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
          <Briefcase className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">No applications found</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try adjusting your search or filter, or add a new application to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="glass group flex flex-col gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-base font-bold text-primary-foreground"
              style={{ background: `linear-gradient(135deg, oklch(0.72 0.2 ${(job.company.charCodeAt(0) * 3) % 360}), oklch(0.75 0.18 ${(job.company.charCodeAt(0) * 7) % 360}))` }}
            >
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-display text-base font-semibold">{job.company}</h3>
                <StatusBadge status={job.status} />
              </div>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{job.role}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {job.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {job.location}
                  </span>
                )}
                {job.salary && <span className="font-medium text-foreground/80">{job.salary}</span>}
                <span title={formatDate(job.appliedDate)}>{relativeDays(job.appliedDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto">
            {job.link && (
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <a href={job.link} target="_blank" rel="noreferrer" aria-label="Open job posting">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(job)} aria-label="Edit">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(job.id)}
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
