import { Loader2 } from "lucide-react";

export function LoadingAnimation({ label = "Analyzing your resume..." }: { label?: string }) {
  return (
    <div className="glass rounded-3xl p-10 text-center">
      <div className="relative mx-auto grid h-24 w-24 place-items-center">
        <div className="absolute inset-0 rounded-full bg-hero-gradient opacity-30 blur-2xl animate-pulse-ring" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-primary/60 animate-spin-slow" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      <p className="mt-6 font-display text-lg font-semibold">{label}</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/3 animate-shimmer rounded-full" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
        {["Parsing", "Scoring", "Suggestions"].map((s) => (
          <div key={s} className="glass rounded-xl py-2">{s}</div>
        ))}
      </div>
    </div>
  );
}
