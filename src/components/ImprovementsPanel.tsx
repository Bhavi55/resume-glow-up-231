import { Lightbulb } from "lucide-react";

export function ImprovementsPanel({ improvements }: { improvements: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h3 className="font-display text-lg font-semibold">Suggested Improvements</h3>
      </div>
      <ol className="space-y-3">
        {improvements.map((s, i) => (
          <li key={i} className="flex gap-3 rounded-xl bg-muted/40 p-3 text-sm">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-hero-gradient text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
