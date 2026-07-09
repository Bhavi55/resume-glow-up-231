import { CheckCircle2, AlertTriangle } from "lucide-react";

type Props = { strengths: string[]; weaknesses: string[] };

export function StrengthsWeaknesses({ strengths, weaknesses }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-success" />
          <h3 className="font-display text-lg font-semibold">Strengths</h3>
        </div>
        <ul className="space-y-3">
          {strengths.length ? strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-success" />
              <span>{s}</span>
            </li>
          )) : <li className="text-sm text-muted-foreground">No strengths detected yet.</li>}
        </ul>
      </div>

      <div className="glass rounded-3xl p-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="font-display text-lg font-semibold">Weaknesses</h3>
        </div>
        <ul className="space-y-3">
          {weaknesses.length ? weaknesses.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-destructive" />
              <span>{s}</span>
            </li>
          )) : <li className="text-sm text-muted-foreground">Nothing critical — nice work.</li>}
        </ul>
      </div>
    </div>
  );
}
