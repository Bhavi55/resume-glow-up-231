import { Sparkles } from "lucide-react";

export function SkillsPanel({ skills }: { skills: string[] }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-display text-lg font-semibold">Detected Skills</h3>
        <span className="ml-auto text-xs text-muted-foreground">{skills.length}</span>
      </div>
      {skills.length === 0 ? (
        <p className="text-sm text-muted-foreground">No known skills detected yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="glass rounded-full px-3 py-1 text-xs font-medium capitalize transition-transform hover:scale-105"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
