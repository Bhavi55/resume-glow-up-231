import { useState } from "react";
import { toast } from "sonner";
import { UploadZone } from "./UploadZone";
import { LoadingAnimation } from "./LoadingAnimation";
import { Dashboard } from "./Dashboard";
import { extractResumeText } from "@/lib/resume-extractor";
import { analyzeResume, type AnalysisResult } from "@/lib/resume-analyzer";
import { RotateCcw } from "lucide-react";

export function AnalyzerSection() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFile = async (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Max 10MB.");
      return;
    }
    setFile(f);
    setLoading(true);
    setResult(null);
    try {
      const text = await extractResumeText(f);
      if (!text || text.trim().length < 50) {
        throw new Error("Couldn't extract enough text from this file.");
      }
      // brief delay for UX
      await new Promise((r) => setTimeout(r, 900));
      const analysis = analyzeResume(text);
      setResult(analysis);
      toast.success("Analysis complete");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setLoading(false);
  };

  return (
    <section id="analyze" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Analyze your <span className="text-gradient">resume</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          Drop a file below. Analysis runs privately in your browser.
        </p>
      </div>

      {!result && !loading && (
        <UploadZone
          onFile={handleFile}
          fileName={file?.name}
          onClear={file ? reset : undefined}
        />
      )}

      {loading && <LoadingAnimation />}

      {result && file && (
        <>
          <div className="mb-6 flex justify-end">
            <button
              onClick={reset}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-transform hover:scale-105"
            >
              <RotateCcw className="h-4 w-4" />
              Analyze another resume
            </button>
          </div>
          <Dashboard result={result} fileName={file.name} />
        </>
      )}
    </section>
  );
}
