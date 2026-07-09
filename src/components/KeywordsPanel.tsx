import { KeyRound } from "lucide-react";

export function KeywordsPanel({ missing }: { missing: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-warning" />
        <h3 className="font-display text-lg font-semibold">Missing Keywords</h3>
        <span className="ml-auto text-xs text-muted-foreground">{missing.length}</span>
      </div>
      {missing.length === 0 ? (
        <p className="text-sm text-muted-foreground">Great — no critical keywords missing.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {missing.map((k) => (
            <span
              key={k}
              className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium capitalize text-warning"
            >
              + {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
