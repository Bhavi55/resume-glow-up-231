import { BarChart3, FileText, Sparkles, Target, Zap, CheckCircle2 } from "lucide-react";
import type { AnalysisResult } from "@/lib/resume-analyzer";
import { ScoreCard } from "./ScoreCard";
import { SummaryCard } from "./SummaryCard";
import { SkillsPanel } from "./SkillsPanel";
import { KeywordsPanel } from "./KeywordsPanel";
import { StrengthsWeaknesses } from "./StrengthsWeaknesses";
import { ImprovementsPanel } from "./ImprovementsPanel";

export function Dashboard({ result, fileName }: { result: AnalysisResult; fileName: string }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Report for</p>
          <h2 className="font-display text-2xl font-bold">{fileName}</h2>
        </div>
        <div className="glass rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          {result.wordCount} words analyzed
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <ScoreCard score={result.score} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Sparkles}
            label="Skills"
            value={result.detectedSkills.length}
            hint="Detected in resume"
          />
          <SummaryCard
            icon={Target}
            label="Keywords"
            value={result.missingKeywords.length}
            hint="Missing recommended"
          />
          <SummaryCard
            icon={Zap}
            label="Action Verbs"
            value={result.metrics.actionVerbCount}
            hint="Impact statements"
          />
          <SummaryCard
            icon={BarChart3}
            label="Metrics"
            value={result.metrics.hasQuantifiableResults ? "Yes" : "No"}
            hint="Quantifiable results"
          />
          <SummaryCard
            icon={FileText}
            label="Sections"
            value={`${result.sections.filter((s) => s.present).length}/${result.sections.length}`}
            hint="Standard sections found"
          />
          <SummaryCard
            icon={CheckCircle2}
            label="Contact"
            value={
              [result.contact.email, result.contact.phone, result.contact.linkedin].filter(Boolean).length + "/3"
            }
            hint="Email · Phone · LinkedIn"
          />
          <div className="glass col-span-2 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Section Coverage</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.sections.map((s) => (
                <span
                  key={s.name}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    s.present
                      ? "bg-success/15 text-success"
                      : "bg-muted text-muted-foreground line-through"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SkillsPanel skills={result.detectedSkills} />
        <KeywordsPanel missing={result.missingKeywords} />
      </div>

      <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />

      <ImprovementsPanel improvements={result.improvements} />
    </div>
  );
}
