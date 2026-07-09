import { useEffect, useMemo, useState } from "react";
import { Plus, LayoutGrid, CalendarDays, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import type { Job } from "@/lib/jobs-storage";
import { loadJobs, saveJobs, newId } from "@/lib/jobs-storage";
import { StatsCards } from "./StatsCards";
import { Filters, applyFilters, type FilterState } from "./Filters";
import { JobList } from "./JobList";
import { JobForm } from "./JobForm";
import { CalendarView } from "./CalendarView";
import { ThemeToggle } from "./ThemeToggle";

export function JobsApp() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ query: "", status: "all", sort: "date-desc" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);

  useEffect(() => {
    setJobs(loadJobs());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveJobs(jobs);
  }, [jobs, hydrated]);

  const filtered = useMemo(() => applyFilters(jobs, filters), [jobs, filters]);

  const handleSave = (data: Omit<Job, "id" | "createdAt" | "updatedAt">, id?: string) => {
    const now = Date.now();
    if (id) {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...data, updatedAt: now } : j)));
      toast.success("Application updated");
    } else {
      setJobs((prev) => [{ id: newId(), createdAt: now, updatedAt: now, ...data }, ...prev]);
      toast.success("Application added");
    }
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    const job = jobs.find((j) => j.id === id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast("Application deleted", {
      description: job ? `${job.company} — ${job.role}` : undefined,
      action: job
        ? {
            label: "Undo",
            onClick: () => setJobs((prev) => [job, ...prev]),
          }
        : undefined,
    });
  };

  const openAdd = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (job: Job) => {
    setEditing(job);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero-gradient text-primary-foreground shadow-md">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">TrackWise</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Job Application Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button onClick={openAdd} className="bg-hero-gradient text-primary-foreground shadow-md hover:opacity-95">
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Your <span className="text-gradient">Pipeline</span>
              </h2>
              <p className="text-sm text-muted-foreground">Stay on top of every application in one beautiful dashboard.</p>
            </div>
          </div>
          <StatsCards jobs={jobs} />
        </section>

        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList className="glass rounded-full p-1">
              <TabsTrigger value="list" className="rounded-full data-[state=active]:bg-hero-gradient data-[state=active]:text-primary-foreground">
                <LayoutGrid className="mr-1.5 h-3.5 w-3.5" /> List
              </TabsTrigger>
              <TabsTrigger value="calendar" className="rounded-full data-[state=active]:bg-hero-gradient data-[state=active]:text-primary-foreground">
                <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> Calendar
              </TabsTrigger>
            </TabsList>
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {jobs.length}
            </p>
          </div>

          <TabsContent value="list" className="space-y-4">
            <Filters value={filters} onChange={setFilters} />
            <JobList jobs={filtered} onEdit={openEdit} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView jobs={jobs} onSelectJob={openEdit} />
          </TabsContent>
        </Tabs>

        <footer className="pt-6 text-center text-xs text-muted-foreground">
          Built with React & Tailwind · Data stored locally in your browser
        </footer>
      </main>

      <JobForm open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSave} editing={editing} />
      <Toaster position="top-center" />
    </div>
  );
}
