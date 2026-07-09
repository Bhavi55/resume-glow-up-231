import { UploadCloud, ScanSearch, ListChecks } from "lucide-react";

const STEPS = [
  { icon: UploadCloud, title: "Upload", desc: "Drop your PDF or DOCX resume into the analyzer." },
  { icon: ScanSearch, title: "Analyze", desc: "We extract text and score it for ATS compatibility." },
  { icon: ListChecks, title: "Improve", desc: "Get specific, actionable suggestions to boost your resume." },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          How it <span className="text-gradient">works</span>
        </h2>
        <p className="mt-3 text-muted-foreground">Three steps to a stronger resume.</p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title} className="glass relative rounded-3xl p-6">
            <div className="absolute -top-3 left-6 rounded-full bg-hero-gradient px-3 py-0.5 text-xs font-bold text-primary-foreground">
              Step {i + 1}
            </div>
            <div className="mt-2 grid h-12 w-12 place-items-center rounded-2xl bg-hero-gradient">
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
