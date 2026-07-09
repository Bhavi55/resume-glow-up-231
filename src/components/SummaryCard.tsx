import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  accent?: string;
};

export function SummaryCard({ icon: Icon, label, value, hint, accent }: Props) {
  return (
    <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
        <div
          className="grid h-9 w-9 place-items-center rounded-lg"
          style={{ background: accent ?? "var(--gradient-hero)" }}
        >
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
