import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { JobStatus } from "@/lib/jobs-storage";
import { JOB_STATUSES } from "@/lib/jobs-storage";

export type SortKey = "date-desc" | "date-asc" | "company" | "status" | "salary-desc";

export type FilterState = {
  query: string;
  status: JobStatus | "all";
  sort: SortKey;
};

type Props = {
  value: FilterState;
  onChange: (v: FilterState) => void;
};

export function Filters({ value, onChange }: Props) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) => onChange({ ...value, [k]: v });

  return (
    <div className="glass flex flex-col gap-3 rounded-2xl p-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value.query}
          onChange={(e) => set("query", e.target.value)}
          placeholder="Search by company, role, or location…"
          className="pl-9"
        />
      </div>
      <div className="flex gap-2">
        <Select value={value.status} onValueChange={(v) => set("status", v as FilterState["status"])}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {JOB_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={value.sort} onValueChange={(v) => set("sort", v as SortKey)}>
          <SelectTrigger className="w-[170px]">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest first</SelectItem>
            <SelectItem value="date-asc">Oldest first</SelectItem>
            <SelectItem value="company">Company (A–Z)</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="salary-desc">Salary (high–low)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

const statusRank: Record<JobStatus, number> = { Offer: 0, Interview: 1, OA: 2, Applied: 3, Rejected: 4 };

function parseSalary(s?: string): number {
  if (!s) return 0;
  const digits = s.replace(/[^0-9.]/g, "");
  const n = parseFloat(digits);
  return Number.isFinite(n) ? n : 0;
}

export function applyFilters<T extends { company: string; role: string; location?: string; status: JobStatus; appliedDate: string; salary?: string }>(
  items: T[],
  { query, status, sort }: FilterState,
): T[] {
  const q = query.trim().toLowerCase();
  let out = items.filter((i) => {
    if (status !== "all" && i.status !== status) return false;
    if (!q) return true;
    return (
      i.company.toLowerCase().includes(q) ||
      i.role.toLowerCase().includes(q) ||
      (i.location ?? "").toLowerCase().includes(q)
    );
  });
  out = [...out].sort((a, b) => {
    switch (sort) {
      case "date-desc":
        return b.appliedDate.localeCompare(a.appliedDate);
      case "date-asc":
        return a.appliedDate.localeCompare(b.appliedDate);
      case "company":
        return a.company.localeCompare(b.company);
      case "status":
        return statusRank[a.status] - statusRank[b.status];
      case "salary-desc":
        return parseSalary(b.salary) - parseSalary(a.salary);
    }
  });
  return out;
}
